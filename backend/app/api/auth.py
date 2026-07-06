from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import UserCreate, UserResponse

router = APIRouter()

@router.post("/otp/send")
def send_otp(phone: str):
    # Mock OTP send
    return {"message": f"OTP sent to {phone}", "mock_otp": "123456"}

@router.post("/otp/verify")
def verify_otp(phone: str, otp: str):
    if otp != "123456":
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return {"access_token": "mock_token", "token_type": "bearer"}

import uuid

@router.get("/me", response_model=UserResponse)
def get_current_user(db: Session = Depends(get_db)):
    # Mock current user logic
    return {"id": uuid.uuid4(), "phone": "+919999999999", "name": "Mock User"}

@router.post("/profile", response_model=UserResponse)
def update_profile(user: UserCreate, db: Session = Depends(get_db)):
    # Mock user creation
    return {"id": uuid.uuid4(), "phone": user.phone, "name": user.name or "Mock User"}
