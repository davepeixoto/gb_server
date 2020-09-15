# Instalation
## Global
- yarn add express
- yarn add uuidv4
- yarn add date-fns
- yarn add typeorm pg   ##pg é  o driver do postgres
- yarn add reflect-metadata    
- yarn add bcryptjs   
- yarn add jsonwebtoken
- yarn add multer
- yarn add express-async-errors
- yarn add tsyringe   

## Development
- yarn add typescript -D
- yarn add @types/express -D
- yarn add ts-node-dev -D
- yarn add eslint@6.8.0 -D
- yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.21.2 @typescript-eslint/parser@latest -D
- yarn add eslint-import-resolver-typescript -D
- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
- yarn add -D @types/bcryptjs 
- yarn add -D @types/jsonwebtoken 
- yarn add -D @types/multer   
- yarn add tsconfig-paths -D   
- yarn add jest -D
- yarn add ts-jest -D
- yarn add @types/jest -D  

# Commands
- yarn tsc --init
- yarn eslint --init
- yarn jest --init
- yarn typeorm migration:create -n CreateAppointment
- yarn typeorm migration:create -n CreateUsers     
- yarn typeorm migration:create -n AlterAppointmentsField      
- yarn typeorm migration:create -n AddAvatarFieldToUsers
- yarn typeorm migration:run
- yarn typeorm migration:revert
- yarn typeorm migration:show

# Scripts
  "scripts": {
    "build": "tsc",
    "dev:server": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts",
    "start": "ts-node  src/shared/infra/http/server.ts",
    "typeorm": "ts-node-dev -r tsconfig-paths/register  ./node_modules/typeorm/cli.js"
  },


  # Docker Images
   docker run --name gobarber2_postgresql -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres


  # Links
  Code Pattern
  https://www.notion.so/Padr-es-de-projeto-com-ESLint-Prettier-e-EditorConfig-0b57b47a24724c859c0cf226aa0cc3a7


  Repository Pattern
  https://www.notion.so/Repository-service-e-patterns-82419cceb11c4c4fbbc055ade7fb1ac5


  Docker 
  https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2


  MD5 Online
  http://www.md5.cz/

  


## Specifications

  # Password Recovery

  **FR**
  - User should be able to recovery password by e-mail;
  - User should be able to receive a intructions mail to password recover;
  - User should be able to reset password;

  **NFR**
  - System uses Mailtrap to test e-mail delivery in dev environment;
  - System will use Amazon SES to e-mail delivery in prod environment;
  - E-mail delivering should work in background

  **BR**
  - E-mail link should expire in 2 hours;
  - User must confirm new password;


  # Profile Update
  
  **FR**
  - User should be able to update name, email and password;

  **BR**
  - User shouldn't be able to change email to a existent email
  - To updating password user must insert old password
  - User must confirm new password; 


  # Provider painel
  
  **FR**
  - Provider should be able to list all of appointments in specif day;
  - Provider should receive a notification when new appointmente has been created;
  - Provider should be able to see all of notifications unread

  **NFR**
  - All of appointments from provider that current day should be save on cache
  - All of notifications should be save on MongoDB
  - All of notifications should be send in real-time through Socket.io;

  **BR**
  - All of notifications should have read/unread status to sinalize a provider;


  # Services Schedules
  
  **FR**
  - User should be able to list providers;
  - User should be able to list available days of providers
  - User should be able to list specif appointment of one provider
  - User should be able to create any appointment

  **NFR**
  - Providers list should be saved on cache; 

  **BR**
  - Each appointment during 1 hour;
  - All of appointments are available between 8:00AM to 6:00PM
    (First schedule at 8 am and last at 5 pm);
  - User shouldn't schedule in unavailable date;
  - User shouldn't schedule in the past;
  - User shouldn't schedule to himself as provider