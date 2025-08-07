# Contributing Guidelines

Thank you for your interest in contributing to **YourTripPlanner**! We welcome all kinds of contributions — from reporting bugs and submitting feature requests to writing code, updating documentation, or improving UI/UX.

---

## 🛠 How to Contribute

### 1. Fork the Repository
Click the **Fork** button at the top-right corner of this repository.

### 2. Clone Your Fork
```bash
git clone https://github.com/<your-username>/trip-planner.git
cd trip-planner
```

### 3. Set Upstream Remote (Only Once)
```bash
git remote add upstream https://github.com/code-well0/trip-planner.git
```

### 4. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 5. Make and Test Your Changes
- Follow the file structure and naming conventions.
- Use clean, modular code.
- If modifying UI components, test locally using:
```bash
npm install
npm run start
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "Add: your meaningful commit message"
```

### 7. Sync with Upstream (Optional Before Pushing)
```bash
git fetch upstream
git rebase upstream/main
```

### 8. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```
Then go to your fork on GitHub and open a Pull Request to the `main` branch.

---

## 📂 Project Structure

```plaintext
trip-planner/
├── public/                # Static files (HTML, images, favicon)
├── src/                   # Core application source code
│   ├── Components/        # Reusable UI components like Navbar, Footer, etc.
│   ├── pages/             # React pages like Home, Signup, PlanTrip, etc.
│   └── index.js           # Entry point for React
├── .vscode/               # Editor-specific settings
├── backend/               # Node/Express backend server & routes
├── README.md              # Project overview and setup
├── GEMINI_SETUP.md        # Setup guide for Google Gemini chatbot
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
├── CODE_OF_CONDUCT.md     # Contributor behavior guidelines
└── LICENSE                # Licensing information
```

---

## ✅ Contribution Tips

- Keep pull requests **small and focused**
- Test before submitting
- Write clear and meaningful commit messages
- Ensure consistency in formatting and naming conventions
- Update README/Docs if required

---

## 🧾 Code of Conduct

By participating, you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 🤝 Need Help?

Feel free to open a GitHub Issue or start a Discussion for questions, suggestions, or clarifications.

---

Happy Contributing! 💡
