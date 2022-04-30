import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }
// const initialFormValues = { 
//   title: window.localStorage.getItem('aTitle'), 
//   text: window.localStorage.getItem('aText'),
//   topic: window.localStorage.getItem('aTopic') }


const boolean = window.localStorage.getItem('boolean')
const aId = window.localStorage.getItem('aId')
const aText = window.localStorage.getItem('aText')
const aTitle = window.localStorage.getItem('aTitle')
const aTopic = window.localStorage.getItem('aTopic')
const initialValues = { title: aTitle, text: aText, topic: aTopic}

export default function ArticleForm(props) {
// location.state = {bro: article, form: { title: '', text: '', topic: '' }}
  // const [values, setValues] = useState(initialFormValues)
  
  const location = useLocation()
  // ✨ where are my props? Destructure them here
  const form = location.state.form
  // console.log(form)
  const [values, setValues] = useState(initialFormValues)
  const [newValues, setNewValues] = useState(form)
  const { 
    postArticle,
    updateArticle,
    setCurrentArticleId,
    currentArticle,
    bestArticles,
    article,
    number
  } = props
  const iKnow = location.state.disabling
  
  
  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    setValues(bestArticles || initialFormValues)
    
  },[bestArticles])

  // setValues(form)
  
  // console.log(values)
  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }
console.log(bestArticles)
  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.

    // if (bestArticles !== null ){updateArticle(bestArticles.article_id, bestArticles)}
    // else {postArticle(values)}

      if (number) {
        updateArticle(values)
      } else {
        postArticle(values)
      }

    setValues(initialFormValues)
    setCurrentArticleId(0)
    location.state = {bro: article, form: { title: '', text: '', topic: '' }}
    // const boolean = window.localStorage.setItem('boolean', help)
    // const aId = window.localStorage.setItem('aId', '')
    // const aText = window.localStorage.setItem('aText', '')
    // const aTitle = window.localStorage.setItem('aTitle', '')
    // const aTopic = window.localStorage.setItem('aTopic', '')
    // const boolean = 'boolean'
    // window.localStorage.setItem('boolean', boolean)

    // if (currentArticle === true){
    //   postArticle(values)
    // } else {updateArticle()}
  }

  function resetting(){
    setValues(initialFormValues)
  }

  // console.log(values)

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    // if(values.title.length === 0 && values.text.length === 0 && values.title.length === 0)
    if(values.title === '' && values.text === '')
    // if(values.length === 0)
    {
      return true
    } else { return false }
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>Create Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={()=>{resetting()}}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
