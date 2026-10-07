#!/usr/bin/env bash

# ============================================================
# Portfolio Security Audit - Command Reference
# Author: Eugene Dela Gogah
#
# Purpose:
# Reproducible command reference for the authorized security
# assessment of my personal portfolio and supporting backend.
#
# IMPORTANT:
# Only run these commands against systems you own or have
# explicit permission to test.
# ============================================================

set -u

TARGET="eugenedelagogah.vercel.app"
BASE_URL="https://${TARGET}"

API="https://eugenedelagogah.onrender.com"

AUDIT_DIR="${HOME}/Desktop/My Stuff/projects/portfolio-security-audit"


# ============================================================
# PHASE 1 - ENVIRONMENT / SCOPE
# ============================================================

phase1() {
    echo "=== Phase 1: Environment and Scope ==="

    echo "[+] Frontend:"
    echo "${BASE_URL}"

    echo "[+] Backend:"
    echo "${API}"

    echo "[+] Audit directory:"
    echo "${AUDIT_DIR}"

    mkdir -p \
        "${AUDIT_DIR}/reconnaissance" \
        "${AUDIT_DIR}/scans" \
        "${AUDIT_DIR}/screenshots" \
        "${AUDIT_DIR}/findings/critical" \
        "${AUDIT_DIR}/findings/high" \
        "${AUDIT_DIR}/findings/medium" \
        "${AUDIT_DIR}/findings/low" \
        "${AUDIT_DIR}/findings/informational" \
        "${AUDIT_DIR}/report"

    echo "[+] Audit directories verified."
}


# ============================================================
# PHASE 2 - DNS / BASIC RECONNAISSANCE
# ============================================================

phase2() {
    echo "=== Phase 2: DNS Reconnaissance ==="

    dig "${TARGET}" A
    dig "${TARGET}" AAAA
    dig "${TARGET}" CNAME
    dig "${TARGET}" MX
    dig "${TARGET}" TXT
}


# ============================================================
# PHASE 3 - HTTP / HTTPS BEHAVIOUR
# ============================================================

phase3() {
    echo "=== Phase 3: HTTP / HTTPS ==="

    echo "[+] HTTP redirect check"
    curl -I "http://${TARGET}"

    echo
    echo "[+] HTTPS response"
    curl -I "${BASE_URL}"

    echo
    echo "[+] Backend HTTP redirect"
    curl -I "http://eugenedelagogah.onrender.com"

    echo
    echo "[+] Backend HTTPS"
    curl -I "${API}"
}


# ============================================================
# PHASE 4 - TLS
# ============================================================

phase4() {
    echo "=== Phase 4: TLS Inspection ==="

    openssl s_client \
        -connect "${TARGET}:443" \
        -servername "${TARGET}" \
        </dev/null
}


# ============================================================
# PHASE 5 - SECURITY HEADERS
# ============================================================

phase5() {
    echo "=== Phase 5: Security Headers ==="

    for path in / /about /projects /skills /experience /awards
    do
        echo
        echo "----- ${path} -----"

        curl -sSI "${BASE_URL}${path}" | grep -iE \
        'content-security-policy|strict-transport-security|x-content-type-options|x-frame-options|referrer-policy|permissions-policy|cache-control|access-control'
    done
}


# ============================================================
# PHASE 6 - COMMON SENSITIVE FILE CHECKS
# ============================================================

phase6() {
    echo "=== Phase 6: Sensitive File Exposure ==="

    paths=(
        "/.env"
        "/.git/config"
        "/package.json"
        "/package-lock.json"
        "/config.json"
        "/backup.zip"
        "/database.sql"
        "/debug"
        "/admin"
        "/login"
        "/dashboard"
        "/cms"
    )

    for path in "${paths[@]}"
    do
        status=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${path}")
        printf "%-30s %s\n" "${path}" "${status}"
    done
}


# ============================================================
# PHASE 7 - BACKEND DISCOVERY
# ============================================================

phase7() {
    echo "=== Phase 7: Backend Discovery ==="

    paths=(
        "/.env"
        "/.git/config"
        "/package.json"
        "/package-lock.json"
        "/docs"
        "/redoc"
        "/openapi.json"
    )

    for path in "${paths[@]}"
    do
        status=$(curl -s -o /dev/null -w "%{http_code}" "${API}${path}")
        printf "%-30s %s\n" "${path}" "${status}"
    done
}


# ============================================================
# PHASE 8 - PUBLIC API
# ============================================================

phase8() {
    echo "=== Phase 8: Public API Review ==="

    curl -i "${API}/api/public/content"
}


# ============================================================
# PHASE 9 - HTTP METHOD TESTING
# ============================================================

phase9() {
    echo "=== Phase 9: HTTP Methods ==="

    ENDPOINT="${API}/api/public/content"

    for method in GET POST PUT PATCH DELETE OPTIONS
    do
        echo
        echo "----- ${method} -----"

        curl -s \
            -o /dev/null \
            -w "HTTP %{http_code}\n" \
            -X "${method}" \
            "${ENDPOINT}"
    done
}


# ============================================================
# PHASE 10 - CORS
# ============================================================

phase10() {
    echo "=== Phase 10: CORS Testing ==="

    curl -i \
        -H "Origin: https://example.com" \
        "${API}/api/public/content"
}


# ============================================================
# PHASE 11 - AUTHENTICATION NEGATIVE TESTS
# ============================================================

phase11() {
    echo "=== Phase 11: Authentication / Access Control ==="

    echo
    echo "[+] No authentication"
    curl -i "${API}/api/admin/profile"

    echo
    echo "[+] Invalid development user"
    curl -i \
        -H "X-Dev-User-ID: 999999999" \
        "${API}/api/admin/profile"

    echo
    echo "[+] Invalid Telegram initData"
    curl -i \
        -H "X-Telegram-Init-Data: audit-invalid-data" \
        "${API}/api/admin/profile"
}


# ============================================================
# PHASE 12 - RATE LIMIT OBSERVATION
# ============================================================

phase12() {
    echo "=== Phase 12: Rate Limit Observation ==="

    for i in {1..20}
    do
        code=$(curl -s \
            -o /dev/null \
            -w "%{http_code}" \
            "${API}/api/public/content")

        echo "Request ${i}: HTTP ${code}"

        sleep 0.2
    done

    echo
    echo "[+] Rate-limit related response headers"

    curl -sSI "${API}/api/public/content" | grep -iE \
        'rate|limit|remaining|retry-after' || true
}


# ============================================================
# PHASE 13 - BACKEND SECURITY TESTS
# ============================================================

phase13() {
    echo "=== Phase 13: Backend Security Tests ==="

    echo
    echo "Run this phase from the backend repository after activating"
    echo "the project's Python virtual environment."
    echo

    echo "Command:"
    echo
    echo 'python -m unittest -v tests.test_security tests.test_backend_regressions'
    echo
    echo "Baseline during assessment:"
    echo "19 tests passed."
}


# ============================================================
# PHASE 14 - CSP REVIEW
# ============================================================

phase14() {
    echo "=== Phase 14: CSP Review ==="

    curl -sSI "${BASE_URL}" | grep -i \
        "content-security-policy"
}


# ============================================================
# PHASE 15 - JAVASCRIPT MIME CHECK
# ============================================================

phase15() {
    echo "=== Phase 15: JavaScript MIME Types ==="

    scripts=(
        "/js/loader.js"
        "/js/analytics.js"
        "/js/index.js"
        "/js/cms-config.js"
        "/js/cms.js"
    )

    for script in "${scripts[@]}"
    do
        echo
        echo "----- ${script} -----"

        curl -sSI "${BASE_URL}${script}" | grep -iE \
            'HTTP/|content-type|x-content-type-options'
    done
}


# ============================================================
# PHASE 16 - SOURCE MAP CHECK
# ============================================================

phase16() {
    echo "=== Phase 16: JavaScript Source Maps ==="

    scripts=(
        "loader"
        "analytics"
        "index"
        "cms-config"
        "cms"
    )

    for script in "${scripts[@]}"
    do
        status=$(curl -s \
            -o /dev/null \
            -w "%{http_code}" \
            "${BASE_URL}/js/${script}.js.map")

        echo "${script}.js.map -> HTTP ${status}"
    done
}


# ============================================================
# PHASE 17 - OWASP ZAP
# ============================================================

phase17() {
    echo "=== Phase 17: OWASP ZAP ==="

    echo
    echo "OWASP ZAP was used for the automated assessment."
    echo
    echo "Target:"
    echo "${BASE_URL}"
    echo
    echo "The generated report is stored at:"
    echo
    echo "scans/zap-public-portfolio-report.html"
    echo
    echo "Scanner results were manually reviewed before being"
    echo "classified as confirmed findings."
}


# ============================================================
# PHASE 18 - FINAL FINDINGS
# ============================================================

phase18() {
    echo "=== Phase 18: Assessment Summary ==="

    cat <<EOF

Confirmed findings:

Critical:      0
High:          0
Medium:        0
Low:           2
Informational: 1

Findings:

001 - Public API Data Minimization
      Informational

002 - Content Security Policy Hardening
      Low

003 - Application-Level Rate Limiting
      Low

EOF
}


# ============================================================
# HELP
# ============================================================

show_help() {

    cat <<EOF

Portfolio Security Audit Command Reference

Usage:

    ./audit-commands.sh <phase>

Examples:

    ./audit-commands.sh phase2
    ./audit-commands.sh phase5
    ./audit-commands.sh phase10

Available phases:

    phase1   Environment / Scope
    phase2   DNS Reconnaissance
    phase3   HTTP / HTTPS
    phase4   TLS Inspection
    phase5   Security Headers
    phase6   Sensitive File Checks
    phase7   Backend Discovery
    phase8   Public API Review
    phase9   HTTP Methods
    phase10  CORS
    phase11  Authentication Tests
    phase12  Rate Limit Observation
    phase13  Backend Tests
    phase14  CSP Review
    phase15  JavaScript MIME Types
    phase16  Source Maps
    phase17  OWASP ZAP Reference
    phase18  Final Findings

This script is intended for authorized testing only.

EOF
}


# ============================================================
# COMMAND ROUTER
# ============================================================

case "${1:-help}" in

    phase1)  phase1 ;;
    phase2)  phase2 ;;
    phase3)  phase3 ;;
    phase4)  phase4 ;;
    phase5)  phase5 ;;
    phase6)  phase6 ;;
    phase7)  phase7 ;;
    phase8)  phase8 ;;
    phase9)  phase9 ;;
    phase10) phase10 ;;
    phase11) phase11 ;;
    phase12) phase12 ;;
    phase13) phase13 ;;
    phase14) phase14 ;;
    phase15) phase15 ;;
    phase16) phase16 ;;
    phase17) phase17 ;;
    phase18) phase18 ;;

    help|--help|-h)
        show_help
        ;;

    *)
        echo "Unknown phase: $1"
        echo
        show_help
        exit 1
        ;;

esac