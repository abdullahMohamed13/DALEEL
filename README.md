# 🤝 Contributing to Daleel

Welcome to the Daleel project! This guide explains how each team member should set up their environment and safely push their work. Please read it fully before touching anything.

---

<!-- ## 📁 Project Structure

```
DALEEL/
├── frontend/     → Marketing website & web app (React + TypeScript)
├── backend/      → API & server logic
├── ai/           → AI models & integrations
└── mobile/       → Mobile application
``` -->

Each team works **only inside their folder**, on **their own branch**. Do not touch other folders.

---

<!-- ## 🌿 Branch Map

| Team       | Branch     | Folder      |
|------------|------------|-------------|
| Frontend   | `frontend` | `frontend/` |
| Backend    | `backend`  | `backend/`  |
| AI         | `ai`       | `ai/`       |
| Mobile     | `mobile`   | `mobile/`   | -->

> ⚠️ **Never push directly to `main`.** Only the project owner merges into `main` via Pull Requests.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abdullahMohamed13/DALEEL.git
cd DALEEL
```

### 2. Switch to your branch

```bash
# Backend team
git checkout backend

# AI team
git checkout ai

# Mobile team
git checkout mobile
```

### 3. Confirm you're on the right branch

```bash
git branch
# The active branch will have a * next to it
```

---

## 📅 Daily Workflow

Follow these steps **every time** you want to push your work.

### Step 1 — Pull the latest changes first (before starting work)

```bash
git pull origin <your-branch>
# Example: git pull origin backend
```

> Always do this before starting to avoid conflicts.

### Step 2 — Do your work inside your folder only

Make sure all your files are inside your designated folder (e.g., `backend/`). Do not create files at the root level or inside another team's folder.

### Step 3 — Pushing your changes

```bash
git add .
git commit -m "feat: short description of what you did"
git push origin <your-branch>
# Example: git push origin backend
```

---

## 🔁 Requesting a Merge into Main

When your work is ready and tested:

1. Go to the repo on GitHub: [github.com/abdullahMohamed13/DALEEL](https://github.com/abdullahMohamed13/DALEEL)
2. Click **Pull Requests** → **New Pull Request**
3. Set **base:** `main` ← **compare:** `your-branch`
4. Write a short description of what's included
5. Submit — the project owner will review and merge

---

## ⚠️ Golden Rules

- ✅ Always work on **your branch only**
- ✅ Always `git pull` before starting
- ✅ Only push files inside **your folder**
- ❌ Never push to `main`
- ❌ Never edit another team's folder
- ❌ Never force push (`git push --force`)

---

## 🆘 Common Issue

**"I have a merge conflict"**
```bash
# Pull first
git pull origin <your-branch>
# Git will show the conflicting files — open them, resolve manually, then:
git add .
git commit -m "fix: resolve merge conflict"
git push origin <your-branch>
```

**"I made changes but forgot to pull first"**
```bash
git stash          # temporarily save your changes
git pull origin <your-branch>
git stash pop      # bring your changes back
```

---

## 📬 Questions?

Reach out to **Abdallah**.