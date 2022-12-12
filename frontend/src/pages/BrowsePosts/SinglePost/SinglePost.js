import React, { useEffect, useRef, useState } from "react";
import styles from "./SinglePost.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function SinglePost(props) {
  const location = useLocation();
  const addCommentInput = useRef();
  const [count, setCount] = useState(0);
  const [newComment, setNewComment] = useState();
  const [commentsInPost, setCommentsInPost] = useState([]);

  const showInputAddComment = () => {
    addCommentInput.current.classList.toggle(`${styles.active}`);
  };

  const addComment = (id) => {
    const newCommentObject = {
      postid: id,
      user: window.localStorage.getItem("login-status"),
      comment: newComment,
    };

    axios
      .post("http://localhost:3002/api/comments/addcomment", {
        newCommentObject,
      })
      .then((res) => {
        setNewComment("");
        if (res.data.error) {
          alert(res.data.error);
        } else {
          window.location.reload();
        }
      });
  };

  const likePost = (id) => {
    const username = window.localStorage.getItem("login-status");

    axios
      .post(`http://localhost:3002/api/posts/likepost/${username}/${id}`)
      .then((res) => {
        props.fetchPosts();
      });
  };

  const fetchCommentsInPost = async (id) => {
    axios
      .get(`http://localhost:3002/api/comments/getcomment/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.commentsInPost) {
          setCommentsInPost(res.data.commentsInPost);
        }
      });
  };

  const countComments = async (id) => {
    let postsId = [];

    for (let i = 0; i < props.commentsArray.length; i++) {
      postsId.push(props.commentsArray[i].idpost);
    }

    const counterCommentsInPost = postsId.filter((post) => post === id);

    setCount(counterCommentsInPost.length);
  };

  useEffect(() => {
    countComments(props.id);
  }, [location]);

  return (
    <>
      <div className={`${styles.post_main_div}`}>
        <div className={`${styles.post_description}`}>
          <p>{props.description}</p>
        </div>
        <div className={`${styles.post_img}`}>
          <img src={`./uploadsImgPosts/${props.img}`} alt="alt" />
        </div>
        {window.localStorage.getItem("login-status") ? (
          <div>
            <div className={`${styles.post_likes_and_comments}`}>
              <div className={`${styles.post_likes}`}>
                <button
                  className={`${styles.post_button_like}`}
                  onClick={() => likePost(`${props.id}`)}
                >
                  LIKE
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-hand-thumbs-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                </button>
                {props.likes}
              </div>
              <div className={`${styles.post_comments}`}>
                {count} Komentarzy
                <div
                  className={`${styles.add_comment_button}`}
                  onClick={function () {
                    showInputAddComment();
                    fetchCommentsInPost(props.id);
                  }}
                >
                  Dodaj komentarz
                </div>
              </div>
            </div>
            <div className={`${styles.add_comment}`} ref={addCommentInput}>
              <div className={`${styles.read_comments_div}`}>
                {commentsInPost.map((comment, key) => {
                  return (
                    <div className={`${styles.show_comments}`} key={key}>
                      <p>{comment.login}</p>
                      <p>{comment.comment}</p>
                    </div>
                  );
                })}
              </div>
              <div className={`${styles.div_add_comment}`}>
                <input
                  type="text"
                  placeholder="Dodaj komentarz"
                  required
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => addComment(props.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${styles.no_login_user}`}>
            Zaloguj się aby komentować lub reagować na posty
          </div>
        )}
      </div>
    </>
  );
}
