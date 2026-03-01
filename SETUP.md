# 🏠 HappyFamily App — Setup Guide

## Files
- `index.html` — Main app (all-in-one)
- `manifest.json` — PWA manifest for install on Android/iOS
- `sw.js` — Service Worker for offline support

---

## 🚀 Step 1: Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `happyfamily`)
2. Upload all three files: `index.html`, `manifest.json`, `sw.js`
3. Go to **Settings → Pages → Source: Deploy from branch → main → / (root)**
4. Your app will be live at: `https://YOUR_USERNAME.github.io/happyfamily/`

---

## 🔥 Step 2: Setup Firebase (optional — for data sync across devices)

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `happyfamily`
3. Go to **Build → Realtime Database → Create database** (choose "Start in test mode")
4. Go to **Project Settings → Your apps → Add app → Web `</>`**
5. Copy the `firebaseConfig` object
6. Open `index.html`, find the `firebaseConfig` section (around line 400) and paste your config:

```js
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "happyfamily-xyz.firebaseapp.com",
  databaseURL: "https://happyfamily-xyz-default-rtdb.firebaseio.com",
  projectId: "happyfamily-xyz",
  storageBucket: "happyfamily-xyz.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

> ⚠️ Without Firebase config, the app still works using **localStorage** (data stays on your device only).

---

## 📱 Step 3: Install on Mobile

### Android (Chrome)
1. Open the GitHub Pages URL in Chrome
2. Tap the **⋮ menu → "Add to Home screen"**
3. Tap **Add** — it installs like a native app!

### iOS (Safari)
1. Open the GitHub Pages URL in Safari
2. Tap the **Share button (□↑) → "Add to Home Screen"**
3. Tap **Add** — the app icon appears on your home screen!

---

## 📋 How to Use

### Home Tab
- Shows greeting, pending/completed counts, recent tasks

### Assign Tab (➕ button)
- Tap **+** to create a new task list
- Add items with name, quantity, unit
- Assign items to Dinesh 👨, Sushmi 👩, or Both
- Use "Assign all to" toggle to bulk-assign
- Tap **🚀 Create Task List** to save

### Assign Tab (Task view)
- Filter by All / Dinesh / Sushmi
- Add optional comment
- Tap **✓ Done** to mark complete → moves to History

### History Tab
- Shows completed tasks grouped by month

### Stats Tab
- Task distribution between Dinesh and Sushmi
- Completion by day of week
- Smart insights and streaks

---

## 🔒 Firebase Security Rules (recommended for production)

In Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "happyfamily": {
      ".read": true,
      ".write": true
    }
  }
}
```

For better security, add Firebase Authentication later.

---

Made with ❤️ for Dinesh & Sushmi
