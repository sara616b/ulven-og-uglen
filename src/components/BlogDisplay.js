export default function BlogDisplay({ blog }) {
  return (
    <div className="blog-element">
      <div className="blog-background">
        <div className="blog-content">
            <img 
            className="blogBillede" 
            src={blog.topbillede.guid} 
            alt="image" />
            <div className="blog-info">
              <h3>{blog.title.rendered}</h3>
            </div>
        </div>
      </div>
    </div>
  );
}
