import React from "react"
import ReactTimeAgo from "react-time-ago"
import AddComment from "./AddComment"
import Comment from "./Comment"

const Post = ({ post }) => (
  <div className="well">
    <div className="media">
      <div className="media-body">
        <h4 className="media-heading">{post.User.name}</h4>
        <p>{post.post}</p>
        <ul className="list-inline list-unstyled">
          <li><span><i className="glyphicon glyphicon-calendar"/> <ReactTimeAgo date={post.createdAt}/> </span></li>
          <li>|</li>
          <span><i className="glyphicon glyphicon-comment"/> {post.Comments.length} comments</span>
          <li>|</li>
          <li>
            <span><i className="glyphicon glyphicon-thumbs-up"/> {post.Likes.length} likes</span>
          </li>
          <li>|</li>
        </ul>
        <ul className="list list-styled">
          {post.Comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
        </ul>
        <AddComment postId={post.id}/>
      </div>
    </div>
  </div>
)

export default Post