/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
});

var pastEntries = localStorage.getItem('code-journal');

if (pastEntries !== null) {
  data = JSON.parse(pastEntries);
}
