import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/common/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/user";
import { RootState } from "../../modules";
import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

const socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket"],
});
const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user, userList } = useSelector((state: RootState) => ({
    user: state.user.user,
    userList: state.user.userList,
  }));

  const [userNames, setUserName] = useState([] as string[]);

  const onClick = () => {
    socket.emit("id", user?.id);

    dispatch(logout());
  };
  const once = useRef(true);
  useEffect(() => {
    if (once.current) {
      once.current = false;
      return;
    } else {
      socket.on("login_user", (data: string) => {
        setUserName((prev) => [...prev, data]);
      });

      once.current = true;
    }
  }, []);
  useEffect(() => {
    if (once.current) {
      once.current = false;
      return;
    } else {
      if (userList) {
        const arr = [] as string[];
        userList.forEach((list) => {
          const el = Object.values(list);
          arr.push(el[0]);
        });
        console.log(arr);
        setUserName((prev) => [...prev, ...arr]);
        once.current = true;
      }
    }
  }, [userList]);
  return <Header user={user} onClick={onClick} userNames={userNames}></Header>;
};

export default HeaderContainer;
