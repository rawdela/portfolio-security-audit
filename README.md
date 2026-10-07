# Portfolio Security Audit

A structured, authorized security assessment of my personal portfolio website and its supporting CMS/API infrastructure.

## Targets

- Public portfolio: `https://eugenedelagogah.vercel.app`
- Backend/API and Telegram CMS: `https://eugenedelagogah.onrender.com`
- CMS Mini App: `https://eugenedelagogah.onrender.com/app`

## Authorization

This assessment was performed against systems I own and control. Testing was non-destructive and excluded denial-of-service, destructive database actions, and attacks against third-party infrastructure.

## Methodology

The assessment combined manual testing, source-assisted review, backend regression testing, and OWASP ZAP automated scanning.

Coverage included:

- DNS and hosting reconnaissance
- HTTP/HTTPS and TLS validation
- Security headers and Content Security Policy
- Information disclosure checks
- CORS behavior
- HTTP method and error handling
- XSS and output encoding
- Unsafe URL scheme validation
- Authentication and authorization
- File upload security
- Input validation and injection resistance
- API abuse / rate-limiting review
- Automated vulnerability scanning and manual verification

## Final Findings

| ID  | Severity      | Finding                                         | Status                    |
| --- | ------------- | ----------------------------------------------- | ------------------------- |
| 001 | Informational | Public API Data Minimization                    | Open / Review Recommended |
| 002 | Low           | Content Security Policy Hardening               | Open                      |
| 003 | Low           | Application-Level Rate Limiting Not Implemented | Open                      |

### Finding Count

- Critical: 0
- High: 0
- Medium: 0
- Low: 2
- Informational: 1

## Controls Verified

The assessment also confirmed several effective controls:

- HTTP redirects to HTTPS
- TLS 1.3 with valid certificate verification
- HSTS, `nosniff`, Referrer-Policy, Permissions-Policy and `X-Frame-Options`
- No exposed `.env`, `.git/config`, package manifests or common backup files
- Public API rejects unsupported write methods
- Production OpenAPI/docs disabled
- Telegram-signed authentication enforced for admin routes
- Unauthorized Telegram users blocked from CMS access
- Fake development user headers rejected in production
- Stored CMS text safely escaped in tested fields
- `javascript:` project URLs rejected
- File uploads require admin authentication and validate extension, MIME, size, and file signatures
- Backend security/regression test suite: 19/19 passing
- No confirmed SQL injection, NoSQL injection, stored XSS, DOM XSS, reflected XSS, auth bypass, or unrestricted file upload vulnerability

## Automated Scan

OWASP ZAP 2.17.0 was run against the public portfolio. ZAP reported 12 alert types with no High-risk alerts. Scanner results were manually reviewed and consolidated to avoid duplicate or false-positive findings.

The CSP alerts were merged into Finding 002. Other alerts were classified as expected behavior, informational hardening, or false positives after manual verification.

## Reproducible Testing Commands

The repository includes an [`audit-commands.sh`](./audit-commands.sh)
reference script containing the terminal commands used throughout the
assessment.

The commands are organized by testing phase and must be executed explicitly.

Example:

```bash
chmod +x audit-commands.sh
./audit-commands.sh --help
./audit-commands.sh phase5
```

## Repository Structure

<pre>
portfolio-security-audit/
├── README.md
├── LICENSE
├── SECURITY.md
├── scope.md
├── audit-commands.sh
├── evidence-index.md
├── findings/
│   ├── critical/
│   ├── high/
│   ├── medium/
│   ├── low/
│   └── informational/
├── reconnaissance/
├── scans/
├── screenshots/
├── report/
└── docs/
</pre>

## Key Reports

- `report/security-audit-report.md` — full assessment report
- `report/automated-scan-review.md` — OWASP ZAP review
- `report/file-upload-security.md` — file-upload assessment
- `report/input-validation-injection.md` — validation/injection assessment
- `evidence-index.md` — evidence map

## Disclaimer

This repository documents an authorized security assessment of systems owned by the repository author. Do not use the commands, techniques, or workflows in this repository against systems you do not own or do not have explicit permission to test.

## License

Released under the MIT License. See `LICENSE`.
