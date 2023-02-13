var $image = document.querySelector('img');
var $imageInput = document.querySelector('#photo-url');

$imageInput.addEventListener('input', function (event) {
  $image.setAttribute('src', $imageInput.value);
});
