import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import CustomLoader from "../pages/Shared/CustomLoader/CustomLoader";


const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    if(loading){
        return <CustomLoader></CustomLoader>
    }

    if(!user){
        <Navigate to='/signIn'></Navigate>
    }
    return children;
};

export default PrivateRoute;