import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIg8X7TGrRmhed31LOZwqkRA2K8nSVjlI",
  authDomain: "anjanahandicrafts-6e4ce.firebaseapp.com",
  projectId: "anjanahandicrafts-6e4ce",
  storageBucket: "anjanahandicrafts-6e4ce.firebasestorage.app",
  messagingSenderId: "889895915215",
  appId: "1:889895915215:web:587a656ab791a3994bf1ba",
  measurementId: "G-WC6FWG80BB"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

function safe(text) {
  return String(text || "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function ensureAccountControl() {
  let link = document.querySelector(".account-header-btn");
  if (link) return link;
  const header = document.querySelector(".header-main .container, header .container");
  if (!header) return null;
  const wrap = document.createElement("div");
  wrap.className = "header-actions";
  wrap.innerHTML = '<a href="account.html" class="account-header-btn" aria-label="Login or register"><span>Login / Register</span></a>';
  header.appendChild(wrap);
  return wrap.querySelector(".account-header-btn");
}
function render(user) {
  const link = ensureAccountControl();
  if (!link) return;
  if (!user) {
    link.href = "account.html";
    link.classList.remove("account-menu-trigger");
    link.removeAttribute("aria-haspopup");
    link.removeAttribute("aria-expanded");
    link.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path></svg><span>Login / Register</span>';
    document.getElementById("customerAccountMenu")?.remove();
    return;
  }
  const name = (user.displayName || user.email?.split("@")[0] || "Customer").trim();
  link.href = "account.html";
  link.classList.add("account-menu-trigger");
  link.setAttribute("aria-haspopup", "true");
  link.setAttribute("aria-expanded", "false");
  link.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path></svg><span>Hi, ' + safe(name) + '</span><span aria-hidden="true">▾</span>';
  let menu = document.getElementById("customerAccountMenu");
  if (!menu) {
    menu = document.createElement("div");
    menu.id = "customerAccountMenu";
    menu.className = "customer-account-menu";
    menu.hidden = true;
    link.insertAdjacentElement("afterend", menu);
    link.addEventListener("click", event => {
      if (auth.currentUser) {
        event.preventDefault();
        const open = menu.hidden;
        menu.hidden = !open;
        link.setAttribute("aria-expanded", String(open));
      }
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".account-header-btn") && !event.target.closest("#customerAccountMenu")) {
        menu.hidden = true;
        link.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        menu.hidden = true;
        link.setAttribute("aria-expanded", "false");
      }
    });
  }
  menu.innerHTML = '<a href="account.html">My Account & Orders</a><a href="addresses.html">My Addresses</a><button type="button" id="customerSignOut">Sign out</button>';
  menu.querySelector("#customerSignOut").addEventListener("click", async () => {
    try {
      await signOut(auth);
      menu.hidden = true;
      if (window.showToast) window.showToast("You have signed out.", "success");
      else location.href = "account.html";
    } catch (error) {
      if (window.showToast) window.showToast("Could not sign out. Please try again.", "danger");
    }
  });
}
onAuthStateChanged(auth, render);
