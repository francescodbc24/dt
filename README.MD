# Http Request

Un'applicazione per effettuare richieste HTTP e analizzare le risposte.

## Esegue con docker

Esegui il seguente comando nel terminale:

run `docker-compose -f docker-compose.yml -p dt up --build -d`

## Esegue manualmente

Assicurati di avere PostgreSQL installato sul tuo computer e crea un database, ad esempio chiamato "digitiamo".  
### backend
Dentro la cartella del backend, nel terminale, esegui i seguenti passaggi:
- python3.11 -m venv ".digitiamo"
- source .digitiamo/bin/activate
- python -m pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver 0.0.0.0:8000

### frontend
Dentro la cartella del frontend, nel terminale, esegui i seguenti passaggi:
 - run `npm install` 
 - run `npm run dev`


















