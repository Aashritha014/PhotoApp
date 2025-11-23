/* -------------------------- 
   Horizontal Drag Scroll
--------------------------- */
const slider = document.getElementById("carousel");
let isDown = false, startX, scrollLeft;

slider.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => isDown = false);
slider.addEventListener("mouseup", () => isDown = false);

slider.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  slider.scrollLeft = scrollLeft - (x - startX) * 1.6;
});

/* -------------------------- 
   Fake demo division data
--------------------------- */
const DIVISIONS = {
  div1: {
    title: "Summer Moments",
    media: [
        { type: "image", url: "images/summer.jpg" },
        { type: "image", url: "images/travel.jpg" }
]

  },
  div2: {
    title: "Thoughts at 2 AM",
    media: [
        { type: "image", url: "images/summer.jpg" },
        { type: "image", url: "images/travel.jpg" }
]

  },
  div3: {
    title: "Travel Adventures",
    media: [
        { type: "image", url: "images/summer.jpg" },
        { type: "image", url: "images/travel.jpg" }
]

  }
};

/* -------------------------- 
   Genie Expand Animation
--------------------------- */
const page = document.getElementById("page");

document.querySelectorAll(".division").forEach(card => {
  card.addEventListener("click", () => openDivision(card));
});

function openDivision(card) {
  const rect = card.getBoundingClientRect();
  const clone = card.cloneNode(true);

  clone.classList.add("genie-clone");
  Object.assign(clone.style, {
    width: rect.width + "px",
    height: rect.height + "px",
    left: rect.left + "px",
    top: rect.top + "px"
  });

  document.body.appendChild(clone);
  page.classList.add("dimmed");

  /* 🟣 NEW: target is 50% width & 50% height and centered */
  const targetWidth = window.innerWidth * 0.5;
  const targetHeight = window.innerHeight * 0.5;
  const targetLeft = (window.innerWidth - targetWidth) / 2;
  const targetTop = (window.innerHeight - targetHeight) / 2;

  // animate to center 50% box
  setTimeout(() => {
    Object.assign(clone.style, {
      left: targetLeft + "px",
      top: targetTop + "px",
      width: targetWidth + "px",
      height: targetHeight + "px"
    });
  }, 10);

  clone.addEventListener("transitionend", () => {
    showGallery(clone, card.dataset.id);
  }, { once: true });
}





/* -------------------------- 
   Build gallery inside clone
--------------------------- */
function showGallery(clone, id) {
  const data = DIVISIONS[id];
  clone.innerHTML = "";

  const gallery = document.createElement("div");
  gallery.className = "gallery";
  gallery.innerHTML = `
    <div class="gallery-head">
      <div>
        <small style="color:#666">Division</small>
        <div style="font-size:20px">${data.title}</div>
      </div>
      <button class="close-btn">Close</button>
    </div>
    <div class="media-grid"></div>
  `;

  clone.appendChild(gallery);

  const grid = gallery.querySelector(".media-grid");

  data.media.forEach(item => {
    const el = document.createElement("div");
    el.className = "media-item";

    if (item.type === "video") {
      el.innerHTML = `<video controls src="${item.url}"></video>`;
    } else {
      el.innerHTML = `<img src="${item.url}">`;
    }

    grid.appendChild(el);
  });

  // close
  gallery.querySelector(".close-btn").onclick = () => closeGallery(clone, id);
}

/* -------------------------- 
   Reverse animation
--------------------------- */
function closeGallery(clone, id) {
  const original = document.querySelector(`.division[data-id="${id}"]`);
  const rect = original.getBoundingClientRect();

  Object.assign(clone.style, {
    left: rect.left + "px",
    top: rect.top + "px",
    width: rect.width + "px",
    height: rect.height + "px"
  });

  setTimeout(() => {
    clone.remove();
    page.classList.remove("dimmed");
  }, 500);
}

