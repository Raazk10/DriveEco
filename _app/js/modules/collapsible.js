export default function Collapsible(collapsibleContainerNode) {
  /* data */
  let isCollapsed = true;

  /* query selectors */
  const toggleButton = collapsibleContainerNode.querySelector(
    ".collapsible__toggle"
  );
  const contentContainer = collapsibleContainerNode.querySelector(
    ".collapsible__content"
  );

  /* event listeners */
  if (collapsibleContainerNode !== null) {
    toggleButton.addEventListener("click", handleToggleButtonClick);
  }

  /* event handlers */
  function handleToggleButtonClick(event) {
    toggleCollapsed();
    renderHTML();
  }

  /* methods */
  function toggleCollapsed() {
    isCollapsed = !isCollapsed;
  }

  /* render */
  function renderHTML() {
    if (isCollapsed === true) {
      contentContainer.classList.remove("collapsible__content--visible");
    } else {
      contentContainer.classList.add("collapsible__content--visible");
    }
  }
}
