from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "SUPER_SECRET_KEY_FOR_DEV_ONLY_1234567890"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
