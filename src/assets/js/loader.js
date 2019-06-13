function showNotif (message, status){
    let bgColor = "";
    if(status == "success"){
        bgColor = "#00b09b, #96c93d";
    }else if(status == "danger"){
        bgColor = "#f10b0b, #d06c6c";
    }else if(status == "warning"){
        bgColor = "#efa41c, #eabf6e";
    }else if(status == "info"){
        bgColor = "#387cf9, #8daeec";
    }
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        positionLeft: false, // `true` or `false`
        backgroundColor: "linear-gradient(to right, "+ bgColor +")", //rgb(61, 185, 45), rgb(106, 177, 77), rgb(155, 230, 23));
    }).showToast();
}

module.exports.showNotif = showNotif;  