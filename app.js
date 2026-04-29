import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDN9MF8w3EzQmObXv-C8twMXxwcOsBHT7E",
  authDomain: "smart-coin-2f55e.firebaseapp.com",
  projectId: "smart-coin-2f55e",
  storageBucket: "smart-coin-2f55e.firebasestorage.app",
  messagingSenderId: "43438079124",
  appId: "1:43438079124:web:fa572b0c06d7f6a1190881"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// EDIT THIS: Aapka admin email
const adminEmail = "miyafolic@pm.me."; 

// Register Function
window.register = async () => {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, "users", res.user.uid), {
            name: name,
            email: email,
            balance: 0,
            role: "user",
            joinedAt: new Date()
        });
        alert("Account Created! Redirecting...");
        window.location.href = "dashboard.html";
    } catch (err) { alert(err.message); }
};

// Login Function
window.login = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        if (email === adminEmail) {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }
    } catch (err) { alert("Invalid Credentials"); }
};
