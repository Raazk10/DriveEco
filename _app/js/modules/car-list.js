import { sanity } from "../sanity.js";

export default async function CarList() {
  let carProducts = [];
  // create car card Container
  const carCardContainer = document.querySelector(".car-card");

  handleCarProduct();

  async function handleCarProduct() {
    await fetchProduct();
    renderHTML();
  }

  async function fetchProduct() {
    const query = `*[_type=='product']{
			_id,
			"image":image[0].asset->url,
			modelYear,
			name,
			kmstand,
			gearbox,
			fuel,
			enginePower,
			wheeldrive,
			price,
			"icons": icon[]->{
				"iconUrl": icons[].asset->url,
			
			 }
		  }`;
    carProducts = await sanity.fetch(query);
    console.log(carProducts);
  }
  function createProductListContainerDOM() {
    const container = document.createElement("div");
    container.className = "car-card-container";

    for (const carProduct of carProducts) {
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

      // Create car-card__button button
      const carCardButton = document.createElement("button");
      carCardButton.className = "car-card__button";
      carCardButton.textContent = "Les mer om bilen";
      carCard.appendChild(carCardButton);
    }
    return container;
  }
  function renderHTML() {
    const container = createProductListContainerDOM();
    carCardContainer.appendChild(container);
  }
}
