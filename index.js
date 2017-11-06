window.addEventListener('load', () => {
    const textbox = document.querySelector('#textbox');

    const vals = [1, 2, 3].map(x => x + 1);
    console.log(vals);

    textbox.addEventListener('keypress', e => console.log(e));
});
