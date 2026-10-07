## File Upload Test 1 — Extension vs Content Validation

**Test File:** `upload-test.jpg`  
**Actual Content:** Plain text  
**Claimed Extension:** `.jpg`

**Observed Result:**  
The CMS rejected the upload with:

`File content does not match its extension`

**Result:** PASS

**Conclusion:**  
The backend validates uploaded file content and does not rely only on the
filename extension. No unrestricted file upload vulnerability was identified
from this test.