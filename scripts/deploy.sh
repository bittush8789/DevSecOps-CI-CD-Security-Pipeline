#!/bin/bash
set -e

echo "🚀 Starting DevSecOps Pipeline Deployment..."

# 1. Provision Infrastructure
cd terraform
terraform init
terraform apply -auto-approve
cd ..

# 2. Update Kubeconfig
aws eks update-kubeconfig --name devsecops-cluster

# 3. Build and Push Images (Simulated)
echo "Building Docker images..."
docker-compose -f docker-compose.yml build

# 4. Deploy via Helm
echo "Deploying application via Helm..."
helm upgrade --install devsecops-release ./helm/app \
  --namespace devsecops --create-namespace \
  --set image.tag=$(git rev-parse --short HEAD)

echo "✅ Deployment complete!"
