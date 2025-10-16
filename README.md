# Project-Manager

A web app to manage and track projects, tasks, users and reports.

---

## Overview

Project-Manager is a tool for teams to create, assign, and monitor projects and tasks, view reports, manage users, and gain insights. It enables role-based access control, dashboards, analytics, and a clean user experience for planning and execution.

The aim is to provide a robust yet flexible project management solution tailored to small & medium teams, with clear metrics, user stories, and extensible architecture (as laid out in the PRD).  

---

## Features

Some key features:

- Create, edit, and delete projects and tasks  
- Assign tasks to users  
- Status tracking (e.g. To Do, In Progress, Done)  
- Role-based permissions (Admin, Manager, Member)  
- Audit logs, activity tracking  

(Refer to PRD for the full list of functional requirements, priorities, and non-goals.)

---

## Architecture & Tech Stack

This project is structured using:

- **Backend**: [ Node.js + Express ]  
- **Database**: [ MongoDB ]  
- **Auth / Permissions**: e.g. JWT, role middleware  

It is designed to be modular, with separation of concerns (API, business logic, data access).

---

## Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/himanshusssingh/Project-Manager.git
   cd Project-Manager

2. **Install dependencies**

   npm install  
   
3. **Configure environment variables**

   Create .env files with required keys (DB connection, JWT secret, etc).

4. **Start the app**

   # in backend
   npm run dev  


5.  **Open in browser**
   Visit http://localhost:3000 (or whatever port) to explore.

---

## Configuration

    You should set up environment variables as follows (example):
    
    ```bash
    PORT=
    CORS_ORIGIN=
    MONGO_URI=
    
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRY=
    
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRY=
    
    MAILTRAP_SMTP_HOST=
    MAILTRAP_SMTP_PORT=
    MAILTRAP_SMTP_USER=
    MAILTRAP_SMTP_PASS=
    
    FORGOT_PASSWORD_REDIRECT_URL=
    ```

---    

## Permissions & Roles

   Roles defined in PRD:
   
   - Admin: full control — manage users, manage projects, see all data
   - Manager: can create and manage projects/tasks under their purview
   - Member: can view and update tasks assigned to them, update status, comment, etc.

   Each route and UI element must respect role-based access as specified.

---

## Contributing

    Fork the repository
    
    - Create a feature branch: git checkout -b feature/your-feature
    - Commit changes: git commit -m "Add feature"
    - Push branch and open a PR
    - Ensure tests pass, write documentation for changes
    
    Please adhere to code style, write tests, and update README / docs as needed.

---

## License

This project is licensed under the MIT License.

---

## Author

[Himanshu Singh](https://himanshusssingh.github.io/)
