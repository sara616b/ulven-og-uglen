import parse from "html-react-parser";
import Breadcrumbs from "../components/Breadcrumbs";

export default function About({ about }) {
  return (
    <div className="max-width">
      <div className="aboutS aboutpage">
        <Breadcrumbs
          links={[
            { link: "/", text: "Forside" },
            { link: "/about", text: "Om forlaget" },
          ]}
        />
        {about !== null ? <div>{parse(about.text)}</div> : "Indlæser tekst"}
      </div>
    </div>
  );
}
