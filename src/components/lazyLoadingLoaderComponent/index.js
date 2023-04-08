import React from 'react'

const LazyLoadingComponentLoader=(lazyComponent, attemptsLeft=2)=> {
    
    return new Promise((resolve, reject) => {

      lazyComponent()
        .then(resolve)
        .catch((error) => {
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
  export default LazyLoadingComponentLoader