import React from "react";

const Like = ({ liked, onToggleHeart }) => {
  let hearts = "btn text-danger fa fa-heart";
  if (!liked) hearts += "-o";
  return <i onClick={onToggleHeart} className={hearts} aria-hidden="true" />;
};

export default Like;
