import { useState, useEffect } from "react";
import styles from "../styles/Blogs.module.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    fetch(
      `https://gi12vwal.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == "post"]{
  title,
  _id,
  excerpt,
  "imageUrl": mainImage.asset->url
}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        setBlogs(data.result);
      });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>Classic Motorcycles</h1>

        {blogs &&
          blogs.map((blog) => {
            return (
              <div key={blog._id} className={styles.post}>
                <h3>{blog.title}</h3>
                <img src={blog.imageUrl} alt={blog.title} />
                <p>{blog.excerpt}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
