//using selectors inside the element
// traversing the dom
const expandQuestion = document.querySelectorAll(".question-btn");

expandQuestion.forEach((element) => {
  element.addEventListener("click", () => {
    let questionParent = element.parentElement;

    while (!questionParent.classList.contains("question")) {
      questionParent = questionParent.parentElement;
    }

    questionParent.classList.toggle("show-text");
  });
});

// The key here is that css classes are passed down to children from the parent.
// So use combo classes in your css to make all children change when the parent is given a class.
/* 
.question-text {
    display: none;
  }
  .show-text .question-text {
    display: block;
  }
  .minus-icon {
    display: none;
  }
  .show-text .minus-icon {
    display: inline;
  }
  .show-text .plus-icon {
    display: none;
  }

*/
