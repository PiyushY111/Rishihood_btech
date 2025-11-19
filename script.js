// Programme data with content for each program
const programmeData = {
  bdesign: {
    title: "B.Design",
    description:
      "Combining modern innovation with timeless design principles, our Bachelor of Design program offers an immersive, interdisciplinary curriculum that spans UX/UI, communication design, product, fashion, and interior architecture.",
    image: "./imgs/design-student.png",
  },
  bba: {
    title: "BBA Entrepreneurship",
    description:
      "Ideal for students who want to land management roles and found startups of their own, our Makers Undergrad – BBA in Entrepreneurship, is India's 1st Undergraduate Program at the confluence of Business, Entrepreneurship, and Technology.",
    image: "./imgs/BBA-Makers.png",
  },
  psychology: {
    title: "BSc. Hons - Psychology",
    description:
      "Our B.Sc in Psychology is a retake on conventional psychology that amalgamates academia, industry exposure, with a unique Indic perspective. Learn through hands-on learning through two paid internships, industrial visits, and practical fieldwork.",
    image: "./imgs/Psychology.png",
  },
  "btech-ai": {
    title: "B. Tech - CS & AI",
    description:
      "Designed in collaboration with the Newton School of Technology (NST), our B.Tech in Computer Science and Artificial Intelligence, blends theoretical depth with practical, hands-on expertise focusing on AI, machine learning, and data science.",
    image: "./imgs/B.Tech.png",
  },
  "btech-ds": {
    title: "B. Tech CS & Data Science",
    description:
      "Co-created with KPMG in India, our B.Tech CS & Data Science, combines business strategy with the power of data analytics. Learn predictive modeling, data visualization, business intelligence, and other skills to make data-driven decisions.",
    image: "./imgs/B.Tech-Data-Science.png",
  },
  phd: {
    title: "Ph.D",
    description:
      "The Doctoral program at Rishihood aims to nurture researchers and provide them a platform to pursue their ideas and work on them further in guided collaboration with faculty members of the university.",
    image: "./imgs/Ph.D.png",
  },
};

// Function to update programme content
function updateProgrammeContent(programmeKey) {
  const data = programmeData[programmeKey];

  // Update title
  const titleElement = document.querySelector(".programme-name");
  titleElement.textContent = data.title;

  // Update description
  const descriptionElement = document.querySelector(".programme-description");
  descriptionElement.textContent = data.description;

  // Update image
  const imageElement = document.querySelector(".programme-image img");
  imageElement.src = data.image;
  imageElement.alt = data.title;
}

document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("draggable", "false");
});

// Add click event listeners to all programme tabs
document.addEventListener("DOMContentLoaded", function () {
  // Generate mobile programme cards dynamically
  const mobileCardsContainer = document.querySelector(
    ".mobile-programme-cards"
  );
  if (mobileCardsContainer) {
    const programmeKeys = [
      "bdesign",
      "bba",
      "psychology",
      "btech-ai",
      "btech-ds",
      "phd",
    ];

    programmeKeys.forEach((key) => {
      const data = programmeData[key];
      const card = document.createElement("div");
      card.className = "programme-card";
      card.innerHTML = `
                <div class="programme-image">
                    <img src="${data.image}" alt="${data.title}">
                </div>
                <div class="programme-content">
                    <h3 class="programme-name">${data.title}</h3>
                    <div class="divider"></div>
                    <p class="programme-description">${data.description}</p>
                    <button class="know-more-btn">Know More</button>
                </div>
            `;
      mobileCardsContainer.appendChild(card);
    });
  }

  const programmeTabs = document.querySelectorAll(".programme-tab");

  programmeTabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      programmeTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Map index to programme key
      const programmeKeys = [
        "bdesign",
        "bba",
        "psychology",
        "btech-ai",
        "btech-ds",
        "phd",
      ];
      const programmeKey = programmeKeys[index];

      // Update content
      updateProgrammeContent(programmeKey);
    });
  });

  // Startup cards functionality - Click to expand/collapse (disabled on mobile)
  const startupCards = document.querySelectorAll(".startup-card");
  const isMobile = () => window.innerWidth <= 768;

  startupCards.forEach((card) => {
    card.addEventListener("click", function () {
      // On mobile clicking should do nothing
      if (isMobile()) return;

      // Remove active class from all cards
      startupCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      this.classList.add("active");
    });
  });

  // Ensure all startup cards are active on mobile (so clicking doesn't change anything)
  function updateStartupActiveState() {
    if (isMobile()) {
      startupCards.forEach((c) => c.classList.add("active"));
    } else {
      // On desktop, keep first card active by default
      startupCards.forEach((c) => c.classList.remove("active"));
      if (startupCards[0]) startupCards[0].classList.add("active");
    }
  }
  updateStartupActiveState();

  // Re-apply when resizing
  window.addEventListener("resize", () => {
    // debounce
    clearTimeout(window._startupResizeTimer);
    window._startupResizeTimer = setTimeout(updateStartupActiveState, 150);
  });

  // Testimonial cards functionality - Click to expand/collapse
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );

  // Testimonial cards functionality - Click to expand/collapse (disabled on mobile)
  testimonialCards.forEach((card) => {
    card.addEventListener("click", function () {
      // On mobile clicking should do nothing
      if (isMobile()) return;

      // Remove active class from all cards
      testimonialCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      this.classList.add("active");
    });
  });

  // Ensure all testimonial cards are active on mobile
  function updateTestimonialActiveState() {
    if (isMobile()) {
      testimonialCards.forEach((c) => c.classList.add("active"));
    } else {
      testimonialCards.forEach((c) => c.classList.remove("active"));
      if (testimonialCards[0]) testimonialCards[0].classList.add("active");
    }
  }
  updateTestimonialActiveState();

  // Re-apply when resizing
  window.addEventListener("resize", () => {
    clearTimeout(window._testimonialResizeTimer);
    window._testimonialResizeTimer = setTimeout(
      updateTestimonialActiveState,
      150
    );
  });

  // Testimonial navigation arrows - support desktop carousel and mobile scroll-snap
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  if (prevArrow && nextArrow && testimonialsContainer) {
    let currentStartIndex = 0;
    const visibleCards = 3; // desktop: show 3 cards at a time
    const totalCards = testimonialCards.length;

    // Desktop carousel behavior (hide/show cards)
    function updateCarousel() {
      // Hide all cards first
      testimonialCards.forEach((card, index) => {
        if (
          index >= currentStartIndex &&
          index < currentStartIndex + visibleCards
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });

      // Activate the first visible card
      testimonialCards.forEach((c) => c.classList.remove("active"));
      if (testimonialCards[currentStartIndex]) {
        testimonialCards[currentStartIndex].classList.add("active");
      }

      // Update arrow states
      prevArrow.disabled = currentStartIndex === 0;
      nextArrow.disabled = currentStartIndex >= totalCards - visibleCards;
    }

    // Mobile scroll behavior
    const mobileScrollAmount = () =>
      Math.round(testimonialsContainer.clientWidth * 0.82);

    function updateMobileArrows() {
      prevArrow.disabled = testimonialsContainer.scrollLeft <= 5;
      nextArrow.disabled =
        testimonialsContainer.scrollLeft + testimonialsContainer.clientWidth >=
        testimonialsContainer.scrollWidth - 5;
    }

    // Handlers for desktop
    function desktopNext() {
      if (currentStartIndex < totalCards - visibleCards) {
        currentStartIndex++;
        updateCarousel();
        nextArrow.classList.add("active");
        setTimeout(() => nextArrow.classList.remove("active"), 200);
      }
    }

    function desktopPrev() {
      if (currentStartIndex > 0) {
        currentStartIndex--;
        updateCarousel();
        prevArrow.classList.add("active");
        setTimeout(() => prevArrow.classList.remove("active"), 200);
      }
    }

    // Handlers for mobile
    function mobileNext(e) {
      e.preventDefault();
      testimonialsContainer.scrollBy({
        left: mobileScrollAmount(),
        behavior: "smooth",
      });
    }

    function mobilePrev(e) {
      e.preventDefault();
      testimonialsContainer.scrollBy({
        left: -mobileScrollAmount(),
        behavior: "smooth",
      });
    }

    // Initialize according to viewport
    function enableDesktopMode() {
      // detach mobile handlers
      testimonialsContainer.removeEventListener("scroll", updateMobileArrows);
      nextArrow.removeEventListener("click", mobileNext);
      prevArrow.removeEventListener("click", mobilePrev);

      // show desktop carousel
      testimonialCards.forEach((card) => (card.style.display = "flex"));
      // reset index and set desktop behavior
      currentStartIndex = 0;
      nextArrow.addEventListener("click", desktopNext);
      prevArrow.addEventListener("click", desktopPrev);
      updateCarousel();
    }

    function enableMobileMode() {
      // detach desktop handlers
      nextArrow.removeEventListener("click", desktopNext);
      prevArrow.removeEventListener("click", desktopPrev);

      // ensure all cards visible in row
      testimonialCards.forEach((card) => {
        card.style.display = "flex";
      });

      // Do NOT attach mobile click handlers for testimonials because
      // testimonial navigation buttons are hidden on mobile by CSS.
      // Keep buttons disabled to avoid accidental focus/key activation.
      try {
        prevArrow.disabled = true;
        nextArrow.disabled = true;
      } catch (e) {
        // ignore if buttons not present
      }
    }

    // Decide initial mode and listen for resizes to swap
    function initTestimonialMode() {
      if (window.innerWidth <= 768) {
        enableMobileMode();
      } else {
        enableDesktopMode();
      }
    }

    // Re-init on resize (debounced)
    let testimonialResizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(testimonialResizeTimer);
      testimonialResizeTimer = setTimeout(function () {
        initTestimonialMode();
      }, 200);
    });

    // Initialize
    initTestimonialMode();
  }
});

// ============= FACULTY CAROUSEL ===============
let currentFacultyTab = "our-faculty";
let facultyPositions = {
  "our-faculty": 0,
  "visiting-faculty": 0,
};

// Make switchTab and moveCarousel global functions for HTML onclick handlers
window.switchTab = switchTab;
window.moveCarousel = moveCarousel;

function switchTab(tabName) {
  currentFacultyTab = tabName;

  // Update tab buttons
  const allTabs = document.querySelectorAll(".faculty-tab");
  allTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const activeTab = document.getElementById(`tab-${tabName}`);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Update carousel containers
  const containers = document.querySelectorAll(".carousel-container");
  containers.forEach((container) => container.classList.add("hidden"));

  const targetContainer = document.getElementById(tabName);
  if (targetContainer) {
    targetContainer.classList.remove("hidden");
  }

  updateFacultyCarousel();
}

function moveCarousel(direction) {
  const carousel = document.querySelector(`#${currentFacultyTab} .carousel`);
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".faculty-card");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // On mobile switch to native horizontal scrolling
    const carouselContainer = document.getElementById(currentFacultyTab);
    if (!carouselContainer) return;

    // scroll amount ~= 80% of viewport of the carousel container
    const scrollAmount = Math.round(carouselContainer.clientWidth * 0.8);
    carouselContainer.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
    return;
  }

  // Desktop behaviour (transform-based)
  const cardWidth = 420; // Approximate card width + gap (380px + 40px gap)
  const visibleCards = 3;
  const maxPosition = -(cards.length - visibleCards) * cardWidth;

  facultyPositions[currentFacultyTab] += direction * cardWidth;

  // Boundary checks
  if (facultyPositions[currentFacultyTab] > 0) {
    facultyPositions[currentFacultyTab] = 0;
  }
  if (facultyPositions[currentFacultyTab] < maxPosition) {
    facultyPositions[currentFacultyTab] = maxPosition;
  }

  updateFacultyCarousel();
}

function updateFacultyCarousel() {
  const carousel = document.querySelector(`#${currentFacultyTab} .carousel`);
  if (!carousel) return;

  const cards = carousel.querySelectorAll(".faculty-card");
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // On mobile we use native scrolling; ensure transform is reset
    carousel.style.transform = "none";
    // Reset stored desktop positions to avoid accidental jumps if resizing
    facultyPositions["our-faculty"] = 0;
    facultyPositions["visiting-faculty"] = 0;
    return;
  }

  // Desktop: transform-based carousel
  carousel.style.transform = `translateX(${facultyPositions[currentFacultyTab]}px)`;

  // Update arrow button states
  const leftArrow = document.getElementById("arrow-left");
  const rightArrow = document.getElementById("arrow-right");

  if (leftArrow && rightArrow) {
    const maxPosition = -(cards.length - 3) * 420;
    leftArrow.disabled = facultyPositions[currentFacultyTab] >= 0;
    rightArrow.disabled = facultyPositions[currentFacultyTab] <= maxPosition;
  }
}

// Initialize faculty carousel
document.addEventListener("DOMContentLoaded", function () {
  // Ensure the "Our Faculty" tab is active by default
  switchTab("our-faculty");
});

window.addEventListener("load", function () {
  updateFacultyCarousel();
});

window.addEventListener("resize", () => {
  // Reset positions on resize to avoid layout issues
  facultyPositions[currentFacultyTab] = 0;
  updateFacultyCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  if (!faqItems.length) {
    return;
  }

  const setIcon = (item, symbol) => {
    const icon = item.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = symbol;
    }
  };

  faqItems.forEach((item) => {
    setIcon(item, item.classList.contains("active") ? "-" : "+");
    const button = item.querySelector(".faq-button");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        setIcon(other, "+");
      });

      if (!isActive) {
        item.classList.add("active");
        setIcon(item, "-");
      }
    });
  });
});

// Mobile User Icon Popup Logic
function isMobileView() {
  return window.innerWidth <= 768;
}

function showFormPopup() {
  const formCard = document.querySelector(".form-card");
  let overlay = document.querySelector(".form-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "form-overlay";
    document.body.appendChild(overlay);
  }
  overlay.style.display = "block";
  formCard.classList.add("popup-active");
  formCard.style.display = "block";
  overlay.onclick = closeFormPopup;
}

function closeFormPopup() {
  const formCard = document.querySelector(".form-card");
  const overlay = document.querySelector(".form-overlay");
  if (formCard) {
    formCard.classList.remove("popup-active");
    formCard.style.display = "";
  }
  if (overlay) {
    overlay.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.querySelector(".mobile-user-icon");
  if (userIcon) {
    userIcon.addEventListener("click", function () {
      if (isMobileView()) {
        showFormPopup();
      }
    });
  }

  // Optional: Add close button to form
  const formCard = document.querySelector(".form-card");
  if (formCard && !formCard.querySelector(".form-close-btn")) {
    const closeBtn = document.createElement("button");
    closeBtn.className = "form-close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "18px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "2rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = closeFormPopup;
    formCard.appendChild(closeBtn);
  }
});

// Exposure Cards Overlap Animation
function initExposureCardsAnimation() {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;

  const cardsContainer = document.querySelector(".exposure-cards-container");
  const cards = document.querySelectorAll(".exposure-card");

  if (!cardsContainer || cards.length === 0) return;

  // Set initial state
  cards.forEach((card, index) => {
    card.classList.add("card-active");
  });

  function updateCardsAnimation() {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerRect = cardsContainer.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const viewportHeight = window.innerHeight;

    // Calculate how far we've scrolled into the container
    const scrollIntoContainer = scrollTop - containerTop + viewportHeight * 0.5;
    const cardHeight = cards[0].offsetHeight + 40; // card height + margin

    cards.forEach((card, index) => {
      // Remove all classes first
      card.classList.remove("card-active", "card-scaling");

      // Calculate the scroll position for this card
      const cardScrollStart = index * cardHeight;
      const cardScrollEnd = cardScrollStart + cardHeight;

      if (
        scrollIntoContainer >= cardScrollStart &&
        scrollIntoContainer < cardScrollEnd - 100
      ) {
        // Card is active
        card.classList.add("card-active");
      } else if (
        scrollIntoContainer >= cardScrollEnd - 100 &&
        scrollIntoContainer < cardScrollEnd + 50
      ) {
        // Card is being overtaken - scale down slightly
        card.classList.add("card-scaling");
      } else {
        // Card is in its default state
        card.classList.add("card-active");
      }
    });
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCardsAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial call
  updateCardsAnimation();
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  initExposureCardsAnimation();
});

// Re-initialize on window resize
window.addEventListener("resize", function () {
  // Debounce resize handler
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function () {
    initExposureCardsAnimation();
  }, 250);
});

// Experience Life - mobile horizontal scroll navigation using existing arrows
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".video-cards-container");
  const prevBtn = document.querySelector(".prev-exp-arrow");
  const nextBtn = document.querySelector(".next-exp-arrow");

  if (!container || !prevBtn || !nextBtn) return;

  const isMobileView = () => window.innerWidth <= 768;
  const scrollAmount = () => Math.round(container.clientWidth * 0.82);

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  function updateArrows() {
    if (!isMobileView()) {
      // hide or disable on desktop
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = container.scrollLeft <= 5;
    nextBtn.disabled =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
  }

  container.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  // Initial state
  updateArrows();
});

// Apply Now button redirection to form
document.addEventListener("DOMContentLoaded", function () {
  const applyBtn = document.querySelector(".apply-btn");

  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      const formCard = document.getElementById("registration-form");
      if (formCard) {
        formCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Optional: Add a subtle highlight effect
        formCard.style.transition = "box-shadow 0.3s ease";
        formCard.style.boxShadow = "0 0 20px rgba(200, 16, 46, 0.3)";
        setTimeout(() => {
          formCard.style.boxShadow = "";
        }, 1500);
      }
    });
  }
});

// Rishihood University B.Design - JavaScript Functionality

document.addEventListener("DOMContentLoaded", function () {
  // ============= PROGRAM EXPERIENCE TABS ===============
  const tabButtons = document.querySelectorAll(".tab-button");
  const statsContents = document.querySelectorAll(
    ".stats-grid, .software-grid, .industry-content"
  );

  // Set the first tab active by default
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add("active-tab");
    statsContents.forEach((content) => {
      if (content.id === tabButtons[0].dataset.tab) {
        content.style.display = content.classList.contains("stats-grid")
          ? "grid"
          : "block";
      } else {
        content.style.display = "none";
      }
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;

      // Remove active styling from all tabs
      tabButtons.forEach((btn) => {
        btn.classList.remove("active-tab");
      });

      // Add active styling to clicked tab
      button.classList.add("active-tab");

      // Show corresponding content and hide others
      statsContents.forEach((content) => {
        if (content.id === targetTab) {
          content.style.display = content.classList.contains("stats-grid")
            ? "grid"
            : "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  });

  // ============= CURRICULUM YEAR TABS ===============
  const curriculumTabs = document.querySelectorAll(".curriculum-semester-tab");
  const curriculumContents = document.querySelectorAll(
    ".curriculum-year-content"
  );

  curriculumTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetYear = tab.dataset.year;

      // Remove active styling from all curriculum tabs
      curriculumTabs.forEach((btn) => {
        btn.classList.remove("curriculum-semester-tab-active");
      });

      // Add active styling to clicked tab
      tab.classList.add("curriculum-semester-tab-active");

      // Show corresponding content and hide others
      curriculumContents.forEach((content) => {
        if (content.id === targetYear) {
          content.classList.add("curriculum-year-content-visible");
          content.classList.remove("curriculum-year-content-hidden");
        } else {
          content.classList.remove("curriculum-year-content-visible");
          content.classList.add("curriculum-year-content-hidden");
        }
      });
    });
  });

  // ============= FAQ FUNCTIONALITY ===============
  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const faqItem = this.closest(".faq-item");
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });

  // ============= FACULTY CAROUSEL ===============
  let currentTab = "our-faculty";
  let positions = {
    "our-faculty": 0,
    "visiting-faculty": 0,
  };

  // ============= TESTIMONIALS FUNCTIONALITY ===============

  // Check if mobile
  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  // Helper: find container
  const getContainer = (scope = document) =>
    scope.querySelector(".testimonials-container") ||
    scope.querySelector(".testimonial-cards");

  // Work per section if present; else single global block
  const sections = document.querySelectorAll(".testimonials-section");
  const blocks = sections.length ? sections : [document];

  blocks.forEach((scope) => {
    const container = getContainer(scope);
    const cards = container
      ? container.querySelectorAll(".testimonial-card")
      : [];

    // arrows: prefer inside section, else global
    const prevArrow =
      scope.querySelector?.(".prev-arrow") ||
      document.querySelector(".prev-arrow");
    const nextArrow =
      scope.querySelector?.(".next-arrow") ||
      document.querySelector(".next-arrow");

    if (!container || !cards.length) return;

    // ---- Active handling (desktop only) ----
    const setActive = (el) => {
      cards.forEach((c) => c.classList.remove("active"));
      if (el) el.classList.add("active");
    };

    const onCardClick = (e) => {
      if (isMobile()) return;
      setActive(e.currentTarget);
    };

    cards.forEach((c) => c.addEventListener("click", onCardClick));

    const updateActiveForViewport = () => {
      if (isMobile()) {
        cards.forEach((c) => c.classList.add("active"));
      } else {
        cards.forEach((c) => c.classList.remove("active"));
        setActive(cards[0]);
      }
    };

    // ---- Desktop carousel & Mobile scroll ----
    let currentStartIndex = 0;
    const visibleCards = 3;
    const totalCards = cards.length;

    const updateDesktopCarousel = () => {
      cards.forEach((card, i) => {
        card.style.display =
          i >= currentStartIndex && i < currentStartIndex + visibleCards
            ? "flex"
            : "none";
      });
      setActive(cards[currentStartIndex]);
      if (prevArrow) prevArrow.disabled = currentStartIndex === 0;
      if (nextArrow)
        nextArrow.disabled = currentStartIndex >= totalCards - visibleCards;
    };

    const desktopNext = () => {
      if (currentStartIndex < totalCards - visibleCards) {
        currentStartIndex++;
        updateDesktopCarousel();
      }
    };

    const desktopPrev = () => {
      if (currentStartIndex > 0) {
        currentStartIndex--;
        updateDesktopCarousel();
      }
    };

    // Mobile scroll helpers
    const mobileScrollAmount = () => Math.round(container.clientWidth * 0.82);
    const mobileNext = (e) => {
      e?.preventDefault?.();
      container.scrollBy({ left: mobileScrollAmount(), behavior: "smooth" });
    };
    const mobilePrev = (e) => {
      e?.preventDefault?.();
      container.scrollBy({ left: -mobileScrollAmount(), behavior: "smooth" });
    };

    const updateMobileArrows = () => {
      if (!prevArrow || !nextArrow) return;
      // Make sure arrows are enabled & visible on mobile
      prevArrow.disabled = container.scrollLeft <= 5;
      nextArrow.disabled =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5;
    };

    // Attach/detach to avoid duplicate listeners on resize
    const enableDesktopMode = () => {
      // detach mobile
      container.removeEventListener("scroll", updateMobileArrows);
      prevArrow?.removeEventListener("click", mobilePrev);
      nextArrow?.removeEventListener("click", mobileNext);

      // show all then filter
      cards.forEach((card) => {
        card.style.display = "flex";
      });
      currentStartIndex = 0;

      // attach desktop
      prevArrow?.removeEventListener("click", desktopPrev);
      nextArrow?.removeEventListener("click", desktopNext);
      prevArrow?.addEventListener("click", desktopPrev);
      nextArrow?.addEventListener("click", desktopNext);

      updateDesktopCarousel();
    };

    const enableMobileMode = () => {
      // detach desktop
      prevArrow?.removeEventListener("click", desktopPrev);
      nextArrow?.removeEventListener("click", desktopNext);

      // all cards visible in row
      cards.forEach((card) => {
        card.style.display = "flex";
      });

      // ensure arrow buttons are clickable/enabled
      if (prevArrow) prevArrow.disabled = false;
      if (nextArrow) nextArrow.disabled = false;

      // attach mobile
      container.addEventListener("scroll", updateMobileArrows);
      prevArrow?.removeEventListener("click", mobilePrev);
      nextArrow?.removeEventListener("click", mobileNext);
      prevArrow?.addEventListener("click", mobilePrev);
      nextArrow?.addEventListener("click", mobileNext);

      // initial state
      updateMobileArrows();
    };

    const initMode = () => {
      updateActiveForViewport();
      if (isMobile()) enableMobileMode();
      else enableDesktopMode();
    };

    let rszTimer;
    const onResize = () => {
      clearTimeout(rszTimer);
      rszTimer = setTimeout(initMode, 150);
    };

    initMode();
    window.addEventListener("resize", onResize);
  });

  // ============= EXPOSURE SECTION SWIPER ===============

  // Initialize Swiper for exposure section
  if (document.querySelector(".exposureSwiper")) {
    const swiper = new Swiper(".exposureSwiper", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 800,
      effect: "slide",
    });
  }

  // ============= SMOOTH SCROLLING FOR ANCHOR LINKS ===============

  // Add smooth scrolling behavior for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ============= NAVBAR SCROLL EFFECT (OPTIONAL) ===============

  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // ============= FADE IN ANIMATION ON SCROLL (OPTIONAL) ===============

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe all sections for fade-in animation
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  console.log("Rishihood B.Design website loaded successfully!");
});

// ============= UTILITY FUNCTIONS ===============

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Startup cards functionality - Click to expand/collapse (disabled on mobile)
const startupCards = document.querySelectorAll(".startup-card");
const isMobile = () => window.innerWidth <= 768;

startupCards.forEach((card) => {
  card.addEventListener("click", function () {
    // On mobile clicking should do nothing
    if (isMobile()) return;

    // Remove active class from all cards
    startupCards.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked card
    this.classList.add("active");
  });
});

// Ensure all startup cards are active on mobile (so clicking doesn't change anything)
function updateStartupActiveState() {
  if (isMobile()) {
    startupCards.forEach((c) => c.classList.add("active"));
  } else {
    // On desktop, keep first card active by default
    startupCards.forEach((c) => c.classList.remove("active"));
    if (startupCards[0]) startupCards[0].classList.add("active");
  }
}
updateStartupActiveState();

// Re-apply when resizing
window.addEventListener("resize", () => {
  // debounce
  clearTimeout(window._startupResizeTimer);
  window._startupResizeTimer = setTimeout(updateStartupActiveState, 150);
});

// Testimonial cards functionality - Click to expand/collapse
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialsContainer = document.querySelector(".testimonials-container");

// Testimonial cards functionality - Click to expand/collapse (disabled on mobile)
testimonialCards.forEach((card) => {
  card.addEventListener("click", function () {
    // On mobile clicking should do nothing
    if (isMobile()) return;

    // Remove active class from all cards
    testimonialCards.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked card
    this.classList.add("active");
  });
});

// Ensure all testimonial cards are active on mobile
function updateTestimonialActiveState() {
  if (isMobile()) {
    testimonialCards.forEach((c) => c.classList.add("active"));
  } else {
    testimonialCards.forEach((c) => c.classList.remove("active"));
    if (testimonialCards[0]) testimonialCards[0].classList.add("active");
  }
}
updateTestimonialActiveState();

// Re-apply when resizing
window.addEventListener("resize", () => {
  clearTimeout(window._testimonialResizeTimer);
  window._testimonialResizeTimer = setTimeout(
    updateTestimonialActiveState,
    150
  );
});

// Testimonial navigation arrows - support desktop carousel and mobile scroll-snap
const prevArrow = document.querySelector(".prev-arrow");
const nextArrow = document.querySelector(".next-arrow");

if (prevArrow && nextArrow && testimonialsContainer) {
  let currentStartIndex = 0;
  const visibleCards = 3; // desktop: show 3 cards at a time
  const totalCards = testimonialCards.length;

  // Desktop carousel behavior (hide/show cards)
  function updateCarousel() {
    // Hide all cards first
    testimonialCards.forEach((card, index) => {
      if (
        index >= currentStartIndex &&
        index < currentStartIndex + visibleCards
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    // Activate the first visible card
    testimonialCards.forEach((c) => c.classList.remove("active"));
    if (testimonialCards[currentStartIndex]) {
      testimonialCards[currentStartIndex].classList.add("active");
    }

    // Update arrow states
    prevArrow.disabled = currentStartIndex === 0;
    nextArrow.disabled = currentStartIndex >= totalCards - visibleCards;
  }

  // Mobile scroll behavior
  const mobileScrollAmount = () =>
    Math.round(testimonialsContainer.clientWidth * 0.82);

  function updateMobileArrows() {
    prevArrow.disabled = testimonialsContainer.scrollLeft <= 5;
    nextArrow.disabled =
      testimonialsContainer.scrollLeft + testimonialsContainer.clientWidth >=
      testimonialsContainer.scrollWidth - 5;
  }

  // Handlers for desktop
  function desktopNext() {
    if (currentStartIndex < totalCards - visibleCards) {
      currentStartIndex++;
      updateCarousel();
      nextArrow.classList.add("active");
      setTimeout(() => nextArrow.classList.remove("active"), 200);
    }
  }

  function desktopPrev() {
    if (currentStartIndex > 0) {
      currentStartIndex--;
      updateCarousel();
      prevArrow.classList.add("active");
      setTimeout(() => prevArrow.classList.remove("active"), 200);
    }
  }

  // Handlers for mobile
  function mobileNext(e) {
    e.preventDefault();
    testimonialsContainer.scrollBy({
      left: mobileScrollAmount(),
      behavior: "smooth",
    });
  }

  function mobilePrev(e) {
    e.preventDefault();
    testimonialsContainer.scrollBy({
      left: -mobileScrollAmount(),
      behavior: "smooth",
    });
  }

  // Initialize according to viewport
  function enableDesktopMode() {
    // detach mobile handlers
    testimonialsContainer.removeEventListener("scroll", updateMobileArrows);
    nextArrow.removeEventListener("click", mobileNext);
    prevArrow.removeEventListener("click", mobilePrev);

    // show desktop carousel
    testimonialCards.forEach((card) => (card.style.display = "flex"));
    // reset index and set desktop behavior
    currentStartIndex = 0;
    nextArrow.addEventListener("click", desktopNext);
    prevArrow.addEventListener("click", desktopPrev);
    updateCarousel();
  }

  function enableMobileMode() {
    // detach desktop handlers
    nextArrow.removeEventListener("click", desktopNext);
    prevArrow.removeEventListener("click", desktopPrev);

    // ensure all cards visible in row
    testimonialCards.forEach((card) => {
      card.style.display = "flex";
    });

    // Do NOT attach mobile click handlers for testimonials because
    // testimonial navigation buttons are hidden on mobile by CSS.
    // Keep buttons disabled to avoid accidental focus/key activation.
    try {
      prevArrow.disabled = true;
      nextArrow.disabled = true;
    } catch (e) {
      // ignore if buttons not present
    }
  }

  // Decide initial mode and listen for resizes to swap
  function initTestimonialMode() {
    if (window.innerWidth <= 768) {
      enableMobileMode();
    } else {
      enableDesktopMode();
    }
  }

  // Re-init on resize (debounced)
  let testimonialResizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(testimonialResizeTimer);
    testimonialResizeTimer = setTimeout(function () {
      initTestimonialMode();
    }, 200);
  });

  // Initialize
  initTestimonialMode();
}

// Faculty section functionality is handled above in the main FACULTY CAROUSEL section

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  if (!faqItems.length) {
    return;
  }

  const setIcon = (item, symbol) => {
    const icon = item.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = symbol;
    }
  };

  faqItems.forEach((item) => {
    setIcon(item, item.classList.contains("active") ? "-" : "+");
    const button = item.querySelector(".faq-button");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        setIcon(other, "+");
      });

      if (!isActive) {
        item.classList.add("active");
        setIcon(item, "-");
      }
    });
  });
});

// Mobile User Icon Popup Logic
function isMobileView() {
  return window.innerWidth <= 768;
}

function showFormPopup() {
  const formCard = document.querySelector(".form-card");
  let overlay = document.querySelector(".form-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "form-overlay";
    document.body.appendChild(overlay);
  }
  overlay.style.display = "block";
  formCard.classList.add("popup-active");
  formCard.style.display = "block";
  overlay.onclick = closeFormPopup;
}

function closeFormPopup() {
  const formCard = document.querySelector(".form-card");
  const overlay = document.querySelector(".form-overlay");
  if (formCard) {
    formCard.classList.remove("popup-active");
    formCard.style.display = "";
  }
  if (overlay) {
    overlay.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.querySelector(".mobile-user-icon");
  if (userIcon) {
    userIcon.addEventListener("click", function () {
      if (isMobileView()) {
        showFormPopup();
      }
    });
  }

  // Optional: Add close button to form
  const formCard = document.querySelector(".form-card");
  if (formCard && !formCard.querySelector(".form-close-btn")) {
    const closeBtn = document.createElement("button");
    closeBtn.className = "form-close-btn";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "18px";
    closeBtn.style.background = "none";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "2rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = closeFormPopup;
    formCard.appendChild(closeBtn);
  }
});

// Exposure Cards Overlap Animation
function initExposureCardsAnimation() {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;

  const cardsContainer = document.querySelector(".exposure-cards-container");
  const cards = document.querySelectorAll(".exposure-card");

  if (!cardsContainer || cards.length === 0) return;

  // Set initial state
  cards.forEach((card, index) => {
    card.classList.add("card-active");
  });

  function updateCardsAnimation() {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerRect = cardsContainer.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const viewportHeight = window.innerHeight;

    // Calculate how far we've scrolled into the container
    const scrollIntoContainer = scrollTop - containerTop + viewportHeight * 0.5;
    const cardHeight = cards[0].offsetHeight + 40; // card height + margin

    cards.forEach((card, index) => {
      // Remove all classes first
      card.classList.remove("card-active", "card-scaling");

      // Calculate the scroll position for this card
      const cardScrollStart = index * cardHeight;
      const cardScrollEnd = cardScrollStart + cardHeight;

      if (
        scrollIntoContainer >= cardScrollStart &&
        scrollIntoContainer < cardScrollEnd - 100
      ) {
        // Card is active
        card.classList.add("card-active");
      } else if (
        scrollIntoContainer >= cardScrollEnd - 100 &&
        scrollIntoContainer < cardScrollEnd + 50
      ) {
        // Card is being overtaken - scale down slightly
        card.classList.add("card-scaling");
      } else {
        // Card is in its default state
        card.classList.add("card-active");
      }
    });
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCardsAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial call
  updateCardsAnimation();
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  initExposureCardsAnimation();
});

// Re-initialize on window resize
window.addEventListener("resize", function () {
  // Debounce resize handler
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function () {
    initExposureCardsAnimation();
  }, 250);
});

// Experience Life - mobile horizontal scroll navigation using existing arrows
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".video-cards-container");
  const prevBtn = document.querySelector(".prev-exp-arrow");
  const nextBtn = document.querySelector(".next-exp-arrow");

  if (!container || !prevBtn || !nextBtn) return;

  const isMobileView = () => window.innerWidth <= 768;
  const scrollAmount = () => Math.round(container.clientWidth * 0.82);

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    container.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });

  function updateArrows() {
    if (!isMobileView()) {
      // hide or disable on desktop
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    prevBtn.disabled = container.scrollLeft <= 5;
    nextBtn.disabled =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
  }

  container.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  // Initial state
  updateArrows();
});

// Apply Now button redirection to form
document.addEventListener("DOMContentLoaded", function () {
  const applyBtn = document.querySelector(".apply-btn");

  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      const formCard = document.getElementById("registration-form");
      if (formCard) {
        formCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Optional: Add a subtle highlight effect
        formCard.style.transition = "box-shadow 0.3s ease";
        formCard.style.boxShadow = "0 0 20px rgba(200, 16, 46, 0.3)";
        setTimeout(() => {
          formCard.style.boxShadow = "";
        }, 1500);
      }
    });
  }
});
