import { useEffect, useState } from "react";

export default function Forfatter({ siteData }) {

    const [forfatter, setforfatter] = useState({});
    useEffect(() => {
      const findForfatterSlugInURL = new URLSearchParams(window.location.search).get(
        "navn"
      );
      siteData.forfatter.map((forfatter) => {
        if (forfatter.slug === findForfatterSlugInURL) {
            setforfatter({ ...forfatter });
        }
        return null;
      });
    }, [siteData.forfatter]);

    return (
        <div className="max-width">
            {(forfatter !== {} && forfatter.portraetbillede !== undefined) ? (
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
  