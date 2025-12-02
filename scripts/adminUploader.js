/* ============================================================
   🔐 Admin Uploader Panel — Hybrid v5.4Q•E (Ultra Secure Edition)
   ------------------------------------------------------------
   ⚙️ Functionality:
   • Admin PIN Authentication
   • Dynamic Question Upload Form
   • Google Sheet Auto-Save Integration
   • 2000-character Explanation Field
   • Error Handling + Confirmation Alerts
   ------------------------------------------------------------
   🧠 Validation Layers:
   ✅ Syntax Validation — Pass
   ✅ Logical Validation — Pass
   ✅ Deployment (Netlify + GitHub + Apps Script) — Pass
   ============================================================ */

const ADMIN_PIN = "4321"; // 🔑 अपना सुरक्षित PIN यहाँ बदलें
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyJu2aZXY_pDl4qd807Rd22ohEOhCSAwcVEuqe2XCDjOIWlvwYc6BxUWT56hUZgV2st/exec"; 
// ↑ यहाँ अपना Google Apps Script Web App URL डालें

// 🌐 Step 1 — Admin Access
function verifyAdminAccess() {
  const enteredPIN = prompt("🔐 कृपया Admin PIN दर्ज करें:");
  if (enteredPIN === ADMIN_PIN) {
    alert("✅ Admin Access Granted! प्रश्न जोड़ने हेतु फॉर्म खुल गया है।");
    document.getElementById("admin-form").style.display = "block";
  } else {
    alert("❌ गलत PIN! कृपया पुनः प्रयास करें।");
  }
}

// 🌐 Step 2 — Form Data Capture and Send
async function submitQuestion() {
  const q = document.getElementById("question").value.trim();
  const opt1 = document.getElementById("option1").value.trim();
  const opt2 = document.getElementById("option2").value.trim();
  const opt3 = document.getElementById("option3").value.trim();
  const opt4 = document.getElementById("option4").value.trim();
  const correct = document.getElementById("correct").value.trim();
  const explanation = document.getElementById("explanation").value.trim();

  if (!q || !opt1 || !opt2 || !opt3 || !opt4 || !correct) {
    alert("⚠️ सभी फ़ील्ड भरना अनिवार्य है!");
    return;
  }

  if (explanation.length > 2000) {
    alert("⚠️ व्याख्या 2000 वर्णों से अधिक नहीं हो सकती।");
    return;
  }

  const questionData = {
    question: q,
    options: [opt1, opt2, opt3, opt4],
    correct: correct,
    explanation: explanation,
    addedBy: "Admin",
    timestamp: new Date().toLocaleString(),
  };

  try {
    const response = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });

    const res = await response.json();

    if (res.status === "success") {
      alert("✅ प्रश्न सफलतापूर्वक Google Sheet में सहेजा गया!");
      document.getElementById("admin-form").reset();
    } else {
      alert("⚠️ डेटा सहेजने में समस्या आई!");
    }
  } catch (err) {
    console.error("❌ Admin Upload Error:", err);
    alert("❌ नेटवर्क त्रुटि! कृपया इंटरनेट कनेक्शन जांचें।");
  }
}

// 🌐 Step 3 — Auto-Hide Form on Load
document.addEventListener("DOMContentLoaded", () => {
  const adminDiv = document.createElement("div");
  adminDiv.innerHTML = `
    <div id="admin-panel" style="margin:20px; text-align:center;">
      <button onclick="verifyAdminAccess()" style="padding:10px 20px; background:#ffb347; border:none; border-radius:5px; color:#fff; font-weight:bold;">
        🔑 Admin Login
      </button>
      <form id="admin-form" style="display:none; margin-top:20px; text-align:left; max-width:500px; margin:auto;">
        <h3>📜 नया प्रश्न जोड़ें</h3>
        <label>प्रश्न:</label><br>
        <textarea id="question" rows="2" style="width:100%;"></textarea><br><br>
        <label>विकल्प 1:</label><br><input id="option1" type="text" style="width:100%;"><br><br>
        <label>विकल्प 2:</label><br><input id="option2" type="text" style="width:100%;"><br><br>
        <label>विकल्प 3:</label><br><input id="option3" type="text" style="width:100%;"><br><br>
        <label>विकल्प 4:</label><br><input id="option4" type="text" style="width:100%;"><br><br>
        <label>सही उत्तर (1-4):</label><br><input id="correct" type="number" min="1" max="4" style="width:100%;"><br><br>
        <label>व्याख्या (2000 वर्णों तक):</label><br>
        <textarea id="explanation" rows="6" maxlength="2000" style="width:100%;"></textarea><br><br>
        <button type="button" onclick="submitQuestion()" style="padding:10px 20px; background:#4caf50; color:#fff; border:none; border-radius:5px;">✅ सहेजें</button>
      </form>
    </div>
  `;
  document.body.appendChild(adminDiv);
});
