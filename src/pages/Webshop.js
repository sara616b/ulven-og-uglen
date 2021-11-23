import BookDisplay from "../components/BookDisplay";

export default function Webshop({ bog }) {
  return (
    <div className="webshop">
      <div className="max-width">
        <div>Webshop</div>
        <div className="books">
          {bog.length > 0 ? (
            bog.map((bog) => {
              return <BookDisplay key={bog.id} book={bog} />;
            })
          ) : (
            <p>Bøger loades...</p>
          )}
        </div>
      </div>
    </div>
  );
}
