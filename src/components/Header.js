import Navigation from "./Navigation";
import parse from "html-react-parser";

export default function Header({ props, setSiteData, loadSearch }) {
  return (
    <header>

      <div className="some-nav">
        <div className="max-width">
          {props.social_medie !== undefined
            ? props.social_medie.map((some) => {
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
      
      <Navigation
        props={props}
        setSiteData={setSiteData}
        loadSearch={loadSearch}
      />

    </header>
  );
}
