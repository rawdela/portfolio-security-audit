# Finding 002 — Content Security Policy Hardening

**Severity:** Low  
**Status:** Open  
**Affected Asset:** https://eugenedelagogah.vercel.app  
**Category:** Security Misconfiguration / Defense in Depth

## Description

The public portfolio implements a Content-Security-Policy (CSP), which provides
an additional browser-side security control against attacks such as
cross-site scripting.

The policy is generally restrictive; however, the `script-src` directive
currently permits:

'unsafe-inline'

The `style-src` directive also permits:

'unsafe-inline'

Additionally, the tested frontend CSP did not include an explicit
`frame-ancestors` directive.

## Security Impact

No exploitable Cross-Site Scripting vulnerability was identified during the
assessment.

However, allowing inline JavaScript reduces the protection provided by CSP if
an HTML/script injection vulnerability is introduced in the future.

The absence of `frame-ancestors` is partially mitigated by the existing:

X-Frame-Options: SAMEORIGIN

header.

Therefore, this finding represents security hardening rather than a confirmed
application compromise.

## Existing Security Controls

The application already implements several strong browser security controls:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy
- Permissions-Policy

These headers were observed consistently across the tested frontend pages.

## Recommendation

Where practical:

1. Remove `'unsafe-inline'` from `script-src`.
2. Use CSP nonces or cryptographic hashes for required inline scripts.
3. Add an explicit directive such as:

   frame-ancestors 'self';

4. Retain `X-Frame-Options: SAMEORIGIN` for compatibility and defense in depth.
5. Test the updated CSP before production deployment to prevent legitimate
   scripts from being blocked.

## Verification

Manual CMS testing was performed using HTML-like input:

XSS-AUDIT-TEST <b>SHOULD-NOT-BE-BOLD</b>

The application displayed the markup as literal text instead of interpreting
it as HTML.

A `javascript:` repository URL was also rejected by the CMS with:

Invalid URL in repo_url

Therefore, no stored or DOM-based XSS vulnerability was confirmed during the
tests performed.

## Automated Scanner Verification

OWASP ZAP independently identified several CSP hardening concerns, including:

- missing `frame-ancestors`
- missing `form-action`
- `script-src 'unsafe-inline'`
- `style-src 'unsafe-inline'`
- broadly defined `img-src https:`
- broadly defined `frame-src https:`

These alerts were manually reviewed and consolidated into this single finding
rather than recorded as separate vulnerabilities.

No exploitable Cross-Site Scripting vulnerability was demonstrated during the
assessment.

## Conclusion

The CSP is already substantially better than having no CSP.

This finding is classified as Low because the identified weakness reduces a
defense-in-depth control, but no exploitable XSS vulnerability was demonstrated
during testing.
