window.addEventListener('load', () => {
    const Observable = Rx.Observable;
    const textbox = document.querySelector('#textbox');

    const keypresses = Observable.fromEvent(textbox, 'keypress');

    keypresses.forEach(x => console.log(x.keyCode));

    function searchWikipedia(term) {
        const url = `http://en.wikipedia.org/w/api.php?action=opensearch&format=` +
            `json&search=${encodeURIComponent(term)}&callback=?`;

        $.getJSON(url, data => {
            console.log(data);
        });
    }

    searchWikipedia('Terminator');
});
