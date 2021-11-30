import parse from "html-react-parser";

export default function Footer({ siteData }) {
  return (
    <footer>
      <div>
        <div>
          <p>
            Ulven og Uglen IVS
            <br />
            Slettebjergvej 9<br />
            2750 Ballerup
          </p>
        </div>
        <div>
          <p>
            Mail: info@ulvenoguglen.dk
            <br />
            Telefon: 25 94 44 27 (man-torsdag kl. 9-12)
            <br />
            CVR-nummer: 32306772
          </p>
        </div>
      </div>
      <div>
        <div className="some">
          {siteData.social_medie !== undefined
            ? siteData.social_medie.map((some) => {
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
        <a href="https://www.ulvenoguglen.dk/handelsbetingelser/">
          Handelsbetingelser
        </a>
        <a href="https://www.ulvenoguglen.dk/cookie-og-privatlivspolitik/">
          Cookie- og privatlivspolitik
        </a>
      </div>
    </footer>
  );
}
