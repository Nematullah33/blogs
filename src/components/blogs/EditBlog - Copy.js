import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams
  } from "react-router-dom";


function EditBlog() {
  const { id } = useParams();
  const [blog,setBlog]=useState({});
  const { register, handleSubmit, reset} = useForm();
  const [value, setValue] = useState(blog);
  useEffect(()=>{  
    loadBlog(id);

  },[])
  

  // const handleChange = e => {
  //   console.log({[e.target.name]: e.target.value});
  //   setValue({[e.target.name]:e.target.value});
  // };
  function loadBlog(pid){
    
    axios.get(`http://localhost/laravel/blogs/public/api/blogs/${pid}`).then((response) => {
      console.log(response); 
      setBlog(response.data);     
    });
 }

 const onFormSubmit  = (data) =>{
     //console.log(data);
     let formData=new FormData();    
       Object.entries(data).forEach(([key, value]) => {
         if(key!='filePhoto'){
          formData.append(key, value);
         }
        });
        formData.append('filePhoto', data.filePhoto[0],data.filePhoto[0].name);
     //console.log(...formData);    
 
     UpdateBlog(formData);

   }
   
    function UpdateBlog(data){
    
    axios.put(`http://localhost/laravel/blogs/public/api/blogs/${id}`,data).then((response) => { 
        reset({title:"",slug:"",body:"",filePhoto:""});
    });
    
    } 
      
  return (<>
      <div className="row">
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">
                    <h3><Link to="/blogs" className="btn btn-info">Blogs</Link></h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="form-group mb-3">
                            <label>Title</label>
                            <input {...register("title")} type="text" id="title" defaultValue={blog.title} className="form form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input {...register("slug")} type="text" id="slug" defaultValue={blog.slug}  className="form form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Body</label>
                            <textarea {...register("body")} id="body" defaultValue={blog.body}  className="form form-control"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>Photo</label>
                            <input {...register("filePhoto")} defaultValue={blog.photo || ''}  type="file" id="filePhoto" className="form form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            
                           <input type="submit" className="btn btn-primary"/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
  </>);
}
export default EditBlog;