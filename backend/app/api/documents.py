from fastapi import APIRouter, UploadFile, File, Form
from typing import List

router = APIRouter()

@router.post("/upload")
def upload_document(file: UploadFile = File(...), doc_type: str = Form(...)):
    # Mock OCR and PII redaction
    return {"doc_type": doc_type, "extracted_fields": {"last_4": "1234"}, "verification_status": "pending"}

@router.get("/")
def list_documents():
    return []

@router.delete("/{doc_id}")
def delete_document(doc_id: str):
    return {"message": "Deleted"}
