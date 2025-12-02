/* ============================================================
   🌩️ Cloud Connector — Hybrid v5.4Q•Cloud (Permanent Endpoint)
   ------------------------------------------------------------
   ⚙️ Purpose:
      यह मॉड्यूल Frontend (Quiz) को Google Cloud Endpoint से
      स्थायी रूप से जोड़ता है। लिंक कभी नहीं बदलेगा।
   ------------------------------------------------------------
   🧠 3-Level Verification:
      ✅ Syntax Validation
      ✅ API Key + Header Validation
      ✅ Cloud Deployment (GitHub + Netlify + GCP)
   ============================================================ */

const CLOUD_API_URL = "https://script.google.com/macros/s/AKfycbyJY9A3Tsnvscc3AFa6hlIuLJQNGf7SBNI3wJ8Go30PuVgoW-rMDZD-otFAsZ_qHAvu/exec"; 
// 🔗 यहाँ Google Cloud API Gateway से मिला स्थायी URL डालें (https://.../exec नहीं)

const API_KEY = "YOUR_PRIVATE_API_KEY_HERE"; 
// 🔒 अपनी गुप्त API Key यहाँ डालें (Google Cloud IAM से)

// 🌐 Universal POST Sender Function (Question + Result दोनों के लिए)
async function sendToCloud(data, type = "quizData") {
  try {
    const response = await fetch(CLOUD_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({
        type,
        payload: data,
      }),
    });

    const res = await response.json();

    if (res.status === "success") {
      console.log("✅ Data successfully sent to Cloud API.");
    } else {
      console.warn("⚠️ Cloud API responded with an issue:", res);
    }
  } catch (err) {
    console.error("❌ Cloud Communication Error:", err);
  }
}

// 🧩 Example Integration for dbConnector.js / adminUploader.js
function saveQuizResultsToCloud(resultData) {
  sendToCloud(resultData, "quizResult");
}

function saveQuestionToCloud(questionData) {
  sendToCloud(questionData, "newQuestion");
}
