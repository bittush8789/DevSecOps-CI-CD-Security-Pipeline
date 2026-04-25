#!/bin/bash
set -e

CLUSTER_NAME="devsecops-kind"

echo "☸️ Creating KIND Cluster: $CLUSTER_NAME..."
kind create cluster --name $CLUSTER_NAME --config kubernetes/kind-config.yaml

echo "🏗️ Building Docker Images..."
docker build -t devsecops-backend:latest -f docker/backend/Dockerfile backend
docker build -t devsecops-frontend:latest -f docker/frontend/Dockerfile frontend

echo "📦 Loading Images into KIND..."
kind load docker-image devsecops-backend:latest --name $CLUSTER_NAME
kind load docker-image devsecops-frontend:latest --name $CLUSTER_NAME

echo "🚀 Deploying Ingress Controller (Nginx)..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

echo "⏳ Waiting for Ingress Controller..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

echo "🛡️ Deploying DevSecOps Application..."
kubectl create namespace devsecops || true
helm upgrade --install devsecops-release ./helm/app --namespace devsecops

echo "✅ KIND Cluster Setup Complete!"
echo "Access App via: http://localhost"
