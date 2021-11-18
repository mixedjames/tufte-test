const LIB_PATH = '../lib/';
const GSAP_PATH = LIB_PATH + 'gsap/minified/';

requirejs.config({
  baseUrl: 'js',

  paths: {
    'gsap': GSAP_PATH + 'gsap.min',
    'gsap.ScrollTrigger': GSAP_PATH + 'ScrollTrigger.min'
  },
  packages: []
});

requirejs(['gsap', 'gsap.ScrollTrigger'], function(Greensock, ScrollTriggerNS) {

  const gsap = Greensock.gsap;
  const ScrollTrigger = ScrollTriggerNS.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.content .note-ref').forEach((note) => {

    const noteName = note.attributes.getNamedItem('note').value;

    const noteLocation = note.closest('.content > *');
    const newNoteNode = document.createElement('div');
    const newNoteMarker = document.createElement('div');
    const newNoteContent = document.querySelector('.main-viewport .note-list .'+noteName+' .content').cloneNode(true);
    const needEmptyP = !(noteLocation.previousElementSibling instanceof HTMLParagraphElement);

    newNoteMarker.className = 'marker';
    newNoteNode.className = 'note';

    newNoteMarker.innerHTML = '<i class="fas fa-angle-double-right"></i>';

    newNoteNode.appendChild(newNoteMarker);
    newNoteNode.appendChild(newNoteContent);

    noteLocation.parentNode.insertBefore(newNoteNode, noteLocation);

    if(needEmptyP) {
      noteLocation.parentNode.insertBefore(
        document.createElement('p'), newNoteNode);
    }

    ScrollTrigger.create({
      trigger: note,
      onEnter: (e) => { ShowNoteLink(e.trigger); },
      onEnterBack: (e) => { ShowNoteLink(e.trigger); },
      onLeave: (e) => { HideNoteLink(e.trigger); },
      onLeaveBack: (e) => { HideNoteLink(e.trigger); },
    });

  });

  document.querySelector('.main-viewport .content').addEventListener('click', (e) => {
    ShowNote(e);
  });

  document.querySelector('.note-list').addEventListener('click', (e) => {
    ShowNote(e);
  });

  document.querySelector('.notes .note').addEventListener('click', (e) => {
    if (e.target.closest('.close-button')) {
      document.body.classList.remove('showing-note');
    }
  });

  window.matchMedia('(max-width: 700px)').addEventListener('change', (e) => {
    if (!e.matches) {
      document.body.classList.remove('showing-note');
    }
  });

  function ShowNote(e) {

    if (!e.target.closest('.note')) {
      return;
    }

    document.body.classList.add('showing-note');

    const noteDisplay = document.querySelector('.notes .note');

    noteDisplay.textContent = '';

    const closeButton = document.createElement('div');
    closeButton.classList.add('close-button');
    closeButton.innerText = '[close]';

    noteDisplay.appendChild(closeButton);
    noteDisplay.appendChild(
      e.target.closest('.note').querySelector('.content').cloneNode(true)
    );
  }

  function ShowNoteLink(e) {
    const id = e.attributes.getNamedItem('note').value;
    document.querySelector('.main-viewport .note-list .'+id+' .title').style.display = 'block';
  }

  function HideNoteLink(e) {
    const id = e.attributes.getNamedItem('note').value;
    document.querySelector('.main-viewport .note-list .'+id+' .title').style.display = 'none';
  }

});