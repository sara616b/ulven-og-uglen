import parse from "html-react-parser";

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
        <div>
          {/* {parse(props[1].content.rendered)}  */}
        <div>{siteData.forfatter.map((forfatter) => {
          return ( <div>
            <img
              className="forsidebillede"
              src={forfatter.portraetbillede.guid}
              alt=""
            />
            <h3>{forfatter.navn}</h3>
          </div> );
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
