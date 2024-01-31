from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

# 接続したいDBの基本情報を設定
user_name = "admin"
password = "password"
host = "db:3306"
database_name = "crud"

DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
  user_name,
  password,
  host,
  database_name,
)

# DBとの接続
ENGINE = create_engine(
  DATABASE,
  encoding="utf-8",
  echo=True
)

session = scoped_session(
  sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=ENGINE
  )
)

Base = declarative_base()
Base.query = session.query_property()
