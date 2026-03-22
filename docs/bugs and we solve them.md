# Bugs and We Solve Them

This document tracks bugs encountered during development and the solutions applied. Add each bug as a new entry with a clear description and the steps taken to resolve it.

---

## 1. How We Solved Media Display Issues (March 22, 2026)

**Description:**
- Images and videos uploaded to Cloudinary were not displaying in the user interface, even though uploads were successful and media existed in Cloudinary.
- The issue affected both images and videos, and appeared after recent development changes.

**Solution:**
- Investigated the frontend and backend code to ensure correct property names (`imageUrl`, `videoUrl`) were used consistently in both the database and React components.
- Updated the frontend `Startup` interface and all usages to expect `imageUrl` and `videoUrl` instead of `logoUrl` or other names.
- Added debug logging to the frontend to verify the API response structure and media URLs.
- Fixed a TypeScript type error for video playback button.
- Confirmed that the backend API returns the correct fields and that the frontend renders them properly.
- After these changes, images and videos displayed correctly in the UI.

---

*Add new bugs and solutions below as they are encountered and resolved.*
