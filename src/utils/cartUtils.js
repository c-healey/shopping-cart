export const sortCartByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else return 0;
};

export const showCollapsedCart = () => {
  console.log("showCollapsed Cart");
  document.querySelector(".cart-sidebar-collapsed").classList.remove("d-none");
};
