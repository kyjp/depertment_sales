from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routers import route_sale, route_auth
from schemas import SuccessMsg, CsrfSettings
from fastapi_csrf_protect import CsrfProtect
from fastapi_csrf_protect.exceptions import CsrfProtectError
from database import ENGINE, Base

app = FastAPI()
app.include_router(route_sale.router)
app.include_router(route_auth.router)
origins = ['http://localhost:3000', 'http://localhost:9004']
app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=["*"]
)

# Base.metadata.create_all(ENGINE)

@CsrfProtect.load_config
def get_csrf_config():
  return CsrfSettings()

@app.exception_handler(CsrfProtectError)
def csrf_protect_exception_handler(request: Request, exc: CsrfProtectError):
  return JSONResponse(
    status_code=exc.status_code,
    content={'detail': exc.message}
  )

@app.get("/", response_model=SuccessMsg)
def read_root():
  return {"message": "Welcome to Fast API"}
