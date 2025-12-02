/* ============================================================
   🕉️ ShriVidya शुद्ध–वाणी Live Quiz System
   Hybrid Core Engine — Version 5.4Q•Core+Voice
   ------------------------------------------------------------
   यह फ़ाइल क्विज़ की मुख्य कार्यप्रणाली (Main Logic Controller)
   के रूप में कार्य करती है।
   ------------------------------------------------------------
   ✅ 3-स्तरीय सत्यापन:
      1️⃣ Syntax Validation
      2️⃣ Logical Flow Check
      3️⃣ UI Integration Validation
   ============================================================ */

// 🌐 क्विज डेटा लोड
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const quizContainer = document.getElementById("quiz-container");
const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const finalScore = document.getElementById("final-score");
const explanationBox = document.getElementById("explanation-box");

// 🧠 Load Question Function
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionBox.querySelector("#question-text").textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => selectOption(index);
    optionsBox.appendChild(btn);
  });

  // 🎧 Voice Engine Trigger — प्रत्येक प्रश्न पर आवाज़ चलाने के लिए
  try {
    const event = new CustomEvent("questionLoaded", { detail: q });
    document.dispatchEvent(event);
  } catch (err) {
    console.warn("⚠️ Voice Engine Trigger Error:", err);
  }
}

// 🟢 Select Option
function selectOption(index) {
  selectedOption = index;
  document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
  document.querySelectorAll(".option-btn")[index].classList.add("selected");
}

// 🔵 Next Button
nextBtn.addEventListener("click", () => {
  if (selectedOption === null) return alert("कृपया एक विकल्प चुनें!");
  if (selectedOption === quizData[currentQuestion].correct) score += 4;
  selectedOption = null;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// 🧾 Show Results
function showResults() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const totalQuestions = quizData.length;
  finalScore.textContent = `आपका स्कोर: ${score} / ${totalQuestions * 4}`;

  explanationBox.innerHTML = "";
  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("explanation-item");
    div.innerHTML = `
      <h3>प्रश्न ${i + 1}: ${q.question}</h3>
      <p><b>सही उत्तर:</b> ${q.options[q.correct]}</p>
      <p><b>व्याख्या:</b> ${q.explanation || "AI या Cloud से व्याख्या लोड की जा रही है..."}</p>
      <hr/>
    `;
    explanationBox.appendChild(div);
  });

  // 🧩 Cloud & Facebook Integration
  try {
    saveResultsToSheet({
      name: "ShriVidya",
      score: score,
      total: totalQuestions * 4,
      questions: quizData.map(q => q.question),
      correctAnswers: quizData.map(q => q.options[q.correct]),
      explanations: quizData.map(q => q.explanation)
    });
  } catch (e) {
    console.warn("⚠️ Cloud Save Error:", e);
  }

  // 📘 Facebook Share Button जोड़ना
  const fbButton = document.createElement("button");
  fbButton.textContent = "📘 Facebook पर साझा करें";
  fbButton.classList.add("fb-share-btn");
  fbButton.onclick = () => shareOnFacebook(score, totalQuestions * 4);
  resultContainer.appendChild(fbButton);
}

// 🔄 Restart Quiz
document.getElementById("restart-btn")?.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  loadQuestion();
});

// 🟦 Facebook Share Function
function shareOnFacebook(score, total) {
  const quizTitle = encodeURIComponent("🔱 ShriVidya शुद्ध–वाणी Live Quiz System 🔱");
  const quizLink = encodeURIComponent("https://www.facebook.com/share/1FmJSivXKz/");
  const quizText = encodeURIComponent(`मैंने प्राप्त किए ${score} / ${total} अंक! आप भी भाग लें — 🔗`);

  const fbShareURL = `https://www.facebook.com/sharer/sharer.php?u=${quizLink}&quote=${quizTitle}%0A${quizText}`;
  window.open(fbShareURL, "_blank", "width=600,height=500");
}
