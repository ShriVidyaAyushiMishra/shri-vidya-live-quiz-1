/* 🌺 ShriVidya शुद्ध–वाणी Live Quiz System - Main Script */

// ========== Voice Function ==========
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "hi-IN";
  window.speechSynthesis.speak(msg);
}

// ========== Quiz Questions ==========
const quizData = [
  {
    q: "भारत की राजधानी क्या है?",
    options: ["दिल्ली", "मुंबई", "जयपुर", "भोपाल"],
    answer: "दिल्ली"
  },
  {
    q: "ताजमहल कहाँ स्थित है?",
    options: ["दिल्ली", "आगरा", "जयपुर", "लखनऊ"],
    answer: "आगरा"
  },
  {
    q: "सूर्य किस दिशा में उगता है?",
    options: ["उत्तर", "दक्षिण", "पूर्व", "पश्चिम"],
    answer: "पूर्व"
  }
];

// ========== Global Variables ==========
let currentQuestion = 0;
let score = 0;

// ========== UPI Payment Simulation ==========
document.getElementById("upiButton").addEventListener("click", () => {
  // Replace this with your real UPI link when ready
  const upiLink = "upi://pay?pa=yourupi@okaxis&pn=ShriVidyaQuiz&am=10&cu=INR";
  window.open(upiLink, "_blank");

  document.getElementById("payment-status").innerText =
    "कृपया भुगतान पूरा करें और वापस लौटें...";
  
  // After payment success (for demo purpose, delay of 5 seconds)
  setTimeout(() => {
    document.getElementById("payment-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    startQuiz();
  }, 5000);
});

// ========== Quiz Logic ==========
function startQuiz() {
  showQuestion();
}

function showQuestion() {
  const box = document.getElementById("question-box");
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    let html = `<h3>${q.q}</h3>`;
    q.options.forEach(opt => {
      html += `<button class='optBtn' onclick='checkAnswer("${opt}")'>${opt}</button><br>`;
    });
    box.innerHTML = html;
    speak(q.q); // Voice Read Question
  } else {
    endQuiz();
  }
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
    speak("सही उत्तर!");
  } else {
    speak("गलत उत्तर!");
  }
  currentQuestion++;
  setTimeout(showQuestion, 1500);
}

// ========== Result Section ==========
function endQuiz() {
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";
  const scoreCard = document.getElementById("scoreCard");
  scoreCard.innerHTML = `<h3>आपका स्कोर: ${score}/${quizData.length}</h3>`;
  speak(`आपका स्कोर ${score} में से ${quizData.length} है`);
}

// ========== Facebook Share Button ==========
document.getElementById("shareFB").addEventListener("click", () => {
  const shareURL = "https://yourusername.github.io/shri-vidya-live-quiz-1/";
  const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
  window.open(fbLink, "_blank");
});
