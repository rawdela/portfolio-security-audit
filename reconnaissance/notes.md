# Reconnaissance Notes

## Target

https://eugenedelagogah.vercel.app

## Assessment Date

2026-10-06

## Hosting / Infrastructure

Application hosted on Vercel.

IPv4 addresses observed:

- 216.198.79.67
- 64.29.17.67

No AAAA record observed for the tested hostname.

## HTTP Behaviour

HTTP requests are redirected permanently to HTTPS using HTTP 308.

HTTPS responds successfully over HTTP/2.

## TLS

TLS Version: TLS 1.3
Cipher: TLS_AES_128_GCM_SHA256
Certificate: \*.vercel.app
Issuer: Google Trust Services
Certificate Verification: Successful

No immediate TLS issues identified.

## Security Headers Observed

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

CSP contains 'unsafe-inline' under script-src.
Requires further review before classification.

## Application Routes Observed

- /about
- /skills
- /projects
- /experience
- /awards

## JavaScript Assets

- /js/loader.js
- /js/analytics.js
- /js/main.js
- /js/index.js
- /js/cms-config.js
- /js/cms.js

## Initial Assessment

No confirmed vulnerability identified during initial
DNS, HTTP, HTTPS or TLS reconnaissance.

Further analysis required for client-side JavaScript,
CMS configuration and backend/API attack surface.
