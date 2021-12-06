import BookDisplayShop from "../components/BookDisplayShop";
import BlogDisplay from "../components/BlogDisplay";
import { useEffect, useState } from "react/cjs/react.development";

export default function Search({ siteData, addToBasket }) {
  const [noResults, setNoResults] = useState(false);
  const searchStringFromURL = new URLSearchParams(window.location.search).get(
    "s"
  );
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
    blogtitles: siteData.blogindlg.map((blog) => {
      return blog.title.rendered;
    }),
    content: siteData.blogindlg.map((blog) => {
      return blog.content.rendered;
    }),
    tags: siteData.blogindlg.map((blog) => {
      return blog.tags;
    }),
  };
  const bookSearchCategories = ["booktitels", "authors", "descriptions"];
  const blogSearchCategories = ["blogtitles", "content", "tags"];
  const searchResults = {
    books: bookSearchCategories.map((category) => {
      return whatToSearchThrough[category].filter(filterBySearchString);
    }),
    blogs: blogSearchCategories.map((category) => {
      return whatToSearchThrough[category].filter(filterBySearchString);
    }),
  };
  const booksFoundThroughResults = locateBook();
  const blogsFoundThroughResults = locateBlog();
  useEffect(() => {
    const isThereResults = setTimeout(() => {
      if (
        blogsFoundThroughResults.length === 0 &&
        booksFoundThroughResults.length === 0
      ) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }, 10000);
    return clearTimeout(isThereResults);
  }, [booksFoundThroughResults, blogsFoundThroughResults]);
  function locateBook() {
    let bookArray = [];
    siteData.bog.map((book) => {
      for (let i = 0; i < bookSearchCategories.length; i++) {
        searchResults.books[i].map((result) => {
          if (
            result === book.titel ||
            result === book.forfatter ||
            result === book.beskrivelse
          ) {
            bookArray.push(book);
          }
          return null;
        });
      }
      return null;
    });
    let filteredArray = [];
    let isUnique = {};
    for (let i in bookArray) {
      const id = bookArray[i].id;
      isUnique[id] = bookArray[i];
    }
    for (let i in isUnique) {
      filteredArray.push(isUnique[i]);
    }
    return filteredArray.reverse();
  }

  function locateBlog() {
    let blogArray = [];
    siteData.blogindlg.map((blog) => {
      for (let i = 0; i < blogSearchCategories.length; i++) {
        searchResults.blogs[i].map((result) => {
          if (
            result === blog.title.rendered ||
            result === blog.content.rendered ||
            result === blog.tags
          ) {
            blogArray.push(blog);
          }
          return null;
        });
      }
      return null;
    });
    let filteredArray = [];
    let isUnique = {};
    for (let i in blogArray) {
      const id = blogArray[i].id;
      isUnique[id] = blogArray[i];
    }
    for (let i in isUnique) {
      filteredArray.push(isUnique[i]);
    }
    return filteredArray.reverse();
  }

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

  return (
    <section className="search-page">
      <div className="max-width">
        <h2>
          Du søgte på... <strong>{searchStringFromURL}</strong>
        </h2>
        {booksFoundThroughResults.length > 0 ? (
          <div>
            <p className="seperators">Bøger der matchede din søgning:</p>
            <div className="search-grid">
              {booksFoundThroughResults.map((book) => {
                return (
                  <BookDisplayShop
                    addToBasket={addToBasket}
                    book={book}
                    key={book.titel}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {blogsFoundThroughResults.length > 0 ? (
          <div>
            <p className="seperators">Blogindlæg der matchede din søgning:</p>
            <div className="search-grid">
              {blogsFoundThroughResults.map((blog, index) => {
                return (
                  <BlogDisplay blog={blog} key={blog.title.rendered + index} />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {blogsFoundThroughResults.length === 0 &&
        booksFoundThroughResults.length === 0 &&
        noResults ? (
          <p>Vi fandt desværre ingen resultater...</p>
        ) : (
          ""
        )}
        {blogsFoundThroughResults.length === 0 &&
        booksFoundThroughResults.length === 0 &&
        !noResults
          ? "Indlæser bøger og blogindlæg..."
          : ""}
      </div>
    </section>
  );
}
