import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function AboutSubPage({ props, siteData }) {
  console.log(siteData.forfatter);

  return (
    <div className="aboutS">
      {window.location.href.includes("faq") ? (
        <div>{parse(props[0].content.rendered)}</div>
      ) : (
        ""
      )}
      {window.location.href.includes("vores-forfattere") ? (
        <div className="H1textForfatter">
          {parse(props[1].content.rendered)} 
        <div className="vForfattereP">{siteData.forfatter.map((forfatter) => {
          return ( 
          <div className="vForfattereC">
            <Link to={`/Forfatter?navn=${forfatter.slug}`}>
              <img
                className="forsidebillede"
                src={forfatter.portraetbillede.guid}
                alt=""
              />
              <h3>{forfatter.navn}</h3>
            </Link>
          </div>
          );
        })}</div> 
        </div>
      ) : (
        ""
      )}
      {window.location.href.includes("kontakt") ? (
        <div>{parse(props[2].content.rendered)}</div>
      ) : (
        ""
      )}
    </div>
  );
}
