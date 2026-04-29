const skillsData = {
  description: "Here are the technologies and tools I work with to build modern web applications.",
  categories: [
    {
      category: "Frontend",
      icon: "🖥️",
      skills: ["HTML5", "CSS3", "JavaScript", "React"],
    },
    {
      category: "Styling",
      icon: "🎨",
      skills: ["Sass / SCSS", "Tailwind CSS", "Bootstrap"],
    },
    {
      category: "Tools",
      icon: "🛠️",
      skills: ["Git & GitHub", "VS Code", "Webpack", "npm"],
    },
    {
      category: "Soft Skills",
      icon: "💡",
      skills: ["Problem Solving", "Team Work", "Communication", "Time Management"],
    },
  ],
};

function renderDescription() {
  const descEl = document.querySelector(".skills__description");
  if (descEl) descEl.textContent = skillsData.description;
}

function createCategoryCard(categoryObj, index) {
  const card = document.createElement("div");
  card.className = "skills__card";
  card.style.animationDelay = `${index * 100}ms`;

  const skillItems = categoryObj.skills
    .map((skill) => `<li class="skills__item">${skill}</li>`)
    .join("");

  card.innerHTML = `
    <div class="skills__card-header">
      <span class="skills__icon">${categoryObj.icon}</span>
      <h3 class="skills__category">${categoryObj.category}</h3>
    </div>
    <ul class="skills__list">
      ${skillItems}
    </ul>
  `;

  return card;
}

function renderSkills() {
  const container = document.querySelector(".skills__container");
  if (!container) return;

  container.innerHTML = "";

  skillsData.categories.forEach((cat, index) => {
    const card = createCategoryCard(cat, index);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDescription();
  renderSkills();
});