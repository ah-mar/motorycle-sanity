import Link from "next/link";
import styles from "../styles/Blogs.module.css";

export default function Motors({ posts }) {
  return (
    <>
      <div className={styles.container}>
        <h1>Classic Motorcycles</h1>

        {posts &&
          posts.map((post) => {
            return (
              <div key={post._id} className={styles.post}>
                <h3>{post.title}</h3>
                <img src={post.imageUrl} alt={post.title} />
                <p>{post.excerpt.slice(0, 80) + "..."}</p>
                <Link href={`/motorcycles/${post.slug.current}`}>
                  <a>Read More</a>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res =
    await fetch(`https://gi12vwal.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == "post"]{
  title,
  _id,
  slug,
  excerpt,
  "imageUrl": mainImage.asset->url
}`);
  const posts = await res.json();

  return {
    props: {
      posts: posts.result,
    },
  };
}
