FROM mysql:8.0.27

ENV MYSQL_DATABASE=crud \
  MYSQL_USER=admin \
  MYSQL_PASSWORD=password \
  MYSQL_ROOT_PASSWORD=root \
  TZ=Asia/Tokyo

COPY ./my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf
