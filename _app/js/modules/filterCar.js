export default function filterCars(carProducts, filters) {
  const filteredCars = carProducts.filter((car) => {
    for (const filterName in filters) {
      if (!filters[filterName](car)) {
        return false;
      }
    }
    return true;
  });
  return filteredCars;
}
