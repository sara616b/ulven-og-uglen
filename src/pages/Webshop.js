import BookDisplay from "../components/BookDisplay";

export default function Webshop({ bog }) {
  return (
    <div>
      <div>Webshop</div>
      {bog.length > 0 ? (
        bog.map((bog) => {
          return <BookDisplay key={bog.id} book={bog} />;
        })
      ) : (
        <p>Bøger loades...</p>
      )}
    </div>
  );
}
