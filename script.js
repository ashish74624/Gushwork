const carouselImages = [
  "assets/images/people_working.jpg",
  "assets/images/people_working2.jpg",
  "assets/images/people_working3.jpg",
  "assets/images/people_working.jpg",
  "assets/images/people_working2.jpg",
  "assets/images/people_working3.jpg",
  "assets/images/people_working.jpg",
  "assets/images/people_working2.jpg",
  "assets/images/people_working3.jpg",
  "assets/images/people_working.jpg",
];


// applications card carousel logic
const carousel = document.querySelector(".applicationsCarousel");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
console.log(carousel,leftArrow,rightArrow);

const scrollAmount = 470; 

rightArrow.addEventListener("click", () => {
    console.log("right arrow clicked");
  carousel.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

leftArrow.addEventListener("click", () => {
        console.log("right arrow clicked");
  carousel.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

// Frequently asked question accordion close/open logic
const accordionHeaders = document.querySelectorAll(".accordionItemHeader");

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {

    const item = header.parentElement;
    const content = item.querySelector(".accordionItemContent");
    const icon = header.querySelector("img");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.src = "assets/icons/ArrowDown.svg";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.src = "assets/icons/ArrowUp.svg";
    }

  });
});


// Home page image selection logic 
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".carouselImage");

const mainLeftArrow = document.getElementById("mainLeftArrow");
const mainRightArrow = document.getElementById("mainRightArrow");

let currentIndex = 0;

// update image
function updateImage(index){

  mainImage.classList.add("imageFadeOut");

  setTimeout(() => {
    mainImage.src = thumbnails[index].src;
    mainImage.classList.remove("imageFadeOut");
  }, 200);

  leftArrow.disabled = index === 0;
  rightArrow.disabled = index === thumbnails.length - 1;
}

// thumbnail click
thumbnails.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    updateImage(currentIndex);
  });
});

// right arrow
mainRightArrow.addEventListener("click", () => {
  if(currentIndex < thumbnails.length - 1){
    currentIndex++;
    updateImage(currentIndex);
  }
});

// left arrow
mainLeftArrow.addEventListener("click", () => {
  if(currentIndex > 0){
    currentIndex--;
    updateImage(currentIndex);
  }
});

// initial state
updateImage(currentIndex);

// Home page image zoom logic
const zoomPreview = document.getElementById("zoomPreview");

let zoomActive = false;

mainImage.addEventListener("dblclick", () => {

  zoomActive = !zoomActive;

  if (zoomActive) {
    zoomPreview.classList.add("active");
    zoomPreview.style.backgroundImage = `url(${mainImage.src})`;
  } else {
    zoomPreview.classList.remove("active");
  }

});

mainImage.addEventListener("mousemove", (e) => {

  if (!zoomActive) return;

  const rect = mainImage.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  zoomPreview.style.backgroundPosition = `${x}% ${y}%`;

});

document.addEventListener("click", (e) => {

  const imageViewer = document.querySelector(".homePageImage");

  if (zoomActive && !imageViewer.contains(e.target)) {
    zoomPreview.classList.remove("active");
    zoomActive = false;
  }

});

// sticky header scroll logic 
let lastScrollY = window.scrollY;

const stickyHeader = document.querySelector(".stickyHeader");
const heroSection = document.querySelector(".mainPage");

window.addEventListener("scroll", () => {

  const heroBottom = heroSection.offsetHeight;
  const currentScroll = window.scrollY;

  if (currentScroll > heroBottom && currentScroll > lastScrollY) {
    // scrolling down
    stickyHeader.classList.add("active");
  } else {
    // scrolling up
    stickyHeader.classList.remove("active");
  }

  lastScrollY = currentScroll;

});


const companies = Array(6).fill({
  name: "Euroflex",
  logo: "assets/images/euroflexLogo.svg",
});

const companyContainer = document.querySelector(".companyListContainer");

companyContainer.innerHTML = companies
  .map(
    (company) => `
      <div class="companyListItem">
        <img src="${company.logo}" alt="${company.name} logo" loading="lazy" />
      </div>
    `
  )
  .join("");


const specifications = [
  { param: "Pipe Diameter Range", value: "20mm to 1600mm (3/4” to 63”)" },
  { param: "Pressure Ratings", value: "PN 2.5, PN 4, PN 6, PN 8, PN 10, PN 12.5, PN 16" },
  { param: "Standard Dimension Ratio", value: "SDR 33, SDR 26, SDR 21, SDR 17, SDR 13.6, SDR 11" },
  { param: "Operating Temperature", value: "-40°C to +80°C (-40°F to +176°F)" },
  { param: "Service Life", value: "50+ Years (at 20°C, PN 10)" },
  { param: "Material Density", value: "0.95 - 0.96 g/cm³" },
  { param: "Certification Standards", value: "IS 5984, ISO 4427, ASTM D3035" },
  { param: "Joint Type", value: "Butt Fusion, Electrofusion, Mechanical" },
  { param: "Coil Lengths", value: "Up to 500m (for smaller diameters)" },
  { param: "Country of Origin", value: "🇮🇳 India" },
];

const tableBody = document.getElementById("specTableBody");

tableBody.innerHTML = specifications
  .map(
    (item) => `
      <tr>
        <td>${item.param}</td>
        <td>${item.value}</td>
      </tr>
    `
  )
  .join("");

// Modal open and close logic for download datasheet
const downloadBtn = document.getElementById("downloadBtn");
const modal = document.getElementById("downloadModal");
const closeBtn = document.getElementById("modalClose");

downloadBtn.addEventListener("click", () => {

  modal.classList.add("active");

  document.body.style.overflow = "hidden"; // freeze background

});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {

  if (e.target === modal) {
    closeModal();
  }

});

const features = [
  {
    icon: "assets/icons/featuresIcon1.svg",
    title: "Superior Chemical Resistance",
    desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments."
  },
  {
    icon: "assets/icons/featureIcon2.svg",
    title: "Exceptional Flexibility & Durability",
    desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments."
  },
  {
    icon: "assets/icons/featureIcon3.svg",
    title: "Leak-Proof Fusion Welding",
    desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments."
  },
  {
    icon: "assets/icons/featureIcon4.svg",
    title: "Cost-Effective Long-Term Solution",
    desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments."
  },
  {
    icon: "assets/icons/featureIcon4.svg",
    title: "Environmentally Sustainable",
    desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments."
  },
  {
    icon: "assets/icons/featureIcon4.svg",
    title: "Certified Quality Assurance",
    desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments."
  }
];

const featuresContainer = document.querySelector(".featuresContainer");

featuresContainer.innerHTML = features
  .map(
    (feature) => `
      <div class="featuresBox">
        <img src="${feature.icon}" alt="feature icon" loading="lazy" />
        <p class="featuresBoxTitle">${feature.title}</p>
        <p class="featuresBoxDescription">${feature.desc}</p>
      </div>
    `
  )
  .join("");

const commonDesc =
  "High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.";

const applications = [
  "Fishnet Manufacturing",
  "Rope Production",
  "Industrial Yarn Processing",
  "Packaging Twine",
  "Agricultural Nets",
  "Fishing Lines",
  "Textile Reinforcement",
  "Cable Filling",
  "Geo-textiles",
  "Synthetic Fiber Twisting",
];

const appContainer = document.querySelector(".applicationsCarousel");

appContainer.innerHTML = applications
  .map(
    (title) => `
      <div class="applicationsCard">
        <h5>${title}</h5>
        <p>${commonDesc}</p>
      </div>
    `
  )
  .join("");

const stepsData = [
    {
        title: "High-Grade Raw Material Selection",
        description: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
        features: [
            "PE100 grade material",
            "Optimal molecular weight distribution"
        ],
        img: "assets/images/people_working.jpg",
        stepLabel: "Raw Material"
    },
    {
        title: "High-Precision Extrusion Process",
        description: "Our advanced extrusion systems ensure consistent material flow and perfect dimensional accuracy throughout the manufacturing process.",
        features: [
            "Multi-layer extrusion capability",
            "Advanced temperature control"
        ],
        img: "assets/images/people_working2.jpg",
        stepLabel: "Extrusion"
    },
    {
        title: "Advanced Cooling Systems",
        description: "Controlled cooling ensures proper material crystallization and structural integrity for superior product quality.",
        features: [
            "Rapid cooling technology",
            "Uniform temperature distribution"
        ],
        img: "assets/images/people_working3.jpg",
        stepLabel: "Cooling"
    },
    {
        title: "Precision Sizing & Calibration",
        description: "State-of-the-art sizing equipment maintains exact dimensional specifications within micron-level tolerances.",
        features: [
            "Laser measurement systems",
            "Real-time dimension adjustment"
        ],
        img: "assets/images/pipesizing.jfif",
        stepLabel: "Sizing"
    },
    {
        title: "Comprehensive Quality Assurance",
        description: "Multi-stage quality checks ensure every product meets international standards and customer specifications.",
        features: [
            "Automated inspection systems",
            "Third-party certification support"
        ],
        img: "assets/images/QC.jfif",
        stepLabel: "Quality Control"
    },
    {
        title: "Professional Product Marking",
        description: "High-precision marking systems apply product identification codes and certification marks with exceptional clarity.",
        features: [
            "UV and thermal marking options",
            "Permanent traceability coding"
        ],
        img: "assets/images/marketing.jfif",
        stepLabel: "Marking"
    },
    {
        title: "Precision Cutting Operations",
        description: "Automated cutting systems deliver exact lengths with minimal waste and superior edge finish quality.",
        features: [
            "CNC-controlled cutting precision",
            "Customizable length specifications"
        ],
        img: "assets/images/people_working.jpg",
        stepLabel: "Cutting"
    },
    {
        title: "Professional Product Packaging",
        description: "Secure, protective packaging solutions ensure products arrive in perfect condition while maintaining sustainability standards.",
        features: [
            "Eco-friendly packaging materials",
            "Complete documentation inclusion"
        ],
        img: "assets/images/package.jfif",
        stepLabel: "Packaging"
    }
];

// Initialize Desktop Tabs
function initializeDesktopTabs() {
    const tabsContainer = document.querySelector('.tabs-container');
    const contentArea = document.querySelector('.content-area');
    
    // Generate tab buttons with inBetween separators
    let tabButtonsHTML = '';
    stepsData.forEach((step, index) => {
        tabButtonsHTML += `<button class="tab-button ${index === 0 ? 'active' : ''}" data-tab="${index}">
            ${step.stepLabel}
        </button>`;
        if (index < stepsData.length - 1) {
            tabButtonsHTML += '<span class="inBetween"></span>';
        }
    });
    tabsContainer.innerHTML = tabButtonsHTML;
    
    // Generate tab content with exact HTML structure
    let contentHTML = '';
    stepsData.forEach((step, index) => {
        const featuresHTML = step.features.map(feature => 
            `<div class="feature-item">${feature}</div>`
        ).join('');
        
        contentHTML += `
            <div class="tab-content ${index === 0 ? 'active' : ''}" data-tab-content="${index}">
                <div class="content-text">
                    <h1 class="content-title">${step.title}</h1>
                    <p class="content-description">${step.description}</p>
                    <div class="features-list">
                        ${featuresHTML}
                    </div>
                </div>
                <div class="content-image">
                    <img src="${step.img}" alt="${step.title}">
                </div>
            </div>
        `;
    });
    contentArea.innerHTML = contentHTML;
    
    // Attach event listeners
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabIndex = this.getAttribute('data-tab');
            
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.querySelector(`[data-tab-content="${tabIndex}"]`).classList.add('active');
        });
    });
}

// Initialize Mobile Steps Navigation
function initializeMobileSteps() {
    let currentStep = 0;
    
    function updateMobileView(stepIndex) {
        const step = stepsData[stepIndex];
        const currentStepNum = stepIndex + 1;
        
        document.getElementById('current-step').textContent = currentStepNum;
        document.getElementById('mobile-title').textContent = step.title;
        document.getElementById('mobile-description').textContent = step.description;
        document.getElementById('mobile-image').src = step.img;
        document.getElementById('step-text').textContent = step.stepLabel;
        
        // Update features list
        const featuresContainer = document.getElementById('mobile-features');
        featuresContainer.innerHTML = '';
        step.features.forEach(feature => {
            const featureEl = document.createElement('div');
            featureEl.className = 'mobile-feature-item';
            featureEl.textContent = feature;
            featuresContainer.appendChild(featureEl);
        });
        
        // Update button states
        document.getElementById('prev-btn').disabled = stepIndex === 0;
        document.getElementById('next-btn').disabled = stepIndex === stepsData.length - 1;
    }
    
    document.getElementById('prev-btn').addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            updateMobileView(currentStep);
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', function() {
        if (currentStep < stepsData.length - 1) {
            currentStep++;
            updateMobileView(currentStep);
        }
    });
    
    // Initialize
    updateMobileView(0);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDesktopTabs();
    initializeMobileSteps();
});


function closeModal(){

  modal.classList.remove("active");

  document.body.style.overflow = "auto";

}

// Modal open and close logic for request quote
const quoteBtn = document.getElementById("quoteBtn");
const quoteModal = document.getElementById("quoteModal");
const quoteCloseBtn = document.getElementById("quoteModalClose");

quoteBtn.addEventListener("click", () => {

  quoteModal.classList.add("active");
  document.body.style.overflow = "hidden";

});

quoteCloseBtn.addEventListener("click", closeQuoteModal);

quoteModal.addEventListener("click", (e) => {

  if (e.target === quoteModal) {
    closeQuoteModal();
  }

});

function closeQuoteModal(){
  quoteModal.classList.remove("active");
  document.body.style.overflow = "auto";

}


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeQuoteModal();
    closeModal();
  }
});


const commonReview = {
  title: "Excellent support for specialized applications.",
  desc: "The durability and performance of Meera's fishnet processing equipment has significantly improved our marine product quality. Excellent support for specialized applications.",
  icon: "assets/icons/comment.svg"
};

const testimonials = [
  {
    name: "Carlos Mendoza",
    designation: "Operations Manager"
  },
  {
    name: "Rahul Sharma",
    designation: "Production Head"
  },
  {
    name: "Amit Verma",
    designation: "Plant Manager"
  },
  {
    name: "John Carter",
    designation: "Technical Lead"
  },
  {
    name: "David Lee",
    designation: "Operations Manager"
  },
  {
    name: "Luis Garcia",
    designation: "Supervisor"
  }
];


const resultsContainer = document.querySelector(".resultsCarousel");

resultsContainer.innerHTML = testimonials
  .map(
    (user) => `
      <div class="resultsCard">
        <img src="${commonReview.icon}" alt="comment icon" loading="lazy">

        <h5>${commonReview.title}</h5>
        <p>${commonReview.desc}</p>

        <div class="userDetails">
          <p class="profilePic"></p>
          <div class="nameAndDesignation">
            <p class="name">${user.name}</p>
            <p class="designation">${user.designation}</p>
          </div>
        </div>
      </div>
    `
  )
  .join("");

  const portfolioItems = [
  {
    title: "HDPE Fittings & Accessories",
    desc: "Complete range of electrofusion and butt fusion fittings, including elbows, tees, reducers, and couplers for seamless pipe connections.",
    image: "assets/images/people_working3.jpg"
  },
  {
    title: "Professional Installation Service",
    desc: "Expert installation and fusion welding services ensuring optimal system performance, compliance with standards, and long-term reliability.",
    image: "assets/images/people_working2.jpg"
  },
  {
    title: "PE-RT Heating Pipes",
    desc: "Polyethylene of Raised Temperature resistance pipes ideal for underfloor heating, radiator connections, and hot water applications.",
    image: "assets/images/people_working3.jpg"
  }
];

const portfolioContainer = document.querySelector(".portfolioContainer");

portfolioContainer.innerHTML = portfolioItems
  .map(
    (item) => `
      <div class="portfolioCard">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <div>
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <button>Learn More</button>
        </div>
      </div>
    `
  )
  .join("");


