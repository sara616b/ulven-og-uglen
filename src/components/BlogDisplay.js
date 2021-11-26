import { Link } from "react-router-dom";

export default function BlogDisplay({ blog }) {
  return (
    <div className="blog-element">
      <div className="blog-background">
      <Link to={`/blog/details?titel=${blog.slug}`}>
        <div className="blog-content">
            <img 
            className="blogBillede" 
            src={blog.topbillede.guid} 
            alt="image" />
          </div>  
        </Link>
            <div className="blog-info">
              <p>{blog.dato}</p>
              <p className="AF">Af: {blog.af}</p>
                <Link to={`/blog/details?titel=${blog.slug}`}>
                  <h2>{blog.title.rendered}</h2>
                </Link>
              <p>Tags: {blog.tags}</p>
            </div>
      </div>
    </div>
  );
}
