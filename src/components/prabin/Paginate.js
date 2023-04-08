// import { useState} from "react";

// const Paginate = () => {
//   const [userData,setUserData] = useState([]);
//   console.log(userData);
//   async function fetchData (){
//     const res = await fetch("https://jsonplaceholder.typicode.com/users")
//     const data = await res.json();
//     setUserData(data);
//   }
//   fetchData();

//   return (
//     <div>
//       {userData.map((user) => {
//         return (
//           <div className="card-mock">
//             <h5>{user.name}</h5>
//             <h5>{user.username}</h5>
//             <h5>{user.email}</h5>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Paginate;
