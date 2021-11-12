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

let articles = [];

//recuperation point entree htmlm

const tbody = document.querySelector("tbody");
const container = document.querySelector(".container");

function getAllTvs() {
  fetch(
    "https://tp-js-admin-93fbe-default-rtdb.firebaseio.com/articles.json"
  ).then(async (response) => {
    try {
      articles = await response.json();
      console.log(articles);
      const articlesNode = articles.map((article) => {
        return createArticleElement(article);
      });
      tbody.innerHTML = "";
      tbody.append(...articlesNode);
    } catch (error) {
      console.log(error);
    }
  });
}

// création du formulaire
const form = document.createElement("form");
const inputMarque = document.createElement("input");
const inputResolution = document.createElement("input");
const inputDispo = document.createElement("input");
const inputTaille = document.createElement("input");
const inputPrix = document.createElement("input");
const inputVisible = document.createElement("input");
const inputQte = document.createElement("input");
const inputImg = document.createElement("input");

inputMarque.placeholder = "Marque";
inputResolution.placeholder = "Resolution";
inputDispo.placeholder = "Dispo";
inputTaille.placeholder = "Taille";
inputPrix.placeholder = "Prix";
inputVisible.placeholder = "Visible";
inputQte.placeholder = "Qte";
inputImg.placeholder = "Img";

const btnAdd = document.createElement("button");
btnAdd.innerText = "Ajouter un article";
btnAdd.classList.add("btn");
btnAdd.classList.add("btn-primary");
btnAdd.addEventListener("click", (event) => {
  event.preventDefault();
  ajoutArticle();
  cancel(),
});

const btnModify = document.createElement("button");
btnModify.innerText = "Modify";
btnModify.classList.add("btn");
btnModify.classList.add("btn-success");
btnModify.style.display = "none";

const btnCancel = document.createElement("button");
btnCancel.innerText = "Cancel";
btnCancel.classList.add("btn");
btnCancel.classList.add("btn-danger");
btnCancel.style.display = "none";

form.append(
  inputMarque,
  inputResolution,
  inputDispo,
  inputTaille,
  inputPrix,
  inputVisible,
  inputQte,
  inputImg,
  btnAdd,
  btnModify,
  btnCancel
);

container.append(form);

//methode creation ligne tr dans tableau contenant un article

const createArticleElement = (article) => {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const td6 = document.createElement("td");
  const td7 = document.createElement("td");
  const td8 = document.createElement("td");
  const td9 = document.createElement("td");
  const td10 = document.createElement("td");

  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.classList.add("btn");
  btnEdit.classList.add("btn-success");
  btnEdit.addEventListener("click", () => {
    updateArticle(article);
  });

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.classList.add("btn");
  btnDelete.classList.add("btn-danger");
  btnDelete.addEventListener("click", () => {
    archiverArticle(article);
  });

  td1.innerText = article.id;
  td2.innerText = article.marque;
  td3.innerText = article.resolution;
  td4.innerText = article.dispo;
  td5.innerText = article.taille;
  td6.innerText = article.price;
  td7.innerText = article.visibility;
  td8.innerText = article.qte;
  td9.appendChild(btnEdit);
  td10.appendChild(btnDelete);
  tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10);

  return tr;
};

// ARCHIVER ARTICLE

const archiverArticle = (article) => {
  console.log(article.id);
  updateData(article);
  getAllTvs();
};

function updateData(value) {
  // bouton delete le rend visible ou pas sur le site
  update(ref(db, "articles/" + value.id), {
    visibility: !value.visibility,
  })
    .then(() => {
      getAllTvs();
    })
    .catch((err) => {
      console.log(err);
    });
}

//modifier article

const updateArticle = (article) => {
  inputMarque.value = article.marque;
  inputResolution.value = article.resolution;
  inputDispo.value = article.dispo;
  inputTaille.value = article.taille;
  inputPrix.value = article.price;
  inputQte.value = article.qte;
  inputVisible.value = article.visibility;
  inputImg.value = article.img;
  let id = article.id;
  btnAdd.style.display = "none";
  btnModify.style.display = "block";
  btnCancel.style.display = "block";

  btnModify.addEventListener("click", (event) => {
    event.preventDefault();
    modifyData(
      id,
      inputMarque.value,
      inputResolution.value,
      inputDispo.value,
      inputTaille.value,
      inputPrix.value,
      inputQte.value,
      inputVisible.value,
      inputImg.value
    );
    cancel();
  });
};

function modifyData(
  id,
  inputMarque,
  inputResolution,
  inputDispo,
  inputTaille,
  inputPrix,
  inputQte,
  inputVisible,
  inputImg
) {
  update(ref(db, "articles/" + id), {
    marque: inputMarque,
    resolution: inputResolution,
    dispo: inputDispo,
    taille: inputTaille,
    price: inputPrix,
    qte: inputQte,
    visibility: inputVisible == "true" ? true : false,
    img: inputImg,
  })
    .then(() => {
      getAllTvs();
    })
    .catch((err) => {
      console.log(err);
    });
}

// methode reset
function cancel() {
  inputMarque.value = "";
  inputResolution.value = "";
  inputDispo.value = "";
  inputTaille.value = "";
  inputPrix.value = "";
  inputQte.value = "";
  inputVisible.value = "";
  inputImg.value = "";
  btnAdd.style.display = "block";
  btnModify.style.display = "none";
  btnCancel.style.display = "none";
}

//methode ajout article

function ajoutArticle() {
  let id = articles.length;
  const marque = inputMarque.value;
  const resolution = inputResolution.value;
  const dispo = inputDispo.value;
  const taille = inputTaille.value;
  const price = inputPrix.value;
  const qte = inputQte.value;
  const visibility = inputVisible.value;
  const img = inputImg.value;

  set(ref(db,"articles/" + id), {
    dispo: dispo,
    id: id,
    marque: marque,
    price: price,
    resolution: resolution,
    taille: taille,
    visibility: visibility,
    qte: qte,
    img: img,
    type: "articles",
    buy: 0,
    denomination:  marque + " " + String(taille) + " - " + resolution + " - " + taille + " cm",
  })
  .then(() => {
    getAllTvs();
  })
  .catch((err) => {
    console.log(err);
  })
}

getAllTvs();
