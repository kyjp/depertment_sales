from urllib import request
from fastapi import APIRouter
from fastapi import Request, Response, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from schemas import Sale, SaleBody, SuccessMsg
from starlette.status import HTTP_201_CREATED
from typing import List
from fastapi_csrf_protect import CsrfProtect
from auth_utils import AuthJwtCsrf
from model import SaleTable
from decouple import config
from typing import Union
from bson import ObjectId
from auth_utils import AuthJwtCsrf
from database import session

router = APIRouter()
auth = AuthJwtCsrf()

def sale_serializer(sale) -> dict:
  return {
    "id": sale.id,
    "department": sale.department,
    "sales": sale.sales,
    "year": sale.year
  }

def user_serializer(user) -> dict:
  return {
    "id": str(user["_id"]),
    "email": user["email"],
  }

async def db_create_sale(data: dict) -> Union[dict, bool]:
  year = data.year
  sales = data.sales
  department = data.department
  db_sale = SaleTable(year=year, sales=sales, department=department)
  session.add(db_sale)
  session.commit()
  new_sale = session.query(SaleTable).filter(SaleTable.id == db_sale.id).first()
  if new_sale:
    return sale_serializer(new_sale)
  return False

async def db_get_sales() -> list:
  sale = session.query(SaleTable).all()
  sales = []
  for item in sale:
    sales.append(sale_serializer(item))
  return sales

async def db_get_single_sale(id:str) -> Union[dict, bool]:
  sale = session.query(SaleTable).filter(SaleTable.id == id).first()
  return sale_serializer(sale)

async def db_get_year_sale(year:str) -> Union[dict, bool]:
  sale = session.query(SaleTable).filter(SaleTable.year == year).all()
  sales = []
  for item in sale:
    sales.append(sale_serializer(item))
  return sales

async def db_update_sale(id:str, data: dict) -> Union[dict, bool]:
  target_sale = session.query(SaleTable).filter(SaleTable.id == id).first()
  target_sale.year = data.year
  target_sale.sales = sale.sales
  target_sale.department = sale.department
  session.commit()
  res = session.query(SaleTable).filter(SaleTable.id == target_sale.id).first()
  return sale_serializer(res)

async def db_delete_sale(id: str) -> bool:
  target_sale = session.query(SaleTable).filter(SaleTable.id == id).first()
  session.delete(target_sale)
  session.commit()
  sale = session.query(SaleTable).filter(SaleTable.id == id).first()
  if not sale:
    return True
  return False

@router.post("/api/sales", response_model=Sale)
async def create_sale(request: Request, response: Response, data: SaleBody, csrf_protect: CsrfProtect = Depends()):
  new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
  res = await db_create_sale(data)
  response.status_code = HTTP_201_CREATED
  response.set_cookie(
    key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True
  )
  if res:
    return res
  raise HTTPException(status_code=404, detail="Create task failed")

@router.get("/api/sales", response_model=List[Sale])
async def get_sales(request: Request):
  auth.verify_jwt(request)
  res = await db_get_sales()
  return res

@router.get("/api/sales/{year}", response_model=List[Sale])
async def get_year_sale(year: str, request: Request, response: Response):
  new_token, _ = auth.verify_update_jwt(request)
  res = await db_get_year_sale(year)
  response.set_cookie(
    key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True
  )
  print(res)
  if res:
    return res
  raise HTTPException(status_code=404, detail=f"Task of ID:{id} doesn't exist")

@router.put("/api/sales/{id}", response_model=Sale)
async def update_sale(id: str, data: SaleBody, request: Request, response: Response, csrf_protect: CsrfProtect = Depends()):
  new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
  sale = jsonable_encoder(data)
  res = await db_update_sale(id, sale)
  response.set_cookie(
    key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True
  )
  if res:
    return res
  raise HTTPException(status_code=404, detail=f"Update task failed")

@router.delete("/api/sales/{id}", response_model=SuccessMsg)
async def update_sale(id: str, request: Request, response: Response, csrf_protect: CsrfProtect = Depends()):
  new_token = auth.verify_csrf_update_jwt(request, csrf_protect, request.headers)
  res = await db_delete_sale(id)
  response.set_cookie(
    key="access_token", value=f"Bearer {new_token}", httponly=True, samesite="none", secure=True
  )
  if res:
    return {'message': 'Successfully deleted'}
  raise HTTPException(status_code=404, detail=f"Delete task failed")
