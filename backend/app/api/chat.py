from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    language: str = "hi"

@router.post("/query")
def chat_with_bot(payload: ChatMessage):
    # Mock AI response
    return {"reply": "This is a mock AI response in " + payload.language}
