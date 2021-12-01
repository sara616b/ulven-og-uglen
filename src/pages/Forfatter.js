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

    console.log(forfatter)

    return (
        <div className="max-width">
            {forfatter !== {} ? (
            <div>
                <div>
                    <h2>{forfatter.navn}</h2>
                </div>
                <div>
                    <img
                        className="forsidebillede"
                        //src={forfatter.portraetbillede.guid}
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
  