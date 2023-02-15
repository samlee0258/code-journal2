var $image = document.querySelector('img');
var $imageInput = document.querySelector('#photo-url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');

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
  var newEntry = renderEntry(entryObj);
  $ul.prepend(newEntry);
  viewSwap('entries');
  toggleNoEntries();
}

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.className = 'spacing';
  $li.setAttribute('data-entry-id', entry.entryId);

  var $outerRowDiv = document.createElement('div');
  $outerRowDiv.className = 'row';
  $li.appendChild($outerRowDiv);

  var $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-half entry-img';
  $outerRowDiv.appendChild($imgDiv);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', entry.title);
  $imgDiv.appendChild($img);

  var $entryInfoDiv = document.createElement('div');
  $entryInfoDiv.className = 'column-half entry-info';
  $outerRowDiv.appendChild($entryInfoDiv);

  var $titleContainer = document.createElement('div');
  $titleContainer.className = 'column-half space-between';

  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $titleContainer.appendChild($h2);
  $entryInfoDiv.appendChild($titleContainer);

  var $pencil = document.createElement('i');
  $pencil.className = 'fa-solid fa-pen m-bot';
  $titleContainer.appendChild($pencil);

  var $pContainer = document.createElement('div');
  $pContainer.className = 'column-full';

  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $pContainer.appendChild($p);
  $entryInfoDiv.appendChild($pContainer);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var index = 0; index < data.entries.length; index++) {
    var $newEntry = renderEntry(data.entries[index]);
    $ul.appendChild($newEntry);
  }
  viewSwap('entries');
  toggleNoEntries();
});

function toggleNoEntries() {
  var $noEntriesDiv = document.querySelector('.no-entries');
  if (data.entries.length > 0) {
    $noEntriesDiv.className = 'row no-entries hidden';
  } else {
    $noEntriesDiv.className = 'row no-entries';
  }
}
toggleNoEntries();

var $showNewEntry = document.querySelector('div[data-view="entry-form"]');
var $showEntries = document.querySelector('div[data-view="entries"]');

function viewSwap(view) {
  if (view === 'entry-form') {
    data.view = 'entry-form';
    $showNewEntry.className = '';
    $showEntries.className = 'hidden';
  } else if (view === 'entries') {
    data.view = 'entries';
    $showNewEntry.className = 'hidden';
    $showEntries.className = '';
  }
}

var $entriesTab = document.querySelector('#entries-tab');
$entriesTab.addEventListener('click', function (event) {
  viewSwap('entries');
});

var $newEntryButton = document.querySelector('#entry-form-button');
$newEntryButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
