FROM python:3.11

ENV PYTHONUNBUFFERED=1
WORKDIR /app
# Copy the application files into the image
COPY . /app/
# Required to install mysqlclient with Pip
RUN apt-get update

# Install pipenv
RUN pip install --upgrade pip 
RUN python3 -m pip install -r requirements.txt

ENTRYPOINT ["/app/docker-entrypoint.sh"]

EXPOSE 8000