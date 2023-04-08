// import { getAuth, signInWithPopup } from "firebase/auth";


const SocialMediaAuth=async (provider)=>{
    // const auth = getAuth();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/auth')
        ])
        .then(([auth])=>{
            return{auth}
        })
    }
    try {
        const {auth:{auth,signInWithPopup}}=await getFirebaseAll()
        const res = await 
            signInWithPopup(auth,provider);
        return res.user;
    } catch (err) {
        return err;
    }
}

export default SocialMediaAuth