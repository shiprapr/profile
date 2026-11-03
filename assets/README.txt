HOW TO CHANGE IMAGES IN YOUR PORTFOLIO
========================================

All media assets are kept in this "assets/" folder and configured in "js/config.js".
You can replace any image at any time — just overwrite the file or change the path in "js/config.js".

1. PROFILE PICTURE
------------------
File: assets/profile.jpg
- Replace this file with your own photo (JPG, PNG, or WebP).
- Config line in js/config.js:
    photo: "assets/profile.jpg"
- Appears in:
  - The desktop intro card centerpiece.
  - The mobile quick view circular avatar.

2. STICKER ICONS & IMAGES
-------------------------
Folder: assets/stickers/
- Current files:
  - about.svg
  - tech.svg
  - journey.svg
  - creative.svg
  - reads.svg
  - connect.svg
- You can replace these SVG files with your own SVGs, OR drop in PNG/JPG/WebP files (e.g., about.png) and update the `img` path for that sticker in js/config.js:
    img: "assets/stickers/about.png"
- If you remove the `img` property entirely from a sticker in js/config.js, it will fall back to displaying the emoji `icon`.
