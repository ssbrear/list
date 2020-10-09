$(".complete-button").on("click", function () {
  $.ajax({
    url: `/api/deleteitem/${$(this).prev().data("id")}`,
    method: "DELETE",
  }).done(window.location.reload());
});
