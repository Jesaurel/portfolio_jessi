// Toggle & Responsive Navigation
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLists = document.querySelector("nav");

  burger.addEventListener("click", () => {
    // Toggle nav list and burger class
    navLists.classList.toggle("nav-active");
    burger.classList.toggle("toggle-burger");
  });
};

navSlide();

// Clear form before unload
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const resumeDropdown = document.getElementById("resumeDropdown");
  const dropdownContent = resumeDropdown.querySelector(".dropdown-content");
  const dropdownButton = resumeDropdown.querySelector(".btn");

  if (resumeDropdown && dropdownContent && dropdownButton) {
    dropdownButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Mencegah event klik menyebar ke dokumen
      dropdownContent.classList.toggle("show");
    });

    // Tutup dropdown jika mengklik di luar dropdown
    document.addEventListener("click", function (event) {
      if (!resumeDropdown.contains(event.target)) {
        dropdownContent.classList.remove("show");
      }
    });
  }
});
const certificateListContainer = document.getElementById("certificate-list");
const certificatesDataUrl = "data-sertifikat.json"; // Pastikan path ini benar

fetch(certificatesDataUrl)
  .then((response) => response.json())
  .then((certificatesData) => {
    // Jika certificatesData bukan array, buat array berisi satu objek
    const certificates = Array.isArray(certificatesData)
      ? certificatesData
      : [certificatesData];

    certificates.forEach((certificate) => {
      const card = document.createElement("div");
      card.classList.add("portfolio");
      card.classList.add("certificate-card");

      const portfolioCover = document.createElement("div");
      portfolioCover.classList.add("portfolio-cover");

      const previewImage = document.createElement("img");
      previewImage.src = certificate.url_preview;
      previewImage.alt = `Preview ${certificate.judul}`;
      previewImage.classList.add("certificate-preview");
      portfolioCover.appendChild(previewImage);
      card.appendChild(portfolioCover);

      const portfolioInfo = document.createElement("div");
      portfolioInfo.classList.add("portfolio-info");

      const titleContainer = document.createElement("div");
      titleContainer.classList.add("portfolio-title");
      const title = document.createElement("h4");
      title.textContent = certificate.judul;
      titleContainer.appendChild(title);
      portfolioInfo.appendChild(titleContainer);

      const description = document.createElement("p");
      description.textContent = certificate.deskripsi;
      portfolioInfo.appendChild(description);

      const link = document.createElement("a");
      link.href = certificate.url_dokumen;
      link.textContent = "Lihat Dokumen";
      link.target = "_blank";
      link.classList.add("certificate-link");
      portfolioInfo.appendChild(link);

      card.appendChild(portfolioInfo);

      certificateListContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching certificate data:", error);
    certificateListContainer.innerHTML = "<p>Gagal memuat data sertifikat.</p>";
  });

// Dropdown resume functionality (jika ada di js/main.js)
const resumeDropdown = document.getElementById("resumeDropdown");
if (resumeDropdown) {
  resumeDropdown.addEventListener("click", function () {
    this.querySelector(".dropdown-content").classList.toggle("show");
  });

  // Tutup dropdown jika klik di luar
  window.onclick = function (event) {
    if (!event.target.matches("#resumeDropdown button")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
}
async function loadFeaturedProjects() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();
    const featuredProjectsContainer =
      document.getElementById("featured-projects");
    const limit = 3; // Batasi jumlah proyek yang ditampilkan

    for (let i = 0; i < Math.min(projects.length, limit); i++) {
      const project = projects[i];
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("portfolio");

      projectDiv.innerHTML = `
                      <div class="portfolio-cover">
                          <img src="${project.mainImage}" alt="${
        project.title
      }" />
                      </div>
                      <div class="portfolio-info">
                          <div class="portfolio-title">
                              <h4>${project.title}</h4>
                              <a href="detail_portfolio.html?id=${i}" class="portfolio-link">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                      <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z" />
                                  </svg>
                              </a>
                          </div>
                          <div class="portfolio-tags">
                              ${project.technologies
                                .split(", ")
                                .map((tech) => `<div>${tech.trim()}</div>`)
                                .join("")}
                          </div>
                          <p>${project.description.substring(0, 100)}...</p>
                      </div>
                  `;

      featuredProjectsContainer.appendChild(projectDiv);
    }
  } catch (error) {
    console.error("Gagal memuat data proyek unggulan:", error);
    document.getElementById("featured-projects").innerHTML =
      "<p>Gagal memuat data proyek unggulan.</p>";
  }
}

loadFeaturedProjects();
