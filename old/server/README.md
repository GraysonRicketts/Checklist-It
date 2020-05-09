# TODO:
- [x] instantiate services and run locally
- [x] add user model
- [x] add auth
    - [x] encrypt password
    - [x] create user
    - [x] JWT token authentication
- [x] secure routes
    - [x] update schema
    - [x] add JWT infront of route
    - [x] add authorization
- [ ] setup DB
    - [x] get postgres on computer
    - [x] create seeder / setup file
    - [x] connect app to db
    - [x] persistent store user model info in db
    - [x] persistent store for signup / login
    - [x] persistent store template
    - [x] persistent store for checklist
- [ ] add endpoint to mark tasks completed
- [ ] get templates when get user
- [ ] get checklists when get user
- [ ] add ability to modify template tasks
- [ ] checkout using Morgan for logging
- [ ] create postman script so don't have to copy and paste token
- [ ] add endpoint to complete tasks in checklist
- [ ] setup recreatable environment (e.g. virtualenv for JS)
- [ ] dockerize
- [ ] deploy
    - [ ] domain
    - [ ] hosting service
    - [ ] CI/CD pipeline
- [ ] README update
    - [ ] install
    - [ ] setup
    - [ ] blurb
- [ ] google authentication
- [ ] add ability to change template name
- [ ] add ability to change checklist name
- [ ] add soft deletion
- [ ] add ability to add or remove tasks from checklist
- [ ] allow checklists to be created without template

## Setup

Run command to seed DB
```(bash)
psql -U sde -h localhost -d checklist-it -f ./src/config/seeder.sql
```