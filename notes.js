window.addEventListener('load', () => {
    const Observable = Rx.Observable;
    const textbox = document.querySelector('#textbox');

    const keypresses = Observable.fromEvent(textbox, 'keypress');

    function getWikipediaSearchResults(term) {
        return Observable.create(observer => {
            const url = `http://en.wikipedia.org/w/api.php?action=opensearch&format=` +
                `json&search=${encodeURIComponent(term)}&callback=?`;
            let cancelled = false;

            $.getJSON(url, data => {
                if (!cancelled) {
                    observer.next(data[1]);
                    observer.complete();
                }
            });

            return () => cancelled = true;
        });
    }

    getWikipediaSearchResults('Terminator');
});
