
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";//npm install react-hook-form
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

  const { register, handleSubmit ,reset} = useForm();
  

  useEffect(()=>{  
    loadBlog(id);
  },[])



  const onErrors = errors =>{ 
    console.error(errors);
  }

  function loadBlog(pid){
    
    axios.get(`http://localhost/laravel/blogs/public/api/blogs/${pid}`).then((response) => {
      console.log(response);    
      
      setBlog(response.data);     
    });
 }

 const onFormSubmit  = (data) =>{
    console.log(data);
  let formData=new FormData();    
    Object.entries(data).forEach(([key, value]) => {
      if(key!='filePhoto'){
       formData.append(key, value);
      }
     });
  formData.append('filePhoto', data.filePhoto[0],data.filePhoto[0].name);
  console.log(...formData);

  SaveChange(formData);

} 

function SaveChange(data){
    
  //console.log(data);
  
   axios.put(`http://localhost/laravel/blogs/public/api/blogs/${id}`,data).then((response) => {
     console.log(response);   
     //reset({txtName:"",txtBarcode:"",txtDescription:""});
   });
   
}


  return (
    <div style={{padding:"10px"}}> 
        
      <Link to={`/blogs`} className='btn btn-info'>Back</Link> 
            
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <div className='row mb-3 '>
          <label className='col-sm-2 col-form-label'>Title</label>
          <div className='col-sm-10'>
            <input {...register("title")} defaultValue={blog.title || ''} className='form-control' type="text" name="title" id="title" />
          </div>         
        </div>
        <div className='row mb-3 '>
          <label className='col-sm-2 col-form-label'>Slug</label>
          <div className='col-sm-10'>
            <input {...register("slug")} defaultValue={blog.slug || ''} className='form-control' type="text" name="slug" id="slug" />
          </div>         
        </div>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label'>Body</label>
          <div className='col-sm-10'>
            <textarea {...register("body")} defaultValue={blog.body || ''} className='form-control' type="text" name="body" id="body">

            </textarea>
          </div>         
        </div>



        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label'>Photo</label>
          <div className='col-sm-10'>
            <input {...register("filePhoto")} className='form-control' type="file" name="filePhoto"  id="filePhoto" /><br/>
            <img loading="lazy" width="200" src={'http://localhost/laravel/blogs/storage/app/public/'+blog.photo}/>
          </div>         
        </div>

        <button type="submit" className="btn btn-primary">Submit</button> <span>   </span>
        <input type="reset" className='btn btn-primary' value="Reset" />
      </form>

    </div>
  );
}

export default EditBlog;