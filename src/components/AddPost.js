import React from "react"
import "../App.css"
import { useAuth } from "../context/auth"
import Services from "../network/Services"

const AddPost = () => {
  const { addPost } = useAuth()
  const [post, setPost] = React.useState("")

  const submitPost = e => {
    e.preventDefault()
    Services.post("/posts", { post })
      .then(res => {
        if (res.data.error === false) {
          console.log(res.data.data)
          setPost("")
          addPost(res.data.data)
        }
      }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div className="widget-area no-padding blank">
          <div className="status-upload">
            <form onSubmit={submitPost}>
              <textarea placeholder="What are you doing right now?" value={post}
                        onChange={e => setPost(e.target.value)}/>
              <button type="submit" className="btn btn-success green"><i className="fa fa-share"/> Share</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost