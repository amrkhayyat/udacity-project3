async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function renderBanner() {
  const aboutData = await fetchData("data/aboutMeData.json");
  if (!aboutData) return;

  const nameEl = document.querySelector(".banner__text h2");
  const bioEl = document.querySelector(".banner__text p");
  const imgWrap = document.querySelector(".banner__image");

  if (nameEl) nameEl.textContent = aboutData.name ?? "";
  if (bioEl) bioEl.textContent = aboutData.bio ?? "";

  if (imgWrap && aboutData.headshot) {
    Object.assign(imgWrap.style, {
      backgroundImage: `url('${aboutData.headshot}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  }
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "project-card__image-wrap";

  Object.assign(imageWrap.style, project.image
    ? { backgroundImage: `url('${project.image}')` }
    : { backgroundColor: "#ccc" }
  );

  const body = document.createElement("div");
  body.className = "project-card__body";

  const title = document.createElement("h3");
  title.className = "project-card__title";
  title.textContent = project.project_name ?? "Untitled Project";

  const desc = document.createElement("p");
  desc.className = "project-card__desc";
  desc.textContent = project.short_description ?? "";

  const link = document.createElement("a");
  link.className = "project-card__link btn";
  link.href = project.url ?? "#";
  link.target = "_blank";
  link.textContent = "View Project";

  body.append(title, desc, link);
  card.append(imageWrap, body);

  card.addEventListener("click", () => updateSpotlight(project));

  return card;
}

function updateSpotlight(project) {
  const spotlight = document.querySelector(".projects__spotlight");
  if (!spotlight) return;

  const title = spotlight.querySelector("h2");
  const desc = spotlight.querySelector("p");

  if (title) title.textContent = project.project_name ?? "";
  if (desc) desc.textContent = project.long_description ?? project.short_description ?? "";

  if (project.image) {
    Object.assign(spotlight.style, {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${project.image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    });
  }
}

async function renderProjects() {
  const data = await fetchData("data/projectsData.json");
  const container = document.querySelector(".projects__cards");

  if (!data?.projects || !container) return;

  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  data.projects.forEach(project => {
    fragment.appendChild(createProjectCard(project));
  });

  container.appendChild(fragment);

  if (data.projects.length) {
    updateSpotlight(data.projects[0]);
  }
}

function initScrollButtons() {
  const container = document.querySelector(".projects__cards");
  const leftBtn = document.querySelector(".scroll-btn--left");
  const rightBtn = document.querySelector(".scroll-btn--right");

  if (!container) return;

  const scrollAmount = 300;

  leftBtn?.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightBtn?.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderBanner();
  renderProjects();
  initScrollButtons();

  document.querySelector(".contact-btn")?.addEventListener("click", () => {
    window.location.href = "/src/pages/contact.html";
  });

  document.querySelector(".projects-btn")?.addEventListener("click", () => {
    document.querySelector(".projects")?.scrollIntoView({ behavior: "smooth" });
  });
});