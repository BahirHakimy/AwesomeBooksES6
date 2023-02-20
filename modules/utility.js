export default function showToast(
  msg,
  callback,
  buttonText = 'View',
  anchor = document.body,
) {
  const toast = document.createElement('div');
  const message = document.createElement('p');
  const action = document.createElement('button');
  const slider = document.createElement('div');
  toast.className = 'toast';
  message.className = 'message';
  action.className = 'action';
  slider.className = 'slider';
  message.textContent = msg;
  action.textContent = buttonText;
  toast.append(message, action, slider);
  anchor.prepend(toast);
  const id = setTimeout(() => {
    anchor.removeChild(toast);
  }, 3000);
  action.onclick = () => {
    callback?.();
    clearTimeout(id);
    anchor.removeChild(toast);
  };
}
