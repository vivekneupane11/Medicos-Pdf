import React, { useContext,  useState } from 'react'
// import { getFirestore, setDoc,doc, collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import './_requestmodal.scss'
import CloseCircle from '../../../../components/global/icons/xMark_Circle';
import Close from '../../../../components/global/icons/xMark';

const RequestModal = ({exit}) => {
    // const db=getFirestore();
    const getFirebaseAll=()=>{
      return Promise.all([
        import('../../../../firebase/firestore')
      ])
      .then(([firestore])=>{
        return{firestore}
      })
    }
   
    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [username,setUsername]=useState('');
    const [remarks,setRemarks]=useState('');
    const [bookName,setBookName]=useState('');
    const [aurthorName,setAurthorName]=useState('');
    const [show,setShow]=useState(true)

   

async function addRequest() {
  if(user&& bookName!==''&&username!==''&&email!==''){
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailformat)){
        try {
          const {firestore:{db,addDoc,collection}}=await getFirebaseAll()
          addDoc(collection(db,'resource_requests'),
          {
            username: username,
                title: bookName,
                email: email,
                writer:aurthorName,
                remarks:remarks,
                submit_date:new Date(),
          }
          )
                  setRemarks("")
                  setBookName('')
                  setUsername('')
                  setEmail('')
                  toast.success("Request successfully submitted", { theme: 'dark', hideProgressBar: true })
                  setShow(exit)
              
      } catch (error) {
          toast.error("Error while requesting ", { theme: 'dark', hideProgressBar: true })

      }


    }
    else{
      toast.error("invalid email ", { theme: 'dark', hideProgressBar: true })
    }

    
    // console.log('request check',bookName,user)
    
      

  }
  else{
      toast.error("Please Enter some text", { theme: 'dark', hideProgressBar: true })
  }
 
}

  return (
    <>
    
    <div className='requestmodal-wrapper'>
        
        <div className='requestmodal-wrapper-container'>
          <div className='close' onClick={exit}>
            <CloseCircle className='close-icon'/>

          </div>
          <h5 className='heading'>Request for Book</h5>
          <div className='requestmodal-wrapper-container-username'>

          <label>Your Name</label>
          <input
                       
                        onChange={(e) => setUsername(e?.target?.value)}
                        value={username}
                        type="text"
                        placeholder="Write your name"
                        required='true'
                    />
          </div>
          <div className='requestmodal-wrapper-container-username'>

<label>Email</label>
<input
            
              onChange={(e) => setEmail(e?.target?.value)}
              value={email}
              type='email'
              placeholder="Write your email"
              required
              name='inputemail'
          />
</div>
<div className='requestmodal-wrapper-container-username'>

<label>Book Name</label>
<input
             
              onChange={(e) => setBookName(e?.target?.value)}
              value={bookName}
              type="text"
              placeholder=""
              required
          />
</div>
<div className='requestmodal-wrapper-container-username'>

<label>Aurthor Name</label>
<input
             
              onChange={(e) => setAurthorName(e?.target?.value)}
              value={aurthorName}
              type="text"
              placeholder=""
              required
          />
</div>
<div className='requestmodal-wrapper-container-remarks'>

<label>Remarks</label>
<textarea
              onChange={(e) => setRemarks(e?.target?.value)}
              value={remarks}
              type="text"
              placeholder="Write your remarks"
              required='true'
          />
</div>
    <div className='request'>

          <button className='requestButton' type='submit' onClick={addRequest }>Submit</button>
    </div>


   </div>

        

    </div>
    
    </>
  )
}

export default RequestModal