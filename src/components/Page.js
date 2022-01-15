import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import _ from 'lodash';
import axios from 'axios';


function Page(){
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

    const pagination=(pageNo)=>{
        setCurentPage(pageNo);
        const startIndex=(pageNo -1)* pageSize;
        const paginatePost= _(blogs).slice(startIndex).take(pageSize).value();

        setPaginates(paginatePost);
    }
    return(<>
    
    <div className="row">
        <div className="col-md-12">
            <div className='card' style={{margin:"5px 0px 10px 0px"}}>
                <div className='card-header'>
                    <h2>Traveling<Link  to="/blogs" className='text-color:green float-end btn btn-secondary' > Go Back</Link></h2>
                    
                </div>
            </div>
            <div className='row'>
            {

            paginates.map(blog=>
                
                    <div className='col-md-3'>
                        <div className='card' style={{margin:"5px 0px 10px 0px"}}>
                            <img className='img-thumbnail img-fluid' width={300} style={{height:"200px"}} src={'http://localhost/laravel/blogs/storage/app/public/'+blog.photo} /> 
                            <div className='card-body'>
                                <h5  className='card-title'>{blog.title}</h5>
                                <p className='card-text'>{blog.body}</p>
                                
                            </div>
                            <p><Link to={`/What-kind-of-blogs/details/${blog.id}`}  className='float-end text-decoration-none' style={{padding:"5px"}}>Read more</Link></p>
                        </div>
                    </div>
                
            )
            }
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
        </div>  
    </div>


    </>);
}
export default Page;