let currentStep = 1;
let selectedActivities = [];
let chosenTime = "20:00";

const progressFill = document.getElementById("progressFill");

function updateProgress() {
  progressFill.style.width = `${(currentStep / 5) * 100}%`;
}

function goToStep(step) {
  document.querySelectorAll(".step").forEach(el => el.classList.remove("active"));
  const target = document.getElementById(`step${step}`);
  target.classList.remove("active");
  void target.offsetWidth;
  target.classList.add("active");
  currentStep = step;
  updateProgress();
}

function nextStep() {
  goToStep(2);
}

function prevStep() {
  if (currentStep > 1) goToStep(currentStep - 1);
}

function showNo() {
  const msg = document.getElementById("noMessage");
  const options = [
    "E ok 😌 Dar dacă te răzgândești, invitația rămâne aici.",
    "Fair enough 😭 Poate data viitoare?",
    "În regulă! Fără supărare 💜"
  ];
  msg.textContent = options[Math.floor(Math.random() * options.length)];
}

function saveTime() {
  const input = document.getElementById("time");
  chosenTime = input.value || "20:00";
  goToStep(3);
}

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    button.classList.toggle("selected");

    if (selectedActivities.includes(value)) {
      selectedActivities = selectedActivities.filter(item => item !== value);
    } else {
      selectedActivities.push(value);
    }
  });
});

function saveActivity() {
  if (selectedActivities.length === 0) {
    selectedActivities = ["Ceva spontan"];
    document.querySelector('[data-value="Ceva spontan"]').classList.add("selected");
  }
  goToStep(4);
}

function showSummary() {
  document.getElementById("summaryTime").textContent = chosenTime;
  document.getElementById("summaryActivity").textContent = selectedActivities.join(", ");

  const note = document.getElementById("note").value.trim();
  const noteRow = document.getElementById("summaryNoteRow");
  document.getElementById("summaryNote").textContent = note;

  noteRow.style.display = note ? "flex" : "none";
  goToStep(5);
}

function resetAll() {
  selectedActivities = [];
  document.querySelectorAll(".choice").forEach(button => button.classList.remove("selected"));
  document.getElementById("note").value = "";
  document.getElementById("time").value = "20:00";
  chosenTime = "20:00";
  document.getElementById("noMessage").textContent = "";
  goToStep(1);
}

updateProgress();
