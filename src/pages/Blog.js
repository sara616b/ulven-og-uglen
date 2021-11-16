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
        // props.blogindlg.length > 0 ? (
        //   props.blogindlg.map(() => {
        //     return <BlogDisplay key={props.blogindlg.id} props={props} />;
        //   })
        // ) : (
        //   <p>Blogindlæg loades...</p>
        // )
        <p>Blogindlæg loades...</p>
      )}
    </div>
  );
}
