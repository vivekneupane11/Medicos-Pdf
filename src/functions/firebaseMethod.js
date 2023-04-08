
import { collection, doc, endBefore, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, setDoc, startAfter } from "firebase/firestore";
import { slideCategories } from "../constants/Book/BookCategories";


const randomSubcategory = category => {
    let filtered = slideCategories.filter(
        slideCategory => slideCategory.category === category,
    );
    let subCategories = filtered[0].subCategories;
    

    return subCategories[Math.floor(Math.random() * (subCategories?.length - 1))]
        .category;
}

export async function fetchWithCollectionName(collectionName) {
    //  const db=getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
        const {firestore:{db,getDocs,collection}}=await getFirebaseAll()
          return await getDocs(collection(db,collectionName))
            .then(querySnapshot => {
                let allData = []
                querySnapshot.forEach(ele => {
                    allData.push(ele.data());
                })
                return allData;
            })
    } catch (error) {
        console.log("Error while fetching slide and books", error)
    }
}

export async function fetchOnSnapshotWithNestedCollectionName(firstCollectionName, firstDocName, secondDocName, secondCollectionName) {
    // const db=getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
      const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
        const docRef = doc(db,firstCollectionName,firstDocName,secondCollectionName,secondDocName)
            onSnapshot(docRef,(querySnapshot) => {
                let allData = []
                querySnapshot.forEach(ele => {
                    allData.push(ele?.data());
                })
                return allData;
            })
    } catch (error) {
        console.log("Error while fetching slide and books", error)
    }
}
export async function setWithNestedCollectionName(firstCollectionName, firstDocName, secondDocName, secondCollectionName, data) {
    // const db=getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {

        const{firestore:{db,setDoc,doc}}=await getFirebaseAll()
       
         return await setDoc(doc(db,firstCollectionName,firstDocName,secondCollectionName,secondDocName),data)

    } catch (error) {
        console.log("Error while fetching slide and books", error)
    }
}

export async function fetchSlidesAndBooksOrderedByName(collectionName, orderByName) {
    // const db=getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
       const{firestore:{db,getDocs,query,collection,orderBy}}=await getFirebaseAll()
        return await getDocs(query(collection(db,collectionName),
        orderBy(orderByName)))
            .then(querySnapshot => {
                let allData = []
                querySnapshot.forEach(ele => {
                    allData.push(ele.data());
                })
                return allData;
            })
    } catch (error) {
        console.log("Error while fetching slide and books", error)
    }
}

export async function fetchAllBooksAndSlidesDocId(collectionName) {
    // const db =getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
      const{firestore:{db,getDocs,collection}}=await getFirebaseAll()
        return await getDocs(collection(db,collectionName))
            .then(querySnapshot => {
                let allData = []
                querySnapshot.forEach(ele => {
                    allData.push(ele.id);
                })
                return allData;
            })
    } catch (error) {
        console.log("Error while fetching slide and books doc id", error)
    }
}

export async function fetchUserPreferredBooksAndSlides(collectionName, userId) {
    // const db=getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
        const{firestore:{db,getDoc,doc,getDocs,collection}}=await getFirebaseAll()
        let recommendedData = [];
     
            return await getDoc(doc(db,'Web-User-Data',userId,'User-Preference',userId))
            .then((res) => {
                if (res.data()) {
                    let subjects = res.data()?.preference.subjects;

                    return subjects?.map(async (category, index) => {
                       
                        return await getDocs(collection(db,`K-Slides-${(category?.subjectName).replace(/\s|\/g, ""/g, "")}-${(randomSubcategory(category?.subjectName)).replace(/\s|\//g, "")}`))
                            .then((documentSnapshot) => {
                                if (documentSnapshot) {
                                    documentSnapshot.forEach((doc) => {
                                        recommendedData.push(doc.data())
                                    })
                                    if (index === subjects?.length - 1) {
                                        return recommendedData
                                    }
                                }
                            })

                    })
                }
            })

    } catch (err) {
        console.log("Error while fetching preference data", err)
    }
}



export async function fetchSlidesAndBooksOrderedByNameWithLimit(collectionName, orderByName, pageLimit) {
    // alert(collectionName)
    // const db=getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
        // return await firebase.firestore()
        //     .collection(collectionName)
        //     .orderBy(orderByName)
        //     .limit(pageLimit)
        //     .get()
        const{firestore:{db,getDocs,query,collection,orderBy,limit}}=await getFirebaseAll()
         return await getDocs(query(collection(db,collectionName),
         orderBy(orderByName),
         limit(pageLimit)))

            .then(querySnapshot => {
                if (!querySnapshot?.empty) {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        allData.push(ele.data());
                    })
                    let firstData = querySnapshot.docs[0]
                    let lastData = querySnapshot.docs[querySnapshot.docs.length - 1]
                    // console.log("INITIAL DATA")
                    return { allData, firstData, lastData };
                } else {
                    return false;
                }
            })
    } catch (error) {
        console.log("Error while fetching slide and books with limit", error)
    }
}

export async function fetchStartAfterBooksAndSlides(collectionName, orderByName, lastBook, pageLimit) {
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
        // return await firebase.firestore()
        //     .collection(collectionName)
        //     .orderBy(orderByName)
        //     .startAfter(lastBook)
        //     .limit(pageLimit)
        //     .get()
        const {firestore:{db,getDocs,query,collection,orderBy,startAfter,limit}}=await getFirebaseAll()
    if(lastBook && pageLimit){
        return await getDocs(query(collection(db,collectionName),
        orderBy(orderByName),
        startAfter(lastBook),
        limit(pageLimit)))
            .then(querySnapshot => {
                let allData = []
                querySnapshot.forEach(ele => {
                    // console.log("This is data",ele.data())
                    allData.push(ele.data());
                })
                // console.log("Next triggered", allData)
                // console.log("Next triggered", collectionName, orderByName, lastBook, pageLimit)
                return allData;
            })
    }else{
        return null;
    }
    } catch (error) {
        console.log("Error while fetching start after slide and books", error)
    }
}

export async function fetchEndBeforeBooksAndSlides(collectionName, orderByName, firstBook, pageLimit) {
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
        // return await firebase.firestore()
        //     .collection(collectionName)
        //     .orderBy(orderByName)
        //     .endBefore(firstBook)
        //     .limit(pageLimit)
        //     .get()
        const{firestore:{db,getDocs,query,collection,orderBy,endBefore,limit}}=await getFirebaseAll()
        return await getDocs(query(collection(db,collectionName),
        orderBy(orderByName),
        endBefore(firstBook),
        limit(pageLimit)))
            .then(querySnapshot => {
                let allData = []
                querySnapshot.forEach(ele => {
                    // console.log("This is data",ele.data())
                    allData.push(ele.data());
                })
                // console.log("Previous triggered", allData)
                // console.log("Previous triggered", collectionName, orderByName, firstBook, pageLimit)
                return allData;
            })
    } catch (error) {
        console.log("Error while fetching start after slide and books", error)
    }
}

export async function addUserVisited(uid, type, title = '', category = '', subCategory = '') {
    // const db = getFirestore()
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    try {
        
        // firebase.firestore().collection('Web-Uid-To-Username')
        //     .doc(uid)
        //     .get()
        const {firestore:{db,getDoc,doc,setDoc}}=await getFirebaseAll()
        getDoc(doc(db,'Web-Uid-To-Username',uid))
            .then((res) => {
                // firebase.firestore().collection('Web-User-Data')
                //     .doc(res?.data()?.username)
                //     .collection('User-Visited')
                //     .doc(title)
                //     .set({
                //         title: title,
                //         type: type,
                //         category: category,
                //         subCategory: subCategory,
                //         createdAt: new Date()
                //     })
                setDoc(doc(db,'Web-User-Data',res?.data()?.username,'User-Visited',title),
                {
                    title: title,
                    type: type,
                    category: category,
                    subCategory: subCategory,
                    createdAt: new Date()
                })
                    .then(() => {
                    })
            })
    } catch (error) {
        console.log('Error adding search history', error)
    }
}
