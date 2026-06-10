"""
Pydantic schemas for request / response validation.
Add your ML-related schemas here as the service grows.
"""

from pydantic import BaseModel


class HealthResponse(BaseModel):
    success: bool
    message: str
    timestamp: str
