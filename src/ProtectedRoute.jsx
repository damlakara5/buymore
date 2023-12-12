
const ProtectedRoute = ({ children}) => {
  
    let token = localStorage.getItem("jwt");
   

    if(!token){
        window.location.href = '/login'  
    }else{
        return children
    }

};

export default ProtectedRoute;
