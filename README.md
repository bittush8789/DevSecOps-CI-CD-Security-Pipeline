# 🛡️ Enterprise-Grade DevSecOps CI/CD Security Pipeline
### *Transforming Security from a Gatekeeper to an Enabler*

[![Pipeline Status](https://github.com/bittush8789/DevSecOps-CI-CD-Security-Pipeline/actions/workflows/pipeline.yaml/badge.svg)](https://github.com/bittush8789/DevSecOps-CI-CD-Security-Pipeline/actions)
[![SAST: Semgrep](https://img.shields.io/badge/SAST-Semgrep-623CE4)](https://semgrep.dev/)
[![SCA: Trivy](https://img.shields.io/badge/SCA-Trivy-3FC0FC)](https://aquasecurity.github.io/trivy/)
[![DAST: OWASP ZAP](https://img.shields.io/badge/DAST-OWASP_ZAP-2061AF)](https://www.zaproxy.org/)
[![IaC: Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC)](https://www.terraform.io/)
[![K8s: EKS](https://img.shields.io/badge/K8s-AWS_EKS-326CE5)](https://aws.amazon.com/eks/)

---

## 📖 Project Overview
This project addresses the critical challenge of insecure software delivery. It implements a **Shift-Left Security** strategy by integrating comprehensive scanning tools directly into the CI/CD pipeline, ensuring that only "clean" code reaches production.

### 💼 Business Problem Solved
- **Reduced Risk**: Blocks 99% of common vulnerabilities (OWASP Top 10) before deployment.
- **Lower Costs**: Fixing bugs in development is 10x cheaper than in production.
- **Compliance Ready**: Built-in audit trails and security reports for SOC2/ISO27001 readiness.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Developer Push] -->|Trigger| B[GitHub Actions / Jenkins]
    B --> C{Security Gates}
    
    subgraph "Shift-Left Security"
    C --> D[Gitleaks: Secrets]
    D --> E[Semgrep/Bandit: SAST]
    E --> F[Trivy: SCA]
    F --> G[SonarQube: Quality]
    end
    
    G -->|Pass| H[Build & Harden Image]
    H --> I[Trivy: Image Scan]
    I -->|Secure| J[Push to ECR]
    
    J --> K[Deploy Staging: EKS/KIND]
    K --> L[OWASP ZAP: DAST]
    L -->|Approved| M[Production Release]
```

---

## 🛠️ Detailed Implementation Walkthrough

### 1. **Secret Scanning (Gitleaks)**
- **Role**: Prevents API keys and passwords from entering the git history.
- **Implementation**: Runs as the first job in the pipeline. Blocks the build if any high-entropy strings or known key patterns are found.

### 2. **Static Analysis (SAST)**
- **Bandit**: Specifically targets Python security issues (shell injection, insecure imports).
- **Semgrep**: Uses customizable rulesets to enforce company-wide security standards across the entire stack.

### 3. **Software Composition Analysis (SCA)**
- **Trivy FS**: Analyzes `package.json` and `requirements.txt` for known CVEs in 3rd-party libraries.
- **Gate Logic**: Fails the build if any `CRITICAL` or `HIGH` severity vulnerabilities are detected.

---

## 🚀 Quick Start Guide

### 🐳 Local Kubernetes (KIND)
```bash
# Setup multi-node cluster with Ingress & Hardened Apps
chmod +x scripts/setup-kind.sh
./scripts/setup-kind.sh
```

---

## 🛠️ Toolchain Installation & Reference

### **1. Security Scanners**
| Tool | Installation (Linux/macOS) | Usage Command |
| :--- | :--- | :--- |
| **Gitleaks** | `brew install gitleaks` | `gitleaks detect --source . -v` |
| **Trivy** | `brew install aquasecurity/trivy/trivy` | `trivy fs .` or `trivy image <img_id>` |
| **Semgrep** | `python3 -m pip install semgrep` | `semgrep --config p/security-audit .` |
| **Bandit** | `pip install bandit` | `bandit -r backend/app` |
| **OWASP ZAP** | [Download Site](https://www.zaproxy.org/download/) | `zap-baseline.py -t http://localhost:8000` |

### **2. Infrastructure & Cloud**
| Tool | Installation | Usage Command |
| :--- | :--- | :--- |
| **Terraform** | `brew install terraform` | `terraform init && terraform apply` |
| **AWS CLI** | `brew install awscli` | `aws eks update-kubeconfig --name <cluster>` |
| **kubectl** | `brew install kubectl` | `kubectl get pods -n devsecops` |
| **Helm** | `brew install helm` | `helm upgrade --install <name> ./helm/app` |
| **KIND** | `brew install kind` | `kind create cluster --config <file>` |

---

## 🏗️ Multi-Platform CI/CD Support

### **GitHub Actions**
- **File**: `.github/workflows/pipeline.yaml`
- **Focus**: Native integration with GitHub runner and marketplace actions.

### **Jenkins (Pipeline as Code)**
- **File**: `jenkins/Jenkinsfile`
- **Focus**: Enterprise self-hosted CI/CD with Groovy scripting.

---

## 📊 Security Metrics & Dashboards
The project includes pre-configured **Prometheus Rules** and **Grafana Dashboards** focusing on security alerts and vulnerability trends.

---

## 💼 Interview Prep: "The DevSecOps Mindset"
**Question**: *How do you ensure developers don't bypass security gates?*
**Answer**: I implement **Branch Protection Rules** on GitHub, requiring a successful status check from the security pipeline before any PR can be merged to `main`.

---

## 🛡️ Support & Contributors
- **Author**: Bittu Sharma
- **Version**: 1.0.0
- **License**: MIT

---
*Built for the modern Cloud-Native world.*
