const userInput = document.getElementById(`name-input`);
const userPassword = document.getElementById(`password-input`);

const loginBtn = document.getElementById(`loginBtn`).addEventListener(`click`,function(){

    const userValue = userInput.value;
    const passwordValue = userPassword.value;

    if(userValue === "admin" && passwordValue === "admin123"){
        alert(`Login Successfully`)
    }else{
        alert(`Something is wrong !! Please try again.`)
        return;
    }
    userInput.value = "";
    userPassword.value = "";
    window.location.href = "home.html";
})
