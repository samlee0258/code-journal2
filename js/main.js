var $image = document.querySelector('img');
var $imageInput = document.querySelector('#photo-url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');
var $h1 = document.querySelector('h1');

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
  if (data.editing === null) {
    entryObj.entryId = data.nextEntryId++;
    data.entries.unshift(entryObj);
    var newEntry = renderEntry(entryObj);
    $ul.prepend(newEntry);
  } else {
    entryObj.entryId = data.editing.entryId;
    for (var index = 0; index < data.entries.length; index++) {
      if (data.entries[index].entryId === entryObj.entryId) {
        data.entries.splice(index, 1, entryObj);
        var editedEntry = renderEntry(entryObj);
        var $li = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
        $li.replaceWith(editedEntry);
        data.editing = null;
      }
    }
  }
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
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
    $h1.textContent = 'New Entry';
    $title.value = '';
    $imageInput.value = '';
    $notes.value = '';
    $image.src = 'images/placeholder-image-square.jpg';
  } else if (view === 'entries') {
    data.view = 'entries';
    $showNewEntry.className = 'hidden';
    $showEntries.className = '';
    data.editing = null;
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

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    var dataEntryId = Number(event.target.closest('li').getAttribute('data-entry-id'));
    for (var index = 0; index < data.entries.length; index++) {
      if (dataEntryId === data.entries[index].entryId) {
        data.editing = data.entries[index];
        $title.value = data.editing.title;
        $imageInput.value = data.editing.photoUrl;
        $notes.value = data.editing.notes;
        $image.src = data.editing.photoUrl;
        $h1.textContent = 'Edit Entry';
      }
    }

  }
});
