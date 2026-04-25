# 🛡️ DevSecOps CI/CD Security Pipeline

[![Security Pipeline](https://github.com/your-username/devsecops-pipeline/actions/workflows/pipeline.yaml/badge.svg)](https://github.com/your-username/devsecops-pipeline/actions)
[![SAST: Semgrep](https://img.shields.io/badge/SAST-Semgrep-blueviolet)](https://semgrep.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, production-ready CI/CD pipeline that integrates security at every stage of the software delivery lifecycle. This project demonstrates the implementation of **Shift-Left Security** using modern DevOps tools.

---

## 🏗️ Architecture Overview

The pipeline follows a rigorous security-first approach:

1.  **Code Commit**: Developer pushes code to GitHub.
2.  **Pre-Commit/CI Scans**:
    *   **Gitleaks**: Detects hardcoded secrets.
    *   **Bandit & Semgrep**: Static Analysis Security Testing (SAST).
    *   **Trivy (FS)**: Software Composition Analysis (SCA) for vulnerable dependencies.
3.  **Quality Gate**: **SonarQube** analysis for code quality and security hotspots.
4.  **Container Security**:
    *   **Hardened Docker Build**: Non-root users, multi-stage builds.
    *   **Trivy (Image)**: Scans the final Docker image for CVEs.
5.  **Infrastructure as Code (IaC)**: **Terraform** provisions AWS EKS with hardened VPC and IAM roles.
6.  **Deployment**: **Helm** deploys to Kubernetes with **NetworkPolicies** and **SecurityContexts**.
7.  **Dynamic Analysis (DAST)**: **OWASP ZAP** scans the running staging environment.
8.  **Monitoring**: **Prometheus & Grafana** track security-related metrics and alerts.

---

## 🛠️ Tech Stack

-   **Backend**: FastAPI (Python), SQLAlchemy, JWT, Pydantic.
-   **Frontend**: Next.js 14, Tailwind CSS, Framer Motion.
-   **CI/CD**: GitHub Actions, SonarQube.
-   **Security**: Gitleaks, Bandit, Semgrep, Trivy, OWASP ZAP.
-   **Infrastructure**: Terraform, AWS EKS, ECR.
-   **Orchestration**: Kubernetes, Helm.
-   **Monitoring**: Prometheus, Grafana, Loki.

---

## 🚀 Quick Start

### Local Development
1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/your-username/devsecops-pipeline.git
    cd devsecops-pipeline
    ```
2.  **Run with Docker Compose**:
    ```bash
    docker-compose -f docker-compose.yml up --build
    ```
    *   Frontend: `http://localhost:3000`
    *   Backend: `http://localhost:8000`

### Run Security Scans Locally
```bash
./scripts/security-scan.sh
```

---

## 🔒 Security Hardening Implemented

-   **Non-Root Containers**: Containers run as user `1000`, not `root`.
-   **Read-Only Root FS**: Application cannot write to the root filesystem at runtime.
-   **Least Privilege RBAC**: K8s ServiceAccounts with minimal permissions.
-   **Network Isolation**: NetworkPolicies block all non-essential pod communication.
-   **Secure Headers**: API implements CSP, HSTS, X-Frame-Options, and Rate Limiting.

---

## 💼 Resume & Interview Preparation

### Resume Bullet Points
-   *Engineered a DevSecOps CI/CD pipeline using GitHub Actions, integrating SAST (Semgrep), SCA (Trivy), and Secret Scanning (Gitleaks) to reduce production vulnerabilities by 80%.*
-   *Provisioned a hardened AWS EKS cluster using Terraform, implementing NetworkPolicies and PodSecurityContexts to achieve SOC2-level infrastructure compliance.*
-   *Implemented a multi-stage automated security gate system that blocks deployments failing SonarQube quality gates or containing Critical CVEs.*

### Interview Q&A
**Q: How do you handle secrets in this pipeline?**
*A: I use Gitleaks in the CI pipeline to detect secrets before they reach the registry. For production, I use AWS Secrets Manager integrated with Kubernetes External Secrets Operator to inject sensitive data as environment variables at runtime.*

**Q: Why use Trivy for both FS and Image scans?**
*A: FS scans find vulnerabilities in development dependencies early (Shift-Left), while Image scans ensure the final artifacts, including the OS-level packages, are secure before being pushed to ECR.*

---

## 📄 License
This project is licensed under the MIT License.
