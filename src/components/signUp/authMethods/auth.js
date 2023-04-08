import firebase from "firebase";

const SocialMediaAuth=async (provider)=>{
    try {
        const res = await firebase
            .auth()
            .signInWithPopup(provider);
        return res.user;
    } catch (err) {
        return err;
    }
}

export default SocialMediaAuth