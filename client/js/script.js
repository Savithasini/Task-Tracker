/**
 * script.js
 * Description: exports the methods for register, login.
 */


/* sending HTTP request to server to store Registering User
details in Database
*/
function register() {
   let username = document.getElementById("username").value
   let password = document.getElementById("password").value
   let email = document.getElementById("email").value
   let role = "user";
   let newobj = {
      username: username,
      email: email,
      role: role,
      password: password
   }
   let req = new XMLHttpRequest();
   req.open("POST", "http://localhost:5000/register", true);
   req.setRequestHeader("Content-type", "application/json");
   req.send(JSON.stringify(newobj));
   req.onreadystatechange = function () {
      if (req.readyState == 4) {
         if (req.status == 201) {
            let regiterPrompt = `<div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                           <div class="modal-header">
                              <div class="icon-box">
                                 <span style="font-size:35px;color:white;color: transparent;
                                 text-shadow: 0 0 0 white;">✔</span>
                              </div>
                              <h4 class="modal-title w-100">Awesome!</h4>
                           </div>
                           <div class="modal-body">
                              <password class="text-center" style="font-size:18px;">Registration Successful</password>
                           </div>
                           <div class="modal-footer">
                              <button class="btn btn-block" onclick="clo()"  >OK</button>
                           </div>
                        </div>
                     </div>`
            document.getElementById("myModal3").innerHTML = regiterPrompt;
            $("#myModal3").modal('show');
            document.getElementById("regis").reset();
         }
         else{
            let errorPrompt = `<div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                           <div class="modal-header" style="color:#800000">
                              <div class="icon-box" style="background-color:#800000">
                                 <span style="font-size:35px;color:white;color: transparent;
                                 text-shadow: 0 0 0 white;">❌</span>
                              </div>
                              <h4 class="modal-title1 w-100">Oops!</h4>
                           </div>
                           <div class="modal-body">
                              <password class="text-center" style="font-size:18px;color:#800000">Sorry,Please Retry </password>
                           </div>
                           <div class="modal-footer">
                              <button style="background-color:#800000" class="btn btn-block" onclick="clo()"  >OK</button>
                           </div>
                        </div>
                     </div>`
            document.getElementById("myModal3").innerHTML = errorPrompt;
            $("#myModal3").modal('show');
            document.getElementById("regis").reset();
         }
      }
   }
}
function clo() {
   $("#myModal3").modal('hide');
}
/**Sending the Username and Password via HTTP request and Check with database, If username and Password Matches
 * It will lead to JWT authentication
 */
function login() {
   let username = document.getElementById("username1").value;
   let password = document.getElementById("password1").value;
   let req = new XMLHttpRequest();
   let newobj = {
      username: username,
      password: password,
   }
   let adminCheck = document.getElementById("vehicle1");
   if (adminCheck.checked == false) {
      req.open("POST", "http://localhost:5000/login", true);
      req.setRequestHeader("Content-type", "application/json");
      req.send(JSON.stringify(newobj));
      req.onreadystatechange = function () {
         if (req.readyState == 4) {
            if (req.status == 200) {
               let userFound = JSON.parse(req.responseText);
               localStorage.setItem("Token", userFound.token);
               localStorage.setItem("Username", userFound.user.username);
               loadUser();
            }
            else {
               alert("Please, Enter Valid Credential of User")
            }
         }
      }
   }
   if (adminCheck.checked == true) {
      req.open("POST", "http://localhost:5000/login1", true);
      req.setRequestHeader("Content-type", "application/json");
      req.send(JSON.stringify(newobj));
      req.onreadystatechange = function () {
         if (req.readyState == 4) {
            if (req.status == 200) {
               let userFound = JSON.parse(req.responseText);
               localStorage.setItem("Token", userFound.token);
               localStorage.setItem("Username", userFound.admin.username);
               loadAdmin();
            }
            else {
               alert("Please, Enter Valid Credential of Admin")
            }
         }
      }
   }
}
// To authenticate a User using JWT Token
function loadUser() {
   let req = new XMLHttpRequest();
   req.open("GET", "http://localhost:5000/auth-user", true);
   req.setRequestHeader("Content-type", "application/json");
   req.setRequestHeader("x-user-auth-token", localStorage.getItem("Token"));
   req.send();
   req.onreadystatechange = function () {
      if (req.readyState == 4) {
         if (req.status == 200) {
            window.location.href = "task.html";
         }
      }
   }
}
function loadAdmin() {
   let req = new XMLHttpRequest();
   req.open("GET", "http://localhost:5000/auth-admin", true);
   req.setRequestHeader("Content-type", "application/json");
   req.setRequestHeader("x-admin-auth-token", localStorage.getItem("Token"));
   req.send();
   req.onreadystatechange = function () {
      if (req.readyState == 4) {
         if (req.status == 200) {
            window.location.href = "admin.html";
         }
      }
   }
}
