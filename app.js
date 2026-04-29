import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- FIREBASE CONFIGURATION ---
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

// Aapka Admin Email
const adminEmail = "miyafolic@protonmail.com";

// --- 1. SIGNUP LOGIC ---
window.register = async () => {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;

    if(!name || !email || !pass) return alert("Please fill all fields");

    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, "users", res.user.uid), {
            name: name,
            email: email,
            balance: 0,
            role: email === adminEmail ? "admin" : "user",
            joinedAt: new Date()
        });
        alert("Account Created Successfully!");
        window.location.href = email === adminEmail ? "admin.html" : "dashboard.html";
    } catch (err) { alert(err.message); }
};

// --- 2. LOGIN LOGIC ---
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
    } catch (err) { alert("Login Failed: Check email/password"); }
};

// --- 3. DEPOSIT LOGIC (For Users) ---
window.submitDeposit = async () => {
    const amount = document.getElementById('deposit-amount').value;
    const utr = document.getElementById('utr-number').value;
    const user = auth.currentUser;

    if(!amount || !utr) return alert("Enter Amount and UTR/Transaction ID");

    try {
        await addDoc(collection(db, "deposits"), {
            uid: user.uid,
            email: user.email,
            amount: Number(amount),
            utr: utr,
            status: "pending",
            time: new Date().toLocaleString()
        });
        alert("Payment Submitted! Wait for Admin approval.");
    } catch (err) { alert("Error: " + err.message); }
};

// --- 4. DATA LISTENERS (Real-time updates) ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Balance update for Dashboard
        const balEl = document.getElementById('balance-amount');
        const nameEl = document.getElementById('user-name-display');
        
        if (balEl) {
            onSnapshot(doc(db, "users", user.uid), (doc) => {
                if(doc.exists()) {
                    balEl.innerText = doc.data().balance || 0;
                    if(nameEl) nameEl.innerText = doc.data().name;
                }
            });
        }

        // Admin Panel Loading
        if (window.location.pathname.includes("admin.html")) {
            loadAdminData();
        }
    }
});

// --- 5. ADMIN PANEL ACTIONS ---
function loadAdminData() {
    const depositList = document.getElementById('deposit-requests-list');
    const userList = document.getElementById('all-users-list');

    // Show pending deposits
    onSnapshot(collection(db, "deposits"), (snapshot) => {
        if(!depositList) return;
        depositList.innerHTML = "";
        snapshot.forEach((snap) => {
            const data = snap.data();
            if(data.status === "pending") {
                depositList.innerHTML += `
                    <div class="p-4 bg-gray-700 rounded mb-3">
                        <p class="text-sm">User: ${data.email}</p>
                        <p class="text-lg font-bold">₹${data.amount}</p>
                        <p class="text-xs text-blue-300">UTR: ${data.utr}</p>
                        <button onclick="approvePayment('${snap.id}', '${data.uid}', ${data.amount})" 
                                class="bg-green-500 w-full mt-2 py-1 rounded font-bold">Approve</button>
                    </div>`;
            }
        });
    });
}

window.approvePayment = async (reqId, userId, amount) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const newBalance = (userSnap.data().balance || 0) + amount;

    await updateDoc(userRef, { balance: newBalance });
    await updateDoc(doc(db, "deposits", reqId), { status: "approved" });
    alert("Payment Approved! Balance Updated.");
};
