function validateUser (message, status){
    if (localStorage.getItem("pinnacleUser") === null) {
        let currentPath = window.location.pathname.split("/").pop();
        if(currentPath == "login" || currentPath == "registration" || currentPath == "forgot-password" || currentPath == "update-password"){

        }else{
            console.log('here')
            window.location.href='/login';
        }
    }
}

module.exports.validateUser = validateUser;  
