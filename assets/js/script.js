// Mobile menu toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenuBtn || !mobileMenu) return;
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });
}
initMobileMenu();

// Api URL's

const ALL_PRODUCTS_URL = "https://fakestoreapi.com/products";
const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";

// Trending - Top 3 rated products

function spinnerHTML() {
  return `
    <div class="col-span-full flex items-center justify-center py-16">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  `;
}
function initTrending() {
  const trendingGrid = document.getElementById("trendingGrid");
  if (!trendingGrid) return;

  trendingGrid.innerHTML = spinnerHTML();

  fetch(ALL_PRODUCTS_URL)
    .then((res) => res.json())
    .then((products) => {
      products.sort((a, b) => {
        const ar = a.rating && a.rating.rate ? a.rating.rate : 0;
        const br = b.rating && b.rating.rate ? b.rating.rate : 0;
        return br - ar;
      });

      const top3 = products.slice(0, 3);
      let html = "";
      top3.forEach((p) => (html += productCardHTML(p)));
      trendingGrid.innerHTML = html;

      bindCardButtons(trendingGrid);
    })
    .catch(() => {
      trendingGrid.innerHTML = `
        <div class="col-span-full rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Failed to load trending products.
        </div>
      `;
    });
}
initTrending();

function productCardHTML(product) {
  return `
    <div class="rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
        <div class="bg-slate-100 p-5">
            <img src="${product.image}" alt="${product.title}" class="h-56 w-full object-contain" />
        </div>
        <div class="p-5 flex flex-col !justify-between h-full">
            <div>
                <div class="flex items-center justify-between gap-3">
                    <span class="inline-flex rounded-full bg-[var(--brand-color)]/10 px-3 py-1 text-[12px] font-medium text-[var(--brand-color)]">
                    ${product.category
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                    </span>
                    <div class="text-sm font-medium text-slate-700"><span class="text-yellow-600">★</span>${Number(product.rating.rate).toFixed(1)}(${product.rating.count})
                    </div>
                </div>

                <h4 class="mt-3 text-lg font-semibold line-clamp-1">${product.title}</h4>

                <div class="mt-4">
                    <span class="text-xl font-bold">$${product.price}</span>
                </div>
            </div>
            <div class="mt-5 flex gap-2">
                <button onclick="openProductModal(${JSON.stringify(product).replace(/"/g, "&quot;")})"
                class="w-full flex gap-1 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-normal hover:bg-slate-50 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9"/></svg>
                    <span>Details</span>
                </button>
                <button class="w-full flex gap-1 items-center justify-center rounded-lg bg-[var(--brand-color)] border border-slate-200 px-4 py-2 text-sm font-normal text-white hover:opacity-95 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><circle cx="10" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M3.5 4h2l3.504 11H17"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.224 12.5L6.3 6.5h12.507a.5.5 0 0 1 .475.658l-1.667 5a.5.5 0 0 1-.474.342z"/></g></svg>
                    <span>Add</span>
                </button>
            </div>
        </div>
    </div>
  `;
}
function bindCardButtons(card) {
  card.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
}

// Products Page

function categoryButtonsHTML(categories) {
  return categories.map((category) => categoryButtonHTML(category)).join("");
}

function categoryButtonHTML(category) {
  return `
    <button onclick="selectCategory('${category.replace(/'/g, "\\'")}', this)" class="category-btn rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 cursor-pointer">
      ${category
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
    </button>
  `;
}
function filterByCategory(category) {
  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) return;

  //   productsGrid.innerHTML = spinnerHTML();

  fetch(ALL_PRODUCTS_URL)
    .then((res) => res.json())
    .then((products) => {
      let html = "";
      products.forEach((product) => {
        if (product.category === category) {
          html += productCardHTML(product);
        }
      });
      productsGrid.innerHTML = html;
      bindCardButtons(productsGrid);
    })
    .catch(() => {
      productsGrid.innerHTML = `
        <div class="col-span-full rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Failed to load products.
        </div>
      `;
    });
}

function selectCategory(category, button) {
  document
    .querySelectorAll(".category-btn")
    .forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  if (category === "all") {
    allProducts();
  } else {
    filterByCategory(category);
  }
}

function allCategoriesButtonHTML() {
  return `
    <button onclick="selectCategory('all', this)" class="category-btn rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 cursor-pointer active">All</button>
  `;
}

function initCategoryBar() {
  const categoryBar = document.getElementById("categoryBar");
  if (!categoryBar) return;

  fetch(CATEGORIES_URL)
    .then((res) => res.json())
    .then((categories) => {
      categoryBar.innerHTML = allCategoriesButtonHTML();
      categories.forEach((c) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = categoryButtonHTML(c);
        categoryBar.appendChild(tempDiv);
      });
    })
    .catch(() => {
      categoryBar.innerHTML = `
        <div class="col-span-full rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Failed to load categories.
        </div>
      `;
    });
}
initCategoryBar();

function allProducts() {
  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) return;

  productsGrid.innerHTML = spinnerHTML();

  fetch(ALL_PRODUCTS_URL)
    .then((res) => res.json())
    .then((products) => {
      let html = "";
      products.forEach((p) => (html += productCardHTML(p)));
      productsGrid.innerHTML = html;
      bindCardButtons(productsGrid);
    })
    .catch(() => {
      productsGrid.innerHTML = `
        <div class="col-span-full rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Failed to load all products.
        </div>
      `;
    });
}
allProducts();

// Product Details Modal

function openProductModal(product) {
  const modal = document.getElementById("productModal");
  if (!modal) {
    console.error("Modal element not found");
    return;
  }

  // product details in modal
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductTitle = document.getElementById("modalProductTitle");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const modalProductCategory = document.getElementById("modalProductCategory");
  const modalProductRating = document.getElementById("modalProductRating");
  const modalProductDescription = document.getElementById(
    "modalProductDescription",
  );

  if (modalProductImage) modalProductImage.src = product.image;
  if (modalProductImage) modalProductImage.alt = product.title;
  if (modalProductTitle) modalProductTitle.textContent = product.title;
  if (modalProductPrice) modalProductPrice.textContent = `$${product.price}`;

  if (modalProductCategory) {
    modalProductCategory.textContent = product.category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (modalProductRating) {
    modalProductRating.innerHTML = `
      <span class="text-yellow-600">★</span> ${Number(product.rating.rate).toFixed(1)} 
      <span class="text-slate-500">(${product.rating.count} reviews)</span>
    `;
  }

  if (modalProductDescription) {
    modalProductDescription.textContent = product.description;
  }

  // Show modal
  modal.showModal();
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.close();
  }
}

// Init modal functionality
function initModalFunctionality() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProductModal();
      }
    });
  }
}

initModalFunctionality();
