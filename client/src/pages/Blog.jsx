import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../styles/Blog.css";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import axios from "axios";
import Pagination from "../Components/Pagination";
import BlogList from "../Components/BlogList";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);

  const fetchBlogs = async () => {
    try {
      await axios
        .get(`http://localhost:8080/api/blog`)
        .then((response) => {
          setBlogs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  }
  
  useEffect(() => {
    scrollToTop();
    fetchBlogs();
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  // thia currentPost is an dummay array of values 
  const currentPost  = blogs.slice(firstPostIndex,lastPostIndex);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="blog-header"></div>

      <div>
        <BlogList blogs={currentPost} currentPage={currentPage}/>
        <Pagination totalPost={blogs.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>

      <div>
        <NewsLetter />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;
