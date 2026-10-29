// ======================================
// EVPP Predator-Prey Simulation
// Part 1 - Setup & Global Variables
// ======================================

import { firebaseConfig } from "./firebase-config.js";

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------------------------------
// Student info
// --------------------------------------

let studentName = "";
let studentEmail = "";

let runId = "";

let checkpointGeneration = 10;

// --------------------------------------
// Simulation data
// --------------------------------------

let generation = 1;

let mice = 10;

let coyotes = 1;

let populationHistory = [];

let simulationComplete = false;

// slightly different hunting conditions
// for each student

let huntModifier =
  0.9 + Math.random() * 0.2;

// chart

let chart;

// --------------------------------------
// DOM Elements
// --------------------------------------

const loginCard =
document.getElementById("login-card");

const simulationArea =
document.getElementById("simulation-area");

const startBtn =
document.getElementById("start-btn");

const huntBtn =
document.getElementById("hunt-btn");

const nameDisplay =
document.getElementById("display-name");

const runIdDisplay =
document.getElementById("run-id");

const miceDisplay =
document.getElementById("mice-count");

const coyoteDisplay =
document.getElementById("coyote-count");

const generationDisplay =
document.getElementById("generation-number");

const huntResult =
document.getElementById("hunt-result");

const resultsBody =
document.getElementById("results-body");

const screenshotWarning =
document.getElementById("screenshot-warning");

const csvButton =
document.getElementById("download-csv");

const certificateButton =
document.getElementById("download-certificate");

// --------------------------------------
// Start Simulation
// --------------------------------------

startBtn.addEventListener("click", startSimulation);

function startSimulation() {

  studentName =
    document.getElementById("student-name")
    .value.trim();

  studentEmail =
    document.getElementById("student-email")
    .value.trim();

  if (!studentName || !studentEmail) {

    alert(
      "Please enter your name and GMU email."
    );

    return;
  }

  runId =
    "PP-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  checkpointGeneration =
    Math.floor(Math.random() * 8) + 8;

  loginCard.classList.add("hidden");

  simulationArea.classList.remove("hidden");

  nameDisplay.textContent =
    studentName;

  runIdDisplay.textContent =
    runId;

  initializeChart();

  renderGeneration();
}
