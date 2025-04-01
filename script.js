function showProcessing(show) {
    document.getElementById("processing").style.display = show ? "block" : "none";
    if (show) updateProgressBar(0);
}

function updateProgressBar(percent) {
    document.getElementById("progress").style.width = percent + "%";
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".tool").forEach(button => {
        button.addEventListener("click", function () {
            const type = this.getAttribute("data-type");
            if (!type) {
                console.error("Error: data-type is missing!");
                alert("Error: data-type is missing!");
                return;
            }
            handleConversion(type);
        });
    });
});

function handleConversion(type) {
    let input = document.createElement("input");
    input.type = "file";

    if (type === "text-pdf") {
        const userText = prompt("Enter text to convert to PDF:");
        if (!userText) {
            alert("No text entered!");
            return;
        }
        showProcessing(true);
        updateProgressBar(20);
        setTimeout(() => {
            convertTextToPDF(userText);
            updateProgressBar(100);
            setTimeout(() => showProcessing(false), 500);
        }, 2000);
    } else {
        input.addEventListener("change", function () {
            if (!this.files[0]) {
                alert("No file selected!");
                return;
            }
            showProcessing(true);
            updateProgressBar(20);

            setTimeout(() => {
                processFileConversion(type, this.files[0]);
                updateProgressBar(100);
                setTimeout(() => showProcessing(false), 500);
            }, 3000);
        });

        if (type === "pdf-word") input.accept = ".pdf";
        else if (type === "word-pdf") input.accept = ".doc,.docx";
        else if (type === "image-pdf" || type === "image-word" || type === "image-excel") input.accept = "image/*";

        input.click();
    }
}

function processFileConversion(type, file) {
    if (type === "pdf-word") convertPDFToWord(file);
    else if (type === "word-pdf") convertWordToPDF(file);
    else if (type === "image-pdf") convertImageToPDF(file);
    else if (type === "image-word") convertImageToWord(file);
    else if (type === "image-excel") convertImageToExcel(file);
}

function convertTextToPDF(text) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save("text-to-pdf.pdf");
}

// Other conversion functions remain the same
