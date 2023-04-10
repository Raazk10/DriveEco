import { sanity } from "../sanity.js";
import filterCars from "./filterCar.js";

export default async function CarList() {
  let carProducts = [];
  // create car card Container
  const carCardContainer = document.querySelector(".car-card");

  handleCarProduct();

  async function handleCarProduct() {
    await fetchProduct();
    updateCarList();
  }

  async function fetchProduct() {
    const query = `*[_type=='product']{
			_id,
			"image":image[0].asset->url,
			modelYear,
			name,
      brand,
			kmstand,
			gearbox,
			fuel,
			enginePower,
			wheeldrive,
			price,
			"icons": icon[]->{
				"iconUrl": icons[].asset->url,
				name
			 }
		  }`;
    carProducts = await sanity.fetch(query);
    console.log(carProducts);
  }

  function createProductListContainerDOM(carList) {
    const container = document.createElement("div");
    container.className = "car-card-container";

    for (const carProduct of carList) {
      // create car-card div
      const carCard = document.createElement("div");
      carCard.className = "car-card";
      container.appendChild(carCard);

      // Create car-card__image-wrapper div
      const carCardImageWrapper = document.createElement("div");
      carCardImageWrapper.className = "car-card__image-wrapper";
      carCard.appendChild(carCardImageWrapper);

      // Create car-card__year p
      const carCardYear = document.createElement("p");
      carCardYear.className = "car-card__year";
      carCardYear.textContent = carProduct.modelYear;
      carCardImageWrapper.appendChild(carCardYear);

      // Create car-card__image img
      const carCardImage = document.createElement("img");
      carCardImage.className = "car-card__image";
      carCardImage.src = carProduct.image;
      carCardImageWrapper.appendChild(carCardImage);

      // Create car-card__info div
      const carCardInfo = document.createElement("div");
      carCardInfo.className = "car-card__info";
      carCard.appendChild(carCardInfo);

      // Create car-card__title h3
      const carCardTitle = document.createElement("h3");
      carCardTitle.className = "car-card__title";
      carCardTitle.textContent = carProduct.name;
      carCardInfo.appendChild(carCardTitle);

      //price
      // Create car-card__price-wrapper div
      const carCardPriceWrapper = document.createElement("div");
      carCardPriceWrapper.className = "car-card__price-wrapper";
      carCard.appendChild(carCardPriceWrapper);

      // Create car-card__label h3
      const carCardLabel = document.createElement("h3");
      carCardLabel.className = "car-card__label";
      carCardLabel.textContent = "Pris";
      carCardPriceWrapper.appendChild(carCardLabel);

      // Create car-card__price p
      const carCardPrice = document.createElement("p");
      carCardPrice.className = "car-card__price";
      carCardPrice.textContent = `${carProduct.price} kr`;
      carCardPriceWrapper.appendChild(carCardPrice);

      // Add a new car-card__icons div
      const carCardIcons = document.createElement("div");
      carCardIcons.className = "car-card__icons";
      carCard.appendChild(carCardIcons);

      // Create icon elements
      const gearbox = carProduct.gearbox;
      const fuel = carProduct.fuel;
      const enginePower = carProduct.enginePower;
      const wheeldrive = carProduct.wheeldrive;

      // Iterate through the icons array and create icon elements
      for (const icon of carProduct.icons) {
        const iconElement = createIconElement(
          icon,
          gearbox,
          fuel,
          enginePower,
          wheeldrive
        );

        carCardIcons.appendChild(iconElement);
      }

      // Create car-card__button button
      const carCardButton = document.createElement("button");
      carCardButton.className = "car-card__button";
      carCardButton.textContent = "Les mer om bilen";
      carCardButton.addEventListener("click", () => {
        window.location.href = `/detail-page/index.html?id=${carProduct._id}`;
      });
      carCard.appendChild(carCardButton);
    }
    return container;
  }
  function renderHTML(carList) {
    const container = createProductListContainerDOM(carList);
    carCardContainer.innerHTML = "";
    carCardContainer.appendChild(container);
  }

  function createIconElement(icon, gearbox, fuel, enginePower, wheeldrive) {
    const iconDiv = document.createElement("div");
    iconDiv.className = `car-card__icon car-card__icon--${icon}`;

    const iconImageDiv = document.createElement("div");
    iconImageDiv.className = "car-card__icon-image";
    iconDiv.appendChild(iconImageDiv);

    for (const url of icon.iconUrl) {
      const iconImage = document.createElement("img");
      iconImage.src = url;
      iconImage.alt = icon.name;
      iconImageDiv.appendChild(iconImage);
    }

    const iconTextDiv = document.createElement("div");
    iconTextDiv.className = "car-card__icon-text";
    iconDiv.appendChild(iconTextDiv);

    const iconSpan = document.createElement("span");
    iconTextDiv.appendChild(iconSpan);

    const iconInfoDiv = document.createElement("div");
    iconInfoDiv.className = "car-card__icon-info";
    iconTextDiv.appendChild(iconInfoDiv);

    const iconGearboxSpan = document.createElement("span");
    iconGearboxSpan.textContent = gearbox;
    iconInfoDiv.appendChild(iconGearboxSpan);

    const iconFuelSpan = document.createElement("span");
    iconFuelSpan.textContent = fuel;
    iconInfoDiv.appendChild(iconFuelSpan);

    const iconEnginePowerSpan = document.createElement("span");
    iconEnginePowerSpan.textContent = enginePower;
    iconInfoDiv.appendChild(iconEnginePowerSpan);

    const iconWheelDriveSpan = document.createElement("span");
    iconWheelDriveSpan.textContent = wheeldrive;
    iconInfoDiv.appendChild(iconWheelDriveSpan);

    return iconDiv;
  }

  //filter system

  const filterCarCard = {
    diesel: (car) => car.fuel === "diesel",
    bensin: (car) => car.fuel === "bensin",
    elektrisk: (car) => car.fuel === "elektrisk",

    forhjulsdrift: (car) => car.wheeldrive === "forhjulsdrift",
    bakhjulsdrift: (car) => car.wheeldrive === "bakhjulsdrift",
    firehjulsdrift: (car) => car.wheeldrive === "firehjulsdrift",

    automatisk: (car) => car.gearbox === "automatisk",
    manuell: (car) => car.gearbox === "manuell",

    audi: (car) => car.brand === "Audi",
    bmw: (car) => car.brand === "BMW",
    ferrari: (car) => car.brand === "Ferrari",
    ford: (car) => car.brand === "Ford",
    honda: (car) => car.brand === "Honda",
    hyundai: (car) => car.brand === "Hyundai",
    jaguar: (car) => car.brand === "Jaguar",
    mazda: (car) => car.brand === "Mazda",
    mercedes: (car) => car.brand === "Mercedes-Benz",
    skoda: (car) => car.brand === "Skoda",
    toyota: (car) => car.brand === "Toyota",
    volkswagen: (car) => car.brand === "Volkswagen",
  };
  function updateCarList() {
    const activeFilters = Object.keys(filterCarCard).reduce(
      (acc, filterName) => {
        const checkbox = document.querySelector(`input[name="${filterName}"]`);
        if (checkbox.checked) {
          acc[filterName] = filterCarCard[filterName];
        }
        return acc;
      },
      {}
    );

    const filteredCarProducts = filterCars(carProducts, activeFilters);
    renderHTML(filteredCarProducts);
  }
  for (const filterName in filterCarCard) {
    const checkbox = document.querySelector(`input[name="${filterName}"]`);
    checkbox.addEventListener("change", () => {
      updateCarList();
    });
  }
}
