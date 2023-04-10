import CarList from "./modules/car-list.js";
import Collapsible from "./modules/collapsible.js";

CarList();
for (const collapsibleContainer of document.querySelectorAll(".collapsible")) {
  Collapsible(collapsibleContainer);
}
