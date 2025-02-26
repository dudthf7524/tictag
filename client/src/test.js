import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "./reducers/user";
const Test = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const id = "aa";
  const pw = "bb";
  const clickTest = () => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { id, pw },
    });
  };
  console.log("me : ", me);
  return (
    <div className="test">
      <button onClick={clickTest}>aaa</button>
    </div>
  );
};

export default Test;
