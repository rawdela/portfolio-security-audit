# Automated Vulnerability Scan Review

## Tool

OWASP ZAP 2.17.0

## Target

https://eugenedelagogah.vercel.app

## Scan Scope

Public portfolio only.

The authenticated Telegram CMS was not included in the automated active scan.

## ZAP Summary

ZAP reported:

- High: 0
- Medium: 6 alert types
- Low: 1 alert type
- Informational: 5 alert types

Scanner severity ratings were manually reviewed before inclusion in the final
assessment.

## Manual Classification

### CSP Alerts

ZAP identified:

- missing CSP directives without fallback
- broad CSP source directives
- `script-src 'unsafe-inline'`
- `style-src 'unsafe-inline'`

Classification:

Already covered by Finding 002 — Content Security Policy Hardening.

### Cross-Domain Misconfiguration

ZAP identified:

`Access-Control-Allow-Origin: *`

on public static portfolio responses.

The affected content is intentionally public and does not contain authenticated
or user-specific data.

Separate backend CORS testing did not permit an arbitrary origin to access the
backend API.

Classification:

Not a confirmed vulnerability.

### Subresource Integrity

ZAP identified an external Google Analytics / Google Tag Manager script without
an SRI integrity attribute.

Classification:

Informational hardening observation.

No separate vulnerability finding created.

### Cross-Domain JavaScript Inclusion

Google Analytics is intentionally loaded from Google's external domain.

Classification:

Expected third-party dependency / informational.

### Suspicious Comments

ZAP identified normal JavaScript developer comments as potentially suspicious.

Manual review did not identify credentials, secrets, debugging information, or
sensitive implementation details.

Classification:

False positive.

### Cache Alerts

ZAP identified caching behavior on public static content.

The portfolio is intentionally delivered through Vercel caching infrastructure
and the affected responses are public resources.

Classification:

Informational / expected behavior.

### Modern Web Application

ZAP identified the site as JavaScript-enabled.

Classification:

Informational only.

### User Agent Fuzzer

ZAP tested alternate User-Agent values.

No security-relevant access-control difference was identified.

Classification:

Informational only.

## Conclusion

The automated scan did not identify a new Critical, High, or independently
confirmed Medium-severity vulnerability.

Relevant CSP observations were consolidated into the existing CSP hardening
finding.

All other scanner alerts were classified as informational, expected behavior,
or false positives following manual verification.