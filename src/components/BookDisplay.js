export default function BookDisplay({ book: bog }) {
  return (
    <div className="bog-element">
      <div className="background">
        <div className="content">
          <img
            className="forsidebillede"
            src={bog.forsidebillede.guid}
            alt={`Forside på ${bog.titel}`}
          />
          <div className="info">
            <h3 className="titel">{bog.titel}</h3>
            <p className="forfatter">{bog.forfatter}</p>
            <p className="pris">{bog.pris},- kr</p>
            <p className="beskrivelse">
              {bog.beskrivelse.substring(0, 150)} ...
            </p>
          </div>
        </div>
        <button className="cta-contrast">Læs mere her</button>
      </div>
    </div>
  );
}
