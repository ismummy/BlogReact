import React from "react"
import { useAuth } from "../context/auth"
import Services from "../network/Services"

const AddComment = ({ postId }) => {
  const { addComment, likePost } = useAuth()
  const [comment, setComment] = React.useState("")

  const handleLike = e => {
    e.preventDefault()
    Services.put("/posts/like", { post_id: postId })
      .then(res => {
        if (res.data.error === false) {
          console.log(res.data.data)
          likePost(res.data.data)
        }
      }).catch(error => {
      console.log(error)
    })
  }

  const handleComment = e => {
    e.preventDefault()
    Services.post("/posts/comments", { post_id: postId, comment })
      .then(res => {
        if (res.data.error === false) {
          console.log(res.data.data)
          setComment('')
          addComment(res.data.data)
        }
      }).catch(error => {
      console.log(error)
    })
  }

  return (
    <form className="form-row" onSubmit={handleComment}>
      <div className="form-group col-md-10">
        <input type="text"
               className="form-control"
               id="comment"
               placeholder="Add your comment!"
               value={comment}
               onChange={e => setComment(e.target.value)}/>
      </div>
      <button type="submit" name="addComment" className={"hidden"} />
      <div className="form-group col-md-2">
        <button className="btn btn-success mb-2"
                onClick={handleLike}>
          <i className="glyphicon glyphicon-thumbs-up"/> Like
        </button>
      </div>
    </form>
  )
}

export default AddComment