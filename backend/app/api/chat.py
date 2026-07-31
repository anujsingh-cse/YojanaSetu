import os
import requests
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    language: str = "hi"

@router.post("/query")
def chat_with_bot(payload: ChatMessage):
    api_key = os.getenv("NVIDIA_API_KEY", "").strip()
    model_name = os.getenv("NVIDIA_CHAT_MODEL", "meta/llama-3.3-70b-instruct")

    if not api_key or "your-free-key" in api_key:
        return {"reply": f"YojanaSetu Vernacular Assistant (Fallback Mode): Scheme guidance for '{payload.message}' in {payload.language}."}

    system_prompt = (
        "You are YojanaSetu AI, an expert assistant for Indian Government Welfare Schemes (Central and State schemes like PM-KISAN, Ayushman Bharat, PMAY, MNS, etc.). "
        "Explain scheme eligibility, benefits, application steps, and required documents clearly and accurately. "
        f"Respond directly in the user's preferred language (Language Code: {payload.language}). Keep answers helpful, empathetic, and easy to understand for Indian citizens."
    )

    try:
        response = requests.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": model_name,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": payload.message}
                ],
                "temperature": 0.2,
                "max_tokens": 1024
            },
            timeout=30
        )
        response.raise_for_status()
        res_json = response.json()
        reply_text = res_json["choices"][0]["message"]["content"]
        return {"reply": reply_text, "model": model_name}

    except Exception as e:
        print(f"NVIDIA AI Error: {e}")
        return {"reply": f"Unable to fetch response from YojanaSetu AI currently. Please try again shortly. ({str(e)})"}

