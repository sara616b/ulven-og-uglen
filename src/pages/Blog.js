import BlogDisplay from "../components/BlogDisplay";
import parse from "html-react-parser";

export default function Blog({ props }) {
  console.log(props.hvad_er_fantasy)
  return (
    <div>
      
      {props.hvad_er_fantasy !== undefined ? (<div className="Fantasy">
        {parse(props.hvad_er_fantasy[0].content.rendered)}
      </div>) : ("Indlæser tekst")}

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
            <div>Blogindlæg indlæses...</div>
          )}
        </div>
      ) : (
        <p>Blogindlæg indlæses...</p>
      )}

    </div>
  );
}
