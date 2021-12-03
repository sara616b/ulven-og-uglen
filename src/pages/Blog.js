import BlogDisplay from "../components/BlogDisplay";
import parse from "html-react-parser";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Blog({ props }) {
  return (
    <div className="blog-page">
      <div className="max-width">
        <Breadcrumbs
          links={[
            { link: "/", text: "Forside" },
            { link: "/blog", text: "Blog" },
          ]}
        />
        {props.hvad_er_fantasy !== undefined ? (
          <div className="Fantasy">
            {parse(props.hvad_er_fantasy[0].content.rendered)}
          </div>
        ) : (
          "Indlæser tekst"
        )}
        {props.blogindlg !== undefined ? (
          <div>
            {props.blogindlg.length > 0 ? (
              <div className="blogs">
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
    </div>
  );
}
