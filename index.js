document.addEventListener("DOMContentLoaded", function () {
  const dropZones = document.querySelectorAll(".drop-zone");
  const fileInput = document.getElementById("file-input");
  let currentDropZone = null;

  dropZones.forEach(dropZone => {
      dropZone.addEventListener("dragover", (event) => {
          event.preventDefault();
          dropZone.style.borderColor = "#000";
      });

      dropZone.addEventListener("dragleave", (event) => {
          event.preventDefault();
          dropZone.style.borderColor = "#ccc";
      });

      dropZone.addEventListener("drop", (event) => {
          event.preventDefault();
          dropZone.style.borderColor = "#ccc";
          const files = event.dataTransfer.files;
          handleFiles(files, dropZone);
      });

      dropZone.addEventListener("click", () => {
          currentDropZone = dropZone;
          fileInput.click();
      });
  });

  fileInput.addEventListener("change", (event) => {
      const files = event.target.files;
      if (currentDropZone) {
          handleFiles(files, currentDropZone);
          currentDropZone = null;
      }
  });

  function handleFiles(files, dropZone) {
      if (files.length > 0) {
          const file = files[0];
          if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const img = document.createElement("img");
                  img.src = e.target.result;
                  dropZone.innerHTML = "";
                  dropZone.appendChild(img);
              };
              reader.readAsDataURL(file);
          } else {
              alert("画像ファイルを選択してください。");
          }
      }
  }
});
