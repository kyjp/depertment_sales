from fastapi import APIRouter, HTTPException
from fastapi import Response, Request, Depends
from fastapi.encoders import jsonable_encoder
from schemas import UserBody, SuccessMsg, UserInfo, Csrf
from auth_utils import AuthJwtCsrf
from fastapi_csrf_protect import CsrfProtect
from decouple import config
from typing import Union
from bson import ObjectId
from auth_utils import AuthJwtCsrf
from database import session
from model import UserTable

router = APIRouter()
auth = AuthJwtCsrf()

async def db_signup(data: dict) -> dict:
  email = data.get("email")
  password = data.get("password")
  overlap_user = session.query(UserTable).filter(UserTable.email == email).first()
  if overlap_user:
    raise HTTPException(status_code=400, detail='Email is already taken')
  if not password or len(password) < 6:
    raise HTTPException(status_code=400, detail="Password too short")
    print('test')
  db_user = UserTable(email=email, password=auth.generate_hashed_pw(password))
  session.add(db_user)
  session.commit()
  new_user = session.query(UserTable).filter(UserTable.id == db_user.id).first()
  if new_user:
    return user_serializer(new_user)
  return False

async def db_login(data: dict) -> str:
  email = data.get("email")
  password = data.get("password")
  user = session.query(UserTable).filter(UserTable.email == email).first()
  if not user or not auth.verify_pw(password, user.password):
    raise HTTPException(
      status_code=400, detail='Invalid email or password'
    )
  token = auth.encode_jwt(user.email)
  return token

@router.get("/api/csrftoken", response_model=Csrf)
def get_csrf_token(csrf_protect: CsrfProtect = Depends()):
  csrf_token = csrf_protect.generate_csrf()
  res = {'csrf_token': csrf_token}
  return res

@router.post("/api/register", response_model=UserInfo)
async def signup(request: Request, user: UserBody, csrf_protect: CsrfProtect = Depends()):
  csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
  csrf_protect.validate_csrf(csrf_token)
  user = jsonable_encoder(user)
  new_user = await db_signup(user)
  return new_user

@router.post("/api/login", response_model=SuccessMsg)
async def login(request: Request, response: Response, user: UserBody, csrf_protect: CsrfProtect = Depends()):
  csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
  csrf_protect.validate_csrf(csrf_token)
  user = jsonable_encoder(user)
  token = await db_login(user)
  response.set_cookie(
    key="access_token", value=f"Bearer {token}", httponly=True, samesite="none", secure=True
  )
  return {"message": "Successfully logged-in"}

@router.post("/api/logout", response_model=SuccessMsg)
async def logout(request: Request, response: Response, csrf_protect: CsrfProtect = Depends()):
  csrf_token = csrf_protect.get_csrf_from_headers(request.headers)
  csrf_protect.validate_csrf(csrf_token)
  response.set_cookie(
    key="access_token", value="", httponly=True, samesite="none", secure=True
  )
  return {"message": "Successfully logged-out"}

@router.get("/api/user", response_model=UserInfo)
def get_user_refresh_jwt(request: Request, response: Response):
  new_token, subject = auth.verify_update_jwt(request)
  response.set_cookie(
    key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True)
  return {'email': subject}
