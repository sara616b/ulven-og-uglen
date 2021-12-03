import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Breadcrumbs from "../components/Breadcrumbs";

export default function BlogDetails({ siteData }) {
  const [blog, setblog] = useState({});
  useEffect(() => {
    const findBlogSlugInURL = new URLSearchParams(window.location.search).get(
      "titel"
    );
    siteData.blogindlg.map((blog) => {
      if (blog.slug === findBlogSlugInURL) {
        setblog({ ...blog });
      }
      return null;
    });
  }, [siteData.blogindlg]);

  return (
    <div className="max-width">
      <Breadcrumbs
        links={[
          { link: "/", text: "Forside" },
          { link: "/blog", text: "Blog" },
          {
            link: `/blog/details?titel=${blog.slug}`,
            text: blog.title !== undefined ? blog.title.rendered : "",
          },
        ]}
      />
      {blog !== {} ? (
        <div className="blog-details-holder">
          <div className="blog-details-content">
            <div className="upper-holder">
              <div className="blog-details-info">
                <h1 className="blog-details-titel">
                  {blog.title !== undefined ? blog.title.rendered : ""}
                </h1>

                {parse(blog.content !== undefined ? blog.content.rendered : "")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "blog indlæses..."
      )}
    </div>
  );
}
