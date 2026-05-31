// BattlexArena - Firebase Config via Netlify Environment Variables
// Netlify injects env vars at build time via netlify.toml snippet injection
// OR use netlify-plugin-inline-env-vars
// For pure static sites: use window._env_ pattern via Netlify snippet injection

const firebaseConfig = {
  apiKey: window._env_.FIREBASE_API_KEY,
  authDomain: window._env_.FIREBASE_AUTH_DOMAIN,
  databaseURL: window._env_.FIREBASE_DATABASE_URL,
  projectId: window._env_.FIREBASE_PROJECT_ID,
  storageBucket: window._env_.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window._env_.FIREBASE_MESSAGING_SENDER_ID,
  appId: window._env_.FIREBASE_APP_ID,
  measurementId: window._env_.FIREBASE_MEASUREMENT_ID
};

export { firebaseConfig };
