$(".complete-button").on("click", function () {
  console.log("Clicked!");
  $.ajax({
    url: `/api/deleteitem/${$(this).parent().text()}`,
    method: "DELETE",
  }).then(() => console.log("Deleted"));
});
