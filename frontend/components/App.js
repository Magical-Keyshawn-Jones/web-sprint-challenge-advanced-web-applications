import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'
const help = 'I cant code '

const boolean = window.localStorage.setItem('boolean', help)
const aId = window.localStorage.setItem('aId', '')
const aText = window.localStorage.setItem('aText', '')
const aTitle = window.localStorage.setItem('aTitle', '')
const aTopic = window.localStorage.setItem('aTopic', '')
const initialValues = { title: aTitle, text: aText, topic: aTopic}

// const loginSender = { 
//   username: 'IdahBest',
//   password: 'Idkthisthing'
// }

// axios.post(loginUrl, loginSender)
// .then(res=>{
//   console.log(res)
//   // const token = res.data.token
//   // window.localStorage.setItem('token', token)
//   // setMessage(res.data.message)
// })
// .catch(err=>console.log('error!', {err}))


export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState('something')
  const [spinnerOn, setSpinnerOn] = useState(false)
  const location = useLocation()
  location.state = {bro: articles, form: { title: '', text: '', topic: '' }}
  const form = location.state.form
  // console.log(form)
  // useEffect(()=>{
  //   location.state = {bro: articles, form: { title: '', text: '', topic: '' }}
  // },[])

  // function somethingNew(words){
  //   setCurrentArticleId(words)
  //   return currentArticleId
  // }
// const state = currentArticleId
  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/')}
  const redirectToArticles = () => {navigate('/articles',{ state: {bro: articles, form: { title: '', text: '', topic: '' }}}) }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    const key = window.localStorage.getItem('token')
    window.localStorage.removeItem('token', key)

    if (key === null){navigate('/')} else {
      setMessage('Goodbye!')
      redirectToLogin()
    }
  }

  const login = (username, password) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    const loginInfo = {
      username: username,
      password: password
    }
    setMessage('')
    setSpinnerOn(true)
    axios.post(loginUrl, loginInfo)
    .then(res=>{
      const token = res.data.token
      window.localStorage.setItem('token', token)
      setMessage(res.data.message)
      redirectToArticles()
      setSpinnerOn(false)
    })
    .catch(err=>{
      console.log({err})
      setMessage(err.config.message)
      setSpinnerOn(false)
    })
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().get(articlesUrl)
    .then(res=>{
      setArticles(res.data.articles)
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err=>{
      setMessage(err.config.message)
      setSpinnerOn(false)
    })
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().post(articlesUrl, article)
    .then(res=>{
      setArticles([...articles, res.data.article])
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err=>{
      setMessage(err.config.message)
      setSpinnerOn(false)
    })
  }

  const updateArticle = ( article) => {
    // ✨ implement
    // You got this!
    // const articleSender = {
    //   article_id: article_id,
    //   article: article
    // }
    const { article_id, ...changes } = article

    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().put(`${articlesUrl}/${article_id}`, changes)
    .then(res=>{
      setArticles(articles.map(art => {
        return art.article_id === article_id ? res.data.article : art
      }))
      // console.log(res)
      setMessage(res.data.message)
      setCurrentArticleId(null)
      setSpinnerOn(false)
    })
    .catch(err=>{
      setMessage(err.config.message)
      setSpinnerOn(false)
    })
  }

  const deleteArticle = article_id => {
    // ✨ implement
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().delete(`${articlesUrl}/${article_id}`)
    .then(res=>{
      setArticles(articles.filter(art=>{
        return art.article_id !== article_id
      }))
      setMessage(res.data.message)
      setSpinnerOn(false)
    })
    .catch(err=>{
      setMessage(err.config.message)
      setSpinnerOn(false)
    })
  }

  // const onSubmit = article => {
  //   if (currentArticleId) {
  //     updateArticle(article)
  //   } else {
  //     postArticle(article)
  //   }
  // }

  console.log(currentArticleId)

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    // When passing in props Do not Invoke them! they just need the name of function
    <React.StrictMode>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={()=>{logout()}}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm
                postArticle={postArticle}
                updateArticle={updateArticle}
                setCurrentArticleId={setCurrentArticleId}
                article={articles}
                // I think I need to give this an object
                currentArticle={null}
                number={currentArticleId}
                bestArticles={articles.find(art => art.article_id === currentArticleId)}
              />
              <Articles
                articles={articles}
                getArticles={getArticles}
                deleteArticle={deleteArticle}
                setCurrentArticleId={setCurrentArticleId}
                currentArticle={currentArticleId}
              />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </React.StrictMode>
  )
}
