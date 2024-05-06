# typescript-training
## Overview
- This document provides planning for applying TypeScript to the previous Javascript practice.
- Design: [Figma](https://www.figma.com/file/DWYotBgel4W4TWCjTHkzrX/Food-Blog-Design?node-id=4%3A2987&mode=dev)
## Team size
- 1 developer (Diep Phan)
## Timeline
- 6 days (06 May 2024 - 14 May 2024)
## Technical and tools note
- HTML/CSS
- Javascript
- Typescript
- Chrome browser
- Visual studio code
## Support browser
- Version 124.0.6367.119 (64-bit)
## Target
- Apply knowledge of HTML5/CSS3/Javascript/Typescript
- Understand and apply MVC pattern
- Understand and apply DOM manipulation, form validation
## Requirement
- Admin:
    - Sign In with admin account:
        - email: "user1@example.com"
        - password: "password1"
    - View list of users, edit and delete users
    - View recipe list, create, edit and delete recipes
    - Render data to the dashboard and app
- User:
    - Sign In with a registered account on json-server or create a new account
    - View a list of recipes by rating
    - See detailed recipes
## Task management:
- [Project GitHub:](https://github.com/users/ngocdiepphan/projects/7/views/1) 
## Devices
- Desktop
- Tablet
- Mobile
## The relationship database diagram
- [Database diagram](https://drive.google.com/drive/folders/13UJgB82MHC9Aes-CEPKtDF4rLQdAlagT)
## Run app
- Step 01: Clone repository with HTTPS:
```
https://github.com/ngocdiepphan/typescript-training.git
```
- Step 02: Move to folder which just cloned in your computer:
```
 cd typescript-training/
```
- Step 03: Change to branch feature/typescript-practice:
```
git checkout feature/typescript-practice
```
- Step 04: Next open folder
```
 cd practice/
```
- Step 05: Install dependencies:
```
pnpm install
```
- Step 06: Install typescript:
```
pnpm install typescript --save-dev
```
- Step 07: Finally run with:
```
pnpm start
```
## Run server
- Step 01: Move to folder which json-server in your computer:
```
 cd json-server
```
- Step 02: Install json-server
```
 pnpm install json-server
```
- Step 03: Run
```
pnpm start
```
