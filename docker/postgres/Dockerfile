FROM postgres:14.9-alpine

LABEL description="Postgres image" version="v14.9-alpine"

COPY postgresql.conf pg_hba.conf /etc/
COPY initdb.sql /docker-entrypoint-initdb.d/
EXPOSE 5432