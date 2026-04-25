#!/bin/bash
echo "🔍 Running Local Security Scans..."

# Gitleaks
echo "Checking for secrets..."
docker run -v $(pwd):/path zricethezav/gitleaks:latest detect --source="/path" -v

# Trivy FS
echo "Scanning filesystem for vulnerabilities..."
trivy fs . --severity CRITICAL,HIGH

# Bandit
echo "Running Python SAST..."
bandit -r backend/app

# Semgrep
echo "Running Semgrep security audit..."
semgrep --config p/security-audit .

echo "✅ Security scans completed!"
