import React from 'react'

const LazyLoadingComponentLoader=(lazyComponent, attemptsLeft=2)=> {
    
    return new Promise((resolve, reject) => {

      lazyComponent()
        .then(resolve)
        .catch((error) => {
          // let us retry after 1500 ms
          setTimeout(() => {
            if (attemptsLeft === 1) {
              reject(error);
              return;
            }
            LazyLoadingComponentLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject);
          }, 1500);
        });
    });
  }


//   const LazyLoadingComponentLoader= async(importFn, retries = 2, interval = 1000)=> {

//     try {

//       return await LazyLoadingComponentLoader();

//     } 
//     catch (error) {

//       if (retries) {
//         await wait(interval);
//         return LazyLoadingComponentLoader(importFn, retries - 1, interval);
//       } 
//       else {
//         throw new Error(error);
//       }
//     }
//   }
//   const wait=(ms)=>{
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

  export default LazyLoadingComponentLoader