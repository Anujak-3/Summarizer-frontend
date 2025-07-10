
function generateSummary() {
  const textInput = document.getElementById('textInput').value;
  const fileInput = document.getElementById('fileInput').files[0];

  const formData = new FormData();
  if (textInput) {
    formData.append("text", textInput);
  }
  if (fileInput) {
    formData.append("file", fileInput);
  }

  fetch("https://summarizer-backend-wus0.onrender.com/summarize", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Update summary
    document.getElementById("summaryContent").innerText = data.summary;

    // Update highlights
    const highlightsList = document.getElementById("highlightsList");
    highlightsList.innerHTML = "";
    data.highlights.forEach(point => {
      const li = document.createElement("li");
      li.innerText = "• " + point;
      highlightsList.appendChild(li);
    });

    // Update keywords
    const keywordsContainer = document.getElementById("keywordsTags");
    keywordsContainer.innerHTML = "";
    data.keywords.forEach(word => {
      const span = document.createElement("span");
      span.className = "keyword-tag px-3 py-1 text-white rounded-full text-sm";
      span.innerText = word;
      keywordsContainer.appendChild(span);
    });

    document.getElementById("resultsSection").classList.remove("hidden");
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Something went wrong!");
  });
}
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const fileName = document.getElementById('fileName');
        fileName.textContent = `Selected: ${file.name}`;
        fileName.classList.remove('hidden');
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}
const fileUploadArea = document.querySelector('.file-upload-area');

fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = '#483AA0';
    fileUploadArea.style.backgroundColor = 'rgba(121, 101, 193, 0.1)';
});

fileUploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = '#7965C1';
    fileUploadArea.style.backgroundColor = 'transparent';
});

fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = '#7965C1';
    fileUploadArea.style.backgroundColor = 'transparent';

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('fileInput').files = files;
        handleFileUpload(document.getElementById('fileInput'));
    }
});


