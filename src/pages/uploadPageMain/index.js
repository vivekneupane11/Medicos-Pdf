import axios from 'axios';
import { Dropzone, FileItem } from "dropzone-ui";
import "firebase/auth";
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { HiLightBulb } from 'react-icons/hi';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//LOCAL IMPORTS
import * as Yup from 'yup';
import fileUpload from '../../assets/lottie-animation/file-upload.json';
import LottieAnimation from '../../components/global/lottie';
import SEO from '../../components/global/SEO';
import Tags from '../../components/global/tags';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { slideCategories } from '../../constants/Book/BookCategories';
import ShareModelAfterUpload from './components/shareModelAfterUploading';
import './_uploadPageMain.scss';




let fd = new FormData();

const UploadPageMain = () => {
    let history = useHistory();
    const [shareURL, setShareURL] = useState();
    const [shareTitle, setShareTitle] = useState()   
    const { user } = useContext(AuthContext);
    const [fileUploadErrorMsg, setFileUploadErrorMsg] = useState(null)
    const [tagErrorMsg, setTagErrorMsg] = useState(null)
    const [showShareModal, setShowShareModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [tags, setTags] = useState(["mbbs"]);
    const [files, setFiles] = useState([]);
    const [key, setKey] = useState(0);
    const [showCircularLoading, setShowCircularLoading] = useState(false)
    const [tagsData, setTagsData] = useState([])
    const [statusCode, setStatusCode] = useState(100);

    const updateFiles = (incomingFiles) => {
        console.log("Incoming file", incomingFiles[0]?.file?.size);
        if (incomingFiles[0]?.valid) {
            setFiles(incomingFiles);
            fd.append('slide', incomingFiles[0]?.file)
            setFileUploadErrorMsg(null);
        } else {
            setFileUploadErrorMsg("Please upload PDF or .docx or .pptx format *")
        }
    };
    const onDeleteFileItem = (id) => {
        setFiles([])
        setKey((init) => init + 1)
        // setFiles(files.filter((x) => x.id !== id));
    }

    const renderError = (message) => <p className="error-msg">{message}</p>;

    const selectedTags = tag => {
        if (tags.length < 49) {
            setTags(tag)
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


    const getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }

    // const handleChangeStatus = ({ meta, remove, file }, status) => {
    //     console.log("File change stgatus", status);
    //     if (status === 'headers_received') {
    //         // remove()
    //     } else if (status === 'rejected_file_type') {
    //         setFileUploadErrorMsg("Please upload PDF or .docx or .pptx format *")
    //     } else if (status === 'uploading') {
    //         setFileUploadErrorMsg(null)
    //         console.log(file);
    //     }
    //     else if (status === 'removed') {
    //         fd.delete('slide', file)           // .push(meta)
    //     }
    //     else if (status === 'done') {
    //         fd.append('slide', file)           // .push(meta)
    //         console.log("completed")
    //         setFileUploadComplete(true)
    //         setFileUploadErrorMsg(null)
    //     }
    // }





    const slideUploadRequesttoBackend = ({ fd, resetForm }) => {
        console.log("BACkend")

        axios.post('https://medicospdf.com/api/uploadslide', fd, {
            header: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status == 200) {
                setFiles([]);
                setSubmitLoading(false)
                setStatusCode(200)
                setShowCircularLoading(false)
                toast.success("Your slide successfully added");
                setShareTitle(response?.data?.data[0]?.slideTitle);
                setShareURL(encodeURI(`https://medicospdf.com/slideDetails/${response?.data?.data[0]?.slideTitle}/${response?.data?.data[0]?.slideCategory}/${response?.data?.data[0]?.slidesubCategory.replace(/\s|\//g, "")}`))
                setShowShareModal(true);
                deleteformData();
                // history.push("/uploadSlidePageMain")
                resetForm()
            }
            console.log("This is response", response);

        }).catch(err => {
            setFiles([]);
            setSubmitLoading(false)
            toast.error("Something went wrong")
            // for (var key of fd.keys()) {
            //     // here you can add filtering conditions
            //     fd.delete(key)
            // }

            deleteformData();
            resetForm()
            history.push("/uploadSlidePageMain")
        })


    }
    const deleteformData = () => {
        fd.delete('slidetitle')
        fd.delete('slideCategory')
        fd.delete('slideDescription')

        fd.delete('slidesubCategory')

        fd.delete('uid')
        fd.delete('userAvatar')

        fd.delete('email')
        fd.delete('tags')
        fd.delete('slide')


    }
    const uploadingSlide = (values, { setSubmitting, resetForm }) => {
        if (fd.get('slide')) {
            fd.append('slidetitle', values.title)
            fd.append('slideCategory', values.category)

            fd.append('slideDescription', values.description)

            fd.append('slidesubCategory', values.subCategory)

            fd.append('uid', user.uid)
            fd.append('userAvatar', user?.photoURL)

            fd.append('email', user.email)
            fd.append('tags', tags)

            setTagsData([...values.title, ...values.category, ...values.subCategory]);

            setSubmitLoading(true);
            slideUploadRequesttoBackend({ fd, resetForm })
            setSubmitting(false)
        } else {
            setFileUploadErrorMsg("Please upload PDF or .docx or .pptx format *")
        }
    }

    const circularLoading = useCallback(
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
        setStatusCode(200)
        return () => {

        }
    }, [statusCode])
    useEffect(() => {
        setTagsData([])

        return () => {

        }
    }, [])

    console.log('files data:', files)

    return (
        <div>
            <SEO title='MedicosPDF slide upload page' description='upload slides for yourself and help medicos community to grow more..' />
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    category: '',
                    subCategory: '',

                }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Required'),
                    description: Yup.string().required('Required'),
                    category: Yup.string().required('Required'),
                    subCategory: Yup.string().required('Required'),
                })}

                onSubmit={uploadingSlide}


            >
                {(props) => (
                    <form className='uploadPageMain-Wrapper-Container' onKeyDown={onKeyDown} onSubmit={props.handleSubmit}>
                        <div className='uploadPageMain-Wrapper-Container-top'>
                            <h3>Upload Slides</h3>
                        </div>
                        <p className="slide-upload-error-message">{fileUploadErrorMsg}</p>

                        <div className='uploadPageMain-Wrapper-Container-bottom'>
                            <div className='uploadPageMain-Wrapper-Container-bottom-col1'>
                                <Dropzone
                                    key={key}
                                    maxFiles={1}
                                    footer={false}
                                    behaviour={'replace'}
                                    maxSizeBytes={2e+7}
                                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                            application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                            application/msword,
                                            application/pdf"
                                    onDrop={updateFiles}
                                    onReset={onreset}
                                    value={files}>
                                    {files.map((file, index) => (
                                        <FileItem key={index} onDelete={onDeleteFileItem} {...file} preview />
                                    ))}
                                </Dropzone>


                                {/* PREVIOUS DROPZONE */}
                                {/* <Dropzone
                                    getUploadParams={getUploadParams}
                                    onChangeStatus={handleChangeStatus}
                                    multiple={false}
                                    maxFiles={1}
                                    // onSubmit={uploadingSlide}
                                    maxSizeBytes={2e+7}
                                    canCancel={false}
                                    inputContent={(files, extra) => (extra.reject ? 'Image, docx and pptx files only' : 'Drag and drop slides')}
                                    accept=" application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                application/msword,
                                application/pdf"
                                    styles={{
                                        dropzone: { minHeight: 250, maxHeight: 300, border: '2px dashed #12D288', },
                                        preview: { minHeight: 80 },
                                        previewImage: { maxHeight: 80 },
                                        // inputLabelWithFiles:{display:'none'}

                                    }}

                                /> */}
                                <ul className='uploadPageMain-Wrapper-Container-bottom-col1-tips'>
                                    <li className='uploadPageMain-Wrapper-Container-bottom-col1-tips-top'>
                                      <HiLightBulb style={{marginRight:'5px'}} color='yellow'/> Pro Tips:
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

                                            // onBlur={props.handleBlur}
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
                                            placeholder=""
                                            onChange={props.handleChange}
                                            value={props.values.subCategory}


                                        >
                                            <option value="subcategory">-- Sub-category</option>
                                            {
                                                slideCategories?.map((categories) => {
                                                    if (categories?.category == props.values.category) {
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
                                        <Tags selectedTags={selectedTags} fileName={files[0]?.file?.name.split('.').slice(0, -1).join('.')} category={props.values.category} subCategory={props.values.subCategory} />
                                    </div>
                                    <p className="error-msg">{tagErrorMsg}</p>
                                </div>

                                <div className='uploadPageMain-Wrapper-Container-bottom-col2-btn' >
                                    <button type="submit" onClick={() => setShowCircularLoading(true)} >Submit</button>
                                </div>

                            </div>


                        </div>




                    </form>
                )}

            </Formik>
            {
                showShareModal && <ShareModelAfterUpload shareTitle={shareTitle} shareUrl={shareURL}/>
            }
            {/* SUBMIT LOADING WRAPPER */}
            {
                // submitLoading &&
                showCircularLoading &&
                <div className={
                    // submitLoading &&
                    showCircularLoading &&
                    "submit-loading-container"}>
                    <LottieAnimation
                        lotti={fileUpload}
                        height={300}
                        width={300}
                    />
                    {/* <CircularProgressBar squareSize={120} strokeWidth={10} animationTime={fileSizeAnimationTiming} circularLoading={circularLoading} start={showCircularLoading} statusCode={statusCode}/> */}
                    <p>Uploading your slide</p>
                    <p>Please wait, it may take some time .....</p>
                </div>
            }
        </div>
    )
}

export default UploadPageMain
