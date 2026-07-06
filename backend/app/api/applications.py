from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ApplicationUpdate(BaseModel):
    status: str
    notes: str = ""

@router.post("/")
def create_application():
    return {"message": "Application created"}

@router.get("/")
def list_applications():
    return []

@router.patch("/{app_id}")
def update_application(app_id: str, payload: ApplicationUpdate):
    return {"message": "Updated"}
