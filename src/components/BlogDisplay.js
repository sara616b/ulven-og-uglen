export default function BlogDisplay({ blog }) {
  return (
    <div className="blog-element">
      <img className="blogBillede" src={blog.topbillede.guid} alt="image" />
      <h3>{blog.title.rendered}</h3>
    </div>
  );
}
