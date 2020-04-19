# TODO:
- [x] instantiate services and run locally
- [x] add user model
- [ ] add auth
    - [x] encrypt password
    - [x] create user
    - [x] JWT token authentication
- [x] secure routes
    - [x] update schema
    - [x] add JWT infront of route
    - [x] add authorization
- [ ] checkout using Morgan for logging
- [ ] setup DB
    - [x] get postgres on computer
    - [x] create seeder / setup file
    - [x] connect app to db
    - [ ] persistent store for signup / login
    - [ ] persistent store template
    - [ ] persistent store for checklist
    - [ ] persistent store user model info in db
        - [ ] get templates when get user
        - [ ] get checklists when get user 
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
- [ ] change template name
- [ ] change checklist name
- [ ] modify template
- [ ] delete checklist
- [ ] google authentication

## Setup

Run command to seed DB
```(bash)
psql -U sde -h localhost -d checklist-it -f src/config/seeder.sql
```