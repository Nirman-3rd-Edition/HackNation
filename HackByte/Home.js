//Navbar Scroll
$(document).scroll(function () {
  $(".navbar").toggleClass(
    "scroll",
    $(this).scrollTop() > $(".navbar").height()
  );
});