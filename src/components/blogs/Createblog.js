import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
function Createblog(){
    const { register, handleSubmit, reset} = useForm();
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
    
        SaveBlog(formData);
    
      }
      
  function SaveBlog(data){
    
    //console.log(data);
    
     axios.post('http://localhost/laravel/blogs/public/api/blogs',data).then((response) => {
       //console.log(response);   
       reset({title:"",slug:"",body:"",filePhoto:""});
     });
     
 } 

 return(<>
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
                            <input {...register("title")} type="text" id="title" className="form form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input {...register("slug")} type="text" id="slug" className="form form-control"/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Body</label>
                            <textarea {...register("body")} id="body" className="form form-control"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>Photo</label>
                            <input {...register("filePhoto")} type="file" id="filePhoto" className="form form-control"/>
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
export default Createblog;