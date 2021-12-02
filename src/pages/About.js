import parse from "html-react-parser";

export default function About( {about}) {
  console.log(about)
  return (

    <div className="aboutS">
        {about !== null ? (

      <div>
        
        <h1>{about.title.rendered}</h1>

        <p>{parse(about.text)}</p>

      </div>
      
      ) : ("Indlæser tekst")}
    </div>

  );
}
