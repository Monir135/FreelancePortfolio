
// ================= SELECT ELEMENTS =================
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modalOverlay = document.getElementById("contactModal");
const modalContent = modalOverlay.querySelector(".modal-content");
const form = modalContent.querySelector("form");
const submitButton = form.querySelector("button[type='submit']");


const modal = modalOverlay.querySelector(".modal");

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});


form.addEventListener("click", (e) => {
  e.stopPropagation();
});




// Save original modal content
const originalModalHTML = modalContent.innerHTML;

// ================= OPEN / CLOSE MODAL =================
openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("active");

  setTimeout(() => {
    submitButton.focus();
  }, 300);
});


closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

// ================= FORM SUBMIT =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Sending…";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });

    if (response.ok) {
      // Fade out modal content
      modalContent.style.opacity = "0";
      modalContent.style.transform = "scale(0.95)";

      setTimeout(() => {
        modalContent.innerHTML = `
          <div class="success-box">
            <h3>✅ Message Sent</h3>
            <p>
              Thanks <strong>${formData.get("name")}</strong>!<br>
              I’ll personally reply within <strong>24 hours</strong>.
            </p>
          </div>
        `;
        modalContent.style.opacity = "1";
        modalContent.style.transform = "scale(1)";
      }, 300);

      // Auto close modal
      setTimeout(() => {
        modalOverlay.classList.remove("active");
        modalContent.innerHTML = originalModalHTML;
      }, 7000);

    } else {
      showError("❌ Something went wrong. Please try again.");
    }
  } catch (error) {
    showError("❌ Network error. Please try again.");
  }
});

// ================= ERROR HANDLER =================
function showError(msg) {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = msg;
  errorMsg.style.color = "#e74c3c";
  errorMsg.style.textAlign = "center";
  errorMsg.style.fontWeight = "600";
  errorMsg.style.marginTop = "0.5rem";

  form.appendChild(errorMsg);
  submitButton.disabled = false;
  submitButton.textContent = "Send Message";
}

document.getElementById('year').textContent = new Date().getFullYear();





