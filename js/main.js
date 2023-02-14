var $image = document.querySelector('img');
var $imageInput = document.querySelector('#photo-url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$imageInput.addEventListener('input', function (event) {
  $image.setAttribute('src', $imageInput.value);
});

var $form = document.querySelector('#entry-form');

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var entryObj = {
    title: $title.value,
    photoUrl: $imageInput.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  entryObj.entryId = data.nextEntryId++;
  data.entries.unshift(entryObj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
