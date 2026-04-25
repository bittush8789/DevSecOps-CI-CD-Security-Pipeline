from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "DevSecOps API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "72927236537653765376537653765376537653765376537653" # Should be in env
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Security Headers
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # Database
    DATABASE_URL: str = "sqlite:///./devsecops.db"

    class Config:
        case_sensitive = True

settings = Settings()
