# Campus Past Questions

A responsive, student-facing past-question repository built with HTML, CSS and vanilla JavaScript.

## Run the project
1. Extract the ZIP file.
2. Open the `campus-past-questions` folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Search, filter, preview and download the included sample PDFs.

## Project structure
- `index.html` — page structure
- `css/style.css` — responsive visual design
- `js/data.js` — departments and past-question records
- `js/script.js` — search, filters, department browsing, preview modal and UI behavior
- `documents/` — sample PDF files grouped by department

## Replace sample documents with real past questions
1. Put your PDF in the appropriate folder under `documents/`.
2. Open `js/data.js`.
3. Find the matching sample question record in `questions`.
4. Update `courseCode`, `courseTitle`, `department`, `level`, `semester`, `session`, `year`, `size`, and `file`.
5. Make sure the `file` path matches the exact PDF location and filename.

## Notes and limitations
- All records and files are preloaded locally; this version has no backend or shared database.
- The download counts are sample display data and do not update centrally.
- There is no administrator interface or student registration.
- For deployment, upload the entire folder while preserving the directory structure.
- Use only past-question documents you are authorized to distribute.
