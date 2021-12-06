import { Link } from "react-router-dom";

export default function BlogDisplay({ blog, doNotShowTags }) {
  return (
    <div className="blog-element">
      <div className="blog-background">
        <Link to={`/blog/details?titel=${blog.slug}`}>
          <div className="blog-content">
            <img
              className="blogBillede"
              src={blog.topbillede.guid}
              alt={blog.title.rendered}
            />
          </div>
          <div className="blog-info">
            <p>{blog.dato}</p>
            <p className="AF">Af: {blog.af}</p>
            <h2>{blog.title.rendered}</h2>
            {doNotShowTags === true ? "" : <p>Tags: {blog.tags}</p>}
          </div>
        </Link>
      </div>
    </div>
  );
}
