import axios from 'axios';
import { Dropzone, FileItem } from "dropzone-ui";
// import firebase from 'firebase/compat';
// import "firebase/auth";
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { HiLightBulb } from 'react-icons/hi';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//LOCAL IMPORTS
import * as Yup from 'yup';
import img from '../../assets/images/bookbackg.webp';

import SEO from '../../components/global/SEO';
import Tags from '../../components/global/tags';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { slideCategories } from '../../constants/Book/BookCategories';
import filterSlideSubCategory from '../../functions/filterSlideSubCategory';

import './_uploadPageMain.scss';

import Loadable from 'react-loadable';
import { logEventWithoutParams, logEventWithParams } from '../../functions/commonMethod';
// import { deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import LightBulb from '../../components/global/icons/light_bulb';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import UploadedSlide from '../UploadedSlide';


const LoadableLoginModal = Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
        return <div className='loading'>Loading...</div>
    }
});

const LoadableShareModalAfterUpload = Loadable({
    loader: () => import('./components/shareModelAfterUploading'),
    loading() {
        return <div className='loading'>Loading...</div>
    }
});



let fd = new FormData();

const UploadPageMain = () => {
    let history = useHistory();
    const [shareURL, setShareURL] = useState();
    const [shareTitle, setShareTitle] = useState()
    const { user , username:usernameauthprovider } = useContext(AuthContext);
    const [fileUploadErrorMsg, setFileUploadErrorMsg] = useState(null)
    const [tagErrorMsg, setTagErrorMsg] = useState(null)
    const [showShareModal, setShowShareModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [tags, setTags] = useState(["mbbs"]);
    const [files, setFiles] = useState([]);
    const [fileUploadTime, setFileUploadTime] = useState();
    const [key, setKey] = useState(0);
    const [showCircularLoading, setShowCircularLoading] = useState(false)
    const [tagsData, setTagsData] = useState([])
    const [statusCode, setStatusCode] = useState(100);
    // const [loggedInState, setLoggedInState] = useState(null)
    const [showFormModel, setShowFormModel] = useState(false)

    //fetched slides detail storage for edit
    const {  slideDocId } = useParams();

    const [slideName, setSlideName] = useState(null)
    const [slideCategory, setSlideCategory] = useState(null)
    const [slideDescription, setSlideDescription] = useState(null)
    const [slideSubCategory, setSlideSubCategory] = useState(null)
    const [slideTags, setSlideTags] = useState(null)
    const [slideImages, setSlideImages] = useState(null)
    const [slideTextExtract, setSlideTextExtract] = useState(null)
    const [userAvatar, setUserAvatar] = useState(null)
    const [username, setUsername] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const [editState, setEditState] = useState(false)

    let randomNumber = Math.floor(Math.random() * 100000);
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    }

    useEffect(async() => {
        let isMounted = true;
        if (isMounted && usernameauthprovider && slideDocId) {

            try {
                const {firestore:{db,doc,getDoc}}=await getFirebaseAll()
                const docRef=doc(db,'UserUploadedSlides',usernameauthprovider,'slides',slideDocId)
                getDoc(docRef)
                // firebase.firestore().collection('UserUploadedSlides')
                //     .doc(usernameauthprovider)
                //     .collection('slides')
                //     .doc(slideDocId)
                //     .get()
                    .then((res) => {
                        if (res.data()) {
                            console.log(res.data())
                            let data = res.data();
                            let extractedSlideName = data?.SlideName?.split("-", 1)[0];
                            setSlideName(init => extractedSlideName);
                            setSlideCategory(data?.slideCategory);
                            setSlideDescription(data?.slideDescription);
                            setSlideImages(data?.slideImages);
                            setSlideSubCategory(data.slideSubCategory);
                            setSlideTags(data?.slideTags);
                            setSlideTextExtract(data?.slideTextExtract);
                            setUserAvatar(data?.userAvatar);
                            setUsername(data?.username);
                            setEditState(true)
                        }
                    })
            } catch (error) {
                console.log("Error while fetching user's selected slides")
            }
        }
        return () => {
            isMounted = false;
        }
    }, [usernameauthprovider, slideDocId])


    const updateSlide = async(values) => {
        setUpdateLoading(true)
        if (usernameauthprovider && slideDocId) {
            try {
                const{firestore:{db,doc,deleteDoc,setDoc}}=await getFirebaseAll();
                deleteDoc(doc(db,'UserUploadedSlides',usernameauthprovider,'slides',slideDocId))
                deleteDoc(doc(db,`K-Slides-${slideCategory.replace(/\s|\//g, "")}-${slideSubCategory.replace(/\s|\//g, "")}`,slideDocId))
                deleteDoc(doc(db,"AllSlidesDataLockDownVersions",slideDocId))
                //first delete slide 
                // firebase.firestore().collection('UserUploadedSlides')
                //     .doc(usernameauthprovider)
                //     .collection('slides')
                //     .doc(slideDocId)
                //     .delete()
                // firebase.firestore().collection(`K-Slides-${slideCategory.replace(/\s|\//g, "")}-${slideSubCategory.replace(/\s|\//g, "")}`)
                //     .doc(slideDocId)
                //     .delete()
                // firebase.firestore().collection("AllSlidesDataLockDownVersions")
                //     .doc(slideDocId)
                //     .delete()

                //add edited slides  ...here update is not used because doc id cannot be edited




                // firebase.firestore().collection(`K-Slides-${values?.category.replace(/\s|\//g, "")}-${values.subCategory.replace(/\s|\//g, "")}`)
                //     .doc(values.title.replace(/-/g, ' ') + '-' + randomNumber)
                //     .set({
                //         SlideName: values.title.replace(/-/g, ' ') + '-' + randomNumber,
                //         slideCategory: values.category,
                //         slideSubCategory: values.subCategory,
                //         slideDescription: values.description,
                //         slideTags: slideTags.toString(),
                //         slideTextExtract: slideTextExtract,
                //         userAvatar: userAvatar,
                //         username: username,
                //         slideImages: slideImages,
                //     })
                    setDoc(doc(db,`K-Slides-${values?.category.replace(/\s|\//g, "")}-${values.subCategory.replace(/\s|\//g, "")}`,values.title.replace(/-/g, ' ') + '-' + randomNumber),
                    {
                        SlideName: values?.title.replace(/-/g, ' ') + '-' + randomNumber,
                        slideCategory: values?.category,
                        slideSubCategory: values?.subCategory,
                        slideDescription: values?.description,
                        slideTags: slideTags.toString(),
                        slideTextExtract: slideTextExtract,
                        userAvatar: userAvatar,
                        username: username,
                        slideImages: slideImages,
                    })
                    .then(() => {
                        // firebase.firestore().collection("UserUploadedSlides")
                        //     .doc(usernameauthprovider)
                        //     .collection('slides')
                        //     .doc(values.title.replace(/-/g, ' ') + '-' + randomNumber)
                        //     .set({
                        //         SlideName: values.title.replace(/-/g, ' ') + '-' + randomNumber,
                        //         slideCategory: values.category,
                        //         slideSubCategory: values.subCategory,
                        //         slideDescription: values.description,
                        //         slideTags: slideTags.toString(),
                        //         slideTextExtract: slideTextExtract,
                        //         userAvatar: userAvatar,
                        //         username: username,
                        //         slideImages: slideImages,
                        //     })
                            setDoc(doc(db,"UserUploadedSlides",usernameauthprovider,'slides',values.title.replace(/-/g, ' ') + '-' + randomNumber),
                            {
                                SlideName: values?.title.replace(/-/g, ' ') + '-' + randomNumber,
                                slideCategory: values.category,
                                slideSubCategory: values.subCategory,
                                slideDescription: values.description,
                                slideTags: slideTags.toString(),
                                slideTextExtract: slideTextExtract,
                                userAvatar: userAvatar,
                                username: username,
                                slideImages: slideImages,
                            })
                            .then((res) => {
                                setUpdateLoading(false)
                                history.push(`/slidedetails/${values.title.replace(/-/g, ' ') + '-' + randomNumber}/${values.category}/${filterSlideSubCategory(values.subCategory)}`)
                                // <Redirect to={}/>
                                toast.success("slide Updated Successfully", { theme: 'dark', hideProgressBar: true })


                            })
                    })
                // firebase.firestore().collection("AllSlidesDataLockDownVersions")
                // .doc(values.title.replace(/-/g, ' ') + '-' + randomNumber)
                // .set({
                //     SlideName: values.title.replace(/-/g, ' ') + '-' + randomNumber,
                //     slideCategory: values.category,
                //     slideSubCategory: values.subCategory,
                //     slideDescription: values.description,
                //     slideTags: slideTags,
                //     slideTextExtract: slideTextExtract,
                //     userAvatar: userAvatar,
                //     username: username,
                //     slideImages: slideImages,
                // })

                setDoc(doc(db,"AllSlidesDataLockDownVersions",values.title.replace(/-/g, ' ') + '-' + randomNumber),
                {
                    SlideName: values?.title.replace(/-/g, ' ') + '-' + randomNumber,
                    slideCategory: values.category,
                    slideSubCategory: values.subCategory,
                    slideDescription: values.description,
                    slideTags: slideTags,
                    slideTextExtract: slideTextExtract,
                    userAvatar: userAvatar,
                    username: username,
                    slideImages: slideImages,
                })
            } catch (error) {
                console.log("Error while updating slide data", error);
            }
        }
    }


    const updateFiles = (incomingFiles) => {
        console.log("Incoming file", incomingFiles[0]?.file);
        if (incomingFiles[0]?.valid) {
            setFiles(incomingFiles);
            fd.append('slide', incomingFiles[0]?.file);
            setFileUploadTime(Math.floor(incomingFiles[0]?.file?.size / 1000000));
            setFileUploadErrorMsg(null);
        } else {
            setFileUploadErrorMsg("Please upload PDF or .docx or .pptx format *")
        }
    };
    const onDeleteFileItem = (id) => {
        fd.delete('slide')
        setFiles([])
        setKey((init) => init + 1)
        // setFiles(files.filter((x) => x.id !== id));
    }

    const renderError = (message) => <p className="error-msg">{message}</p>;

    const selectedTags = tag => {
        if (tags.length < 49) {
            setTags(tag)
            setSlideTags(tag)
            setTagErrorMsg(null)
        } else {
            setTagErrorMsg("Tag limit is 50 *")
        }

    }

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }


  





    const slideUploadRequesttoBackend = ({ fd, resetForm }) => {
        console.log("BACkend", fd.get('slide'))

        axios.post('https://medicospdf.com/api/uploadslide', fd, {
            header: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200) {
                logEventWithParams('web_slide_uplaoded',{username:usernameauthprovider,slideName:response?.data?.data[0]?.slideTitle})
                setFiles([]);
                setSubmitLoading(false)
                setStatusCode(200)
                setShowCircularLoading(false)
                toast.success("Your slide successfully added", { theme: 'dark', hideProgressBar: true });
                setShareTitle(response?.data?.data[0]?.slideTitle);
                setShareURL(encodeURI(`https://medicospdf.com/slidedetails/${response?.data?.data[0]?.slideTitle}/${response?.data?.data[0]?.slideCategory}/${filterSlideSubCategory(response?.data?.data[0]?.slidesubCategory)}`))
                setShowShareModal(true);
                deleteformData();
                resetForm()
            }
            console.log("This is response", response);

        }).catch(err => {
            logEventWithoutParams('web_page_slide_upload_error')
            setFiles([]);
            setSubmitLoading(false)
            toast.error("Seems like there is a problem. Please reload the page and upload again.", { theme: 'dark', hideProgressBar: true })
            // for (var key of fd.keys()) {
            //     // here you can add filtering conditions
            //     fd.delete(key)
            // }

            deleteformData();
            resetForm()
            history.push("/uploadslide")
        })


    }
    const deleteformData = () => {
        fd.delete('slidetitle')
        fd.delete('slideCategory')
        fd.delete('slideDescription')

        fd.delete('slidesubCategory')

        fd.delete('uid')
        fd.delete('userAvatar')
        fd.delete('username')
        fd.delete('email')
        fd.delete('tags')
        fd.delete('slide')


    }
    const uploadingSlide = (values, { setSubmitting, resetForm }) => {
        // setTagsData([...values.title, ...values.category, ...values.subCategory,...tags]);
        if (fd.get('slide')) {
            fd.append('slidetitle', values.title.replace(/-/g, ' '))

            setShowCircularLoading(true)
            fd.append('slideCategory', values.category)

            fd.append('slideDescription', values.description)

            fd.append('slidesubCategory', values.subCategory)

            fd.append('uid', user.uid)
            fd.append('userAvatar', user?.photoURL)

            fd.append('username', usernameauthprovider ? usernameauthprovider : username ? username : usernameauthprovider )
            fd.append('tags', [values.title, values.category, values.subCategory, ...tags])

            // setTagsData([...values.title, ...values.category, ...values.subCategory,...tags]);
            console.log('FORM DATA', fd.get('slide'))
            setSubmitLoading(true);
            slideUploadRequesttoBackend({ fd, resetForm })
            setSubmitting(false)
        } else {
            setFileUploadErrorMsg("Please upload pdf or .docx or .pptx format *")
        }
    }

     useCallback(
        (dontShow) => {
            // console.log("loading", dontShow)
            if (dontShow === false) {
                setShowCircularLoading(false)
                // console.log("show", showFormModel)
            }
        },
        [showCircularLoading],
    )


    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (user) {
                setShowFormModel(false)
                // setLoggedInState(true)
            }
            else {
                // setLoggedInState(false)
                setShowFormModel(true)
            }

        }

        return () => {
            isMounted = false
        }
    }, [user])



    useEffect(() => {
        setStatusCode(200)
        return () => {

        }
    }, [statusCode])
    useEffect(() => {
        setTagsData([])

        return () => {

        }
    }, [])

    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)
                history.goBack()
            }
        },
        
    )

    function validateCategory(value) {
        // console.log('category value', value);
        let error;
        if (value.includes('category')) {
            error = 'Required'
        }
        return error;
    }

    function validateSubCategory(value) {
        // console.log('subcategory value', value);
        let error;
        if (value.includes('subcategory')) {
            error = 'Required'
        }
        return error;
    }

    return (
        <>
            <SEO image={img} title='MedicosPDF slide Upload Slide' description='Upload your Medical slides on MBBS , Nursing , Clinical Science , Basic Science , Dental and soon.' />
            {
                showFormModel &&
                <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            }
            <div>

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        title: slideName ? slideName : '',
                        description: slideDescription ? slideDescription : '',
                        category: slideCategory ? slideCategory : '',
                        subCategory: slideSubCategory ? slideSubCategory : '',
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        description: Yup.string().required('Required'),
                        category: Yup.string().required('Required'),
                        subCategory: Yup.string().required('Required'),
                    })}
                    onSubmit={
                        uploadingSlide
                        //    || updateSlide
                    }
                >
                    {(props) => (
                        <form className='uploadPageMain-Wrapper-Container' onKeyDown={onKeyDown} onSubmit={props.handleSubmit}>
                            <div className='uploadPageMain-Wrapper-Container-top'>
                                {
                                    editState ?
                                        <h3>Edit Your Slide</h3>
                                        :
                                        <h3>Upload Slides</h3>
                                }

                            </div>
                            {
                                !editState && !slideImages &&
                                <p className="slide-upload-error-message">{fileUploadErrorMsg}</p>
                            }


                            <div className='uploadPageMain-Wrapper-Container-bottom'>
                                <div className='uploadPageMain-Wrapper-Container-bottom-col1'>
                                    {
                                        editState && slideImages ?
                                        <LazyLoadImage src={slideImages[0]} alt={slideName} className='uploadPageMain-Wrapper-Container-bottom-col1-singleImage' effect='blur'/>
                                            // <img loading="lazy" src={slideImages[0]} alt={slideName} className='uploadPageMain-Wrapper-Container-bottom-col1-singleImage' />
                                            :
                                            <Dropzone
                                                key={key}
                                                maxFiles={1}
                                                footer={false}
                                                behaviour={'replace'}
                                                maxSizeBytes={2e+7}
                                                accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                        application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                        application/msword,
                                        application/pdf,
                                        application/vnd.ms-powerpoint"
                                                onDrop={updateFiles}
                                                onReset={onreset}
                                                value={files}>
                                                {files.map((file, index) => (
                                                    <FileItem key={index} onDelete={onDeleteFileItem} {...file} preview />
                                                ))}

                                            </Dropzone>
                                    }
                                    <ul className='uploadPageMain-Wrapper-Container-bottom-col1-tips'>
                                        <li className='uploadPageMain-Wrapper-Container-bottom-col1-tips-top'>
                                            <LightBulb className='lightBulb' /> Pro Tips:
                                        </li>
                                        <li className='uploadPageMain-Wrapper-Container-bottom-col1-tips-desc'><span>✓</span>Supported format: pptx (recommended) , pdf, docx.</li>
                                        <li className='uploadPageMain-Wrapper-Container-bottom-col1-tips-desc'><span>✓</span>{`max size <= 20MB`}</li>

                                    </ul>


                                </div>

                                <div className='uploadPageMain-Wrapper-Container-bottom-col2'>
                                    <div className='uploadPageMain-Wrapper-Container-bottom-col2-title'>
                                        <label>title</label>
                                        <Field
                                            type="text"
                                            name='title'
                                            placeholder="Enter title.."
                                            onChange={props.handleChange}
                                            value={props.values.title}
                                        />
                                        <ErrorMessage name="title" render={renderError} />
                                    </div>
                                    <div className='uploadPageMain-Wrapper-Container-bottom-col2-description'>
                                        <label>description</label>
                                        <Field
                                            as="textarea"
                                            name='description'
                                            placeholder=""
                                            onChange={props.handleChange}
                                            value={props.values.description}
                                        />
                                        <ErrorMessage name="description" render={renderError} />
                                    </div>
                                    <div className='uploadPageMain-Wrapper-Container-bottom-col2-row3'>
                                        <div className='uploadPageMain-Wrapper-Container-bottom-col2-row3-category'>
                                            <label>category</label>
                                            <Field
                                                as="select"
                                                name='category'
                                                validate={validateCategory}
                                                onChange={props.handleChange}
                                                value={props.values.category}

                                            >
                                                <option value="category">-- Category</option>
                                                {
                                                    slideCategories.map((data, index) => {
                                                        return <option key={index} value={data.category}>{data.category}</option>
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="category" render={renderError} />

                                        </div>
                                        <div className='uploadPageMain-Wrapper-Container-bottom-col2-row3-privacy'>
                                            <label>Sub-category</label>
                                            <Field
                                                as="select"
                                                name='subCategory'
                                                validate={validateSubCategory}
                                                placeholder=""
                                                onChange={props.handleChange}
                                                value={props.values.subCategory}


                                            >
                                                <option value="subcategory">-- Sub-category</option>
                                                {
                                                    slideCategories?.map((categories) => {
                                                        if (categories?.category === props.values.category) {
                                                            return categories?.subCategories?.map((subCategory, index) => {
                                                                return <option key={subCategory?.category + index} value={subCategory.category}>{subCategory.category}</option>
                                                            })
                                                        }
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="subCategory" render={renderError} />
                                        </div>
                                    </div>
                                    <div className='uploadPageMain-Wrapper-Container-bottom-col2-tags'>
                                        <label>tags</label>
                                        <div className='uploadPageMain-Wrapper-Container-bottom-col2-tags-tag'>
                                            <Tags
                                                selectedTags={selectedTags}
                                                loadedTagsFromEdit={slideTags}
                                                fileName={files[0]?.file?.name.split('.').slice(0, -1).join('.')}
                                                category={props.values.category}
                                                subCategory={props.values.subCategory}
                                            />
                                        </div>
                                        <p className="error-msg">{tagErrorMsg}</p>
                                    </div>

                                    {
                                        editState ?
                                            <div className='uploadPageMain-Wrapper-Container-bottom-col2-btn' >
                                                <button type="submit" onClick={() => updateSlide(props.values)} >{updateLoading &&
                                                    <div class="loader"></div>} Update your slide</button>
                                            </div>
                                            :
                                            <div className='uploadPageMain-Wrapper-Container-bottom-col2-btn' >
                                                <button type="submit">Submit</button>
                                            </div>
                                    }

                                </div>


                            </div>




                        </form>
                    )}

                </Formik>
                {
                    showShareModal && <LoadableShareModalAfterUpload shareTitle={shareTitle} shareUrl={shareURL} />
                }
                {/* SUBMIT LOADING WRAPPER */}
                {
                    // submitLoading &&
                    showCircularLoading &&
                    <div className={
                        // submitLoading &&
                        showCircularLoading &&
                        "submit-loading-container"}>
                        <div className='lottie-animation-container'>
                            <h3>We are uploading your slide.</h3>
                            <LazyLoadImage className="upload-loading" src={'https://firebasestorage.googleapis.com/v0/b/vast-fuze-89905.appspot.com/o/PDFasssets%2Floading.gif?alt=media&token=e8f1e1e8-9316-458f-a567-cf09bf9fa1ac'} alt="medicospdf-upload-loading"  effect='blur'/>
                        {/* <img className="upload-loading" src={'https://firebasestorage.googleapis.com/v0/b/vast-fuze-89905.appspot.com/o/PDFasssets%2Floading.gif?alt=media&token=e8f1e1e8-9316-458f-a567-cf09bf9fa1ac'} alt="medicospdf-upload-loading" /> */}
                            {/* <CircularProgressBar squareSize={120} strokeWidth={10} animationTime={fileSizeAnimationTiming} circularLoading={circularLoading} start={showCircularLoading} statusCode={statusCode}/> */}

                            <span>{`Please wait, it may take upto ${fileUploadTime > 0 ? fileUploadTime / 2 : 1} minutes.`}</span>
                        </div>


                    </div>
                }
            </div>



        </>

    )
}
export default UploadPageMain
