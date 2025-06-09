let entries = JSON.parse(localStorage.getItem("entries")) || [];

function calculateGPA() {
  if (entries.length === 0) return 0;
  const total = entries.reduce((sum, entry) => sum + entry.grade, 0);
  return (total / entries.length).toFixed(2);
}

function updateDisplay() {
  const list = document.getElementById("assignmentList");
  list.innerHTML = "";

  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.grade}/5`;
    list.appendChild(li);
  });

  document.getElementById("gpa").textContent = calculateGPA();
  localStorage.setItem("entries", JSON.stringify(entries));
}

document.getElementById("assignmentForm").addEventListener("submit", e => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const gradeInput = document.getElementById("grade");

  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  if (!name || isNaN(grade) || grade < 0 || grade > 5) {
    alert("Please enter a valid assignment name and a grade between 0 and 5.");
    return;
  }

  entries.push({ name, grade });
  updateDisplay();

  nameInput.value = "";
  gradeInput.value = "";
});

document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "s") {
    console.log("Current Entries:", entries);
  }
});

window.addEventListener("DOMContentLoaded", updateDisplay);
