const tabsButtons = document.querySelectorAll(".tabs-button");
const tabsContentItems = document.querySelectorAll(".tabs-content-item");

const selectItem = function (e) {
  e.preventDefault();
  //removing show class from tab content
  removeShow();

  //selecting individual tab content based on ID
  const tabsContentItem = document.querySelector(`#${this.id}-content`);
  console.log(tabsContentItem);

  //adds show class to content
  tabsContentItem.classList.add("show");
};

tabsButtons.forEach((item) => {
  item.addEventListener("click", selectItem);
});

//Removing the show class from content
function removeShow() {
  tabsContentItems.forEach((item) => {
    item.classList.remove("show");
  });
}

const menuBtn = document.querySelector(`.menu-btn-icon`);

menuBtn.addEventListener("click", displayMenu);

function displayMenu(e) {
  const menuBar = document.querySelector(`.menu-visibility`);

  menuBar.classList.contains(`show`)
    ? menuBar.classList.remove(`show`)
    : menuBar.classList.add(`show`);
}
