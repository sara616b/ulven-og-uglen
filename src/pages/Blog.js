import BlogDisplay from "../components/BlogDisplay";

export default function Blog({ props }) {
  return (
    <div>
      <h2 className="blog-titel">Blog</h2>
      {props.blogindlg !== undefined ? (
        <div>
          {props.blogindlg.length > 0 ? (
            <div className="Blogs">
              {props.blogindlg.map((blog) => {
                return <BlogDisplay key={blog.id} blog={blog} />;
              })}
            </div>
          ) : (
            <div>bye</div>
          )}
        </div>
      ) : (
        <p>Blogindlæg indlæses...</p>
      )}
    </div>
  );
}
