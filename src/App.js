import React, { useState } from "react"
import { Redirect, Route, Router, Switch } from "react-router-dom"
import JavascriptTimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { AuthContext } from "./context/auth"
import { createBrowserHistory } from "history"
import "./App.css"
import MainPage from "./layouts/MainPage"
import AuthenticatedRouter from "./AuthenticatedRouter"
import LoginPage from "./layouts/LoginPage"

function App () {
  JavascriptTimeAgo.locale(en)
  const hist = createBrowserHistory()

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
  const user = JSON.parse(localStorage.getItem("user"))
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn && user)
  const [currentUser, setCurrentUser] = useState(user)
  const [posts, setPosts] = useState([])

  const setLogin = data => {
    if (data) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      setUserLoggedIn(true)
    } else {
      localStorage.setItem("isLoggedIn", JSON.stringify(false))
      setUserLoggedIn(false)
    }

    setCurrentUser(data)
    localStorage.setItem("user", JSON.stringify(data))
  }

  const addComment = (comment) => {
    const newPosts = [...posts]
    newPosts.map(post => {
      if (post.id === comment.post_id) {
        post.Comments.unshift(comment);
      }
    })
    setPosts(newPosts);
  }

  const addPost = (post) => {
    const newPosts = [post, ...posts]
    setPosts(newPosts)
    console.log(newPosts)
  }

  const likePost = (like) => {
    const newPosts = [...posts]
    newPosts.map(post => {
      if (post.id === like.post_id) {
        post.Likes.unshift(like);
      }
    })
    setPosts(newPosts);
  }

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        user: currentUser,
        posts,
        setPosts,
        setLogin,
        addPost,
        addComment,
        likePost
      }}
    >
      <Router history={hist}>
        <Switch>
          <Route exact path="/login" component={LoginPage}/>
          <AuthenticatedRouter path="/post" component={MainPage}/>
          <Redirect from="/" to="/post"/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
