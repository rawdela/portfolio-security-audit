## File Upload Test 3 — Disallowed File Type Selection

**Test File:** `upload-test.html`  
**File Type:** HTML  
**Expected Allowed Types:** PNG, JPG, JPEG, WEBP, PDF

**Observed Result:**  
The CMS file picker did not allow the HTML file to be selected.

**Result:** PASS — Client-Side File Type Restriction

**Conclusion:**  
The CMS interface restricts selectable files to the expected upload types.

This confirms client-side file type restrictions. Server-side rejection of
unsupported extensions has not yet been independently verified by this test.