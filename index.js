import {
  Library,
  navigation,
  showToast,
  toggleVisibility,
  DateTime,
} from './modules/index.js';

window.onload = () => {
  const lib = new Library(showToast, toggleVisibility);
  const dt = new DateTime({});
  lib.render();
  navigation.init();
  document.querySelector('time').innerHTML = dt.toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
