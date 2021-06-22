# Simple CRUD
Simple CRUD example using Java Spring Boot and Angular.

## Requirements to run
* PostgreSQL
* JDK 11 or higher
* NodeJS and NPM

## Setup
### Backend Setup
1. Configure the ProstgreSQL database:
    1. Using a bash terminal, access the postgresql CLI on the postgres database:
        1. `psql postgres`
    2. Create the user scrud_user with password scrud_pass for the postgres database:
        1. `CREATE ROLE scrud_user LOGIN SUPERUSER CREATEDB PASSWORD 'scrud_pass';`
    3. Exit the postgresql CLI:
        1. `exit`
        
### Frontend Setup
1. Download the necessary node packages:
    1. Using a bash terminal, go to the `frontend/` folder of this project and execute:
        1. `npm install`
        
## Run
1. First execute the backend:
    1. Using a bash terminal, go to the `backend/` folder of this project and execute:
        1. `./gradlew bootRun`
2. Then execute the frontend:
    1. Using a bash terminal, go to the `frontend/` folder of this project and execute:
        1. `npm run serve`
3. Finally, access the page navigating to `http://localhost:8000` on your web browser.
