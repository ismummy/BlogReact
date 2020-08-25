import React, { useEffect } from "react"
import WelcomeCaption from "../components/WelcomeCaption"
import AddPost from "../components/AddPost"
import Post from "../components/Post"
import { useAuth } from "../context/auth"
import Services from "../network/Services"

const MainPage = () => {
  const { user, posts, setPosts } = useAuth()

  useEffect(() => {
    Services.get("/posts")
      .then(res => {
        if (res.data.error === false) {
          console.log(res.data.data)
          setPosts(res.data.data)
        }
      }).catch(error => {
      console.log(error)
    })
  }, [])

  const displayPost = posts.map(post => <Post post={post} key={post.id}/>)
  return (
    <>
      <WelcomeCaption user={user}/>
      <div className="main">
        <AddPost/>
        {displayPost}
      </div>
    </>
  )
}

export default MainPage