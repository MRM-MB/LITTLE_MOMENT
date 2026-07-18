# Contributing to Little Moment

The goal is a lightweight, expressive photo-frame editor that works entirely in the browser. Contributions should make Little Moment easier to use, more reliable to export, or more delightful without adding unnecessary setup.

## Before You Start

1. Fork the repository.
2. Create a focused branch, such as `improve-emoji-search`, `add-export-option`, or `fix-mobile-layout`.
3. Open `index.html` directly in a modern browser, or run a local static server:

```powershell
py -m http.server 4173
```

Then open `http://localhost:4173`.

## App Changes

- Keep the app browser-only unless the change clearly requires a build step.
- Put behavior changes in `app.js`, visual changes in `styles.css`, and markup changes in `index.html`.
- Preserve the existing editor flow: choose an image, decorate the frame, optionally add a note, then export a PNG.
- Test image upload, note toggling, emoji add/search/edit behavior, and PNG export after your change.
- Check the layout on both desktop and mobile-width screens.

## Assets

- Put project images in `assets/images/`.
- Keep image files reasonably small so the project remains quick to load.
- Use descriptive filenames that explain what the asset is for.
- Do not add generated exports or personal test photos to the repository.

## Pull Requests

- Keep each pull request focused on one feature, one fix, or one visual improvement.
- Include what changed and the browser you tested in.
- Include the command or workflow you used, such as opening `index.html` or running `py -m http.server 4173`.
- Add screenshots or a short screen recording for visible UI changes.
- Be constructive when reviewing design or interaction changes. The point is to keep the editor simple, warm, and fun to use.