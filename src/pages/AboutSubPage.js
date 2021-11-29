import parse from "html-react-parser";

export default function AboutSubPage({ props }) {
  console.log(props[0].content.rendered);

  return (
    <div className="aboutS">
      {window.location.href.includes("faq") ? (
        <div>{parse(props[0].content.rendered)}</div>
      ) : (
        ""
      )}
      {window.location.href.includes("vores-forfattere") ? (
        <div>{parse(props[1].content.rendered)}</div>
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
