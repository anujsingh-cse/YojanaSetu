from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import UserCreate, UserResponse
from app.core import security
from app import models
from app.services import sms

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/otp/verify")

def get_current_user_dependency(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    user_id = security.verify_token(token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    import uuid
    try:
        user_uuid = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format in token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.query(models.User).filter(models.User.id == user_uuid).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user

@router.post("/otp/send")
def send_otp(phone: str):
    success = sms.send_verification_code(phone)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification code via SMS provider"
        )
    return {"message": "Verification code dispatched successfully"}

@router.post("/otp/verify")
def verify_otp(phone: str, otp: str, db: Session = Depends(get_db)):
    is_valid = sms.check_verification_code(phone, otp)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification OTP code"
        )
    
    # Query database for matching user
    user = db.query(models.User).filter(models.User.phone == phone).first()
    
    # Register/Create user if they don't exist yet
    if not user:
        user = models.User(phone=phone)
        db.add(user)
        db.commit()
        db.refresh(user)
        
    access_token = security.create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_current_user(current_user: models.User = Depends(get_current_user_dependency)):
    return current_user

@router.post("/profile", response_model=UserResponse)
def update_profile(
    user_data: UserCreate, 
    current_user: models.User = Depends(get_current_user_dependency),
    db: Session = Depends(get_db)
):
    # Update profile fields with incoming data
    for field, value in user_data.model_dump(exclude_unset=True).items():
        if field == "phone":
            continue
        setattr(current_user, field, value)
        
    db.commit()
    db.refresh(current_user)
    return current_user
