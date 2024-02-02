FROM postgres:14.9-alpine

LABEL description="Postgres image" version="v14.9-alpine"

COPY --chown=postgres:postgres postgresql.conf pg_hba.conf /etc/

EXPOSE 5432