import styles from "../../styles/Blogs.module.css";

export default function Post({ post }) {
  return (
    <>
      <div className={styles.container}>
        <h1>{post.title}</h1>
        <img src={post.imageUrl} alt={post.title} />
        <p>{post.excerpt}</p>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  console.log("params.slug=>", params.slug);

  const res = await fetch(
    `https://gi12vwal.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%20%26%26%20slug.current%20%3D%3D%22${params.slug}%22%5D%7B%0A%20%20title%2C%0A%20%20_id%2C%0A%20%20slug%2C%0A%20%20excerpt%2C%0A%20%20%22imageUrl%22%3A%20mainImage.asset-%3Eurl%0A%7D%0A`
  );

  const data = await res.json();
  console.log("data is", data);

  return {
    props: {
      post: data.result[0],
    },
  };
}

export async function getStaticPaths() {
  const res =
    await fetch(`https://gi12vwal.api.sanity.io/v2021-10-21/data/query/production?query=*[_type == "post"]{
    slug
    }`);

  const data = await res.json();
  const paths = data.result.map((item) => {
    return {
      params: {
        slug: item.slug.current,
      },
    };
  });

  console.log("paths => ", paths);

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}
