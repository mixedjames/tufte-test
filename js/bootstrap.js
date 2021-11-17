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
    const newNoteNode = document.querySelector('.main-viewport .note-list .'+noteName+' .content').cloneNode(true);

    newNoteNode.className = 'note';

    const noteLocation = note.closest('.content > *');
    noteLocation.parentNode.insertBefore(newNoteNode, noteLocation);

    ScrollTrigger.create({
      trigger: note,
      onEnter: (e) => { ShowNote(e.trigger); },
      onEnterBack: (e) => { ShowNote(e.trigger); },
      onLeave: (e) => { HideNote(e.trigger); },
      onLeaveBack: (e) => { HideNote(e.trigger); },
    });

  });

  document.querySelector('.note-list').addEventListener('click', (e) => {
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
    const id = e.attributes.getNamedItem('note').value;
    document.querySelector('.main-viewport .note-list .'+id).style.display = 'block';
  }

  function HideNote(e) {
    const id = e.attributes.getNamedItem('note').value;
    document.querySelector('.main-viewport .note-list .'+id).style.display = 'none';
  }

});