import firebase from "firebase"
import React, { useCallback, useEffect, useState } from 'react'


//LOCAL IMPORTS
import { bookCategories, slideCategories } from '../../constants/Book/BookCategories'
import { shuffleArrayList } from '../../services/global/CommonServices'
import { Profile1 } from '../Profile1'
import './_profile.scss'


const ProfilePage = () => {

    const firestoreDatabase = firebase.firestore();
    const [mappingData,setMappingData]=useState([])
    const [exploreLinkActiveData,setExploreLinkActiveData]=useState('Slides')
    const [loadingSlides, setLoadingSlides] = useState(false);
    const slidesLimit = 6;


    const randombookSubcategory = useCallback(category => {
        let filtered = bookCategories.filter(
            bookCategory => bookCategory.category == category,
        );
        let subCategories = filtered[0].subCategories;
        let randomInteger = Math.floor(Math.random() * (subCategories.length - 1));
     
        // console.log(category, randomInteger, subCategories[randomInteger]);
        return subCategories[Math.floor(Math.random() * (subCategories.length - 1))]
            .category;
    }, []
    )

    const randomSubcategory = useCallback(category => {
        let filtered = slideCategories .filter(
            slideCategory => slideCategory.category == category,
        );

        let subCategories = filtered[0].subCategories;
        let randomInteger = Math.floor(Math.random() * (subCategories.length - 1));
   
        // console.log(category, randomInteger, subCategories[randomInteger]);
        return subCategories[Math.floor(Math.random() * (subCategories.length - 1))]
            .category;
    }, [])


    useEffect(() => {
        let isMounted = true;

        const getUserPreferencesData = (exploreName) => {
           

            let allSlidesData = [];
            let allBooksData=[];

            try {

                if (exploreName == "Slides") {
                    setLoadingSlides(true);
                  
                    const AllSlides = firestoreDatabase
                        .collection(`AllSlidesDataLockDownVersions`)
                        .limit(slidesLimit)
                        .get()
                        .then(querySnapshot => {
                          
                            querySnapshot.forEach(ele => {
                                allSlidesData.push(ele.data());
                            });

                            if (isMounted) {
                               const value = {
                                   data:allSlidesData,
                                   type:'slides'
                               }
                                setLoadingSlides(false);
                                setMappingData(()=>value)
                            }
                        });
                }
                else if (exploreName === "BookMarks") {
                    setLoadingSlides(true);
                  
                    const BasicScienceSlides = firestoreDatabase
                    .collection(`K-Books`)
                    .orderBy('title')
                    .limit(9)
                    .get()
                    .then(querySnapshot => {
                      
                        querySnapshot.forEach(ele => {

                            allBooksData.push(ele.data());
                        });

                            if (isMounted) {
                               const value = {
                                   data:shuffleArrayList(allBooksData),
                                   type:'book'
                               }
                                setLoadingSlides(false);
                               setMappingData(()=>value);
                            }
                        });
                }
                else if (exploreName == "Clipboard") {


                } else if (exploreName == "Following") {
                 
                  const value = {
                      data:[{ profileImage:require("../../assets/images/profilebg.png"),
                      userName:"Jane Doe",
                      position:"Team Lead",
                      skills:"Leadership",
                      hobbies:"Skiing,Chess",
                      level:"........."},
                      { profileImage:require("../../assets/images/profilebg.png"),
                      userName:"Jane Doe",
                      position:"Team Lead",
                      skills:"Leadership",
                      hobbies:"Skiing,Chess",
                      level:"........."},
                      { profileImage:require("../../assets/images/profilebg.png"),
                      userName:"cm pandey",
                      position:"Team Lead",
                      skills:"Leadership",
                      hobbies:"Skiing,Chess",
                      level:"........."},
                      { profileImage:require("../../assets/images/profilebg.png"),
                      userName:"cm pandey",
                      position:"Team Lead",
                      skills:"Leadership",
                      hobbies:"Skiing,Chess",
                      level:"........."}],
                      type:'following'
                  }
                  setMappingData(value)


                } else if (exploreName == "About Me") {

                }
            } catch (err) {
                console.log("ERROR FETCHING BOOKS", err);
            }
        };
     

        getUserPreferencesData(exploreLinkActiveData?.length ? exploreLinkActiveData : "Slides");
        return () => {
            isMounted = false;
        }
    }, [exploreLinkActiveData])

    const activeData=(data)=>{
      
        setExploreLinkActiveData(data.linkName)
    }


    return (
        <div className="profilePage-wrapper">
            <Profile1/>
           {/* <div className="profilePage-wrapper-container">
           <div className="profilePage-wrapper-container-logo">
                    <img src={require("../../assets/images/logo.png").default} width={100} height={100} alt="logo"/>
            </div>
            <div className="profilePage-wrapper-container-top">
                    <div className="profilePage-wrapper-container-top-profileDetails">
                        <Images type="circle" Image={require("../../assets/images/members.jpg")} width={50} height={50}/>
                       <Headings type="heading3" content="Hi! I am cm pandey"/>
                       <div className="profilePage-wrapper-container-top-profileDetails-bottom" >
                            <Button type="primary" label="Follow"/>
                            <DropdownSingle datas={dropdownsingle}/>


                       </div>

                    </div>

                    <div className="profilePage-wrapper-container-top-profileImage">
                     <img src={require("../../images/client2.jpg").default} alt="client" />

                    </div>

                </div>


                <div className="profilePage-wrapper-container-bottom">
                <ExploreLinkTab links={exploreProfileTab} activeData={activeData}  />
                <div className="profilePage-wrapper-container-bottom-content">
                { mappingData.type==='slides' && mappingData.data.filter((data,index)=>index<6).map((slide, index) =>{
                    return  <Link
                                  key={index}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: '/slideDetails',
                                        state: {
                                            data: JSON.stringify(slide),
                                            wholeData: JSON.stringify(mappingData),
                                        }
                                    }}>
                                    <div className="item" >
                                            <SlideCard
                                                title={slide.slideCategory}
                                                description={slide.SlideName}
                                                images={slide.slideImages}
                                            />
                                     </div>
                              </Link>
                })}
                { mappingData.type==='book' && mappingData.data.map((book, index) => {
                            return <Link
                                key={book.image + index}
                                style={{ textDecoration: 'none' }}
                                to={{
                                    pathname: '/bookDetails',
                                    state: {
                                        data: JSON.stringify(book),
                                        wholeData: JSON.stringify(mappingData),
                                    }
                                }}>
                                <div className="item">
                                    <BookCard
                                        image={book.image}
                                        title={book.subject}
                                        author={book.writer}
                                        rating={book.rating}
                                    />
                                </div>
                            </Link>
                        })}
                        { mappingData.type==='following' && mappingData.data.map((following, index) => {
                            return <Link
                                key={index}
                                style={{ textDecoration: 'none' }}
                                to={{
                                    pathname: '/profiledetails',
                                    state: {
                                        data: JSON.stringify(following),
                                        wholeData: JSON.stringify(mappingData),
                                    }
                                }}>
                                <div className="item">
                                <ProfileCard
                                profileImage={following.profileImage}
                                userName={following.userName}
                                position={following.position}
                                skills={following.skills}
                                hobbies={following.hobbies}
                                level={following.level}
                                />
                                </div>
                            </Link>
                        })}


                </div>


                </div>
           </div> */}
        </div>
    )
}

export default ProfilePage