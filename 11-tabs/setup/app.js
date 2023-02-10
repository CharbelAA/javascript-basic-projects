const content = document.querySelectorAll(".content");
const btns = document.querySelectorAll(".tab-btn");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
    const btnId = btn.getAttribute("data-id");

    content.forEach((element) => {
      if (element.getAttribute("id") === btnId) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });

    btns.forEach((element) => {
      if (element.getAttribute("data-id") !== btnId) {
        element.classList.remove("active");
      }
    });
  });
});

// when adding an event listener to a parent, using the click event from the parent
// we can get back which child was clicked with the element of the event listener. element.target.dataset.id;
