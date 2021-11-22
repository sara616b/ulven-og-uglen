import BlogDisplay from "../components/BlogDisplay";

export default function Blog({ props }) {
  return (
    <div>
      <h2>Blog</h2>
      {props.blogindlg !== undefined ? (
        <div>
          {props.blogindlg.length > 0 ? (
            <div>
              {props.blogindlg.map((blog) => {
                return <BlogDisplay key={blog.id} blog={blog} />;
              })}
            </div>
          ) : (
            <div>bye</div>
          )}
        </div>
      ) : (
        <p>Blogindlæg loades...</p>
      )}
    </div>
  );
}
