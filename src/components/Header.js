import Navigation from "./Navigation";
import parse from "html-react-parser";

export default function Header({ props, setSiteData }) {
  console.log("props", props);
  return (
    <header>
      <div className="some-nav">
        <div className="max-width">
          {props.social_medie !== undefined
            ? props.social_medie.map((some) => {
                console.log(some);
                return (
                  <a
                    key={some.navn}
                    className="social-media-icon"
                    href={some.link}
                  >
                    {parse(some.svg_ikon)}
                  </a>
                );
              })
            : null}
        </div>
      </div>
      <Navigation props={props} setSiteData={setSiteData} />
    </header>
  );
}
