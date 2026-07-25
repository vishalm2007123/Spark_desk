const BLOCKS = {
    boys: ["A", "B", "C", "D", "E", "F"],
    girls: ["A", "B", "C"]
};

const hostelType = document.getElementById("hostelType");
const blockSel = document.getElementById("blockSel");

const categoryCards = document.querySelectorAll(".category-card");
const categoryInput = document.getElementById("catSel");

const otherCategory = document.getElementById("otherCategory");

const desc = document.getElementById("desc");
const count = document.getElementById("count");

const fileInput = document.getElementById("fileInput");
const filename = document.getElementById("filename");
const dropArea = document.getElementById("dropArea");

const form = document.getElementById("complaintForm");

const progress = document.querySelectorAll(".progress-step");

function loadBlocks() {

    blockSel.innerHTML = "";

    const first = document.createElement("option");
    first.value = "";
    first.textContent = "Select Block";

    blockSel.appendChild(first);

    if (!BLOCKS[hostelType.value]) {

        blockSel.disabled = true;
        return;

    }

    blockSel.disabled = false;

    BLOCKS[hostelType.value].forEach(block => {

        const option = document.createElement("option");

        option.value = block;
        option.textContent = "Block " + block;

        blockSel.appendChild(option);

    });

}

hostelType.addEventListener("change", loadBlocks);

loadBlocks();

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        categoryCards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        categoryInput.value = card.dataset.category;

        if (card.dataset.category === "Others") {

            otherCategory.style.display = "block";

            otherCategory.querySelector("input").required = true;

        }

        else {

            otherCategory.style.display = "none";

            otherCategory.querySelector("input").required = false;

            otherCategory.querySelector("input").value = "";

        }

        progressStep(1);

    });

});

desc.addEventListener("input", () => {

    count.textContent = desc.value.length;

    progressStep(1);

});

dropArea.addEventListener("dragover", e => {

    e.preventDefault();

    dropArea.classList.add("drag");

});

dropArea.addEventListener("dragleave", () => {

    dropArea.classList.remove("drag");

});

dropArea.addEventListener("drop", e => {

    e.preventDefault();

    dropArea.classList.remove("drag");

    fileInput.files = e.dataTransfer.files;

    showFile();

    progressStep(2);

});

fileInput.addEventListener("change", () => {

    showFile();

    progressStep(2);

});

function showFile() {

    if (!fileInput.files.length) {

        filename.innerHTML = "";

        return;

    }

    const file = fileInput.files[0];

    filename.innerHTML = `
        <strong>${file.name}</strong><br>
        ${(file.size / 1024 / 1024).toFixed(2)} MB
    `;

}

function progressStep(step) {

    progress.forEach((item, index) => {

        item.classList.remove("active");

        if (index <= step) {

            item.classList.add("active");

        }

    });

}

function validate() {

    if (categoryInput.value === "") {

        alert("Select a complaint category.");

        return false;

    }

    if (desc.value.trim().length < 20) {

        alert("Description must contain at least 20 characters.");

        return false;

    }

    return true;

}

form.addEventListener("submit", e => {

    if (!validate()) {

        e.preventDefault();

        return;

    }

    const button = form.querySelector(".submit-btn");

    button.disabled = true;

    button.innerHTML = `
        <span class="loader"></span>
        Submitting...
    `;

});

document.querySelectorAll(".toast").forEach(toast => {

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform = "translateY(20px)";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 4000);

});