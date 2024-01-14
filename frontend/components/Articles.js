import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PT from 'prop-types'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'

export default function Articles({
  articles,
  getArticles,
  deleteArticle,
  setCurrentArticleId,
  currentArticleId,
  updateArticle
}) {
  const [currentArticle, setCurrentArticle] = useState(null)
  const navigate = useNavigate()
  const redirectToLogin = () => navigate('/');
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getArticles();
    } else {
      redirectToLogin();
    }
  }, [])
  // ✨ where are my props? Destructure them here

  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)

  const handleEdit = (article_id) => {
    setCurrentArticleId(article_id);
    console.log('currentArticleId:', article_id);

    const selectedArticle = articles.find(article => article.article_id === article_id);
    console.log('selectedArticle:', selectedArticle);

    setCurrentArticle(selectedArticle);
    console.log('currentArticle:', currentArticle);
    
    navigate('/articles');
  };

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {articles.length === 0 ? (
        'No articles yet'
      ) : (
        articles.map((art) => (
          <div className="article" key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(art.article_id)}>Edit</button>
              <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
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
