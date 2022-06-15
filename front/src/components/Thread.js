import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./post/Card";
import isEmpty from "lodash";

import postReducer from "../reducers/post.reducer.js";

const Thread = () => {
  const [LoadPost, setLoadPost] = React.useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (LoadPost) {
      setLoadPost(false);
      dispatch(postReducer.getPosts());
      setLoadPost(false);
    }
  }, [LoadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
