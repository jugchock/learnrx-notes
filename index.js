window.addEventListener('load', () => {
  const Observable = Rx.Observable;
  const textbox = document.querySelector('#textbox');

  const keypresses = Observable.fromEvent(textbox, 'keypress');

  keypresses.forEach(x => console.log(x.keyCode));
});
