import React, { useEffect } from "react";
import isEmpty from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userActions";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [isUnFollowed, setIsUnFollowed] = React.useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow, type));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow, type));
    setIsUnFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  }, [userData, idToFollow, type]);

  return (
    <div className="follow-handler">
      {isFollowing ? (
        <button className="follow-button" onClick={handleUnfollow}>
          <i className="fas fa-user-minus"></i>
          <span>Se désabonner</span>
        </button>
      ) : (
        <button className="follow-button" onClick={handleFollow}>
          <i className="fas fa-user-plus"></i>
          <span>Suivre</span>
        </button>
      )}
    </div>
  );
};

export default FollowHandler;
