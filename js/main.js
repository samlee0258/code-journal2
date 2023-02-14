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

// function renderEntry(entry) {
//   var $li = document.createElement('li');
//   $li.className = 'spacing';

//   var $outerRowDiv = document.createElement('div');
//   $outerRowDiv.className = 'row';
//   $li.appendChild($outerRowDiv);

//   var $imgDiv = document.createElement('div');
//   $imgDiv.className = 'column-half entry-img';
//   $outerRowDiv.appendChild($imgDiv);

//   var $img = document.createElement('img');
//   $img.setAttribute('src', entry.photoUrl);
//   $img.setAttribute('alt', entry.title);
//   $imgDiv.appendChild($img);

//   var $entryInfoDiv = document.createElement('div');
//   $entryInfoDiv.className = 'column-half entry-info';
//   $outerRowDiv.appendChild($entryInfoDiv);

//   var $h2 = document.createElement('h2');
//   $h2.textContent = entry.title;
//   $entryInfoDiv.appendChild($h2);

//   var $p = document.createElement('p');
//   $p.textContent = entry.notes;
//   $entryInfoDiv.appendChild($p);

//   return $li;
// }
