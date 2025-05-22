BeyondChats Assessment

Deploy Link: https://beyondchats-assessment-one.vercel.app/

---

## 🚀 Getting Started

### 1. Clone the Repository

Clone this project to your local machine:

```bash
gh repo clone LivingWithPaaji/beyondchats-assessment
cd intercom-clone
```

### 2. Install Dependencies

This project uses [React](https://react.dev/) and [Vite](https://vitejs.dev/) for fast development. To install all required dependencies, run:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the URL shown in your terminal (usually [http://localhost:5173](http://localhost:5173)) in your browser to view the app.

---

## 🛠 Editing the Project

1. **Open the project folder** in your code editor (VS Code).
2. **Edit the main files:**
   - `src/IntercomClone.jsx` — Main React component for the chat UI.
   - `src/IntercomClone.css` — Main CSS file for all styles and responsive behavior.
   - `src/assets/` — Contains images and icons used in the UI.
3. **Save your changes.** The development server will automatically reload the app in your browser.

### Example: Editing the Chat UI
- To change the chat layout, update `src/IntercomClone.jsx`.
- To adjust colors, spacing, or responsiveness, edit `src/IntercomClone.css`.

---

## 📦 Project Structure

```
intercom-clone/
├── src/
│   ├── IntercomClone.jsx      # Main React component
│   ├── IntercomClone.css      # Main CSS for styling
│   ├── assets/                # Images and icons
│   └── ...
├── package.json               # Project dependencies and scripts
├── README.md                  # This file
└── ...
```

---

## 📋 Dependencies

All dependencies are installed automatically with `npm install`. Main dependencies include:

- **react** — UI library
- **react-dom** — DOM bindings for React
- **react-avatar** — For avatar rendering
- **vite** — Fast development/build tool

See `package.json` for the full list.

---

## 📝 Notes

- If you add new dependencies, run `npm install <package-name>` and commit the updated `package.json` and `package-lock.json`.
- To create a production build, run:
  ```bash
  npm run build
  ```

---

## 💡 Customization

- **Change the chat logic:** Edit `src/IntercomClone.jsx` to add new features or connect to a backend.
- **Update styles:** Tweak `src/IntercomClone.css` for colors, fonts, and layout.
- **Replace images:** Swap out files in `src/assets/` for your own branding.

---

## 🙋‍♂️ Need Help?
If you have any questions or want to contribute, feel free to open an issue or pull request!
