import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import decode from "jwt-decode";

import { getPosts } from "../../actions/post";
import CardListHeader from "../CardListPage/Sections/CardListHeader";
import UpdateUser from "./Sections/UpdateUser";
import "./Sections/Mypage.scss";

const MyPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isUpdate, setIsUpdate] = useState(false);
  const birth =
    user?.result?.birth.substring(0, 4) +
    "/" +
    user?.result?.birth.substring(5, 7) +
    "/" +
    user?.result?.birth.substring(8, 10);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
  };

  useEffect(() => {
    dispatch(getPosts());
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch, location]);

  const isUpdateCard = () => {
    setIsUpdate(true);
  };

  return (
    <div className="mypage">
      <CardListHeader user={user} />
      {!isUpdate ? (
        <div className="mypage-main">
          <section className="mypage-body">
            <header>
              <Typography variant="h4">
                <strong>My Page</strong>
              </Typography>
            </header>
            <article>
              <Typography>
                <div>
                  <strong>닉네임</strong>
                </div>
                <div id="nickname">{user?.result?.nickname}</div>
              </Typography>
              <hr />
              <Typography>
                <div>
                  <strong>성별</strong>
                </div>
                <div id="sex">{user?.result?.sex}</div>
              </Typography>
              <hr />
              <Typography>
                <div>
                  <strong>생년월일</strong>
                </div>
                <div id="birth">{birth}</div>
              </Typography>
              <hr />
              <Typography>
                <div>
                  <strong>이메일</strong>
                </div>
                <div id="email">{user?.result?.email}</div>
              </Typography>
              <hr />
            </article>
          </section>
          <footer>
            <Button variant="contained" id="update-btn" onClick={isUpdateCard}>
              <CreateIcon />
            </Button>
          </footer>
        </div>
      ) : (
        <UpdateUser user={user} />
      )}
    </div>
  );
};

export default MyPage;
