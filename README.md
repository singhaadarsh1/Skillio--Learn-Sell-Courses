# 🎓 Skillio — Online Learning Platform

### Full-Stack MERN Application with Docker, CI/CD and AWS EC2 Deployment

<p align="left">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-REST_API-000000?logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/AWS-EC2%20%7C%20SSM%20%7C%20OIDC-FF9900?logo=amazonaws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" />
</p>

---

## 🌐 Live Application

**Live URL:** http://16.170.158.130/

Skillio is deployed on AWS EC2 using Docker Compose and an automated GitHub Actions CI/CD pipeline.

> Note: The application currently uses an EC2 public IP address. The URL may change if the instance's public IP changes.

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Screenshots](#-screenshots)
4. [Technology Stack](#-technology-stack)
5. [Application Architecture](#-application-architecture)
6. [Docker Architecture](#-docker-architecture)
7. [CI/CD Architecture](#-cicd-architecture)
8. [Automated Deployment Workflow](#-automated-deployment-workflow)
9. [AWS Deployment](#-aws-deployment)
10. [Project Structure](#-project-structure)
11. [Database Models](#-database-models)
12. [API Endpoints](#-api-endpoints)
13. [Getting Started — Local Development](#-getting-started--local-development)
14. [Running with Docker](#-running-with-docker)
15. [Running Published Docker Hub Images](#-running-published-docker-hub-images)
16. [Environment Variables](#-environment-variables)
17. [Docker Commands](#-docker-commands)
18. [Git and GitHub Workflow](#-git-and-github-workflow)
19. [Authentication and Authorization](#-authentication-and-authorization)
20. [Learning Progress Tracking](#-learning-progress-tracking)
21. [Security Considerations](#-security-considerations)
22. [Future Improvements](#-future-improvements)
23. [Learning Outcomes](#-learning-outcomes)
24. [Author](#-author)
25. [License](#-license)

---

## 🚀 Project Overview

Skillio is a full-stack online learning platform built using the MERN stack, designed to make digital learning more accessible, organized and engaging.

It enables learners to:

- Explore courses across different categories.
- Discover relevant learning content.
- Enroll in available courses.
- Access course lessons.
- Track their learning progress through a personalized dashboard.

The platform also provides a dedicated administrative interface for managing course listings, updating course information and maintaining course content.

The application uses JWT-based authentication, role-specific access control and MongoDB-backed data management.

### Deployment and DevOps

Beyond application development, Skillio was deployed on AWS EC2 and progressively enhanced with Docker and automated CI/CD.

The deployment journey included:

- Initial deployment of the MERN application on AWS EC2.
- Automated deployment using GitHub Actions, AWS OIDC and AWS Systems Manager.
- Containerization of the frontend and backend using Docker.
- Multi-container management using Docker Compose.
- Docker image publishing to Docker Hub.
- Automated EC2 deployment through AWS Systems Manager.
- Container health verification and rollback handling.
- Nginx reverse proxy configuration for public access.

---

## ✨ Features

### 1. User Authentication

- User registration and sign-in.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected user-specific routes.
- User profile retrieval.
- Password change functionality.

### 2. Course Discovery

- Browse courses through a dedicated course interface.
- Explore courses by category.
- View course information, including descriptions, prices and images.
- Open individual course detail pages.

### 3. Course Enrollment

- Enroll in available courses.
- Associate course purchases with authenticated users.
- Prevent duplicate enrollments using application-level checks and a compound database index.
- Retrieve enrolled courses for the current user.

**Note:** Enrollment currently records a purchase in the database. A payment gateway and real payment processing are not implemented.

### 4. Learning Dashboard

- View courses associated with the logged-in learner.
- Access enrolled course content.
- View available lessons.
- Mark lessons as completed.
- Store completed lesson information in MongoDB.

### 5. Administrator Dashboard

- Administrator sign-in.
- Protected administrative routes.
- Create courses.
- Update existing course information.
- Delete courses.
- Retrieve courses created by the authenticated administrator.
- Associate courses with their creator.

Public administrator registration is disabled in the current implementation.

### 6. User Profile and Settings

- View account information.
- Change the account password.
- Access protected profile and settings pages.

### 7. Frontend Navigation and User Experience

- React component-based architecture.
- Client-side routing with React Router.
- Separate pages for authentication, course discovery, learning, profile management and administration.
- Reusable interface components.
- Responsive styling using Tailwind CSS.
- Interactive interface elements and icons using Lucide React.

---

## Screenshots

Screenshots of the application help visitors understand its interface without running the project locally.

Add screenshots of the actual running application here.

### Home Page

<!-- Replace with your actual screenshot -->

![Skillio Home Page](docs/homepage1.png)
![Skillio Home Page](<docs/Screenshot 2026-10-09 234719.png>)
![Skillio Home Page](<docs/Screenshot 2026-10-09 234733.png>)



### Course Listing

<!-- Replace with your actual screenshot -->

![Skillio Course Listing](<docs/Screenshot 2026-10-09 235239.png>)

### Authentication

<!-- Replace with your actual screenshot -->

![Skillio Sign In](<docs/Screenshot 2026-10-09 235349.png>)

### Course Details

<!-- Replace with your actual screenshot -->

![Skillio Course Details](<docs/Screenshot 2026-10-10 000115.png>)
![Skillio Course Details](<docs/Screenshot 2026-10-10 000136.png>)



### Learning Dashboard

<!-- Replace with your actual screenshot -->

![Skillio Learning Dashboard](<docs/Screenshot 2026-10-10 000115.png>)
![Skillio Learning Dashboard](<docs/Screenshot 2026-10-10 000136.png>)


### Administrator Dashboard

<!-- Replace with your actual screenshot -->

![Skillio Admin Dashboard](<docs/Screenshot 2026-10-09 235756.png>)
![Skillio Admin Dashboard](<docs/Screenshot 2026-10-09 235831.png>)
![Skillio Admin Dashboard](<docs/Screenshot 2026-10-09 235846.png>)



---

### CI/CD and Deployment Screenshots

Add screenshots of the actual successful deployment process here.

**GitHub Actions — CI Pipeline, Docker Image Publishing , EC2 Deployment**

![GitHub Actions CI Pipeline, Docker Image Publishing , EC2 Deployment](<docs/Screenshot 2026-11-08 003505.png>)

****


**AWS EC2 — Running Docker Containers**

![Docker Containers on EC2](<docs/Screenshot 2026-11-08 143817.png>)

> Replace these deployment screenshot paths with your actual image filenames. Do not commit screenshots containing credentials, tokens, database URLs or other secrets.

---

## 🛠 Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based user interface |
| Vite | Frontend development server and build tooling |
| React Router | Client-side navigation |
| Axios | HTTP requests to backend API |
| Tailwind CSS | Interface styling |
| Lucide React | Icons |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and request handling |
| MongoDB | Application database |
| Mongoose | Database schemas, models and queries |
| JSON Web Token | Authentication |
| bcrypt | Password hashing |
| Zod | Request data validation |
| dotenv | Environment variable configuration |
| CORS | Cross-origin request configuration |

### DevOps and Cloud Infrastructure

| Technology | Purpose |
|---|---|
| Docker | Application containerization |
| Docker Compose | Multi-container application management |
| Docker Hub | Docker image registry |
| Git | Version control |
| GitHub | Source code hosting and collaboration |
| GitHub Actions | Automated CI/CD workflows |
| AWS EC2 | Cloud application hosting |
| AWS IAM | Identity and access management |
| AWS OIDC | Secure authentication from GitHub Actions to AWS |
| AWS STS | Temporary AWS credentials |
| AWS Systems Manager (SSM) | Remote deployment command execution |
| Nginx | Reverse proxy and frontend traffic routing |
| PM2 | Process management used in the initial deployment |
| MongoDB Atlas | Managed MongoDB database |

### Development Tools

- Visual Studio Code
- WSL Ubuntu
- Git Bash
- Docker Engine
- Docker Compose
- Postman or an equivalent HTTP client

---

## 🏗 Application Architecture

Skillio follows a client-server architecture.

The React frontend communicates with the Express backend through HTTP requests. The backend validates incoming requests, applies authentication middleware where required, interacts with MongoDB through Mongoose and returns JSON responses.

### High-Level Application Architecture

```text
                 LEARNER / ADMIN
                       |
                       v
                React Frontend
              React Router + Axios
                       |
                       | HTTP Requests
                       v
                Express REST API
                       |
              +--------+--------+
              |                 |
              v                 v
       Authentication     Request Validation
          Middleware          (Zod)
              |                 |
              +--------+--------+
                       |
                       v
                 Route Handlers
                       |
                       v
                  Mongoose ODM
                       |
                       v
                    MongoDB
                       |
                       v
                 JSON Response
                       |
                       v
                 React UI Update
```

### Example: Course Enrollment Flow

1. A learner opens a course and selects the enrollment button.
2. The React component sends an HTTP POST request containing the course ID.
3. The Express backend receives the request at the course purchase endpoint.
4. Authentication middleware verifies the learner's JWT.
5. The backend checks whether the course exists.
6. The backend checks whether the learner has already enrolled.
7. The purchase record is saved in MongoDB.
8. The API returns a response indicating success or failure.
9. The frontend displays the result and refreshes the learner's course list.

---

## 🐳 Docker Architecture

Skillio uses Docker to package and run the frontend and backend as separate containers.

### Why Docker?

Docker packages an application and its runtime dependencies into an image. This helps maintain a consistent execution environment across development and deployment machines.

Instead of configuring the backend and frontend independently on every machine, Docker allows them to run using predefined images and container configurations.

### Docker Components Used

| Component | Purpose |
|---|---|
| Dockerfile | Instructions to build an application image |
| Docker Image | Packaged application and dependencies |
| Docker Container | Running instance of an image |
| Docker Compose | Defines and manages multiple services |
| Docker Network | Allows frontend and backend containers to communicate |
| Docker Hub | Stores and distributes published images |
| `.dockerignore` | Excludes unnecessary files from build context |

### Skillio Docker Services

Skillio runs two primary Docker services:

**1. Backend**

- Built using Node.js and Express.
- Runs inside a Node.js container.
- Connects to MongoDB Atlas.
- Listens on container port `3000`.

**2. Frontend**

- Built using React and Vite.
- Production assets are served through Nginx.
- Nginx listens on container port `80`.
- Proxies API requests to the backend service.

### Docker Compose Networking

The frontend and backend communicate through the Docker Compose network.

The frontend Nginx configuration forwards API requests to:

```nginx
location /api/ {
    proxy_pass http://backend:3000;
}
```

Here, `backend` is the Docker Compose service name, and `3000` is the backend container port.

### Docker Port Mapping

The production Compose configuration uses localhost-only host port mappings:

| Service | EC2 Host Port | Container Port |
|---|---:|---:|
| Frontend | 8081 | 80 |
| Backend | 3001 | 3000 |

Example:

```yaml
ports:
  - "127.0.0.1:8081:80"
```

This means EC2 port `8081` forwards traffic to port `80` inside the frontend container.

Similarly:

```yaml
ports:
  - "127.0.0.1:3001:3000"
```

This maps EC2 port `3001` to backend container port `3000`.

The `127.0.0.1` binding ensures these host ports are accessible only from the EC2 machine itself, rather than directly from the public internet.

### Docker Restart Policy

The services use:

```yaml
restart: unless-stopped
```

This allows Docker to restart containers after unexpected process exits and Docker daemon restarts, unless the containers have been explicitly stopped.

---

## 🔄 CI/CD Architecture

Skillio uses GitHub Actions to automate testing, Docker image building, publishing and deployment to AWS EC2.

### What is CI/CD?

**Continuous Integration (CI)** automatically checks code changes through processes such as dependency installation, linting and builds.

**Continuous Delivery/Deployment (CD)** automates the process of preparing and deploying application updates to the target environment.

### Skillio CI/CD Architecture

```text
                DEVELOPER
                    |
                    v
              Push to GitHub
                    |
                    v
          +----------------------+
          |   GitHub Actions     |
          |      CI Workflow     |
          +----------------------+
                    |
          Backend + Frontend Checks
                    |
                    v
          +----------------------+
          | Docker Build & Push  |
          +----------------------+
                    |
                    v
                Docker Hub
          +----------------------+
          | Backend Image        |
          | Frontend Image       |
          +----------------------+
                    |
                    v
             AWS OIDC Authentication
                    |
                    v
                  AWS STS
                    |
                    v
          AWS Systems Manager (SSM)
                    |
                    v
                AWS EC2
                    |
                    v
             Docker Compose
                    |
                    v
           Pull and Run New Images
                    |
                    v
            Container Health Checks
                    |
                    v
              DEPLOYMENT COMPLETE
```

### GitHub Actions Workflows

Skillio uses three main workflows.

#### 1. Skillio CI — `backend-ci.yml`

This workflow validates backend and frontend code.

**Backend checks:**

- Checkout source code.
- Set up Node.js.
- Install dependencies.
- Check backend JavaScript syntax.
- Run backend linting.

**Frontend checks:**

- Install frontend dependencies.
- Run ESLint.
- Build the production frontend.

The Docker publishing workflow depends on successful completion of this CI workflow on the `main` branch.

#### 2. Skillio Docker Build and Publish — `docker-publish.yml`

This workflow builds and publishes Docker images after successful CI on `main`.

Main operations:

1. Checkout the source commit associated with the successful CI run.
2. Set up Docker Buildx.
3. Authenticate with Docker Hub using GitHub repository secrets.
4. Build the backend Docker image.
5. Build the frontend Docker image.
6. Push both images to Docker Hub.

Published images:

```text
aadarsh0124/skillio-backend
aadarsh0124/skillio-frontend
```

Images are published with:

- A short commit SHA tag.
- A `latest` tag.

Example:

```text
aadarsh0124/skillio-backend:latest
aadarsh0124/skillio-backend:<commit-sha>

aadarsh0124/skillio-frontend:latest
aadarsh0124/skillio-frontend:<commit-sha>
```

Commit-specific tags help identify the source version associated with a Docker image.

#### 3. Skillio Docker Deploy to EC2 — `docker-deploy.yml`

This workflow runs after successful completion of the Docker publishing workflow on `main`.

It also supports manual workflow dispatch from the `main` branch.

Its responsibilities include:

- Configure AWS credentials through OIDC.
- Verify the AWS identity.
- Send deployment commands using AWS Systems Manager.
- Synchronize the EC2 application repository to the exact source commit.
- Pull the matching Docker images.
- Start the updated Docker Compose services.
- Verify container health and API availability.
- Attempt rollback if deployment fails.

---

## 🔐 Secure AWS Authentication

Skillio uses GitHub Actions OIDC to authenticate with AWS.

Instead of storing long-lived AWS access keys in GitHub secrets, GitHub Actions obtains an identity token and uses AWS STS to assume an IAM role.

### Authentication Flow

```text
GitHub Actions
      |
      v
GitHub OIDC Identity Token
      |
      v
AWS IAM Role Trust Policy
      |
      v
AWS STS AssumeRoleWithWebIdentity
      |
      v
Temporary AWS Credentials
      |
      v
AWS Systems Manager
      |
      v
EC2 Deployment
```

### Components

| Component | Responsibility |
|---|---|
| GitHub OIDC | Provides an identity token for the GitHub Actions workflow |
| AWS IAM | Defines the role and permissions |
| AWS STS | Issues temporary credentials after role assumption |
| AWS SSM | Sends remote commands to the EC2 instance |
| EC2 Instance Profile | Allows EC2 itself to communicate with AWS services such as SSM |

The IAM trust policy restricts the GitHub repository and permitted `main` branch identity.

The deployment role has permissions for the required SSM operations.

The EC2 instance is registered as an SSM managed node using its instance profile and SSM Agent.

### Why AWS SSM Instead of SSH?

The initial deployment used SSH-based access.

The Docker deployment uses AWS Systems Manager to send commands to EC2.

This avoids depending on a GitHub Actions SSH connection for deployment and allows AWS IAM to control command execution.

---

## 🚀 Automated Deployment Workflow

When a new change is merged into `main`, the deployment process follows this sequence.

### Step 1 — Code Push

A developer commits and pushes changes to GitHub.

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Step 2 — Continuous Integration

GitHub Actions runs the CI workflow.

Backend and frontend checks must succeed before Docker image publishing proceeds.

### Step 3 — Docker Image Building

GitHub Actions builds updated backend and frontend images using their respective Dockerfiles.

### Step 4 — Docker Hub Publishing

The images are published to Docker Hub using the configured repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

### Step 5 — AWS Authentication

The deployment workflow uses GitHub OIDC to assume the configured AWS IAM role.

AWS STS provides temporary credentials.

### Step 6 — SSM Deployment Command

GitHub Actions sends the deployment command to the configured EC2 instance through AWS Systems Manager.

### Step 7 — Repository Synchronization

The deployment script fetches the GitHub repository and checks out the exact commit used to build the Docker images.

This keeps the Compose configuration aligned with the deployed image version.

### Step 8 — Docker Image Pulling

EC2 pulls the corresponding Docker Hub images.

```bash
docker compose pull
```

### Step 9 — Container Deployment

Docker Compose starts the updated services.

```bash
docker compose up -d --no-build
```

### Step 10 — Health Verification

The deployment script checks:

- Backend container health.
- Frontend container health.
- API availability through the frontend Nginx proxy.

If deployment health verification fails, the script attempts to restore the previous Docker images.

---

## ☁️ AWS Deployment

Skillio is hosted on an AWS EC2 Ubuntu instance.

### Deployment Infrastructure

| Component | Purpose |
|---|---|
| AWS EC2 | Runs the application containers |
| Ubuntu | Operating system |
| Docker Engine | Runs containers |
| Docker Compose | Manages frontend and backend |
| Host Nginx | Public reverse proxy |
| AWS IAM | Identity and permissions |
| AWS OIDC | GitHub Actions authentication |
| AWS STS | Temporary credentials |
| AWS SSM | Remote deployment commands |
| MongoDB Atlas | Managed application database |

### Production Deployment Architecture

```text
                 PUBLIC USER
                      |
                      v
              EC2 PUBLIC IP :80
                      |
                      v
              HOST NGINX :80
                      |
                      v
          DOCKER FRONTEND :8081
                      |
                      v
          FRONTEND CONTAINER :80
                      |
               API Requests
                      |
                      v
           BACKEND SERVICE :3000
                      |
                      v
            MONGODB ATLAS
```

### Public Access Through Nginx

The EC2 host Nginx acts as the public entry point.

It forwards incoming website requests to the Docker frontend running on EC2 localhost port `8081`.

The frontend container's Nginx forwards API requests to the backend Docker service through the Compose network.

The backend is not directly exposed to the public internet through its Docker host port.

### Production Port Mapping

| Component | Host Port | Internal Port |
|---|---:|---:|
| Host Nginx | 80 | — |
| Docker Frontend | 8081 | 80 |
| Docker Backend | 3001 | 3000 |

Both Docker host ports are bound to `127.0.0.1`.

### Deployment Benefits

- Automated deployments after successful CI and image publishing.
- Consistent application packaging.
- Separation of frontend and backend containers.
- Container restart policies.
- Health checks after deployment.
- Previous image restoration attempt if deployment fails.
- Secure AWS authentication through OIDC and temporary credentials.

---

## 📁 Project Structure

```text
Skillio/
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       ├── docker-publish.yml
│       ├── docker-deploy.yml
│       └── ec2-deploy.yml
│
├── Middleware/
│   ├── admin.js
│   └── user.js
│
├── data/
│   └── courseLessons.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── axiosConfig.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── routes/
│   ├── admin.js
│   ├── course.js
│   └── user.js
│
├── Dockerfile
├── .dockerignore
├── compose.yaml
├── config.js
├── db.js
├── index.js
├── package.json
├── .gitignore
└── README.md
```

> The old PM2 deployment workflow `ec2-deploy.yml` is retained as a disabled legacy workflow. The active Docker deployment is handled by `docker-deploy.yml`.

### Important Docker Files

| File | Purpose |
|---|---|
| `Dockerfile` | Builds the backend production image |
| `frontend/Dockerfile` | Builds the React frontend and serves it through Nginx |
| `compose.yaml` | Defines backend and frontend services |
| `.dockerignore` | Excludes unnecessary files from Docker build contexts |
| `frontend/nginx.conf` | Configures frontend Nginx and API proxying |

---

## 🗄 Database Models

Skillio uses MongoDB with Mongoose to define and interact with application data.

### 1. User

Stores learner account information.

Main fields:

- `email`
- `password`
- `firstName`
- `lastName`
- `createdAt`
- `updatedAt`

Passwords are hashed before being stored.

### 2. Admin

Stores administrator account information.

Main fields:

- `email`
- `password`
- `firstName`
- `lastName`
- `createdAt`
- `updatedAt`

Administrator authentication uses a separate JWT secret and middleware.

### 3. Course

Stores information about individual courses.

Main fields:

- `title`
- `description`
- `price`
- `category`
- `imageUrl`
- `creatorId`
- `createdAt`
- `updatedAt`

### 4. Purchase

Stores learner enrollment records.

Main fields:

- `userId`
- `courseId`
- `createdAt`
- `updatedAt`

A compound unique index on `userId` and `courseId` helps prevent duplicate purchase records.

### 5. Progress

Stores completed lessons for an enrolled learner.

Main fields:

- `userId`
- `courseId`
- `completedLessons`
- `createdAt`
- `updatedAt`

The `completedLessons` field stores lesson numbers in an array.

---

## 🔌 API Endpoints

The backend exposes REST API routes under `/api/v1`.

### User Routes

Base path: `/api/v1/user`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/signup` | Register a new learner | No |
| POST | `/signin` | Authenticate a learner | No |
| GET | `/me` | Retrieve current user profile | User JWT |
| GET | `/purchases` | Retrieve enrolled courses and progress | User JWT |
| PUT | `/password` | Change account password | User JWT |
| GET | `/course/:courseId` | Retrieve enrolled course content | User JWT |
| PUT | `/course/:courseId/progress` | Update lesson completion | User JWT |

### Administrator Routes

Base path: `/api/v1/admin`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/signin` | Authenticate administrator | No |
| GET | `/course/bulk` | Retrieve managed courses | Admin JWT |
| POST | `/course` | Create course | Admin JWT |
| PUT | `/course` | Update course | Admin JWT |
| DELETE | `/course` | Delete course | Admin JWT |

Administrator registration is disabled in the current implementation.

### Course Routes

Base path: `/api/v1/course`

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/bulk` | Retrieve available courses | No |
| POST | `/purchase` | Enroll authenticated learner | User JWT |

### Authentication Header

Protected API requests use the `token` request header.

```http
GET /api/v1/user/me
token: YOUR_USER_JWT
```

---

## 💻 Getting Started — Local Development

This method runs the application using Node.js and npm without Docker.

### Prerequisites

Install:

- Node.js and npm.
- Git.
- MongoDB Atlas account or an accessible MongoDB instance.
- Visual Studio Code or another code editor.

### 1. Clone the Repository

```bash
git clone https://github.com/singhaadarsh1/Skillio--Learn-Sell-Courses.git

cd Skillio--Learn-Sell-Courses
```

### 2. Install Backend Dependencies

From the project root:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend project root.

Example:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_USER_PASSWORD=your_user_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
```

Replace the example values with your actual configuration.

Never commit real environment variables or database credentials.

### 4. Start the Backend

```bash
npm run dev
```

The backend uses Nodemon during development.

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

Vite will display the local frontend URL, usually `http://localhost:5173`.

### 7. Administrator Account

Public administrator registration is disabled.

Create an administrator account through a controlled, private setup process before testing administrator sign-in.

---

## 🐳 Running with Docker

Docker provides an alternative way to run Skillio locally.

### Prerequisites

- Docker Desktop or Docker Engine.
- Docker Compose.
- MongoDB Atlas or another accessible MongoDB instance.

### 1. Clone the Repository

```bash
git clone https://github.com/singhaadarsh1/Skillio--Learn-Sell-Courses.git

cd Skillio--Learn-Sell-Courses
```

### 2. Configure Docker Environment Variables

Create a `.env.docker` file in the project root.

Add the environment variables required by the backend configuration.

Example:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_USER_PASSWORD=your_user_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
```

Check the current backend configuration for the exact variable names required.

Do not commit `.env.docker`.

### 3. Build and Start Containers

```bash
docker compose up --build -d
```

This command:

- Builds the backend image.
- Builds the frontend image.
- Creates the Compose network.
- Starts the backend container.
- Starts the frontend container.

### 4. Access Skillio

| Service | Local URL |
|---|---|
| Frontend | http://localhost:8081 |
| Backend host mapping | http://localhost:3001 |

The frontend Nginx proxies API requests to the backend service through the Docker network.

### 5. View Container Status

```bash
docker compose ps
```

### 6. View Logs

```bash
docker compose logs -f
```

### 7. Stop Containers

```bash
docker compose down
```

---

## 📦 Running Published Docker Hub Images

The production Docker images are available on Docker Hub.

**Backend image:**

https://hub.docker.com/r/aadarsh0124/skillio-backend

**Frontend image:**

https://hub.docker.com/r/aadarsh0124/skillio-frontend

A developer who only wants to run the published images can create a local `compose.yaml` file in a new project folder.

Example:

```yaml
services:
  backend:
    image: aadarsh0124/skillio-backend:latest
    container_name: skillio-backend
    restart: unless-stopped
    env_file:
      - .env.docker
    ports:
      - "3001:3000"

  frontend:
    image: aadarsh0124/skillio-frontend:latest
    container_name: skillio-frontend
    restart: unless-stopped
    ports:
      - "8081:80"
    depends_on:
      - backend
```

The frontend image's Nginx configuration must be able to resolve the `backend` service through the Compose network.

Create the required `.env.docker` file with valid backend configuration and database credentials.

Then run:

```bash
docker compose pull

docker compose up -d
```

Open:

```text
http://localhost:8081
```

This runs the published Docker images without building them locally.

> Note: The example above is for local use. Production Compose configuration and local development configuration may use different port bindings and environment settings. Never publish database credentials or JWT secrets.

---

## ⚙️ Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port on which the backend listens |
| `MONGO_URL` | MongoDB connection string |
| `JWT_USER_PASSWORD` | Secret used for user JWTs |
| `JWT_ADMIN_PASSWORD` | Secret used for administrator JWTs |
| `VITE_API_URL` | Optional frontend API URL used by Axios configuration |

The first four variables belong to backend configuration.

`VITE_API_URL` is used by the frontend configuration when rewriting matching localhost API URLs. Set it to the appropriate backend origin when configuring a deployment.

The Docker deployment uses `.env.docker` on EC2. This file is maintained separately from the Git repository and is not included in the Docker images.

---

## 🐳 Docker Commands

### Images

```bash
# List images
docker images

# Build backend image
docker build -t skillio-backend .

# Build frontend image
docker build -t skillio-frontend ./frontend

# Pull image
docker pull aadarsh0124/skillio-backend:latest

# Remove image
docker rmi IMAGE_ID
```

### Containers

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Start a container
docker start CONTAINER_NAME

# Stop a container
docker stop CONTAINER_NAME

# Restart a container
docker restart CONTAINER_NAME

# View container logs
docker logs CONTAINER_NAME

# Follow logs
docker logs -f CONTAINER_NAME

# Inspect a container
docker inspect CONTAINER_NAME

# Open a shell inside a container
docker exec -it CONTAINER_NAME sh
```

### Docker Compose

```bash
# Build and start services
docker compose up --build -d

# Start services
docker compose up -d

# Pull images
docker compose pull

# Recreate containers using pulled images
docker compose up -d --no-build

# Stop and remove containers
docker compose down

# View services
docker compose ps

# View logs
docker compose logs -f

# View backend logs
docker compose logs -f backend

# View frontend logs
docker compose logs -f frontend

# Restart services
docker compose restart

# Validate Compose configuration
docker compose config --quiet
```

### Docker Hub

```bash
# Login
docker login

# Tag image
docker tag skillio-backend:latest aadarsh0124/skillio-backend:latest

# Push image
docker push aadarsh0124/skillio-backend:latest

# Pull image
docker pull aadarsh0124/skillio-backend:latest
```

---

## 🔀 Git and GitHub Workflow

### Common Git Commands

```bash
# Check current branch
git branch

# Check status
git status

# View branches
git branch -a

# Create a branch
git switch -c feature/new-feature

# Switch branches
git switch main

# Add changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push branch
git push -u origin feature/new-feature

# Fetch latest remote changes
git fetch origin

# Pull changes
git pull

# Pull only when fast-forward is possible
git pull --ff-only origin main

# View commit history
git log --oneline --graph --decorate --all

# View differences
git diff

# View staged differences
git diff --cached

# Undo unstaged changes to a file
git restore FILE_NAME

# Unstage a file
git restore --staged FILE_NAME
```

### Feature Branch Workflow

Skillio uses feature branches and pull requests for controlled changes.

```text
Create Feature Branch
        |
        v
Write and Test Code
        |
        v
Commit Changes
        |
        v
Push Feature Branch
        |
        v
Create Pull Request
        |
        v
CI Checks
        |
        v
Review and Merge into main
        |
        v
Automated CI/CD Pipeline
```

### Git History Cleanup Incident

During Docker configuration work, a `.env.docker` file containing sensitive configuration was accidentally committed and pushed to the public GitHub repository.

The file was subsequently removed from the working tree, but removing a file in a later commit does not remove it from previous Git history.

GitGuardian detected the historical exposure.

The issue was addressed by:

1. Treating the exposed credentials as compromised and rotating affected secrets where applicable.
2. Creating a backup of the original Git history.
3. Creating an isolated cleanup clone.
4. Using `git filter-repo` to rewrite the affected repository history.
5. Pushing the cleaned history to GitHub.
6. Merging the cleaned branches through pull requests.
7. Synchronizing local branches with the rewritten remote history.

**Important lessons:**

- Never commit `.env` or `.env.docker` files.
- Add environment files to `.gitignore`.
- Use GitHub Actions secrets for CI/CD credentials.
- Use Docker build secrets or other appropriate secret-management methods when builds require sensitive values.
- Deleting a secret file in a new commit does not erase it from old commits.
- Rotate exposed credentials; history cleanup alone does not make an exposed credential safe.
- Back up a repository before rewriting Git history.
- After history rewriting, coordinate branch synchronization carefully.
- Avoid force-pushing without understanding the consequences for collaborators and remote branches.

---

## 🔐 Authentication and Authorization

Skillio uses JSON Web Tokens to authenticate users and administrators.

### User Authentication Flow

1. The user submits their email and password.
2. The backend validates the request using Zod.
3. The backend retrieves the user record from MongoDB.
4. bcrypt compares the submitted password with the stored password hash.
5. If credentials are valid, the backend generates a JWT.
6. The frontend stores the token and uses it for authenticated requests.

### Administrator Authentication Flow

The administrator follows a similar process, but the application uses a separate administrator JWT secret and administrator authentication middleware.

### Protected Routes

The frontend uses a reusable `ProtectedRoute` component to control access to protected pages.

The backend independently verifies JWTs through authentication middleware.

Both layers are important because frontend-only route protection is not sufficient to secure backend resources.

---

## 📈 Learning Progress Tracking

Course lessons are defined in the backend's `data/courseLessons.js` file.

When an authenticated learner accesses course content, the backend checks whether the requested course exists and whether the learner has an associated purchase record.

Lesson completion is stored through the progress model.

The completed lesson numbers are maintained in the `completedLessons` array, associated with a particular user and course.

The lesson content is currently predefined rather than managed through a separate lesson-management interface.

---

## 🔒 Security Considerations

- Never commit `.env` or `.env.docker` files.
- Store CI/CD credentials in GitHub Actions secrets.
- Use AWS OIDC and temporary credentials instead of long-lived AWS access keys.
- Restrict IAM permissions to the required resources and operations.
- Keep Docker backend and frontend host ports bound to localhost when using host Nginx as the public entry point.
- Do not expose MongoDB credentials, JWT secrets or Docker Hub access tokens.
- Use HTTPS and a domain name for a production-facing application.
- Review Docker images and dependencies for vulnerabilities.
- Keep the EC2 instance and Docker Engine updated.

---

## 🚧 Future Improvements

Potential improvements include:

- Integrate a payment gateway for actual course payments.
- Replace predefined course lessons with database-managed lesson content.
- Add automated backend and frontend tests.
- Introduce centralized error-handling middleware.
- Improve request validation and error response consistency.
- Add API documentation using Swagger or OpenAPI.
- Add centralized monitoring and alerting.
- Introduce HTTPS with a domain name and TLS certificate.
- Improve deployment strategies to reduce downtime.
- Add automated image vulnerability scanning.
- Explore AWS CloudWatch for container and application monitoring.
- Explore Kubernetes for container orchestration as the application grows.

These are potential enhancements, not claims about features already implemented.

---

## 🎯 Learning Outcomes

This project provided practical experience with:

### Full-Stack Development

- React components and client-side routing.
- REST API development with Express.
- Frontend-backend integration using Axios.
- MongoDB schema design and Mongoose queries.
- JWT-based authentication.
- Role-specific authorization middleware.
- Password hashing and verification.
- Request validation using Zod.
- CRUD operations.
- Course enrollment and learning progress data modeling.

### DevOps and Cloud

- Git and GitHub version control.
- Linux and Ubuntu server administration.
- AWS EC2 deployment.
- PM2 process management.
- Nginx reverse proxy configuration.
- Docker images, containers and Dockerfiles.
- Docker Compose and container networking.
- Docker Hub image publishing.
- GitHub Actions CI/CD.
- AWS IAM and OIDC authentication.
- AWS STS temporary credentials.
- AWS Systems Manager remote deployment.
- Automated container deployment and health verification.
- Deployment rollback handling.
- Git history cleanup and secret-management practices.

---

## 👨‍💻 Author

**Aadarsh Singh**

B.Tech Computer Science and Engineering Student

Interested in Full Stack Development, Backend Engineering, DevOps and building practical software applications.

- GitHub: [singhaadarsh1](https://github.com/singhaadarsh1)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/aadarsh-singh-ba061628a/)

---

## 📄 License

This project is licensed under the MIT License.