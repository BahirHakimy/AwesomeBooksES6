import {
  Library,
  navigation,
  showToast,
  toggleVisibility,
} from './modules/index.js';
import { DateTime } from './modules/luxon.min.js';

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
