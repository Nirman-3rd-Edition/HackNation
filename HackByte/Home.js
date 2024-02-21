//Navbar Scroll
$(document).scroll(function () {
  $(".navbar").toggleClass(
    "scroll",
    $(this).scrollTop() > $(".navbar").height()
  );
});

// JavaScript for Carousel navigation
let currentIndex = 0;
const images = document.querySelectorAll(".carousel img");

function showImage(index) {
  // Hide all images
  images.forEach((img) => (img.style.display = "none"));
  // Show the selected image
  images[index].style.display = "block";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// Show the initial image
showImage(currentIndex);
