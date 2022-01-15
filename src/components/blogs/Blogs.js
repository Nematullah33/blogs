import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import _ from 'lodash';
import axios from 'axios';


function Blogs(){
const pageSize=10;
    //...............................
    const [blogs,setBlogs]=useState([]);
    const [paginates,setPaginates]=useState([]);
    const [curentPage,setCurentPage]=useState(1);

    useEffect(()=>{     
        loadBlogs(); 
    },[]);

    
    function loadBlogs(){
        fetch(`http://localhost/laravel/blogs/public/api/blogs`)
        .then(res=>res.json())
        .then(res=>{
            setBlogs(res.blogs)
             console.log(res.blogs);
             setPaginates(_(res.blogs).slice(0).take(pageSize).value());
             
       }) 
    }
        const pageCount=blogs? Math.ceil(blogs.length/pageSize):0;
        if(pageCount===1)return null;
        const pages= _.range(1,pageCount+1)



    const handleDelete=(e,param)=>{
        e.preventDefault();

        let pid=e.target.id;  

            axios.delete(`http://localhost/laravel/blogs/public/api/blogs/${pid}`).then((response) => {
            console.log(response);
            loadBlogs();
            });     
 
    }
    const pagination=(pageNo)=>{
        setCurentPage(pageNo);
        const startIndex=(pageNo -1)* pageSize;
        const paginatePost= _(blogs).slice(startIndex).take(pageSize).value();
        setPaginates(paginatePost);
    }
    return(<>
    
    <div className="row">
        <div className="col-md-12">
            <div className="card">
               <div className="card-header">
                   <h3> <Link to="/create-blog" className='btn btn-info'>Create Blog</Link> <Link to="/" className='float-end btn btn-secondary'> Go to Site</Link></h3>
               </div>
               <div className="card-body">
                   <table className="table-bordered table-responsive">
                        <tr className='table-primary'>
                            <th>SN</th>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Body</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </tr>
                    {

                        paginates.map(blog=>
                                                <tr>
                                                    <td>{blog.id}</td>
                                                    <td>{blog.title}</td>
                                                    <td>{blog.slug}</td>
                                                    <td>{blog.body}</td>
                                                    <td><img width={100} src={'http://localhost/laravel/blogs/storage/app/public/'+blog.photo}/> </td>
                                                    <td><Link className='btn btn-info' to={`/blogs/edit/${blog.id}`} >Edit</Link> </td>
                                                    <td> <Link to={`/What-kind-of-blogs/details/${blog.id}`}  className='btn btn-primary'>Details</Link></td>
                                                    <td> <a href='javascript:void(0)' id={blog.id} onClick={(e)=>handleDelete(e,blog.id)} className='btn btn-danger'>Delete</a> </td>
                                                </tr>
                        )
                    }
                    </table>
                    
               </div>
                    <div className=''>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item"><a className="page-link" href="#">{`<<`}</a></li>
                                {
                                    pages.map((page)=>(
                                        <li className={page===curentPage? "page-item-active":"page-item"}><a onClick={()=>pagination(page)} className="page-link" href={"javascript:void(0)"}>{page}</a></li>
                                        
                                    ))
                                }

                                <li className="page-item"><a className="page-link" href="#">{`>>`}</a></li>
                            </ul>
                        </nav>
                    </div>
               <div className="card-footer">

               </div>

            </div>
        </div>  
    </div>


    </>);
}
export default Blogs;