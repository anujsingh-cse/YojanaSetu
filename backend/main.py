from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, schemes, documents, applications, chat
from app.database import engine
from app.models import Base

# Automatically create database tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="YojanaSetu API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(schemes.router, prefix="/api/schemes", tags=["schemes"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/")
def root():
    return {"message": "Welcome to YojanaSetu API"}
