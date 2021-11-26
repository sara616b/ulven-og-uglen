export default function Search({ siteData }) {
  const searchStringFromURL = new URLSearchParams(window.location.search).get(
    "s"
  );
  console.log(siteData);
  const whatToSearchThrough = {
    booktitels: siteData.bog.map((bog) => {
      return bog.titel;
    }),
    authors: siteData.bog.map((bog) => {
      return bog.forfatter;
    }),
    descriptions: siteData.bog.map((bog) => {
      return bog.beskrivelse;
    }),
  };

  function findSearchResults(arrayToSearch) {
    if (arrayToSearch !== undefined) {
      const searchArray = arrayToSearch;

      const searchResults = searchArray.filter(filterBySearchString);

      function filterBySearchString(element) {
        if (
          element
            .toString()
            .toLowerCase()
            .includes(searchStringFromURL.toLowerCase())
        ) {
          return true;
        }
        return false;
      }

      return searchResults;
    }
    return [];
  }

  return (
    <section className="search-page">
      <div className="max-width">
        <h2>
          You searched for <strong>{searchStringFromURL}</strong>
        </h2>
        <div className="search-grid">
          {["booktitels", "authors", "descriptions"].map((category) => {
            const results = findSearchResults(whatToSearchThrough[category]);
            return (
              <div key={category}>
                {results.map((book, index) => {
                  return <p key={book.slice(0, 10) + index}>{book}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
