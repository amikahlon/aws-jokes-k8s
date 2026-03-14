# AWS Jokes – Kubernetes Local Demo

This project demonstrates how to run a small full-stack application locally using Kubernetes and Minikube.

The application includes:

- React frontend (served with Nginx)
- Node.js backend (Express API)
- Kubernetes configuration (Deployments, Services, Ingress)

The backend fetches random jokes from:
https://official-joke-api.appspot.com

The purpose of the project is to show how a simple application can run inside a local Kubernetes cluster.

---

# Requirements

Install the following tools before running the project.

Docker  
https://docs.docker.com/get-docker/

kubectl  
https://kubernetes.io/docs/tasks/tools/

Minikube  
https://minikube.sigs.k8s.io/docs/start/

(Optional) k9s  
https://k9scli.io/

---

# Project Structure

client/ → React application + nginx configuration  
server/ → Node.js API  
k8s/ → Kubernetes manifests (deployments, services, ingress)

---

# 1. Start the Kubernetes Cluster

Start Minikube:

minikube start --driver=docker

Enable the ingress controller:

minikube addons enable ingress

---

# 2. Build Docker Images

Build the client image:

docker build -t YOUR_DOCKER_USERNAME/aws-jokes-client:latest ./client

Build the server image:

docker build -t YOUR_DOCKER_USERNAME/aws-jokes-server:latest ./server

Push them to Docker Hub:

docker push YOUR_DOCKER_USERNAME/aws-jokes-client:latest  
docker push YOUR_DOCKER_USERNAME/aws-jokes-server:latest

Make sure the Kubernetes files in the `k8s` folder use the same image names.

---

# 3. Deploy the Application

Create the namespace:

kubectl apply -f k8s/namespace.yaml

Deploy everything:

kubectl apply -f k8s/

Verify that the pods are running:

kubectl get all -n aws-jokes

---

# 4. Get the Minikube IP

Run:

minikube ip

Example output:

192.168.49.2

---

# 5. Configure Local Domain

Open the hosts file.

Windows:

C:\Windows\System32\drivers\etc\hosts

Add the following line:

192.168.49.2 aws-jokes.local

Save the file.

---

# 6. Start the Tunnel

Run in a separate terminal:

minikube tunnel

This exposes the ingress controller so the application can be accessed from the browser.

Leave this terminal open.

---

# 7. Open the Application

Open your browser:

http://aws-jokes.local

You should see the React application.

Click **"Give me a joke"** to fetch a random joke from the backend.

---

# Useful Commands

View pods:

kubectl get pods -n aws-jokes

View services:

kubectl get svc -n aws-jokes

View ingress:

kubectl get ingress -n aws-jokes

View logs (server):

kubectl logs deployment/server -n aws-jokes

View logs (client):

kubectl logs deployment/client -n aws-jokes

---

# Cleanup

Remove the application:

kubectl delete -f k8s/

Stop the cluster:

minikube stop

---

# Notes

This project is intended for learning and running Kubernetes locally.

It demonstrates:

- Docker multi-stage builds
- Kubernetes Deployments
- Kubernetes Services
- Ingress routing
- Communication between services inside the cluster
