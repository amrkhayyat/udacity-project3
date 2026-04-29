const projects = [
  {
    project_id: 1,
    project_name: "Portfolio Website",
    short_description: "A personal portfolio website",
    long_description: "This project showcases my work and skills.",
    url: "https://github.com/amrkhayyat/udacity-project2.git",
    image: "img/project1.jpg",
  },
  {
    project_id: 2,
    project_name: "E-commerce App",
    short_description: "Online store project",
    long_description: "A full frontend e-commerce experience.",
    url: "https://github.com",
    image: "img/project2.jpg",
  },
];

const aboutMe = {
  name: "Amr Khayyat",
  bio: "I am a frontend developer passionate about building modern web applications.",
headshot: "./img/profile.jpg",
};

function renderBanner() {
  const nameEl = document.querySelector(".banner__text h2");
  const bioEl = document.querySelector(".banner__text p");
  const imgEl = document.querySelector(".banner__image");

  if (nameEl) nameEl.textContent = aboutMe.name;
  if (bioEl) bioEl.textContent = aboutMe.bio;
  if (imgEl) {
    imgEl.src = aboutMe.headshot;
    imgEl.alt = `${aboutMe.name} profile photo`;
  }
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.setAttribute("data-id", project.project_id);

  card.innerHTML = `
    <div class="project-card__image-wrap">
      <img
        src="${project.image}"
        alt="${project.project_name}"
        class="project-card__image"
        loading="lazy"
        onerror="this.style.display='none'"
      />
    </div>
    <div class="project-card__body">
      <h3 class="project-card__title">${project.project_name}</h3>
      <p class="project-card__desc">${project.short_description}</p>
      <a
        href="${project.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link btn"
      >View Project</a>
    </div>
  `;

  return card;
}

function renderProjects() {
  const container = document.querySelector(".projects__cards");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((project, index) => {
    const card = createProjectCard(project);
    card.style.animationDelay = `${index * 120}ms`;
    container.appendChild(card);
  });
}

function initScrollButtons() {
  const projectsBtn = document.querySelector(".projects-btn");
  const contactBtn = document.querySelector(".contact-btn");

  projectsBtn?.addEventListener("click", () => {
    document.querySelector(".projects")?.scrollIntoView({ behavior: "smooth" });
  });

  contactBtn?.addEventListener("click", () => {
    window.location.href = "pages/contact.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderBanner();
  renderProjects();
  initScrollButtons();
});