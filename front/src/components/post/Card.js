import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
//import { dateParser } from "../utils/dateParser";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id} id={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div>
          <div className="card-left">
            <img
              src={
                !isEmpty(
                  usersData[0] &&
                    usersData.map((user) => {
                      if (user._id === post.userId) {
                        return user.avatar;
                      }
                    })
                )
              }
              alt="avatar"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {
                    !isEmpty(
                      usersData[0] &&
                        usersData
                          .map((user) => {
                            if (user._id === post.userId) {
                              return user.pseudo;
                            }
                          })
                          .join("")
                    )
                  }
                </h3>
              </div>
              {/* /*<span> {dateParser(post.createdAt)} </span> */}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default Card;
