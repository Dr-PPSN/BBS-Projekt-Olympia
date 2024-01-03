# BBS-Projekt-Olympia

[Pflichtenheft](https://docs.google.com/document/d/15YF4Ic9icRZP3BudYX5AiO4m8mB7QhXo)

## Installation

- NodeJS LTS
  - https://nodejs.org/en/download
- Node Package Manager
  
  ```
  npm i -g npm@10.2.0
  ``` 
- Angular CLI
  
  ``` 
  npm i -g angular@10.2.0
  ``` 
- Nest CLI

  ``` 
  npm i -g nest@10.1.18
  ``` 
- Docker Desktop (für Docker & Docker Compose)
  - https://www.docker.com/products/docker-desktop/
- VSCode Erweiterungen (optional)
  - [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
  - [NPM-Scripts](https://marketplace.visualstudio.com/items?itemName=traBpUkciP.vscode-npm-scripts)
  - [Sass (.sass only)](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)
  - [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

## Setup

2 VSCode Instanzen mit Backend & Frontend öffnen:
- ```./olympia/backend```
- ```./olympia/frontend```

In beiden Instanzen folgenden Befehl ausführen
  ``` 
  npm i
  ``` 

### Backend

1. NPM-Script ```db_start``` ausführen

    Dies startet den Postgres- und PGAdmin-Container.

    Das PGAdmin ist im Browser unter [localhost:5050](localhost:5050) erreichbar. Die Anmeldedaten sind in den Konstanten in der ```.env``` im Rootverzeichnis zu finden:
    - PGAdmin:
      - Email Adress: ```PGADMIN_DEFAULT_EMAIL```
      - Password: ```PGADMIN_DEFAULT_PASSWORD```
    - DB Server:
      - Password für User 'olympia': ```POSTGRES_PASSWORD```

2. NPM-Script ```start:dev``` ausführen

### Frontend

1. NPM-Script ```serve``` ausführen

    Die Website ist unter [localhost:4200](localhost:4200) erreichbar.


## Debugging

In VSCode muss das Feature ```Debug: Toggle Auto Attach``` in den Commands (```STRG``` + ```SHIFT``` + ```P```) auf ```Only with Flag``` eingestellt sein. 

Dann einfach das Script ```start:debug``` ausführen.