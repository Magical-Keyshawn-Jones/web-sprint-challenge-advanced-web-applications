import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PT from 'prop-types'
// import { BestArticles } from './App'

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
  const location = useLocation()
  const { 
    // location,
    articles,
    getArticles,
    deleteArticle,
    setCurrentArticleId,
    currentArticleId,
  } = props
    location.state = {bro: articles, form: { title: '', text: '', topic: '' }}
  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
  const key = window.localStorage.getItem('token')
  // const iKnow = location.state.disabling
// console.log( location )
  

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    getArticles()
    // location.state = {bro: articles, disabling: false, form: { title: '', text: '', topic: '' }}
    // useNavigate('/articles', { state: {nothing: 'not here'}})
    // console.log(location) 
  },[])

  // location.state = { no: 'no kewl bro'}
  // console.log(location)

  function editHandler(index){
    // const editArticle = location.state.bro[index]
    // location.state = {bro: articles, disabling: Math.random()*1000, form: editArticle}
    // console.log(location.state.form)

    setCurrentArticleId(index)
  }
  
  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      {key === null ? <Navigate to='/'/> : null}
      <h2>Articles</h2>
      {
        !articles.length
        ? 'No articles yet'
        : articles.map((art, index) => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={ false } onClick={()=>{editHandler(art.article_id)}}>Edit</button>
                  <button disabled={ false } onClick={()=>{deleteArticle(art.article_id)}}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
