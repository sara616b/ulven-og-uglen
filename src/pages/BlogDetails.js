import { useEffect, useState } from "react";
import parse from "html-react-parser";

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
    //console.log(blog);

    //console.log(siteData)

  return (
    <div className="max-width">
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


