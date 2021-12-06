import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function AboutSubPage({ props, siteData }) {
  return (
    <div className="max-width">
      <div className="aboutS">
        {window.location.href.includes("faq") ? (
          <div>
            <Breadcrumbs
              links={[
                { link: "/", text: "Forside" },
                { link: "/about", text: "Om forlaget" },
                { link: `/${props[0].slug}`, text: `${props[0].titel}` },
              ]}
            />
            <div>{parse(props[0].content.rendered)}</div>
          </div>
        ) : (
          ""
        )}
        {window.location.href.includes("vores-forfattere") ? (
          <div>
            <Breadcrumbs
              links={[
                { link: "/", text: "Forside" },
                { link: "/about", text: "Om forlaget" },
                { link: `/${props[1].slug}`, text: `${props[1].titel}` },
              ]}
            />
            <div className="H1textForfatter">
              <div className="vForfattereP">
                {siteData.forfatter.map((forfatter) => {
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
                })}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {window.location.href.includes("kontakt") ? (
          <div>
            <Breadcrumbs
              links={[
                { link: "/", text: "Forside" },
                { link: "/about", text: "Om forlaget" },
                { link: `/${props[2].slug}`, text: `${props[2].titel}` },
              ]}
            />
            <div>{parse(props[2].content.rendered)}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
