export default function BookDisplayShop({ book: bog }) {
  const authors =
    bog.forfatter.length > 50
      ? `${bog.forfatter.substring(0, 40)}...`
      : bog.forfatter;
  return (
    <div className="bog-element">
      <div className="background">
        <div className="content">
          <div className="image-holder">
            <img
              className="forsidebillede"
              src={bog.forsidebillede.guid}
              alt={`Forside på ${bog.titel}`}
            />
          </div>
          <div className="info">
            <h3 className="titel">{bog.titel}</h3>
            <p className="forfatter">{authors}</p>
            <p className="pris">{bog.pris},- kr</p>
          </div>
        </div>
        <button className="cta-contrast">Læg i kurv</button>
      </div>
    </div>
  );
}
