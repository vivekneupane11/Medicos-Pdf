import React from 'react'
import { useState,useEffect } from 'react/cjs/react.development'


export const Rss = (recentBlogPost) => {
  const [state,setState]=useState({recentBlogPost:{name:"",url:""}})

  
  const RssFeed=()=>{
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
              if (request.readyState == 4 && request.status == 200) {
                const  myObj = JSON.parse(request.responseText);
                for (const i = 0; i < 1; i ++) {
                  setState({recentBlogPost:{
                    name: myObj.items[i].title,
                    url: myObj.items[i].link

                  }})
   
     }
               }
              

    }
    request.open("GET", "https://cors-anywhere.herokuapp.com/https://bmjopen.bmj.com/rss/current.xml", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
 
  }
    useEffect(() => {
      RssFeed();
  }, [])


  return (
    <div>
   Check out our blog: <a target="_blank" href={recentBlogPost.url}>{recentBlogPost.name}</a>
     </div>
  )
}


