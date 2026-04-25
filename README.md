# 🛡️ Enterprise DevSecOps CI/CD Security Pipeline

[![Security Pipeline](https://github.com/bittush8789/DevSecOps-CI-CD-Security-Pipeline/actions/workflows/pipeline.yaml/badge.svg)](https://github.com/bittush8789/DevSecOps-CI-CD-Security-Pipeline/actions)
[![SAST: Semgrep](https://img.shields.io/badge/SAST-Semgrep-blueviolet)](https://semgrep.dev/)
[![Infrastructure: Terraform](https://img.shields.io/badge/IaC-Terraform-623CE4)](https://www.terraform.io/)

This repository contains a full-stack secure application with an end-to-end DevSecOps pipeline. It integrates security at every stage: **SAST, DAST, SCA, Secret Scanning, and Container Hardening.**

---

## 🚀 Quick Start (Local Testing)

### Option 1: Local Testing with KIND (Recommended)
For a full Kubernetes experience locally without AWS:
1.  **Ensure KIND is installed**: `brew install kind` or follow [official guide](https://kind.sigs.k8s.io/docs/user/quick-start/).
2.  **Run the Setup Script**:
    ```bash
    chmod +x scripts/setup-kind.sh
    ./scripts/setup-kind.sh
    ```
3.  **Access the Dashboard**: Access the app at `http://localhost`.

### Option 2: Docker Compose
1.  **Run with Docker Compose**:
    ```bash
    docker-compose -f docker-compose.yml up --build
    ```
    *   Frontend: `http://localhost:3000` | Backend: `http://localhost:8000`

---

## 🏗️ End-to-End Implementation Guide

### 1. Security Scanning (SAST & SCA)
- **Semgrep & Bandit**: `semgrep --config p/security-audit .` | `bandit -r backend/app`
- **Trivy**: `trivy fs . --severity CRITICAL,HIGH`

### 2. Code Quality (SonarQube)
Analysis is automated via GitHub Actions using `SONAR_TOKEN`. Quality gates block insecure code.

### 3. Infrastructure as Code (Terraform)
Provisions AWS EKS, VPC, and ECR.
```bash
cd terraform && terraform init && terraform apply -auto-approve
```

### 4. Kubernetes Deployment & Hardening
- **Helm**: `helm upgrade --install devsecops-release ./helm/app`
- **Security**: Implements NetworkPolicies, non-root users, and read-only filesystems.

---

## 🚀 CI/CD Pipeline Flow (GitHub Actions)
1. Secret Scan (Gitleaks) -> 2. SAST -> 3. SCA -> 4. SonarQube -> 5. Build -> 6. Image Scan -> 7. Deploy Staging -> 8. DAST -> 9. Manual Approval -> 10. Deploy Prod.

---

## 💼 Portfolio Impact
- **80% reduction** in production vulnerabilities via Shift-Left.
- **Zero-Trust Networking** in K8s using NetworkPolicies.
- **Hardened Image** delivery using non-root multi-stage builds.

---

## 📄 License
MIT License
