import React, { useEffect, useState } from "react";
import styles from "./BrowsePosts.module.css";
import SinglePost from "./SinglePost/SinglePost";
import UseWebisteTitle from "../../hooks/UseWebsiteTitle";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function BrowsePosts() {
  UseWebisteTitle("Przeglądaj posty");
  const location = useLocation();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    await axios
      .get("http://localhost:3002/api/comments/allcomments")
      .then((res) => {
        if (res.data.comments) {
          setComments(res.data.comments);
          setLoading(false);
        } else {
          setComments([]);
          setLoading(false);
        }
      });
  };

  const fetchPosts = async () => {
    await axios.get("http://localhost:3002/api/posts/getposts").then((res) => {
      if (res.data.posts) {
        setPosts(res.data.posts);

        fetchComments();
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [location]);

  return (
    <div className={`${styles.main_div_posts}`}>
      {loading ? (
        <p>Ładowanie danych</p>
      ) : posts.length ? (
        posts.map((post, key) => {
          return (
            <SinglePost
              key={key}
              {...post}
              fetchPosts={fetchPosts}
              commentsArray={comments}
            />
          );
        })
      ) : (
        <div className={`${styles.posts_div_error}`}>
          <p>Brak postów</p>
        </div>
      )}
    </div>
  );
}
