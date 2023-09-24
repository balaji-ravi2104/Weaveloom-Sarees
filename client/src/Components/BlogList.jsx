import React, { useEffect, useRef } from "react";

const BlogList = ({ blogs, currentPage }) => {
  const blogListRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div ref={blogListRef}>
      {blogs.length > 0 ? (
        <div className="blog-main">
          {blogs.map((e, i) => (
            <div className="blog-box">
              <div className="blog-image">
                <img src={e.img} alt="blog" />
              </div>
              <div key={i} class="blog-details">
                <h4>{e.title}</h4>
                <br></br>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default BlogList;
