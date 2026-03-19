// 
// Splash Screen
// 

window.addEventListener("load", () => {
    const splash = document.querySelector(".splash");
    setTimeout(() => splash?.classList.add("fade--out"), 2600);
});

// 
// Mobile Menu
// 

function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

// 
// CLASSIC INVENTORY (Manual Data)
// 

let classicInventory = [
    {
        year: 1974, make: "BMW", model: "2002",
        engine: "2.0L I4", transmission: "4-Speed Manual",
        price: 32000, image: "./Assets/bmw-2002.jpg"
    },
    {
        year: 1968, make: "Cadillac", model: "Series 62",
        engine: "6.4L V8", transmission: "Automatic",
        price: 48000, image: "./Assets/cadillac-62.jpg"
    },
    {
        year: 1969, make: "Chevrolet", model: "Camaro",
        engine: "350 V8", transmission: "4-Speed Manual",
        price: 58000, image: "./Assets/camaro.jpg"
    },
    {
        year: 1970, make: "Datsun", model: "240Z",
        engine: "2.4L I6", transmission: "4-Speed Manual",
        price: 65000, image: "./Assets/datsun-240z.jpg"
    },
    {
        year: 1970, make: "Dodge", model: "Charger",
        engine: "440 Magnum V8", transmission: "3-Speed Automatic",
        price: 90000, image: "./Assets/dodge-charger.jpg"
    },
    {
        year: 1967, make: "Ford", model: "Mustang Fastback",
        engine: "289 V8", transmission: "4-Speed Manual",
        price: 42000, image: "./Assets/mustang-fastback.jpg"
    },
    {
        year: 1965, make: "Ford", model: "Mustang Coupe",
        engine: "289 V8", transmission: "3-Speed Automatic",
        price: 35000, image: "./Assets/mustang-coupe.jpg"
    },
    {
        year: 1971, make: "Isuzu", model: "117 Coupe",
        engine: "1.8L I4", transmission: "4-Speed Manual",
        price: 40000, image: "./Assets/isuzu-117.jpg"
    },
    {
        year: 1968, make: "Jaguar", model: "E-Type",
        engine: "4.2L I6", transmission: "4-Speed Manual",
        price: 150000, image: "./Assets/jaguar-etype.jpg"
    },
    {
        year: 1971, make: "Mercedes-Benz", model: "350SL",
        engine: "3.5L V8", transmission: "Automatic",
        price: 78000, image: "./Assets/mercedes-sl.jpg"
    },
    {
        year: 1968, make: "Nissan", model: "Skyline GT-R",
        engine: "2.0L I6 (S20)", transmission: "5-Speed Manual",
        price: 250000, image: "./Assets/skyline-gtr.jpg"
    },
    {
        year: 1973, make: "Porsche", model: "911",
        engine: "2.4L Flat-6", transmission: "5-Speed Manual",
        price: 110000, image: "./Assets/porsche-911.jpg"
    },
    {
        year: 1959, make: "Rolls-Royce", model: "Silver Cloud",
        engine: "4.9L I6", transmission: "4-Speed Automatic",
        price: 180000, image: "./Assets/rolls-silvercloud.jpg"
    },
    {
        year: 1974, make: "Toyota", model: "Land Cruiser FJ40",
        engine: "4.2L I6", transmission: "4-Speed Manual",
        price: 55000, image: "./Assets/landcruiser.jpg"
    }
];

// 
// MODERN EXOTICS (Sample VINs for API Fetch)
// 

const modernVINs = [
    "ZHWUF4ZF0LLA12345", // Huracán
    "ZFF79ALA0L0234567", // Ferrari 488
    "WP0AD2A91MS123456", // 911 Turbo S
    "SBM14FCA0LW003456", // McLaren 720S
    "SCFSMGAW4MGN12345", // Aston Martin Vantage
    "WUABACFX1M7901234", // Audi R8
    "JN1AR5EF7LM123456", // Nissan GT-R
    "WBSAE0C09MCF12345", // BMW M8
    "WDDYJ7JA0LA023456", // AMG GT
    "19UNC1B09MY000123", // Acura NSX
    "2C3CDZC91LH123456", // Hellcat
    "1G1Y72D40M5102345"  // Corvette C8
];

const EXOTIC_PLACEHOLDER = "./Assets/exotic-placeholder.jpg";

const exoticImages = {
    "ZHWUF4ZF0LLA12345": "./Assets/Lamborghini huracan.jpg",
    "ZFF79ALA0L0234567": "./Assets/Ferrari 488.jpg",
    "WP0AD2A91MS123456": "./Assets/porsche-911-new.jpg",
    "SBM14FCA0LW003456": "./Assets/mclaren 720s.jpg",
    "SCFSMGAW4MGN12345": "./Assets/Aston Vantage.jpg",
    "WUABACFX1M7901234": "./Assets/R8.jpg",
    "JN1AR5EF7LM123456": "./Assets/Nissan gtr.jpg",
    "WBSAE0C09MCF12345": "./Assets/M8.jpg",
    "WDDYJ7JA0LA023456": "./Assets/amg gt.jpg",
    "19UNC1B09MY000123": "./Assets/NSX.jpg",
    "2C3CDZC91LH123456": "./Assets/Challenger Hellcat.jpg",
    "1G1Y72D40M5102345": "./Assets/Corvette.jpg"
};

// 
// Fetch + Normalize VPIC Data
// 

async function fetchCarFromVIN(vin) {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const d = data.Results[0];

        let displacement = d.DisplacementL ? Number(d.DisplacementL) : null;
        let roundedDisplacement = displacement ? displacement.toFixed(1) : null;

        return {
            year: Number(d.ModelYear) || 2020,
            make: d.Make || "Unknown",
            model: d.Model || "Unknown",
            engine: roundedDisplacement 
                ? `${roundedDisplacement}L` 
                : (d.EngineModel || "Unknown Engine"),
            transmission: d.TransmissionStyle || "Automatic",
            price: generateExoticPrice(),
            image: exoticImages[vin] || EXOTIC_PLACEHOLDER
        };
    } catch (err) {
        console.error("VIN fetch failed:", vin, err);
        return null;
    }
}

// Generate realistic exotic car prices

function generateExoticPrice() {
    const min = 60000;
    const max = 200000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 
// Fetch All Modern Cars
// 

async function fetchModernCars() {
    const promises = modernVINs.map(vin => fetchCarFromVIN(vin));
    const results = await Promise.all(promises);
    return results.filter(car => car !== null);
}

// 
// Render Inventory
// 

function renderInventory(cars) {
    const grid = document.querySelector(".inventory__grid");
    grid.innerHTML = "";

    cars.forEach(car => {
        const card = document.createElement("article");
        card.classList.add("inventory__card");

        card.innerHTML = `
            <div class="inventory__img--wrapper">
                <img src="${car.image}" class="inventory__img">
            </div>
            <div class="inventory__info">
                <h3 class="inventory__car--title">${car.year} ${car.make} ${car.model}</h3>
                <ul class="inventory__specs">
                    <li class="inventory__spec mileage">Engine: ${car.engine}</li>
                    <li class="inventory__spec transmission">Transmission: ${car.transmission}</li>
                </ul>
                <p class="inventory__price">$${car.price.toLocaleString()}</p>
                <button class="inventory__btn">View Details</button>
            </div>
        `;

        card.querySelector(".inventory__btn").addEventListener("click", () => openModal(car));
        grid.appendChild(card);
    });
}

// 
// Modal Logic
// 

function openModal(car) {
    const modal = document.getElementById("car-modal");
    modal.classList.add("modal--open");

    document.getElementById("modal-img").src = car.image;
    document.getElementById("modal-title").textContent = `${car.year} ${car.make} ${car.model}`;
    document.getElementById("modal-meta").textContent = `${car.engine} • ${car.transmission}`;
    document.getElementById("modal-price").textContent = `$${car.price.toLocaleString()}`;
}

document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("car-modal").classList.remove("modal--open");
});

// 
// Sorting
// 

function sortInventory(cars, type) {
    let sorted = [...cars];

    switch (type) {
        case "az":
            sorted.sort((a, b) => a.make.localeCompare(b.make));
            break;
        case "za":
            sorted.sort((a, b) => b.make.localeCompare(a.make));
            break;
        case "year-oldest":
            sorted.sort((a, b) => a.year - b.year);
            break;
        case "year-newest":
            sorted.sort((a, b) => b.year - a.year);
            break;
        case "price-low":
            sorted.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            sorted.sort((a, b) => b.price - a.price);
            break;
    }

    return sorted;
}

document.getElementById("sort-select").addEventListener("change", (e) => {
    const sorted = sortInventory(fullInventory, e.target.value);
    renderInventory(sorted);
});

// 
// Search
// 

document.querySelector(".hero__search").addEventListener("submit", (e) => {
    e.preventDefault();

    const query = document.querySelector(".search__input").value.toLowerCase();

    const filtered = fullInventory.filter(car =>
        `${car.year} ${car.make} ${car.model}`.toLowerCase().includes(query)
    );

    renderInventory(filtered);

    document.querySelector(".inventory").scrollIntoView({
        behavior: "smooth"
    });
});

// 
// Load Everything
// 

let fullInventory = [];

async function loadInventory() {
    const modernCars = await fetchModernCars();
    fullInventory = [...classicInventory, ...modernCars];

    renderInventory(fullInventory);
    loadFeatured();
}

loadInventory();

//
// Featured Section (Classic Only)
// 

function loadFeatured() {
    const featuredCars = [
        classicInventory.find(c => c.year === 1967 && c.make === "Ford"),
        classicInventory.find(c => c.year === 1973 && c.make === "Porsche"),
        classicInventory.find(c => c.make === "Chevrolet" && c.model === "Camaro")
    ];

    const cards = document.querySelectorAll(".featured__card");

    featuredCars.forEach((car, i) => {
        if (!car || !cards[i]) return;

        cards[i].querySelector(".featured__img").src = car.image;
        cards[i].querySelector(".featured__car--title").textContent = `${car.year} ${car.make} ${car.model}`;
        cards[i].querySelector(".featured__description").textContent = `${car.engine} • ${car.transmission}`;
    });
}



