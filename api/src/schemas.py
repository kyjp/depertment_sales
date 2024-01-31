from typing import Optional
from pydantic import BaseModel
from decouple import config

CSRF_KEY = config('CSRF_KEY')

class CsrfSettings(BaseModel):
  secret_key: str = CSRF_KEY

class SuccessMsg(BaseModel):
  message: str

class UserBody(BaseModel):
  email: str
  password: str

class UserInfo(BaseModel):
  id: Optional[str] = None
  email: str

class Csrf(BaseModel):
  csrf_token: str

class Sale(BaseModel):
  id: str
  year: int
  department: str
  sales: float

class SaleBody(BaseModel):
  year: int
  department: str
  sales: float
