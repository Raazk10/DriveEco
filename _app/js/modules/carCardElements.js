import { createElementWithClass } from "../util/createElement.js";

export function createCarCard() {
  return createElementWithClass("div", "car-card");
}
export function createCarCardImageWrapper() {
  return createElementWithClass("div", "car-card__image-wrapper");
}

export function createCarCardYear(carProduct) {
  const carCardYear = createElementWithClass("p", "car-card__year");
  carCardYear.textContent = carProduct.modelYear;
  return carCardYear;
}

export function createCarCardImage(carProduct) {
  const carCardImage = createElementWithClass("img", "car-card__image");
  carCardImage.src = carProduct.image;
  return carCardImage;
}

export function createCarCardInfo() {
  return createElementWithClass("div", "car-card__info");
}

export function createCarCardTitle(carProduct) {
  const carCardTitle = createElementWithClass("h3", "car-card__title");
  carCardTitle.textContent = carProduct.name;
  return carCardTitle;
}

export function createCarCardPriceWrapper() {
  return createElementWithClass("div", "car-card__price-wrapper");
}

export function createCarCardLabel() {
  const carCardLabel = createElementWithClass("h3", "car-card__label");
  carCardLabel.textContent = "Pris";
  return carCardLabel;
}

export function createCarCardPrice(carProduct) {
  const carCardPrice = createElementWithClass("p", "car-card__price");
  carCardPrice.textContent = `${carProduct.price} kr`;
  return carCardPrice;
}

export function createCarCardIcons() {
  return createElementWithClass("div", "car-card__icons");
}

export function createCarCardButton(carProduct) {
  const carCardButton = createElementWithClass("button", "car-card__button");
  carCardButton.textContent = "Les mer om bilen";
  carCardButton.addEventListener("click", () => {
    window.location.href = `/detail-page/index.html?id=${carProduct._id}`;
  });
  return carCardButton;
}
