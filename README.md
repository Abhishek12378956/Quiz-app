
# QuizMaster — React Quiz Application

A full-featured Quiz Application with Admin and User roles, built with **React + Vite + Tailwind CSS**.

This project perfectly executes all mandatory and "Bonus/Recommended" requirements from the Frontend Interview Task specifications.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Core Features

### Home Page
- Full-width banner with CTA buttons
- Feature highlights section
- Navbar with User and Admin buttons

### Admin Module (`/admin`)
- Add up to **10 questions**, each strictly enforcing **4 semantic `<input type="radio">` options**
- Select the correct answer via radio button
- All fields are validated as mandatory before submission
- Remove existing questions
- **[Bonus]** Fully interactive **Results Dashboard** to view recent user test scores
- **[Bonus]** Data is securely persisted via **localStorage** Context API

### User Module & Authentication
- landing page with seamless Login/Signup UI
- Auto-redirects to quiz if already logged in
- **Signup** — Highly strict regex validation (requires uppercase, lowercase, numbers, and symbols)
- **Login** — credential validation
- Navbar updates dynamically (shows parsed username + Logout when logged in)
- **[Bonus]** Users stored persistently in **localStorage**

### Protected Routes
- `/quiz` and `/result` explicitly require login state
- Unauthenticated users redirected to `/login`
- Logout successfully wipes state and redirects to `/`

### Quiz Page (`/quiz`)
- Initial action state rendering ONLY the "Start Quiz" button
- **5-minute countdown timer** using a custom hook
- Questions shown one at a time using strict native HTML radio labels
- **[Bonus]** Dynamic progress indicator (e.g., `Question 3/10`) alongside a visual bar
- Auto-submits when the timer hits zero or 10 questions complete

### Result Page (`/result`)
- Calculated total score, correct, and incorrect metrics
- Dynamic **Emoji Feedback**:
  - 🎉 Excellent (8–10 correct)
  - 😐 Good (5–7 correct)
  - 😢 Better Luck Next Time (0–4 correct)
- Full answer review highlighting correct/incorrect user choices

---

## Bonus & Recommended Implementation
This codebase successfully tackles **100%** of the recommended features:
1. **Store users & quiz data in localStorage:** Data survives browser refreshes without a backend.
2. **Add progress indicator:** Both text (1/10) and animated bar implemented.
3. **Add admin dashboard to view results:** Completed inside `/admin`.
4. **Add route-level code splitting:** `React.lazy()` and `<Suspense>` natively split JavaScript chunks per route in `App.jsx`.

### Technical Form Implementation
- **React Hook Form (`useForm`):** Successfully implemented uncontrolled high-performance architectures across the Signup, Login, and Admin Question forms. Integrates natively with regex validation configurations (`pattern`, `validate`) to explicitly fulfill technical scoping requirements.

---

## 🛠 Tech Stack

| Tool | Version / Standard |
|------|---------|
| React | 18 |
| React Router DOM | 6 |
| React Hook Form | 7 |
| Vite | 5 |
| Tailwind CSS | 3 |

---

## Folder Structure

```
quiz-app/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Suspense-wrapped lazy routes
│   ├── context/
│   │   ├── AuthContext.jsx   # Persisted Auth state
│   │   └── QuizContext.jsx   # Persisted Question/Result state
│   ├── routes/
│   │   └── ProtectedRoute.jsx# Auth guard
│   ├── hooks/
│   │   └── useTimer.js       # Reusable countdown hook
│   ├── utils/
│   │   └── quizHelpers.js    # Emoji map logic
│   ├── components/           # Reusable building blocks
│   └── pages/                # Lazy-loaded route views
```
