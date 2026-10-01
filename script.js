/* =========================
   NOVA HUB
   MAIN JAVASCRIPT
========================= */

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");
const toolCount = document.getElementById("toolCount");
const themeBtn = document.getElementById("themeBtn");

const modal = document.getElementById("toolModal");
const modalContent = document.getElementById("modalContent");


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", () => {

  const query = searchInput.value.toLowerCase().trim();

  let visible = 0;

  cards.forEach(card => {

    const name = card.dataset.name.toLowerCase();

    if (name.includes(query)) {

      card.style.display = "";

      visible++;

    } else {

      card.style.display = "none";

    }

  });

  toolCount.textContent =
    `${visible} tool${visible === 1 ? "" : "s"}`;

  noResults.style.display =
    visible === 0 ? "block" : "none";

});


/* =========================
   THEME
========================= */

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  themeBtn.textContent =
    document.body.classList.contains("light")
      ? "☾"
      : "☀";

});


/* =========================
   MODAL
========================= */

function openModal(content) {

  modalContent.innerHTML = content;

  modal.classList.add("active");

}


function closeTool() {

  modal.classList.remove("active");

  modalContent.innerHTML = "";

}


modal.addEventListener("click", event => {

  if (event.target === modal) {

    closeTool();

  }

});


/* =========================
   CALCULATOR
========================= */

function openCalculator() {

  openModal(`

    <h2>Calculator</h2>

    <input
      id="calcInput"
      class="tool-input"
      type="text"
      placeholder="Example: 25 * 4 + 10"
    >

    <button class="primary-btn" onclick="calculate()">
      Calculate
    </button>

    <div id="calcResult" class="result-box">
      Result will appear here
    </div>

  `);

}


function calculate() {

  const input =
    document.getElementById("calcInput").value.trim();

  if (!input) return;

  try {

    /*
      Basic calculator.
      Allows numbers and normal math operators.
    */

    if (!/^[0-9+\-*/().%\s]+$/.test(input)) {

      throw new Error();

    }

    const result =
      Function(`"use strict"; return (${input})`)();

    if (!Number.isFinite(result)) {

      throw new Error();

    }

    document.getElementById("calcResult").textContent =
      `Result: ${result}`;

  } catch {

    document.getElementById("calcResult").textContent =
      "Invalid calculation.";

  }

}


/* =========================
   TEXT TOOLS
========================= */

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

    </div>

  `);

}


function updateTextStats() {

  const text =
    document.getElementById("textInput").value;

  const words =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  const characters = text.length;

  const lines =
    text === ""
      ? 0
      : text.split("\n").length;

  document.getElementById("wordCount").textContent =
    words;

  document.getElementById("charCount").textContent =
    characters;

  document.getElementById("lineCount").textContent =
    lines;

}


function uppercaseText() {

  const input =
    document.getElementById("textInput");

  input.value =
    input.value.toUpperCase();

  updateTextStats();

}


function lowercaseText() {

  const input =
    document.getElementById("textInput");

  input.value =
    input.value.toLowerCase();

  updateTextStats();

}


function removeSpaces() {

  const input =
    document.getElementById("textInput");

  input.value =
    input.value.replace(/\s+/g, " ").trim();

  updateTextStats();

}


function clearText() {

  const input =
    document.getElementById("textInput");

  input.value = "";

  updateTextStats();

}


/* =========================
   JSON FORMATTER
========================= */

function openJSON() {

  openModal(`

    <h2>JSON Formatter</h2>

    <textarea
      id="jsonInput"
      class="tool-textarea"
      placeholder='Paste JSON here...'
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

    </div>

    <pre id="jsonOutput" class="result-box"></pre>

  `);

}


function formatJSON() {

  const input =
    document.getElementById("jsonInput").value;

  try {

    const parsed = JSON.parse(input);

    document.getElementById("jsonOutput").textContent =
      JSON.stringify(parsed, null, 2);

  } catch {

    document.getElementById("jsonOutput").textContent =
      "Invalid JSON.";

  }

}


function minifyJSON() {

  const input =
    document.getElementById("jsonInput").value;

  try {

    const parsed = JSON.parse(input);

    document.getElementById("jsonOutput").textContent =
      JSON.stringify(parsed);

  } catch {

    document.getElementById("jsonOutput").textContent =
      "Invalid JSON.";

  }

}


function validateJSON() {

  const input =
    document.getElementById("jsonInput").value;

  try {

    JSON.parse(input);

    document.getElementById("jsonOutput").textContent =
      "✓ Valid JSON";

  } catch {

    document.getElementById("jsonOutput").textContent =
      "✕ Invalid JSON";

  }

}


/* =========================
   BASE64
========================= */

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
    document.getElementById("baseInput").value;

  document.getElementById("baseOutput").value =
    btoa(unescape(encodeURIComponent(input)));

}


function decodeBase64() {

  const input =
    document.getElementById("baseInput").value;

  try {

    document.getElementById("baseOutput").value =
      decodeURIComponent(
        escape(atob(input))
      );

  } catch {

    document.getElementById("baseOutput").value =
      "Invalid Base64.";

  }

}


/* =========================
   PASSWORD GENERATOR
========================= */

function openPassword() {

  openModal(`

    <h2>Password Generator</h2>

    <label>Password length</label>

    <input
      id="passwordLength"
      class="tool-input"
      type="number"
      min="6"
      max="64"
      value="16"
    >

    <button
      class="primary-btn"
      onclick="generatePassword()"
    >
      Generate Password
    </button>

    <div
      id="passwordResult"
      class="result-box password-result"
    >
      Your password appears here
    </div>

    <button onclick="copyPassword()">
      Copy Password
    </button>

  `);

}


function generatePassword() {

  const length =
    Number(document.getElementById("passwordLength").value);

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}";

  let password = "";

  const array =
    new Uint32Array(length);

  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {

    password +=
      characters[array[i] % characters.length];

  }

  document.getElementById("passwordResult").textContent =
    password;

}


function copyPassword() {

  const password =
    document.getElementById("passwordResult").textContent;

  navigator.clipboard.writeText(password);

  alert("Password copied.");

}


/* =========================
   URL TOOL
========================= */

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
    document.getElementById("urlInput").value;

  document.getElementById("urlOutput").value =
    encodeURIComponent(input);

}


function decodeURL() {

  const input =
    document.getElementById("urlInput").value;

  try {

    document.getElementById("urlOutput").value =
      decodeURIComponent(input);

  } catch {

    document.getElementById("urlOutput").value =
      "Invalid encoded URL.";

  }

}


/* =========================
   TIMESTAMP TOOL
========================= */

function openTimestamp() {

  openModal(`

    <h2>Timestamp Converter</h2>

    <button
      class="primary-btn"
      onclick="currentTimestamp()"
    >
      Get Current Timestamp
    </button>

    <div id="timestampResult" class="result-box">
      Result appears here
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

  const timestamp =
    Math.floor(Date.now() / 1000);

  document.getElementById("timestampResult").textContent =
    `Unix timestamp: ${timestamp}`;

}


function convertTimestamp() {

  const input =
    Number(document.getElementById("timestampInput").value);

  if (!input) return;

  const date =
    new Date(input * 1000);

  document.getElementById("timestampResult").textContent =
    date.toString();

}


/* =========================
   AI ASSISTANT
========================= */

function openAI() {

  openModal(`

    <h2>NOVA AI</h2>

    <p>
      The NOVA AI engine will connect here later.
    </p>

    <p>
      The toolbox itself is already running locally
      in your browser.
    </p>

    <div class="result-box">

      AI backend required for live AI responses.

    </div>

  `);

}
