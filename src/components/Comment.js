import React from "react"
import ReactTimeAgo from 'react-time-ago'

const Comment = ({comment}) => (
  <li>
    <p>{comment.comment}</p>
    <p>{comment.User.name} <span className="float-right"><ReactTimeAgo date={comment.createdAt}/></span></p>
  </li>
);

export default Comment;