var attempt=3;
function validate(){
var usuar=document.getElementById("usuar").value;
var password=document.getElementById("password").value;
if(usuar=="Admin" && password=="1234@"){
    alert("Ingreso Exitoso");
    window.location="/Home/index.html";
    return false;
} if(usuar=="Cliente" && password=="123acceso"){
    alert("Ingreso Exitoso");
    window.location="/Home/index.html";
    return false;


} 
else{
attempt--;
}
alert("Te queda " +attempt+ "intentos mas")
if(attempt==0){
    document.getElementById("usuar").disable=true;
    document.getElementById("password").disable=true;
    document.getElementById("submit").disable=true;
    
}
}