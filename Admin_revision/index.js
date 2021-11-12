// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHBUdnlA_3Xd7tWW568q2pXRCe9btDA8c",
  authDomain: "tp-js-admin-93fbe.firebaseapp.com",
  databaseURL: "https://tp-js-admin-93fbe-default-rtdb.firebaseio.com",
  projectId: "tp-js-admin-93fbe",
  storageBucket: "tp-js-admin-93fbe.appspot.com",
  messagingSenderId: "808539597386",
  appId: "1:808539597386:web:507d614ec1f1ddb7a314b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  get,
  ref,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const db = getDatabase();

let admins = [];

function getAllAdmins() {
  fetch(
    "https://tp-js-admin-93fbe-default-rtdb.firebaseio.com/users.json"
  ).then(async (response) => {
    try {
      admins = await response.json();
      console.log(admins);
    } catch (error) {
      console.log(error);
    }
  });
}

const form = document.querySelector("form");
const ul = document.querySelector("ul");

const li = document.createElement("li");

let valuePseudo, valuePassword;
let compteur = 0;
let refus = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  li.innerText = "";
  valuePseudo = document.querySelector('input[type = "text"]');
  console.log(valuePseudo.value);
  valuePassword = document.querySelector('input[type = "password"]');
  console.log(valuePassword.value);

  let adminFirebase = admins.filter(value => value.user == valuePseudo.value && value.password == valuePassword.value);
  console.log(adminFirebase);

  if (adminFirebase.length > 0) {
    location.assign('admin.html');
  } else {
    li.innerText = 'Pseudo et/ou Mot de passe incorrects';
    ul.appendChild(li);
    valuePseudo.value = "";
    valuePassword.value = "";
    compteur++;
    if (compteur == 3) {
      if (refus == 1) {
        li.innerText = "Accès bloqué ! Veuilez contacter le responsable";
        valuePseudo.value = "";
        valuePassword.value = "";
        valuePseudo.disabled = true;
        valuePassword.disabled = true;
      } else {
        li.innerText = "Nombres maximums d'essais atteint, veuillez patienter 5 minutes";
        valuePseudo.value = "";
        valuePassword.value = "";
        valuePseudo.disabled = true;
        valuePassword.disabled = true;
        refus++;
        setTimeout(() => {
          valuePseudo.disabled = false;
          valuePassword.disabled = false;
          compteur = 0;
        }, 5000);
      }

    }

  }
})

getAllAdmins();
