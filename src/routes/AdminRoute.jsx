import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import CustomLoader from "../pages/Shared/CustomLoader/CustomLoader";
import ForbiddenPage from "../pages/Shared/ForbiddenPage/ForbiddenPage";

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth()
    const {role, roleLoading} = useRole()
    console.log(role)

    if(loading || roleLoading){
        return <CustomLoader></CustomLoader>
    }

    if(role.role !== 'admin'){
        return <ForbiddenPage></ForbiddenPage>
    }
    return children;
};

export default AdminRoute; 