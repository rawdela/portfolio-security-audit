# Finding 001 — Public API Data Minimization

**Severity:** Informational  
**Status:** Open / Review Recommended  
**Affected Asset:** https://eugenedelagogah.onrender.com/api/public/content  
**Category:** Information Exposure / Data Minimization

## Description

The public portfolio API endpoint `/api/public/content` is intentionally
accessible without authentication because it supplies content to the public
portfolio.

During testing, the endpoint was observed returning additional metadata beyond
the content required for presentation on the website.

Examples included:

- Internal UUID-style record identifiers
- `sort_order`
- `published`
- `created_at`
- `updated_at`
- Social-link metadata
- A telephone contact value

No passwords, authentication tokens, API keys, credentials, or other secrets
were identified in the tested response.

## Security Impact

The observed metadata does not currently provide direct administrative access
or demonstrate a security compromise.

However, unnecessary internal metadata increases the amount of implementation
information exposed to unauthenticated users.

The telephone number should also only remain in the public API if its public
exposure is intentional.

## Evidence

Endpoint tested:

GET /api/public/content

Response:

HTTP 200 OK

The response contained public portfolio information together with internal
record identifiers and metadata.

## Recommendation

Implement a dedicated public API response model/DTO that returns only fields
required by the public portfolio.

For example:

- Name
- Headline
- Biography
- Public social links
- Education
- Experience
- Projects
- Skills
- Certifications
- Required public media URLs

Avoid exposing internal database identifiers, timestamps, publication-control
metadata, or private contact information unless required by the frontend.

## Verification

No credentials or authentication secrets were identified in the public
response.

Authentication testing later confirmed that administrative CMS endpoints
require valid Telegram authentication.

## Conclusion

This issue is classified as Informational because no direct exploitation or
unauthorized access was demonstrated.

The recommendation is primarily based on reducing unnecessary public exposure
and following the principle of data minimization.
