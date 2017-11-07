window.addEventListener('load', () => {
    const Observable = Rx.Observable;
    const textbox = document.querySelector('#textbox');
    const output = document.querySelector('#output');
    const searchButton = document.querySelector('#searchButton');
    const closeButton = document.querySelector('#closeButton');
    const searchForm = document.querySelector('#searchForm');

    const keypresses = Observable.fromEvent(textbox, 'keyup');
    const searchButtonClicks = Observable.fromEvent(searchButton, 'click');
    const closeButtonClicks = Observable.fromEvent(closeButton, 'click');

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

    searchButtonClicks.forEach(() => {
        searchForm.style.display = 'block';
    });

    closeButtonClicks.forEach(() => {
        searchForm.style.display = 'none';
    });

    const searchResultSets = searchButtonClicks.switchMap(() =>
        keypresses
            .debounceTime(500)
            .map(key => textbox.value)
            .distinctUntilChanged()
            .filter(search => search.length > 0)
            .switchMap(search => getWikipediaSearchResults(search).retry(3))
    );

    searchResultSets
        .forEach(result => output.innerHTML = JSON.stringify(result))
        .catch(err => console.error(err));
});
