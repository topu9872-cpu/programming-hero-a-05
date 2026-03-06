document.getElementById('login-btn')
.addEventListener('click', function(){
  
    const getUserName = document.getElementById('get-input');
const getUserNameValue = getUserName.value;

    const getPassword = document.getElementById('get-password');
const getPasswordValue = getPassword.value;

if(getUserNameValue==='admin' && getPasswordValue==='admin123'){
window.location.assign('./home.html');
}else{
    alert("Invalid");
    return;
};

});