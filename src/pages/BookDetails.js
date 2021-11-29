import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function BookDetails({ siteData, addToBasket }) {
  const [bog, setBog] = useState({});
  useEffect(() => {
    const findBookSlugInURL = new URLSearchParams(window.location.search).get(
      "titel"
    );
    siteData.bog.map((bog) => {
      if (bog.slug === findBookSlugInURL) {
        setBog({ ...bog });
      }
      return null;
    });
  }, [siteData.bog]);
  return (
    <div className="max-width">
      <Breadcrumbs
        links={[
          { link: "/", text: "Forside" },
          { link: "/webshop", text: "Webshop" },
          { link: `/webshop/details?titel=${bog.slug}`, text: bog.titel },
        ]}
      />
      {bog !== {} ? (
        <div className="book-details-holder">
          <div className="content">
            <div className="upper-holder">
              <div className="image-holder">
                <img
                  className="forsidebillede"
                  src={
                    bog.forsidebillede !== undefined
                      ? bog.forsidebillede.guid
                      : ""
                  }
                  alt={`Forside på ${bog.titel}`}
                />
              </div>
              <div className="info">
                <h3 className="titel">
                  {bog.titel !== undefined ? bog.titel : ""}
                </h3>
                <p className="forfatter">
                  af {bog.forfatter !== undefined ? bog.forfatter : ""}
                </p>
                <p className="pris">
                  {bog.pris !== undefined ? bog.pris : ""},- kr
                </p>
                <button
                  onClick={() => {
                    addToBasket(bog);
                  }}
                  className="cta-contrast"
                >
                  Læg i kurv
                </button>
                <div className="small">
                  <p className="format">
                    Format: {bog.format !== undefined ? bog.format : ""}
                  </p>
                  {bog.serie !== undefined && (
                    <p className="serie">Serie: {bog.serie}</p>
                  )}
                  <p className="sider">
                    {bog.sideantal !== undefined ? bog.sideantal : ""} sider
                  </p>
                </div>
              </div>
            </div>
            <p className="beskrivelse">
              <strong>Beskrivelse</strong>
              <br />
              {bog.beskrivelse !== undefined ? bog.beskrivelse : ""}
            </p>
          </div>
        </div>
      ) : (
        "Bog indlæses..."
      )}
    </div>
  );
}
