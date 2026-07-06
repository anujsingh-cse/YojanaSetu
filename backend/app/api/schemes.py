from fastapi import APIRouter, Depends
from typing import List
from app.schemas import SchemeResponse, MatchResult, UserBase
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.post("/search", response_model=List[SchemeResponse])
def search_schemes(query: str = "", db: Session = Depends(get_db)):
    return []

@router.post("/match", response_model=List[MatchResult])
def match_schemes(user_profile: UserBase, db: Session = Depends(get_db)):
    # Mock AI Eligibility Matching Engine
    return []

@router.get("/{scheme_id}", response_model=SchemeResponse)
def get_scheme(scheme_id: str, db: Session = Depends(get_db)):
    return None
