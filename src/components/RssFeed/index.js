
// import React,{useState,useEffect} from 'react'
// import XMLParser from "react-xml-parser";
// import Axios from "axios";

// export const RssFeed = () => {
//     // const [post, setPost] = useState([]);
//     // const [err, seterr] = useState(null);
//     // const [loading, setloading] = useState(true);
//     // const [cat, setCat] = useState(null);
    
//     // let url1 = `https://cors-anywhere.herokuapp.com/https://bmjopen.bmj.com/rss/current.xml`;

//     // useEffect(() => {
        
//     //    Axios.get(url1, {
//     //      headers: new Headers({
//     //        Accept: "text/html",
//     //        "content-type": "application/x-www-form-urlencoded",
//     //        "Access-Control-Allow-Origin": "*",
//     //        "Access-Control-Allow-Methods": "GET, POST, PUT",
//     //        "Access-Control-Allow-Headers": "Content-Type",
//     //      }),
//     //      mode: "no-cors",
//     //    })
//     //      .then((d) => {
//     //        let p = [];
//     //        var xml = new XMLParser().parseFromString(d.data);
//     //        let news = xml.children[0].children;
//     //        for (let i in news) {
//     //          if (
//     //            news[i].children !== null &&
//     //            news[i].children !== [] &&
//     //            news[i].children.length > 0
//     //          ) {
//     //            p.push(news[i].children);
//     //          }
//     //        }
//     //        setPost(p);
   
//     //        setloading(false);
//     //      })
//     //      .catch((e) => {
//     //        setloading(false);
//     //        console.log(e);
//     //        seterr(e);
//     //      });
//     //  }, [url1]);
//     let Parser = require('rss-parser');
//     let parser = new Parser();
    
    
  
//     useEffect(() => {
//         (async () => {

//             let feed = await parser.parseURL('https://cors-anywhere.herokuapp.com/https://www.reddit.com/.rss');
//             console.log(feed.title);
          
//             feed.items.forEach(item => {
//               console.log(item.title + ':' + item.link)
//             });
          
//           })();
//     }, [])

//     return (
//         <div>
            
//         </div>
//     )
// }
