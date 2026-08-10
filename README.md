# 🏫 Ideal Commerce College — College Management & Information Portal

A modern, full-stack web platform developed for **Ideal Commerce College** to provide institutional information, online admission services, academic notices, event management, alumni information, and role-based administrative management.

The platform is built with **React.js, Node.js, Express.js, MongoDB, and Firebase** and is currently under **local development**.

---

## 📌 Project Overview

The **Ideal Commerce College Website** is designed as a centralized digital platform for students, prospective students, faculty members, staff, alumni, operators, administrators, and general visitors.

The system provides two primary experiences:

1. **Public / Student Portal** — For accessing college information, notices, departments, faculty and staff information, admission services, alumni information, events, galleries, and contact facilities.
2. **Management Portal** — For authorized Operators and Administrators to manage website content, admission applications, events, and users.

The application follows a **role-based access control (RBAC)** approach to ensure that users can access only the features permitted for their assigned roles.

---

# 🎯 Project Objectives

The main objectives of this project are to:

* Digitize important college information.
* Provide students and visitors with easy access to official information.
* Publish and manage college notices online.
* Provide detailed information about academic departments.
* Maintain faculty and staff information.
* Simplify the admission application process.
* Maintain alumni information and success stories.
* Manage college events and activities.
* Provide an online gallery for college programs and activities.
* Provide an online contact and query submission facility.
* Provide operators with centralized content-management tools.
* Provide administrators with user and role-management capabilities.
* Establish a scalable foundation for future college management features.

---

# ✨ Key Features

### Public Website

* 🏠 Home Page
* ℹ️ About College
* 📢 Notice Board
* 🎓 Department Information
* 👨‍🏫 Faculty & Staff
* 📝 Online Admission
* 🎓 Alumni Information
* 📅 Events
* 🖼️ Gallery
* 📞 Contact & Query Submission
* 🗺️ Google Maps Integration
* ⭐ Alumni Success Stories
* 👑 Esteemed Leaders

### Operator Dashboard

* 📊 Operator Dashboard
* ➕ Add Notice
* 📋 Manage Notices
* 👨‍🏫 Add Faculty
* 📋 Manage Faculty
* 👥 Add Staff
* 📋 Manage Staff
* 🖼️ Add Gallery
* 📋 Manage Gallery
* 📝 Admission Applications
* 📅 Event Management

### Admin Dashboard

* 👤 User Management
* 🔐 Role Management
* 🔄 User Status/Role Update
* 🛡️ Administrative Access Control
* 📊 Dashboard Management

---

# 🌐 Public / Student Portal

## 🏠 Home Page

The Home Page provides an overview of Ideal Commerce College and highlights important institutional information.

### Sections

* Hero / Welcome Section
* Department Information
* Latest Notices
* Upcoming Events
* Esteemed Leaders
* College Gallery
* Alumni Success Stories
* Other important college highlights

---

# ℹ️ About Page

The About Page provides detailed information about the college.

### Sections

* College History
* Department Information
* Club Information
* Executive Leadership
* Institutional Information

---

# 📢 Notice Page

The Notice Page contains all official notices and announcements published by the college.

### Features

* View all notices.
* Filter notices by category.
* View complete notice details.
* Pin important notices.
* Display pinned notices prominently.
* Organize notices by category.

### Notice Categories

* Academic
* Examination
* Administrative
* Events
* General

---

# 🎓 Departments

The website provides information about three academic departments.

### 1. Science

Contains information about the Science Department, including its academic programs and related activities.

### 2. Business Studies

Contains information about the Business Studies Department and its academic activities.

### 3. Humanities

Contains information about the Humanities Department and its academic activities.

Each department has a dedicated information section.

---

# 👨‍🏫 Faculty & Staff

The Faculty & Staff section provides information about the people working at Ideal Commerce College.

### Information May Include

* Name
* Designation
* Department
* Profile Image
* Contact Information
* Academic/Professional Information
* Other relevant details

---

# 📝 Admission

The Admission Page provides prospective students with information about the admission process.

### Features

* Minimum admission requirements
* Eligibility information
* Admission guidelines
* Online application form
* Admission application submission

Candidates can submit their applications directly through the website.

---

# 🎓 Alumni

The Alumni section contains information about former students of Ideal Commerce College.

### Features

* Alumni profiles
* Academic information
* Professional information
* Achievements
* Career information
* Alumni success stories

This section helps showcase the achievements and contributions of former students.

---

# 📅 Events

The website provides information about college events and activities.

Events can include:

* Academic Programs
* Cultural Programs
* Seminars
* Workshops
* Sports Events
* Religious Programs
* Orientation Programs
* Other Institutional Events

---

# 🖼️ Gallery

The Gallery section showcases images from college activities and events.

Gallery content may include:

* Event photographs
* Academic activities
* Cultural programs
* Sports activities
* Seminars
* Workshops
* Institutional programs

---

# 📞 Contact

The Contact Page provides visitors with multiple ways to communicate with the college.

### Features

* College location
* Google Maps
* Contact information
* Email information
* Phone information
* Office information
* Online query submission form

---

# 👨‍💼 Operator Dashboard

The Operator Dashboard is designed for authorized operators responsible for managing college website content and operational information.

---

## 📢 Notice Management

### Add Notice

Operators can create and publish new notices.

### Manage Notices

Operators can:

* View notices
* Update notices
* Delete notices
* Pin notices
* Unpin notices
* Manage notice categories

---

# 👨‍🏫 Faculty Management

## Add Faculty

Operators can add new faculty members.

Faculty information can include:

* Name
* Designation
* Department
* Profile Image
* Contact Information
* Academic Information
* Professional Information

## Manage Faculty

Operators can:

* View faculty information
* Update faculty information
* Delete faculty information

---

# 👥 Staff Management

## Add Staff

Operators can add staff members to the system.

Staff information can include:

* Name
* Designation
* Department/Section
* Profile Image
* Contact Information
* Other relevant information

## Manage Staff

Operators can:

* View staff information
* Update staff information
* Delete staff information

---

# 🖼️ Gallery Management

## Add Gallery

Operators can upload new gallery content.

Gallery items can contain:

* Title
* Description
* Date
* Event information
* Image

## Manage Gallery

Operators can:

* View gallery items
* Update gallery information
* Delete gallery items

---

# 📝 Admission Application Management

The Admission Application module allows operators to manage applications submitted through the public admission form.

### Features

* View applicant information
* Review applications
* Update application status
* Delete applications
* Track application progress

### Default Application Status

Every newly submitted application receives the default status:

```text
Submitted
```

The operator can update the application status as the admission process progresses.

### Example Statuses

```text
Submitted
Under Review
Approved
Rejected
```

---

# 📅 Event Management

The Event Management module provides an interactive calendar for managing college events.

Operators can:

* Create events
* Set event dates
* View scheduled events
* Update event information
* Delete events
* Manage upcoming activities

---

# 👑 Admin Dashboard

The Admin Dashboard provides higher-level administrative control over the platform.

The Admin has access to the public website as well as administrative functionality.

---

# 👤 User Management

Administrators can manage registered users and assign appropriate roles.

### Available Roles

| Role       | Description                        |
| ---------- | ---------------------------------- |
| `User`     | General registered user            |
| `Student`  | Student-level account              |
| `Faculty`  | Faculty-level account              |
| `Operator` | Website/content management account |
| `Admin`    | Full administrative account        |

Administrators can update a user's role when required.

For example:

```text
User → Student
Student → Faculty
Faculty → Operator
```

---

# 🔐 Role-Based Access Control

The system uses role-based authorization to control access to protected features.

| Feature               | User | Student | Faculty | Operator | Admin |
| --------------------- | :--: | :-----: | :-----: | :------: | :---: |
| Public Website        |   ✅  |    ✅    |    ✅    |     ✅    |   ✅   |
| View Notices          |   ✅  |    ✅    |    ✅    |     ✅    |   ✅   |
| Admission Application |   ✅  |    ✅    |    ✅    |     ✅    |   ✅   |
| Manage Notices        |   ❌  |    ❌    |    ❌    |     ✅    |   ✅   |
| Manage Faculty        |   ❌  |    ❌    |    ❌    |     ✅    |   ✅   |
| Manage Staff          |   ❌  |    ❌    |    ❌    |     ✅    |   ✅   |
| Manage Gallery        |   ❌  |    ❌    |    ❌    |     ✅    |   ✅   |
| Manage Admissions     |   ❌  |    ❌    |    ❌    |     ✅    |   ✅   |
| Manage Events         |   ❌  |    ❌    |    ❌    |     ✅    |   ✅   |
| Manage Users          |   ❌  |    ❌    |    ❌    |     ❌    |   ✅   |
| Manage Roles          |   ❌  |    ❌    |    ❌    |     ❌    |   ✅   |

---

# 🛠️ Technology Stack

## Frontend

* **React.js**
* **React Router**
* **Tailwind CSS**
* **JavaScript**
* **React Query / TanStack Query**
* **Axios**
* **Lucide React**

## Backend

* **Node.js**
* **Express.js**
* **JavaScript**

## Database

* **MongoDB**

## Authentication & Security

* **Firebase Authentication**
* **Firebase Admin SDK**
* Role-Based Access Control
* Protected API Routes

## Development Tools

* **Git**
* **GitHub**
* **Visual Studio Code**
* **Vite**
* **npm**

---

# 🏗️ System Architecture

The application follows a client-server architecture.

```text
                    ┌─────────────────────────┐
                    │       React Client      │
                    │                         │
                    │  Public Website         │
                    │  Student Portal         │
                    │  Operator Dashboard     │
                    │  Admin Dashboard        │
                    └────────────┬────────────┘
                                 │
                                 │ HTTP / REST API
                                 ▼
                    ┌─────────────────────────┐
                    │    Node.js + Express    │
                    │                         │
                    │ Authentication          │
                    │ Authorization            │
                    │ API Endpoints            │
                    │ CRUD Operations          │
                    └────────────┬────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
        ┌──────────────────┐          ┌──────────────────┐
        │     MongoDB      │          │     Firebase     │
        │                  │          │                  │
        │ College Data     │          │ Authentication   │
        │ Notices          │          │ User Identity    │
        │ Faculty          │          │ Token Validation │
        │ Staff            │          │                  │
        │ Gallery          │          └──────────────────┘
        │ Applications     │
        │ Events           │
        │ Users            │
        └──────────────────┘
```

---

# 📂 Core Data Modules

The backend manages several major data collections/modules.

### Users

Stores registered user information and role assignments.

### Notices

Stores college notices and announcements.

### Faculty

Stores faculty member information.

### Staff

Stores staff member information.

### Gallery

Stores college gallery information and images.

### Online Applications

Stores admission applications submitted by candidates.

### Events

Stores college events and calendar information.

---

# 🔄 Admission Application Workflow

```text
Candidate
    │
    ▼
Admission Page
    │
    ▼
Submit Application
    │
    ▼
Application Stored
    │
    ▼
Status: Submitted
    │
    ▼
Operator Reviews Application
    │
    ├── Under Review
    │
    ├── Approved
    │
    └── Rejected
```

---

# 🔄 Notice Management Workflow

```text
Operator
   │
   ▼
Add Notice
   │
   ▼
Notice Published
   │
   ├── View
   ├── Update
   ├── Pin / Unpin
   └── Delete
```

---

# 🔐 Authentication Flow

Firebase Authentication is used for user authentication.

```text
User
 │
 ▼
Firebase Authentication
 │
 ▼
Authenticated User
 │
 ▼
Firebase ID Token
 │
 ▼
React Client
 │
 ▼
Protected API Request
 │
 ▼
Express Server
 │
 ▼
Firebase Admin Token Verification
 │
 ▼
Role Verification
 │
 ▼
Authorized Resource
```

---

# 🛡️ Security

Security is an important part of the application architecture.

The system uses:

* Firebase Authentication
* Firebase Admin SDK
* ID Token Verification
* Protected API Routes
* Role-Based Authorization
* Secure CRUD Operations
* Environment Variables for Sensitive Credentials

Administrative operations are restricted to authorized users according to their assigned roles.

---

# 💻 Local Development

> **Current Status:** The project is currently running in a local development environment and has not yet been deployed to production.

---

## 📋 Prerequisites

Before running the project locally, make sure the following are installed:

* Node.js
* npm
* MongoDB
* Git
* Firebase Project
* Visual Studio Code or another preferred code editor

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project directory:

```bash
cd ideal-commerce-college
```

---

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3. Configure Firebase

Create a Firebase project and configure Firebase Authentication.

Add the required Firebase configuration to the frontend environment variables.

Example:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Never commit private credentials or sensitive environment variables to GitHub.

---

# 🗄️ Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Configure Firebase Admin SDK credentials according to your project's backend authentication setup.

---

# ▶️ Run the Application

## Start the Backend

```bash
npm run dev
```

or, depending on the project configuration:

```bash
node index.js
```

The backend will run locally, for example:

```text
https://icc-modern-server.vercel.app
```

---

## Start the Frontend

From the client directory:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🧪 Development Status

| Feature                | Status |
| ---------------------- | :----: |
| Public Website         |    ✅   |
| Home Page              |    ✅   |
| About Page             |    ✅   |
| Notice Management      |    ✅   |
| Department Information |    ✅   |
| Faculty Management     |    ✅   |
| Staff Management       |    ✅   |
| Admission Application  |    ✅   |
| Alumni Section         |    ✅   |
| Gallery Management     |    ✅   |
| Event Management       |    ✅   |
| Operator Dashboard     |    ✅   |
| Admin Dashboard        |    ✅   |
| Role Management        |    ✅   |
| Production Deployment  |    ⏳   |

> Feature status may change as development continues.

---

# 🗺️ Future Development

Several additional features can be introduced in future versions.

### Student Management

* Student Dashboard
* Student Profile
* Academic Results
* Attendance
* Class Routine
* Examination Information
* Digital Student ID

### Academic Management

* Course Management
* Subject Management
* Result Management
* Teacher Dashboard
* Academic Calendar

### Communication

* Email Notifications
* SMS Notifications
* Push Notifications
* Important Announcement Alerts

### Financial Services

* Online Payment
* Admission Fee Payment
* Tuition Fee Management
* Payment History

### Additional Features

* Advanced Search
* Multi-language Support
* Advanced Analytics
* Scholarship Management
* Online Study Materials
* Digital Certificates

---

# 📈 Project Vision

The long-term vision of the **Ideal Commerce College Management Platform** is to create a complete digital ecosystem for the institution.

The platform can gradually evolve from an informational college website into a comprehensive **College Management System (CMS)** that connects:

```text
Students
   │
   ├──────────────┐
   │              │
   ▼              ▼
Faculty         Administration
   │              │
   └──────┬───────┘
          │
          ▼
    Ideal Commerce
       College
          │
     ┌────┴────┐
     ▼         ▼
  Alumni    Applicants
```

The ultimate goal is to make college information, communication, admission, content management, and administrative operations more efficient, organized, transparent, and accessible.

---

# 👨‍💻 Project Information

**Project Name:** Ideal Commerce College Website & Management Platform

**Institution:** Ideal Commerce College

**Project Type:** Full-Stack College Website & Management System

**Development Status:** Local Development

**Frontend:** React.js

**Backend:** Node.js + Express.js

**Database:** MongoDB

**Authentication:** Firebase Authentication

**Authorization:** Role-Based Access Control

---

# 📄 License

This project is developed specifically for **Ideal Commerce College**.

The licensing and distribution policy can be defined by the institution/project owner.

---

## 🏫 Ideal Commerce College

**Connecting students, faculty, staff, alumni, applicants, and administration through a centralized digital platform.**
