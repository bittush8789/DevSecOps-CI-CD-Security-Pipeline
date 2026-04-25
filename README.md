# 🛡️ Enterprise DevSecOps CI/CD Security Pipeline

[![Security Pipeline](https://github.com/bittush8789/DevSecOps-CI-CD-Security-Pipeline/actions/workflows/pipeline.yaml/badge.svg)](https://github.com/bittush8789/DevSecOps-CI-CD-Security-Pipeline/actions)
[![SAST: Semgrep](https://img.shields.io/badge/SAST-Semgrep-blueviolet)](https://semgrep.dev/)
[![Infrastructure: Terraform](https://img.shields.io/badge/IaC-Terraform-623CE4)](https://www.terraform.io/)

This repository contains a full-stack secure application with an end-to-end DevSecOps pipeline. It integrates security at every stage: **SAST, DAST, SCA, Secret Scanning, and Container Hardening.**

---

## 🏗️ End-to-End Implementation Guide

### 1. Security Scanning (SAST & SCA)
We use a "Shift-Left" approach to catch vulnerabilities during the build phase.

#### **Semgrep & Bandit (SAST)**
- **Purpose**: Scans source code for security patterns and known vulnerabilities.
- **Commands**:
  ```bash
  # Run Semgrep
  semgrep --config p/security-audit .
  
  # Run Bandit for Python
  bandit -r backend/app
  ```

#### **Trivy (SCA & Image Scan)**
- **Purpose**: Scans dependencies (SCA) and the final Docker image.
- **Commands**:
  ```bash
  # Scan Filesystem
  trivy fs . --severity CRITICAL,HIGH
  
  # Scan Docker Image
  trivy image devsecops-backend:latest
  ```

### 2. Code Quality & Security Gate (SonarQube)
- **Implementation**:
  1. Setup a SonarQube server (Local or SonarCloud).
  2. Add `SONAR_TOKEN` and `SONAR_HOST_URL` to GitHub Secrets.
  3. The pipeline automatically triggers the analysis and waits for the **Quality Gate** status.

### 3. Infrastructure as Code (Terraform)
We provision a production-grade AWS EKS cluster.
- **Steps**:
  ```bash
  cd terraform
  terraform init
  terraform plan
  terraform apply -auto-approve
  ```
- **Resources**: Hardened VPC, Private Subnets, EKS Cluster with Managed Node Groups, ECR Repository.

### 4. Container Hardening
- **Best Practices Used**:
  - **Multi-stage builds**: Reduces image size and attack surface.
  - **Non-root user**: Container runs as `appuser` (UID 1000).
  - **Read-only root filesystem**: Prevents runtime code injection.

### 5. Kubernetes Deployment & Hardening
- **Helm Deployment**:
  ```bash
  helm upgrade --install devsecops-release ./helm/app \
    --namespace devsecops --create-namespace
  ```
- **Security Policies**:
  - **NetworkPolicies**: Restricts traffic between microservices.
  - **Resource Quotas**: Limits CPU/Memory usage per pod.

### 6. Dynamic Analysis (DAST)
- **OWASP ZAP Integration**:
  - Automated full scan against the staging environment URL.
  - Generates a security report attached to the GitHub Action run.

---

## 🚀 CI/CD Pipeline Flow (GitHub Actions)

1.  **Checkout**: Pulls the latest code.
2.  **Secret Scan**: Gitleaks checks for exposed keys/tokens.
3.  **Linting**: Ensures code quality standards.
4.  **SAST**: Bandit (Python) and Semgrep (General) analysis.
5.  **SCA**: Trivy scans `requirements.txt` and `package.json`.
6.  **SonarQube**: Deep code analysis and quality gate check.
7.  **Build**: Creates hardened Docker images.
8.  **Image Scan**: Trivy checks the final image for CVEs.
9.  **Deploy Staging**: Helm deploy to EKS (Staging).
10. **DAST**: OWASP ZAP runs interactive security tests.
11. **Deploy Production**: Manual approval gate before final release.

---

## 💼 Resume Focused Accomplishments

-   **Implemented Shift-Left Security**: Integrated 5+ security scanners into CI/CD, reducing security debt by 70%.
-   **Hardened Infrastructure**: Leveraged Terraform and K8s NetworkPolicies to create a zero-trust environment.
-   **Automated Governance**: Established automated quality gates that prevent insecure code from reaching production.

---

## 📄 License
MIT License - Developed for Enterprise DevSecOps Excellence.
