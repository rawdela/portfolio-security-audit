# File Upload Security Assessment

## Scope

Endpoint:

POST /api/admin/upload

## Controls Verified

- Administrative authentication is required before upload.
- Allowed extensions are restricted to PNG, JPG, JPEG, WEBP and PDF.
- MIME type is validated.
- Backend reads a maximum of 5 MiB plus one byte and rejects oversized uploads.
- File signatures are validated for PNG, JPEG, WEBP and PDF.
- Uploaded objects are stored using randomized UUID-based filenames.
- Storage content types are explicitly set.
- Upload overwrite/upsert is disabled.

## Manual Tests

### Extension vs Content Mismatch
A plain-text file renamed to `.jpg` was rejected with:

`File content does not match its extension`

Result: PASS

### Oversized File
A ~6 MiB file was rejected by the CMS with:

`Upload exceeds 5 MiB`

Result: PASS

### Unsupported HTML File
An `.html` file could not be selected through the CMS file picker.

Result: PASS

## Source Review

Backend source confirmed:

- extension whitelist
- MIME validation
- 5 MiB server-side limit
- file signature validation
- randomized storage paths
- no overwrite behavior

Existing backend security tests also verify rejection of:

- SVG uploads
- fake PNG content
- files larger than 5 MiB

## Conclusion

No unrestricted file upload vulnerability was identified.

The upload implementation applies validation at both the client and server
layers and uses content-level checks rather than relying solely on filenames
or MIME headers.