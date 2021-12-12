import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Forfatter({ siteData }) {
  const [forfatter, setforfatter] = useState({});
  useEffect(() => {
    const findForfatterSlugInURL = new URLSearchParams(
      window.location.search
    ).get("navn");
    siteData.forfatter.map((forfatter) => {
      if (forfatter.slug === findForfatterSlugInURL) {
        setforfatter({ ...forfatter });
      }
      return null;
    });
  }, [siteData.forfatter]);

  return (
    <div className="max-width">
      <Breadcrumbs
        links={[
          { link: "/", text: "Forside" },
          { link: "/blog", text: "Blog" },
          {
            link: `/blog/details?titel=${forfatter.slug}`,
            text: forfatter.navn !== undefined ? forfatter.navn : "",
          },
        ]}
      />
      {forfatter !== {} && forfatter.portraetbillede !== undefined ? (
        <div className="ForfatterWidth">
          <div>
            <h2>{forfatter.navn}</h2>
          </div>
          <div className="ForfatterInfo">
            <img
              className="forsidebillede"
              src={forfatter.portraetbillede.guid}
              alt={`billede af ${forfatter.navn}`}
            />
            <p>{forfatter.bio}</p>
          </div>
        </div>
      ) : (
        "forfatter indlæses..."
      )}
    </div>
  );
}
