## File Upload Test 2 — Client-Side Size Limit

**Test File:** `oversize-test.pdf`  
**Approximate Size:** 6 MiB  
**Configured Limit:** 5 MiB

**Observed Result:**  
The CMS rejected the selected file with:

`Upload exceeds 5 MiB`

**Result:** PASS — Client-Side Validation

**Conclusion:**  
The CMS interface prevents files larger than 5 MiB from being submitted.

Backend enforcement of the 5 MiB limit has not yet been independently
verified because the request was blocked before reaching the upload endpoint.