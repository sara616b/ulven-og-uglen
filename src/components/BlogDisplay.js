export default function BlogDisplay({ blog }) {
  return (
    <div className="bog-element">
      <img className="forsidebillede" src={blog.topbillede.guid} alt="image" />
      <h3>{blog.title.rendered}</h3>
    </div>
  );
}
