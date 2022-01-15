
import './App.css';
import React from 'react';
import Blogs from './components/blogs/Blogs';
import Blog from './components/blogs/Blog';
import Createblog from './components/blogs/Createblog';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import EditBlog from './components/blogs/EditBlog';
import Page from './components/Page';


function App() {


  return (
    <div className="container">

        <Routes>

            <Route exact path="/" element={<Page/>} />
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/create-blog" element={<Createblog/>}/>
            <Route  path="What-kind-of-blogs/details/:id" element={<Blog/>} />
            <Route  path="blogs/edit/:id" element={<EditBlog/>} /> 

        </Routes>
    </div>
  );
}

export default App;

