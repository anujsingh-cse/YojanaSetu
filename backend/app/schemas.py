from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import date

class UserBase(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    state_code: Optional[str] = None
    district: Optional[str] = None
    tehsil: Optional[str] = None
    category: Optional[str] = None
    occupation: Optional[str] = None
    annual_income: Optional[float] = None
    land_holding_acres: Optional[float] = None
    disability_status: Optional[bool] = False
    education_level: Optional[str] = None
    preferred_language: Optional[str] = "hi"
    ekyc_verified: Optional[bool] = False

class UserCreate(UserBase):
    phone: str

class UserResponse(UserBase):
    id: UUID
    phone: str
    
    class Config:
        orm_mode = True

class SchemeBase(BaseModel):
    scheme_name_en: str
    scheme_name_hi: Optional[str] = None
    central_or_state: str
    state_code: Optional[str] = None
    ministry: Optional[str] = None
    category: Optional[str] = None
    eligibility_rules: Dict[str, Any]
    benefits: Dict[str, Any]
    documents_required: List[str] = []
    application_link: Optional[str] = None
    offline_process: Optional[str] = None
    deadline: Optional[date] = None
    is_active: bool = True

class SchemeResponse(SchemeBase):
    id: UUID
    
    class Config:
        orm_mode = True

class MatchResult(BaseModel):
    scheme: SchemeResponse
    match_score: float
    missing_criteria: List[str]
