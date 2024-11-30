var fname=undefined;
var dob=undefined; 
var male=undefined; 
var female=undefined; 
var email=undefined; 
var pass = undefined; 
var cpass=undefined; 
var mobile=undefined; 
var add=undefined; 
var des=undefined; 
var btn =undefined;

function formValidation(event) {
    if (event) event.preventDefault(); // Prevent form submission
    fname = document.getElementById('name').value;
    dob = document.getElementById('date').value;
    male = document.getElementById('male').checked;
    female = document.getElementById('female').checked;
    email = document.getElementById('email').value;
    pass = document.getElementById('pass').value;
    cpass = document.getElementById('cpass').value;
    mobile = document.getElementById('mobile').value;
    add = document.getElementById('add').value;
    des = document.getElementById('des').value;

    var e_name = document.getElementById('err1');
    var e_dob = document.getElementById('err2');
    var e_gender = document.getElementById('err3');
    var e_email = document.getElementById('err4');
    var e_pass = document.getElementById('err5');
    var e_cpass = document.getElementById('err6');
    var e_mobile = document.getElementById('err7');
    var e_add = document.getElementById('err8');
    var e_des = document.getElementById('err9');
    
     if (fname.length == 0) {
        e_name.innerHTML = "Please enter name";
        e_name.style.color = "red";
    } else {
        e_name.innerHTML = "";
    }
    if (dob.length == 0) {
        e_dob.innerHTML = "Please enter date of birth";
        e_dob.style.color = "red";
    } else {
        e_dob.innerHTML = "";
    }
    if (male == false && female == false) {
        e_gender.innerHTML = "Please select gender";
        e_gender.style.color = "red";
    } else {
        e_gender.innerHTML = "";
    }
    if (email.length == 0) {
        e_email.innerHTML = "Please enter email";
        e_email.style.color = "red";
    } else {
        e_email.innerHTML = "";
    }
    if (pass.length == 0) {
        e_pass.innerHTML = "Please enter password";
        e_pass.style.color = "red";
    } else {
        e_pass.innerHTML = "";
    }
    if (cpass.length == 0) {
        e_cpass.innerHTML = "Please enter password again";
        e_cpass.style.color = "red";
    } else {
        e_cpass.innerHTML = "";
    }
    if (mobile.length == 0) {
        e_mobile.innerHTML = "Please enter mobile";
        e_mobile.style.color = "red";
    } else {
        e_mobile.innerHTML = "";
    }
    if (add.length == 0) {
        e_add.innerHTML = "Please enter address";
        e_add.style.color = "red";
    } else {
        e_add.innerHTML = "";
    }
    if (des.length == 0) {
        e_des.innerHTML = "Please enter designation";
        e_des.style.color = "red";
    } else {
        e_des.innerHTML = "";
    }
    if(fname&& dob && (male||female) && email && pass && cpass && mobile && add && des){
        
    saveDataInLocalStorage()
}}

function checkPattern(){
    var email_patt = /^[a-zA-z]+[.+_+-]+[a-zA-z]+[@]+[a-zA-z]+[.]+[a-zA-z]+$/;
    var email_patt1 = /^[a-zA-z]+[@]+[a-zA-z]+[.]+[a-zA-z]+$/;
    var email_patt2 = /^[a-zA-z]+[0-9]+[@]+[a-zA-z]+[.]+[a-zA-z]+$/;
    var email_patt4 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    var name_patt2 = /^[a-zA-z]+[" "]+[a-zA-Z]+[" "]+[a-zA-Z]+$/
    var name_patt1 = /^[a-zA-Z]+[" "]+[a-zA-Z]+$/
    var name_patt = /^[a-zA-Z]+$/

    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;

    var e_email = document.getElementById('err4');
    var e_name = document.getElementById('err1');

    if(!(name_patt.test(name)||name_patt1.test(name)||name_patt2.test(name))){
        e_name.innerHTML="Enter Valid format"
        e_name.style.color="red"
    }
    else{
        e_name.innerHTML=""
    }

    if(!(email_patt.test(email)||email_patt1.test(email)||email_patt2.test(email)||email_patt4.test(email))){
        e_email.innerHTML="Please Enter valid Email format"
        e_email.style.color="red"
    }
    else{
        e_email.innerHTML=""
    }

   
}

function checkMobile(){
    var mobile = document.getElementById('mobile').value;
    var e_mobile = document.getElementById('err7');
    if (mobile.length !== 10 || isNaN(mobile)) {
        e_mobile.innerHTML = "Please enter a valid 10-digit mobile number";
        e_mobile.style.color = "red";
    } else {
        e_mobile.innerHTML = "";
    }
    
}

function checkPassword() {
    var pass = document.getElementById('pass').value;
    var cpass = document.getElementById('cpass').value;
    var e_pass = document.getElementById('err5');
    var e_cpass = document.getElementById('err6');

    var patt = /^[a-zA-Z0-9]+[@#$&+-]+[a-zA-Z0-9]+$/;
    
    if (pass !== cpass) {
        e_cpass.innerHTML = "Passwords do not match";
        e_cpass.style.color = "red";
    } else {
        e_cpass.innerHTML = "";
    }

    if (pass.length <= 5 || !patt.test(pass)) {
        e_pass.innerHTML = "Password must be more than 5 characters and include symbols like @, #, $, &, +, -";
        e_pass.style.color = "red";
    } else {
        e_pass.innerHTML = "";
    }
}
function checkDob(){
    
}

function saveDataInLocalStorage(){
    var fromdata={
        fname,dob,gender: male? "Male" : "female",email,pass,mobile,add,des
    }
    var data =JSON.stringify(fromdata)
    localStorage.setItem("formData",data)
    alert("DAta is save successful")
    clearfild()
}

function clearfild(){
    fname = document.getElementById('name').value=" ";
    dob = document.getElementById('date').value=" ";
    male = document.getElementById('male').checked;
    female = document.getElementById('female').checked;
    email = document.getElementById('email').value=" ";
    pass = document.getElementById('pass').value=" ";
    cpass = document.getElementById('cpass').value=" ";
    mobile = document.getElementById('mobile').value=" ";
    add = document.getElementById('add').value=" ";
    des = document.getElementById('des').value=" ";

}


