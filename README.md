<div align="center">

# 🚀 NASA Mission Control Project

## Schedule and monitor space launches with a full CI/CD and cloud deployment setup

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![](https://img.shields.io/badge/CI%2FCD-E34F26?style=for-the-badge&logo=git&logoColor=white)
![](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

<br/>

**Deployed App:** [http://3.135.205.104:8000](http://3.135.205.104:8000/)  
<br/>

</div>

> **Note** — This app is deployed using Docker on an AWS EC2 cloud server. <br/>
> My **ec2-puplic-ip** : 3.135.205.104

---

<details>
<summary>📜 Table of Contents</summary>

- [About](#about)
- [What I Learned](#what-i-learned)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Docker Setup](#docker-setup)
- [Dockerfile Explanation](#dockerfile-explanation)
- [GitHub Actions (CI/CD)](#github-actions-cicd)
- [AWS EC2 Deployment](#aws-ec2-deployment)
- [Testing](#testing)
- [Folder Structure](#folder-structure)

</details>

---

<a name="about"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> About </i>

I built this project to learn how tools like Docker, GitHub Actions, and AWS EC2 are used in real deployments. I wanted to go beyond just pushing apps to Vercel and understand how CI/CD works from scratch.

It’s a fullstack mission scheduler that uses the SpaceX API. One part I really wanted to learn was how one API can call another — so my own backend fetches data from the SpaceX API and serves it to the frontend. The real goal was learning how to tie everything together — backend, frontend, Docker, CI/CD, and EC2 — just like it’s done in companies.

---

<a name="what-i-learned"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> What I Learned </i>

- CI/CD with GitHub Actions
- Docker images and containers
- How Dockerfiles actually work
- Real EC2 setup and security
- Using external APIs (SpaceX API in my case)
- How a company might actually deploy apps

This was way more than just a project. I used it to build my understanding of all the tools real software engineers use every day.

---

<a name="getting-started"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="27"><i> Getting Started </i>

<br/>

> **Right — this is how I approached the setup, and you can follow the same way for any of your own projects too.**

 <br/>

- Make sure Node.js is installed
- Create a free MongoDB Atlas database or run MongoDB locally
- In the "server" folder, create a ".env" file and add this:

```bash

MONGO_URL=your-mongodb-connection-string
```

- In the terminal from the root folder, run:

```bash

npm install
```

This installs both frontend and backend dependencies.

---

<a name="running-the-project"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> Running the Project</i>

To start the fullstack app, run:

```bash
npm run deploy
```

This builds the React frontend and serves it with the backend from "server/public".

Now go to: `http://localhost:8000`

---

<a name="docker-setup"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> Docker Setup </i>

### 1. Ensure you have the latest version of Docker installed

### 2. Build Docker Image

```bash
docker build -t nasa-project
```

### 3. Run Docker Container

```bash
docker run -it -p 8000:8000 nasa-project
```

**Now the app runs in a container. You can open it at `http://localhost:8000`**

---

<a name="dockerfile-explanation"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> Dockerfile Explanation </i>

```bash
FROM node:lts-alpine
WORKDIR /app
COPY package\*.json ./

COPY client/package\*.json client/
RUN npm run install-client --omit=dev

COPY server/package\*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/
USER node
CMD [ "npm", "start", "--prefix", "server" ]
EXPOSE 8000
```

- We use alpine for small image size
- Install dependencies in client and server
- Build React app
- Copy backend files and serve using Node user for security
- Expose port 8000

---

<a name="github-actions-cicd"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> GitHub Actions (CI/CD) </i>

- Path: `.github/workflows/node.yml`

### This is the GitHub Actions workflow file that runs our CI pipeline whenever we push or create a pull request on the `master` branch. It spins up MongoDB and runs tests across different Node versions to ensure everything works.

```yaml
# This is the name of the GitHub Actions workflow
name: NASA Project CI

# This tells GitHub when to run this workflow
on:
  push: # Run on every push to the repo
    branches: [master] # But only if pushing to the master branch
  pull_request: # Also run when there's a pull request to master
    branches: [master]

jobs:
  build: # Name of the job
    # Set environment variables for this job
    env:
      CI: true # Tells tools that this is a CI environment
      MONGO_URL: mongodb://localhost/nasa # MongoDB connection string used during tests

    # Strategy to test across multiple Node.js and MongoDB versions
    strategy:
      matrix:
        node-version: [20.x, 22.x] # Test with Node.js v20 and v22
        mongodb-version: ["7.0"] # Use MongoDB version 7.0

    runs-on: ubuntu-latest # Use the latest Ubuntu environment

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4 # Clone the repo code into the runner

      - name: Use Node.js version ${{ matrix.node-version }}
        uses: actions/setup-node@v4 # Install and use the specified Node version
        with:
          node-version: ${{ matrix.node-version }}

      - name: Start MongoDB service
        uses: supercharge/mongodb-github-action@1.11.0 # Set up a MongoDB instance for testing
        with:
          mongodb-version: ${{ matrix.mongodb-version }}

      - name: Install dependencies
        run: npm install # Install all project dependencies

      - name: Build frontend
        run: npm run build --prefix client # Build the React app from the client folder

      - name: Run tests
        run: npm test # Run all tests in the project
```

This helped me learn how CI/CD works in companies using GitHub Actions.

---

<a name="aws-ec2-deployment"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> AWS EC2 Deployment </i>

This was my favorite part — learning to deploy manually.

### 1. Created an EC2 instance (Amazon Linux 2)

### 2. Opened these ports in the Security Group:

- Port 22 (SSH)
- Custom TCP (port 8000 for app)

> Most other settings were kept as default since we’re using the free tier and there’s not much traffic on the server. No need to touch advanced settings.

### 3. SSH into EC2:

```
ssh -i your-key.pem ec2-user@<EC2-IP>
```

### 4. Update the system:

```bash
sudo yum update -y
```

### 5. Install Docker:

```
sudo yum install docker

sudo service docker start
```

### 6. Fix permissions (we're not admin yet):

```bash
sudo usermod -a -G docker ec2-user
```

> Now exit and SSH back in again. This change doesn’t apply until you re-login.

### 7. Run `docker info` to make sure it works.

### 8. Log into Docker:

```bash
docker login
```

### 9. Run the Docker container with:

```bash
docker run --restart=always -p 8000:8000 your-docker-username/nasa-project
```

> The "--restart=always" makes sure the app restarts if the EC2 instance reboots.

### 10. Visit:

```bash
http://<EC2-PUBLIC-IP>:8000
```

Now the app is live from EC2.

---

<a name="testing"></a>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="27"><i> Testing </i>

### To run tests locally, run:

```bash
npm test
```

**This includes:**

`npm test --prefix client` — frontend tests  
`npm test --prefix server` — backend tests

---
