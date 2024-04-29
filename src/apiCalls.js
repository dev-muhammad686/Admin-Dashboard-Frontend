import { toast } from "react-toastify";
import { signInFailure, signInStart, signInSuccess } from "./redux/signInRedux"
import {publicRequest} from "./requestMethods"


export const signIn = async (dispatch, user, navigate)=>{
    dispatch(signInStart());

    try{
        const res = await publicRequest.post("/v1/admin/auth/signin", user);
        
        dispatch(signInSuccess(res.data));
        localStorage.setItem("admin", JSON.stringify(res.data));

        toast.success("User LogedIn", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce
          });

          navigate('/')

    }catch{
        dispatch(signInFailure());

        toast.error("LogIn Failed", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce
          });
    }
}