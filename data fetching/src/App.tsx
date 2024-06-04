import { useEffect, useState } from "react";
import { get } from "./utils/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];
        const blogPosts: BlogPost[] = data.map((post) => ({
          id: post.id,
          title: post.title,
          text: post.body,
          userId: post.userId,
        }));
        setPosts(blogPosts);
      } catch (error) {
        setError((error as Error).message);
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  if (isFetching) {
    return <p id="loading-fallback">Fetching posts</p>;
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt="Abstract Image" />
      {posts && <BlogPosts posts={posts} />}
    </main>
  );
}

export default App;
