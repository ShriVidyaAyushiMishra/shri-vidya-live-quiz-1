/* ⚙️ ShriVidya शुद्ध–वाणी Live Quiz Cabinet
   script.js (Functional Logic + Voice + PIN)
   Version: 1.0 | Author: ShriVidya | Year: 2025
*/

/* -------------------------------
   🔐 Admin PIN Login Control
---------------------------------*/
const adminPinInput = document.getElementById("admin-pin");
const loginBtn = document.getElementById("login-btn");
const adminButtons = document.querySelectorAll(".quiz-btn");

let adminAccess = false;

// Initially disable buttons
adminButtons.forEach(btn => btn.disabled = true);
adminButtons.forEach(btn => btn.style.opacity = "0.6");

loginBtn.addEventListener("click", () => {
  const enteredPin = adminPinInput.value.trim();

  if (enteredPin === "8565") {  // 🔑 अपना PIN यहीं बदलें
    adminAccess = true;
    alert("✅ Admin Login सफल हुआ!");
    adminButtons.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = "1";
    });
  } else {
    alert("❌ गलत PIN! पुनः प्रयास करें।");
  }
});

/* -------------------------------
   🗣️ Voice (Text-to-Speech System)
---------------------------------*/
function speak(text) {
  if (!window.speechSynthesis) {
    alert("यह ब्राउज़र Voice फीचर सपोर्ट नहीं करता।");
    return;
  }

  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = "hi-IN";
  msg.rate = 1;
  msg.pitch = 1.1;
  window.speechSynthesis.speak(msg);
}

// Auto-speak Quotes every 10 seconds
setInterval(() => {
  const quote = document.getElementById("typed-quote").innerText.trim();
  if (quote) speak(quote);
}, 10000);

/* -------------------------------
   🎯 Button Logic (Actions)
---------------------------------*/
document.querySelectorAll(".quiz-btn").forEach(button => {
  button.addEventListener("click", () => {
    const label = button.innerText;
    speak(label);

    switch (label) {
      case "▶️ Start Quiz":
        alert("🧠 Quiz प्रारंभ हो रहा है...");
        window.scrollTo(0, document.body.scrollHeight);
        break;

      case "🏆 All India Rank":
        alert("📈 Rank Board शीघ्र आ रहा है...");
        window.open("https://docs.google.com/spreadsheets/", "_blank");
        break;

      case "🎓 Certificate":
        alert("📜 Certificate Generator शीघ्र सक्रिय होगा।");
        break;

      case "📊 Score Sheet":
        window.open("https://docs.google.com/spreadsheets/", "_blank");
        break;

      case "💾 Backup Data":
        if (adminAccess) {
          alert("🔐 Data Download सुविधा केवल एडमिन हेतु उपलब्ध है।");
        } else {
          alert("🚫 पहले Admin Login करें।");
        }
        break;

      case "📢 Post Notice":
        alert("📝 नया Notice जोड़ने की सुविधा शीघ्र सक्रिय होगी।");
        break;
        case "🎧 Quiz with Sound (MP4)":
  if (adminAccess) {
    alert("🎬 MP4 डाउनलोड प्रारंभ हो रहा है...");
    window.open("https://drive.google.com/drive/1ZFoUsQSQTmrRb3mjm418d-FuzKomhYl0", "_blank");
  } else {
    alert("🚫 केवल Admin को डाउनलोड की अनुमति है।");
  }
  break;
    }
  });
});

/* -------------------------------
   🧠 Google Verify Box Enhancement
---------------------------------*/
const verifyBox = document.getElementById("verify-box");
verifyBox.addEventListener("focus", () => {
  verifyBox.style.borderColor = "#36d1dc";
});
verifyBox.addEventListener("blur", () => {
  verifyBox.style.borderColor = "#bcb6ff";
});

/* -------------------------------
   🌺 Smooth Scroll Effect
---------------------------------*/
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.97)";
    setTimeout(() => (btn.style.transform = "scale(1)"), 120);
  });
});
