import { useState } from "react";
import BookDisplayShop from "../components/BookDisplayShop";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Webshop({ bog, addToBasket }) {
  const [sortBy, setSortBy] = useState("udgivelsesdato");
  const [sortDirection, setSortDirection] = useState(false);

  return (
    <div className="webshop">
      <div className="max-width">
        <Breadcrumbs
          links={[
            { link: "/", text: "Forside" },
            { link: "/webshop", text: "Webshop" },
          ]}
        />
        <div className="sorting">
          <p>Sorter efter: </p>
          <select
            onChange={(e) => {
              setSortBy(e.target.selectedOptions[0].value);
            }}
          >
            {["Udgivelsesdato", "Forfatter", "Titel", "Pris"].map((sorting) => {
              return (
                <option key={sorting} value={sorting.toLowerCase()}>
                  {sorting}
                </option>
              );
            })}
          </select>
          <p
            onClick={() => {
              setSortDirection(!sortDirection);
            }}
            className="sort-direction"
          >
            ⇅
          </p>
        </div>
        <div className="books">
          {bog.length > 0 ? (
            []
              .concat(bog)
              .sort((a, b) => {
                if (sortBy === "pris") {
                  if (sortDirection) {
                    return a[sortBy] - b[sortBy];
                  }
                  return b[sortBy] - a[sortBy];
                }
                if (sortDirection) {
                  return b[sortBy] > a[sortBy] ? 1 : -1;
                }
                return a[sortBy] > b[sortBy] ? 1 : -1;
              })
              .map((bog) => {
                return (
                  <BookDisplayShop
                    key={bog.id}
                    book={bog}
                    addToBasket={addToBasket}
                  />
                );
              })
          ) : (
            <p>Bøger indlæses...</p>
          )}
        </div>
      </div>
    </div>
  );
}
