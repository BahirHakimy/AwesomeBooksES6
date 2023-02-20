import {
  Library,
  navigation,
  showToast,
  toggleVisibility,
} from './modules/index.js';
import { DateTime } from './node_modules/luxon/src/luxon.js';

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
