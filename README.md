# Healthcare Provider Finder App

A full-stack mobile app that helps users locate nearby healthcare providers based on their symptoms or conditions and ZIP code. Built using **React Native (via Snack)** and **Node.js/Express (via Replit)**, this app uses the CMS NPI Registry API and Google Maps to deliver fast, accurate, and location-specific provider results.

---

## 🔗 Live Demo

- 📱 Frontend (Snack): [Healthcare Recommendation App on Snack](https://snack.expo.dev/@poojitha_dontineni/healthcare-recommendation-app-_-no-camera?platform=web)
- 🖥️ Backend (Replit): [Server.js on Replit](https://replit.com/@stonebrookashle/Serverjs#index.js)

---

## Features

- 🔎 Smart search for providers by condition + ZIP
- 🧠 Auto-maps user symptoms to 30+ specialties
- 🗺️ Google Maps integration for viewing addresses
- 🧱 Backend logic with NPI Registry API
- 🔐 Built-in rate limiting for API protection
- 📱 Clean React Native UI

---

## Tech Stack

| Layer        | Technology                |
|--------------|----------------------------|
| Frontend     | React Native (Expo Snack)  |
| Backend      | Node.js, Express.js        |
| APIs         | NPI Registry, Google Maps  |
| Security     | express-rate-limit, CORS   |

---

## Condition-to-Specialty Mapping

Examples of smart backend condition mapping:

| User Input      | Mapped Specialty       |
|------------------|------------------------|
| back pain        | Chiropractor           |
| migraine         | Neurology              |
| depression       | Psychiatry             |
| joint pain       | Orthopedic Surgery     |
| rash             | Dermatology            |

_(See full logic in `backend/index.js`, `mapConditionToTaxonomy()` function)_

---

## Running the App

Since this was built on cloud platforms:

### ▶ Frontend
- Open the Snack link above to test and edit the React Native app in-browser.

### ▶ Backend
- Visit the Replit link to run or inspect the backend server.
- Or copy the code and run locally:
  ```bash
  npm install
  node index.js
