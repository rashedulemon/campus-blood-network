# Campus Blood Network

A modern, full-stack university blood donor management platform designed to connect students for emergency blood donations.

## 🚀 Features

- **Mobile-first Design:** Built with a clean, medical-themed UI using Tailwind CSS.
- **Real-time Emergency Requests:** Find donors urgently matching exact blood groups.
- **Advanced Donor Search:** Filter by blood group, department, and current availability.
- **Secure Authentication:** Firebase-powered role-based access (Student, Admin).
- **Admin Dashboard:** Monitor platform statistics, manage users, and handle emergencies.
- **PWA Support:** Installable on mobile devices for quick access.

## 🛠️ Technology Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS, Framer Motion
- **Icons:** Lucide React
- **Backend/Database:** Firebase Authentication & Firestore
- **Deployment:** GitHub Pages & Firebase Hosting compatibility

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.x or later)
- Git
- A Firebase Project (Free Tier is sufficient)

## ⚙️ Setting Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database** (start in production mode, we have security rules defined).
3. Enable **Authentication** and turn on the "Email/Password" sign-in method.
4. Register a "Web App" in your Firebase project settings to get your configuration keys.
5. In your project's root folder, rename `.env.example` to `.env` and fill in your Firebase keys:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

6. Ensure your Firestore security rules match the `firestore.rules` file in this repository.

## 💻 Local Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## 🌐 Deployment to GitHub Pages

1. In `vite.config.js`, verify that the `base` property is set correctly:
   - For a custom domain or user page (`username.github.io`), use `base: '/'`.
   - For a repository page (`username.github.io/repo-name`), use `base: '/repo-name/'`. Currently, it's set to `'./'` which works for most relative path deployments.
2. Ensure `homepage` is set in your `package.json` if necessary (e.g., `"homepage": "https://username.github.io/repo-name"`).
3. Run the deployment script:
   ```bash
   npm run deploy
   ```
4. Go to your GitHub repository settings > Pages, and ensure the source is set to the `gh-pages` branch.

## 🔒 Initial Admin Setup

To create an admin account:
1. Register a new user normally via the application's registration page.
2. Go to your Firebase Console -> Firestore Database -> `users` collection.
3. Find your registered user document and change the `role` field from `"student"` to `"admin"`.
4. Log out and log back in to access the Admin Dashboard.
