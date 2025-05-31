
// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch schemes from Firestore
const schemeContainer = document.getElementById("scheme-container");

getDocs(collection(db, "schemes")).then(querySnapshot => {
  querySnapshot.forEach(doc => {
    const data = doc.data();

    if (data && data.scheme) {
      const scheme = data.scheme;
      const title = scheme.title || "कोई शीर्षक नहीं";
      const description = scheme.description || "विवरण उपलब्ध नहीं है।";
      const applyLink = scheme.applyLink || "#";

      const schemeCard = `
        <div class="scheme-card">
          <h2>${title}</h2>
          <p>${description}</p>
          <a href="${applyLink}" target="_blank">Apply Now</a>
        </div>
      `;

      schemeContainer.innerHTML += schemeCard;
    } else {
      console.warn(`⚠️ Missing 'scheme' data in document: ${doc.id}`);
    }
  });
}).catch(error => {
  console.error("❌ Error loading schemes:", error);
});
