import { useState } from "react";
import BookDisplayShop from "../components/BookDisplayShop";

export default function Webshop({ bog, setSiteData }) {
  const [sortBy, setSortBy] = useState("udgivelsesdato");

  return (
    <div className="webshop">
      <div className="max-width">
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
        </div>
        <div className="books">
          {bog.length > 0 ? (
            []
              .concat(bog)
              .sort((a, b) => {
                if (sortBy === "pris") {
                  console.log("pris");
                  return a[sortBy] - b[sortBy];
                }
                return a[sortBy] > b[sortBy] ? 1 : -1;
              })
              .map((bog) => {
                console.log(bog[sortBy]);
                return <BookDisplayShop key={bog.id} book={bog} />;
              })
          ) : (
            <p>Bøger loades...</p>
          )}
        </div>
      </div>
    </div>
  );
}
