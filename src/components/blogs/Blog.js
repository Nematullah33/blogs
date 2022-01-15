
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams
  } from "react-router-dom";


function Blog() {
  const { id } = useParams();
  const [blog,setBlog]=useState({});
  useEffect(()=>{  
    loadBlog(id);

  },[])

  function loadBlog(pid){
    
    axios.get(`http://localhost/laravel/blogs/public/api/blogs/${pid}`).then((response) => {
      console.log(response); 
      setBlog(response.data);     
    });
 } 
      
  return (
    <div >
      <div className='row'>
          <div className='col-md-6'>
          <Link to={`/blogs`} className='btn btn-success'>Back</Link> 
            <div className='card'>
                <img className='img-thumbnail img-fluid' src={'http://localhost/laravel/blogs/storage/app/public/'+blog.photo} /> 
                <div className='card-body'>
                    <h5  className='card-title'>{blog.title}</h5>
                    <p className='card-text'>{blog.body}</p>
                </div>
                
                
            </div>
          </div>
      </div>
    </div>
  );
}

export default Blog;