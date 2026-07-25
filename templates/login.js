const loginPanel = document.getElementById("login-panel");
const signupPanel = document.getElementById("signup-panel");

const toSignup = document.getElementById("to-signup");
const toLogin = document.getElementById("to-login");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const BLOCKS = {
    boys: ["A", "B", "C", "D", "E", "F"],
    girls: ["A", "B", "C"]
};

function showSignup() {

    loginPanel.style.display = "none";
    signupPanel.style.display = "block";

    signupPanel.classList.add("fade");

}

function showLogin() {

    signupPanel.style.display = "none";
    loginPanel.style.display = "block";

    loginPanel.classList.add("fade");

}

if (toSignup) {

    toSignup.addEventListener("click", e => {

        e.preventDefault();

        showSignup();

    });

}

if (toLogin) {

    toLogin.addEventListener("click", e => {

        e.preventDefault();

        showLogin();

    });

}

function passwordToggle(buttonId,inputId){

    const button=document.getElementById(buttonId);

    if(!button) return;

    const input=document.getElementById(inputId);

    const eye=button.querySelector(".iconEye") || document.getElementById("iconEye");

    const eyeOff=button.querySelector(".iconEyeOff") || document.getElementById("iconEyeOff");

    button.addEventListener("click",()=>{

        if(input.type==="password"){

            input.type="text";

            if(eye) eye.style.display="none";

            if(eyeOff) eyeOff.style.display="block";

        }

        else{

            input.type="password";

            if(eye) eye.style.display="block";

            if(eyeOff) eyeOff.style.display="none";

        }

    });

}

passwordToggle("pwToggle","password");

passwordToggle("signupPwToggle","signup-password");

const hostel=document.getElementById("signup-hostel");

const block=document.getElementById("signup-block");

if(hostel){

    hostel.addEventListener("change",()=>{

        block.innerHTML="";

        const first=document.createElement("option");

        first.value="";

        first.textContent="Select Block";

        block.appendChild(first);

        if(!BLOCKS[hostel.value]) return;

        BLOCKS[hostel.value].forEach(item=>{

            const option=document.createElement("option");

            option.value=item;

            option.textContent="Block "+item;

            block.appendChild(option);

        });

    });

}

function showError(message){

    const error=document.getElementById("signup-js-error");

    if(!error) return;

    error.innerHTML="⚠ "+message;

    error.style.display="flex";

}

function hideError(){

    const error=document.getElementById("signup-js-error");

    if(error){

        error.style.display="none";

    }

}

function shake(form){

    form.classList.add("shake");

    form.addEventListener("animationend",()=>{

        form.classList.remove("shake");

    },{once:true});

}

if(signupForm){

    signupForm.addEventListener("submit",e=>{

        hideError();

        const email=document.getElementById("signup-email").value.trim().toLowerCase();

        const phone=document.getElementById("signup-phone").value.trim();

        const password=document.getElementById("signup-password").value;

        if(!email.endsWith("@sece.ac.in")){

            e.preventDefault();

            showError("Use your official SECE email.");

            shake(signupForm);

            return;

        }

        if(phone.length!==10){

            e.preventDefault();

            showError("Phone number must contain 10 digits.");

            shake(signupForm);

            return;

        }

        if(password.length<8){

            e.preventDefault();

            showError("Password should contain at least 8 characters.");

            shake(signupForm);

            return;

        }

        const button=signupForm.querySelector(".btn-primary");

        button.disabled=true;

        button.innerHTML='<span class="loader"></span> Creating Account';

    });

}

if(loginForm){

    loginForm.addEventListener("submit",()=>{

        const button=loginForm.querySelector(".btn-primary");

        button.disabled=true;

        button.innerHTML='<span class="loader"></span> Signing In';

    });

}

document.querySelectorAll(".alert").forEach(alert=>{

    setTimeout(()=>{

        alert.style.opacity="0";

        alert.style.transform="translateY(10px)";

        setTimeout(()=>{

            alert.remove();

        },300);

    },5000);

});

window.addEventListener("DOMContentLoaded",()=>{

    if(typeof SHOW_SIGNUP!=="undefined" && SHOW_SIGNUP){

        showSignup();

    }

});