# NASA Mission Control Project

# NASA Mission Control Project

I built this project because I wanted to move beyond just making apps and deploying them to platforms like Vercel. I wanted to get hands-on experience with tools that are actually used in companies — like Docker, GitHub Actions, and AWS EC2. My goal was to understand how CI/CD works, how to build Docker images, and how to deploy them to a live server from scratch.

This project is a fullstack space mission scheduling system. It connects with the SpaceX API to fetch real launch data, and I’ve built my own backend system around it. I also created a simple UI that lets users schedule new missions and see upcoming ones.

The most important part of this project wasn’t the app itself, but learning how to tie everything together — setting up CI pipelines, managing environment variables, using Docker Hub, and configuring an EC2 instance to run my app in production. It gave me a solid understanding of how everything works together in a real deployment workflow.

---

## Folder Structure

.
├── .github/workflows -> CI config  
├── client -> Frontend React app  
├── server -> Express backend  
├── node_modules -> Auto-generated, ignored in git  
├── .dockerignore  
├── .gitignore  
├── Dockerfile -> Docker build steps  
├── package.json -> Root level scripts  
├── package-lock.json  
└── README.md

---

## Getting Started

- Make sure Node.js is installed
- Create a free MongoDB Atlas database or run MongoDB locally
- In the "server" folder, create a ".env" file and add this:

"MONGO_URL=your-mongodb-connection-string"

- In the terminal from the root folder, run:

"npm install"

This installs both frontend and backend dependencies.

---

## Running the Project

To start the fullstack app, run:

"npm run deploy"

This builds the React frontend and serves it with the backend from "server/public".

Now go to: "http://localhost:8000"

---

## Docker Setup

### Build Docker Image

"docker build -t nasa-project ."

### Run Docker Container

"docker run -it -p 8000:8000 nasa-project"

Now the app runs in a container. You can open it at "http://localhost:8000"

---

## Dockerfile Explanation

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

- We use alpine for small image size
- Install dependencies in client and server
- Build React app
- Copy backend files and serve using Node user for security
- Expose port 8000

---

## GitHub Actions (CI)

**Path:** `.github/workflows/node.yml`

This is the GitHub Actions workflow file that runs our CI pipeline whenever we push or create a pull request on the `master` branch. It spins up MongoDB and runs tests across different Node versions to ensure everything works.

```yaml
name: NASA Project CI
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  build:
    env:
      CI: true
      MONGO_URL: mongodb://localhost/nasa
    strategy:
      matrix:
        node-version: [20.x, 22.x]
        mongodb-version: ["7.0"]
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Use Node.js version ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Start MongoDB service
        uses: supercharge/mongodb-github-action@1.11.0
        with:
          mongodb-version: ${{ matrix.mongodb-version }}

      - name: Install dependencies
        run: npm install

      - name: Build frontend
        run: npm run build --prefix client

      - name: Run tests
        run: npm test
```

This helped me learn how CI works in companies using GitHub Actions.

---

## AWS EC2 Deployment

This was my favorite part — learning to deploy manually.

1. Created an EC2 instance (Amazon Linux 2)
2. Opened these ports in the Security Group:

   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Custom TCP (port 8000 for app)

3. SSH into EC2:

"ssh -i your-key.pem ec2-user@<EC2-IP>"

4. Update the system:

"sudo yum update -y"

5. Install Docker:

"sudo yum install docker"

"sudo service docker start"

6. Fix permissions (we're not admin yet):

"sudo usermod -a -G docker ec2-user"

Now exit the EC2 shell and log in again for it to take effect.

7. Run "docker info" to make sure it works

8. Log into Docker:

"docker login"

9. Run the Docker container with:

"docker run --restart=always -p 8000:8000 your-docker-username/nasa-project"

The "--restart=always" makes sure the app restarts if the EC2 instance reboots

10. Visit:

"http://<EC2-PUBLIC-IP>:8000"

Now the app is live from EC2.

---

## Testing

To run tests locally, run:

"npm test"

This includes:

"npm test --prefix client" — frontend tests  
"npm test --prefix server" — backend tests

---

## What I Learned

- CI/CD with GitHub Actions
- Docker images and containers
- How Dockerfiles actually work
- Real EC2 setup and security
- Using external APIs (SpaceX API in my case)
- How a company might actually deploy apps

This was way more than just a project. I used it to build my understanding of all the tools real engineers use every day.
