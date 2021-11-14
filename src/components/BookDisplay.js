export default function BookDisplay({ book: bog }) {
  return (
    <div className="bog-element">
      <img
        className="forsidebillede"
        src={bog.forsidebillede.guid}
        alt="cover image"
      />
      <h2 className="titel">{bog.titel}</h2>
      <p className="forfatter">{bog.forfatter}</p>
      <p className="pris">{bog.pris},- kr</p>
    </div>
  );
}
