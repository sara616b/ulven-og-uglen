import parse from "html-react-parser";
import Breadcrumbs from "../components/Breadcrumbs";

export default function About({ about }) {
  return (
    <div className="max-width">
      <div className="aboutS">
        <Breadcrumbs
          links={[
            { link: "/", text: "Forside" },
            { link: "/about", text: "Om forlaget" },
          ]}
        />
        {about !== null ? (
          <div>
            <h1>{about.title.rendered}</h1>

            <p>{parse(about.text)}</p>
          </div>
        ) : (
          "Indlæser tekst"
        )}
      </div>
    </div>
  );
}
