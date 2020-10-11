$("#already-btn, #donthave-btn").on("click", () => {
  // Establish which elements are in which positions
  const firstFormParent = $("#first-form");
  const firstForm = firstFormParent.children().eq(0);
  const secFormParent = $("#second-form");
  const secForm = secFormParent.children().eq(0);

  animateFirstDown(firstForm);
  hideFirst(firstForm, 300);
  changeParents(firstForm, firstFormParent, secForm, secFormParent, 300);
  fadeInSecond(secForm, 400);
});

function animateFirstDown(form) {
  form.css("margin-top", "1200px");
}
function hideFirst(form, delay) {
  setTimeout(() => {
    form.css({
      display: "none",
      marginTop: "0",
      opacity: 0,
    });
  }, delay);
}
function changeParents(first, firstParent, second, secondParent, delay) {
  setTimeout(() => {
    firstParent.empty();
    secondParent.empty();
    firstParent.append(second);
    secondParent.append(first);
  }, delay);
}
function fadeInSecond(form, delay) {
  setTimeout(() => {
    form.css({
      visibility: "visible",
      opacity: 1,
    });
  }, delay);
}
