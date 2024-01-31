from sqlalchemy import Column, String, Integer, DATETIME, FetchedValue, TEXT, Float, Boolean
from database import Base

class SaleTable(Base):
  __tablename__ = 'sales'
  id = Column(Integer, primary_key=True, autoincrement=True)
  sales = Column(Float, nullable=False)
  year = Column(Integer, nullable=False)
  department = Column(String(254), nullable=False)
  created_at = Column(DATETIME, FetchedValue())
  updated_at = Column(DATETIME, FetchedValue())

class UserTable(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True, autoincrement=True)
  email = Column(String(254), nullable=False)
  password = Column(String(128), nullable=False)
  is_active = Column(Boolean, default=True)
  created_at = Column(DATETIME, FetchedValue())
  updated_at = Column(DATETIME, FetchedValue())
