/* =========================================
   NOVA HUB - FULL JAVASCRIPT
========================================= */


/* =========================================
   GET ELEMENTS
========================================= */

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");
const toolCount = document.getElementById("toolCount");
const themeBtn = document.getElementById("themeBtn");

const modal = document.getElementById("toolModal");
const modalContent = document.getElementById("modalContent");


/* =========================================
   SEARCH TOOLS
========================================= */

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const query = searchInput.value
      .toLowerCase()
      .trim();

    let visible = 0;

    cards.forEach(function (card) {

      const name = card.dataset.name
        ? card.dataset.name.toLowerCase()
        : "";

      if (name.includes(query)) {

        card.style.display = "";
        visible++;

      } else {

        card.style.display = "none";

      }

    });

    if (toolCount) {

      toolCount.textContent =
        visible + " tool" + (visible === 1 ? "" : "s");

    }

    if (noResults) {

      noResults.style.display =
        visible === 0 ? "block" : "none";

    }

  });

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

if (themeBtn) {

  themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

      themeBtn.textContent = "☾";

    } else {

      themeBtn.textContent = "☀";

    }

  });

}


/* =========================================
   MODAL SYSTEM
========================================= */

function openModal(content) {

  if (!modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = content;

  modal.classList.add("active");

}


function closeTool() {

  if (!modal || !modalContent) {
    return;
  }

  modal.classList.remove("active");

  modalContent.innerHTML = "";

}


/* Close when clicking outside */

if (modal) {

  modal.addEventListener("click", function (event) {

    if (event.target === modal) {

      closeTool();

    }

  });

}


/* Close with ESC */

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    closeTool();

  }

});


/* =========================================
   CALCULATOR
========================================= */

function openCalculator() {

  openModal(`

    <h2>Calculator</h2>

    <input
      id="calcInput"
      class="tool-input"
      type="text"
      placeholder="Example: 25 * 4 + 10"
    >

    <button
      class="primary-btn"
      onclick="calculate()"
    >
      Calculate
    </button>

    <div
      id="calcResult"
      class="result-box"
    >
      Result will appear here
    </div>

  `);

}


function calculate() {

  const input =
    document.getElementById("calcInput");

  const resultBox =
    document.getElementById("calcResult");

  if (!input || !resultBox) {
    return;
  }

  const expression =
    input.value.trim();

  if (expression === "") {

    resultBox.textContent =
      "Enter a calculation first.";

    return;

  }

  /*
    Only allow numbers and
    basic mathematical operators.
  */

  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {

    resultBox.textContent =
      "Invalid calculation.";

    return;

  }

  try {

    const result =
      Function(
        '"use strict"; return (' +
        expression +
        ')'
      )();

    if (
      typeof result !== "number" ||
      !Number.isFinite(result)
    ) {

      throw new Error();

    }

    resultBox.textContent =
      "Result: " + result;

  } catch {

    resultBox.textContent =
      "Invalid calculation.";

  }

}


/* =========================================
   TEXT TOOLS
========================================= */

function openTextTools() {

  openModal(`

    <h2>Text Tools</h2>

    <textarea
      id="textInput"
      class="tool-textarea"
      placeholder="Type or paste your text..."
      oninput="updateTextStats()"
    ></textarea>

    <div class="stats">

      <div>
        <strong id="wordCount">0</strong>
        <span>Words</span>
      </div>

      <div>
        <strong id="charCount">0</strong>
        <span>Characters</span>
      </div>

      <div>
        <strong id="lineCount">0</strong>
        <span>Lines</span>
      </div>

    </div>

    <div class="button-grid">

      <button onclick="uppercaseText()">
        UPPERCASE
      </button>

      <button onclick="lowercaseText()">
        lowercase
      </button>

      <button onclick="removeSpaces()">
        Remove Spaces
      </button>

      <button onclick="clearText()">
        Clear
      </button>

      <button onclick="copyText()">
        Copy Text
      </button>

    </div>

  `);

}


function updateTextStats() {

  const input =
    document.getElementById("textInput");

  if (!input) {
    return;
  }

  const text =
    input.value;

  let words = 0;

  if (text.trim() !== "") {

    words =
      text.trim().split(/\s+/).length;

  }

  const characters =
    text.length;

  const lines =
    text === ""
      ? 0
      : text.split("\n").length;

  const wordCount =
    document.getElementById("wordCount");

  const charCount =
    document.getElementById("charCount");

  const lineCount =
    document.getElementById("lineCount");

  if (wordCount) {
    wordCount.textContent = words;
  }

  if (charCount) {
    charCount.textContent = characters;
  }

  if (lineCount) {
    lineCount.textContent = lines;
  }

}


function uppercaseText() {

  const input =
    document.getElementById("textInput");

  if (!input) {
    return;
  }

  input.value =
    input.value.toUpperCase();

  updateTextStats();

}


function lowercaseText() {

  const input =
    document.getElementById("textInput");

  if (!input) {
    return;
  }

  input.value =
    input.value.toLowerCase();

  updateTextStats();

}


function removeSpaces() {

  const input =
    document.getElementById("textInput");

  if (!input) {
    return;
  }

  input.value =
    input.value
      .replace(/\s+/g, " ")
      .trim();

  updateTextStats();

}


function clearText() {

  const input =
    document.getElementById("textInput");

  if (!input) {
    return;
  }

  input.value = "";

  updateTextStats();

}


function copyText() {

  const input =
    document.getElementById("textInput");

  if (!input) {
    return;
  }

  if (input.value === "") {
    return;
  }

  navigator.clipboard
    .writeText(input.value)
    .then(function () {

      alert("Text copied!");

    })
    .catch(function () {

      alert("Could not copy text.");

    });

}


/* =========================================
   JSON TOOL
========================================= */

function openJSON() {

  openModal(`

    <h2>JSON Formatter</h2>

    <textarea
      id="jsonInput"
      class="tool-textarea"
      placeholder='Example: {"name":"NOVA","version":1}'
    ></textarea>

    <div class="button-grid">

      <button onclick="formatJSON()">
        Format
      </button>

      <button onclick="minifyJSON()">
        Minify
      </button>

      <button onclick="validateJSON()">
        Validate
      </button>

      <button onclick="clearJSON()">
        Clear
      </button>

    </div>

    <pre
      id="jsonOutput"
      class="result-box"
    ></pre>

  `);

}


function formatJSON() {

  const input =
    document.getElementById("jsonInput");

  const output =
    document.getElementById("jsonOutput");

  if (!input || !output) {
    return;
  }

  try {

    const data =
      JSON.parse(input.value);

    output.textContent =
      JSON.stringify(data, null, 2);

  } catch {

    output.textContent =
      "Invalid JSON.";

  }

}


function minifyJSON() {

  const input =
    document.getElementById("jsonInput");

  const output =
    document.getElementById("jsonOutput");

  if (!input || !output) {
    return;
  }

  try {

    const data =
      JSON.parse(input.value);

    output.textContent =
      JSON.stringify(data);

  } catch {

    output.textContent =
      "Invalid JSON.";

  }

}


function validateJSON() {

  const input =
    document.getElementById("jsonInput");

  const output =
    document.getElementById("jsonOutput");

  if (!input || !output) {
    return;
  }

  try {

    JSON.parse(input.value);

    output.textContent =
      "✓ Valid JSON";

  } catch {

    output.textContent =
      "✕ Invalid JSON";

  }

}


function clearJSON() {

  const input =
    document.getElementById("jsonInput");

  const output =
    document.getElementById("jsonOutput");

  if (input) {
    input.value = "";
  }

  if (output) {
    output.textContent = "";
  }

}


/* =========================================
   BASE64 TOOL
========================================= */

function openBase64() {

  openModal(`

    <h2>Base64 Encoder / Decoder</h2>

    <textarea
      id="baseInput"
      class="tool-textarea"
      placeholder="Enter text..."
    ></textarea>

    <div class="button-grid">

      <button onclick="encodeBase64()">
        Encode
      </button>

      <button onclick="decodeBase64()">
        Decode
      </button>

    </div>

    <textarea
      id="baseOutput"
      class="tool-textarea"
      placeholder="Result..."
      readonly
    ></textarea>

  `);

}


function encodeBase64() {

  const input =
    document.getElementById("baseInput");

  const output =
    document.getElementById("baseOutput");

  if (!input || !output) {
    return;
  }

  try {

    const bytes =
      new TextEncoder()
        .encode(input.value);

    let binary = "";

    bytes.forEach(function (byte) {

      binary += String.fromCharCode(byte);

    });

    output.value =
      btoa(binary);

  } catch {

    output.value =
      "Could not encode text.";

  }

}


function decodeBase64() {

  const input =
    document.getElementById("baseInput");

  const output =
    document.getElementById("baseOutput");

  if (!input || !output) {
    return;
  }

  try {

    const binary =
      atob(input.value);

    const bytes =
      Uint8Array.from(
        binary,
        function (char) {
          return char.charCodeAt(0);
        }
      );

    output.value =
      new TextDecoder().decode(bytes);

  } catch {

    output.value =
      "Invalid Base64.";

  }

}


/* =========================================
   PASSWORD GENERATOR
========================================= */

function openPassword() {

  openModal(`

    <h2>Password Generator</h2>

    <input
      id="passwordLength"
      class="tool-input"
      type="number"
      min="6"
      max="64"
      value="16"
      placeholder="Password length"
    >

    <button
      class="primary-btn"
      onclick="generatePassword()"
    >
      Generate Password
    </button>

    <div
      id="passwordResult"
      class="result-box"
    >
      Your password will appear here.
    </div>

    <button onclick="copyPassword()">
      Copy Password
    </button>

  `);

}


function generatePassword() {

  const lengthInput =
    document.getElementById("passwordLength");

  const result =
    document.getElementById("passwordResult");

  if (!lengthInput || !result) {
    return;
  }

  let length =
    Number(lengthInput.value);

  if (length < 6) {
    length = 6;
  }

  if (length > 64) {
    length = 64;
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789" +
    "!@#$%^&*()_+-=[]{}";

  const randomValues =
    new Uint32Array(length);

  crypto.getRandomValues(randomValues);

  let password = "";

  for (let i = 0; i < length; i++) {

    password +=
      characters[
        randomValues[i] %
        characters.length
      ];

  }

  result.textContent =
    password;

}


function copyPassword() {

  const result =
    document.getElementById("passwordResult");

  if (!result) {
    return;
  }

  const password =
    result.textContent;

  if (
    !password ||
    password.includes("will appear")
  ) {

    return;

  }

  navigator.clipboard
    .writeText(password)
    .then(function () {

      alert("Password copied!");

    })
    .catch(function () {

      alert("Could not copy password.");

    });

}


/* =========================================
   URL ENCODER / DECODER
========================================= */

function openURLTool() {

  openModal(`

    <h2>URL Encoder / Decoder</h2>

    <textarea
      id="urlInput"
      class="tool-textarea"
      placeholder="Enter URL or text..."
    ></textarea>

    <div class="button-grid">

      <button onclick="encodeURL()">
        Encode
      </button>

      <button onclick="decodeURL()">
        Decode
      </button>

    </div>

    <textarea
      id="urlOutput"
      class="tool-textarea"
      placeholder="Result..."
      readonly
    ></textarea>

  `);

}


function encodeURL() {

  const input =
    document.getElementById("urlInput");

  const output =
    document.getElementById("urlOutput");

  if (!input || !output) {
    return;
  }

  output.value =
    encodeURIComponent(input.value);

}


function decodeURL() {

  const input =
    document.getElementById("urlInput");

  const output =
    document.getElementById("urlOutput");

  if (!input || !output) {
    return;
  }

  try {

    output.value =
      decodeURIComponent(input.value);

  } catch {

    output.value =
      "Invalid encoded text.";

  }

}


/* =========================================
   TIMESTAMP TOOL
========================================= */

function openTimestamp() {

  openModal(`

    <h2>Timestamp Converter</h2>

    <button
      class="primary-btn"
      onclick="currentTimestamp()"
    >
      Get Current Timestamp
    </button>

    <div
      id="timestampResult"
      class="result-box"
    >
      Result will appear here.
    </div>

    <input
      id="timestampInput"
      class="tool-input"
      type="number"
      placeholder="Enter Unix timestamp"
    >

    <button onclick="convertTimestamp()">
      Convert Timestamp
    </button>

  `);

}


function currentTimestamp() {

  const result =
    document.getElementById("timestampResult");

  if (!result) {
    return;
  }

  const timestamp =
    Math.floor(Date.now() / 1000);

  result.textContent =
    "Unix timestamp: " + timestamp;

}


function convertTimestamp() {

  const input =
    document.getElementById("timestampInput");

  const result =
    document.getElementById("timestampResult");

  if (!input || !result) {
    return;
  }

  const timestamp =
    Number(input.value);

  if (!Number.isFinite(timestamp)) {

    result.textContent =
      "Enter a valid timestamp.";

    return;

  }

  const date =
    new Date(timestamp * 1000);

  result.textContent =
    date.toString();

}


/* =========================================
   NOVA AI
========================================= */

function openAI() {

  openModal(`

    <h2>✦ NOVA AI</h2>

    <p>
      NOVA AI will be connected to a real AI backend
      in a later stage.
    </p>

    <div class="result-box">

      The current NOVA Hub tools work directly
      inside your browser without an API key.

    </div>

  `);

}


/* =========================================
   STARTUP
========================================= */

console.log("NOVA Hub JavaScript loaded successfully.");
