/**
 * userlist.js
 * Description: exports the methods to view all the registered user and Assign the task to User.
 */

//Display all the Rgistered User and Display it
function getUsers() {
    let username = localStorage.getItem("Username");
    document.getElementById("lab").innerHTML = username;
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/user", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let result = JSON.parse(req.response);
                let head = `<table class="table user-list">
                                <thead >
                                    <tr style="font-size:17px">
                                        <th style="padding-left:80px"><span><h5>User</h5></span></th>
                                        <th><span><h5>Created</h5></span></th>
                                        <th><span><h5>Email</h5></span></th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                let content = "";
                for (let i in result) {
                    let date = result[i].created_at;
                    let date1 = new Date(date);
                    let day = date1.getDate();
                    let month = date1.getMonth() + 1;
                    let year = date1.getFullYear();
                    let hour = date1.getHours();
                    let min = date1.getMinutes();
                    let d = day + "/" + month + "/" + year + "   " + hour + "." + min;
                    content += `<tr>
                                    <td>
                                        <a href="#" class="user-link" style="font-size:16px">${result[i].username}</a>
                                    </td>
                                    <td  style="font-size:16px">
                                        ${d}
                                    </td>
                                    <td>
                                        <a href="#"  style="font-size:16px">${result[i].email}</a>
                                    </td>
                                    <td style="width: 20%;">
                                        <input type="button" class="tas" onclick="viewTask('${result[i].username}')" value="View Task"/>
                                        <input type="button" class="tas" data-toggle="modal" data-target="#formModal" onclick="visibileUserForm1('${result[i].username}')"  Value="Assign Task"/>
                                    </td>
                                </tr>`
                }
                document.getElementById("main").innerHTML = head + content + "</tbody></table>"
            }
        }
    }
}
window.onload = getUsers;
//View the Task of Specific User
function viewTask(name) {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/tasks/" + name, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let contents = "";
                let result = JSON.parse(req.response);
                if (result.length == 0) {
                    alert("No Task is Available in this user");
                }
                else {
                    for (let i in result) {
                        contents += `<div style=" padding-left: 100px; width:500px;display: inline-block; margin-bottom:80px"><div class="d-flex flex-column justify-content-center align-items-center" id="order-heading">
                                    <div class="h4">Task Details</div>
                                        <div class="pt-1">
                                            <p>Task  is currently &nbsp&nbsp<span style="color:white">${result[i].status} </span></p>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-bottom" >
                                        <div class="text-muted"  style="margin-left:30px">
                                            Task Name
                                        </div>
                                        <div class=" h6" style="margin-left:110px">
                                            ${result[i].taskname}
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-bottom"  >
                                        <div class="text-muted" style="margin-left:30px">
                                            Task Id
                                        </div>
                                        <div  class="h6"  style="margin-left:140px">
                                            ${result[i].taskid}
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-bottom"  >
                                        <div class="text-muted" style="margin-left:30px">
                                            Description
                                        </div>
                                        <div class=" h6" style="margin-left:110px">
                                            ${result[i].description}
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-bottom"  >
                                        <div class="text-muted" style="margin-left:30px">
                                            Priority
                                        </div>
                                        <div class="h6" style="margin-left:140px;">
                                            ${result[i].priority}
                                        </div>
                                    </div>
                                    <div class=" d-flex justify-content-start align-items-center pl-3 py-3 mb-8 " id="des"  >
                                        <div class="text-muted" style="margin-left:30px; ">
                                            Duration
                                        </div>
                                        <div class=" h6" style="margin-left:130px">
                                            ${result[i].duration}&nbsp days
                                        </div>
                                    </div>
                                </div>`
                    }
                    window.location.href = "viewtask.html";
                }
                localStorage.setItem("viewtask", contents);
            }
        }
    }
}
function visibileUserForm1(name) {
    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://localhost:5000/tasksnew", true);
    xhr1.send();
    document.getElementById("bud").innerHTML = `<button class="btn" onclick="assign('${name}')" style="background-color: rgb(109, 80, 105); margin-left: 200px;color: white; margin-bottom: 50px; font-size: 16px; width: 100px; height: 40px;"> Assign</button>`;
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            if (xhr1.status === 200) {
                let tasking = JSON.parse(xhr1.response);
                dropdown(tasking);
            }
        }
    }
    document.getElementById("addForm").style.display = 'block';
}
function dropdown(tasking) {
    let select = document.getElementById('hall');
    for (let i = 1; i <= tasking.length; i++) {
        let option = "";
        option = '<option value="' + tasking[i - 1]._id + '" >' + "Task name: " + tasking[i - 1].taskname + "&nbsp&nbsp&nbsp&nbsp" +
            " Duration:" + tasking[i - 1].duration + '</option>';
        select.insertAdjacentHTML('beforeend', option);
    }
}


/**
 * Assign a Task to Specific User
 * @param {String} name Assign task to this name of the user
 */
function assign(name) {
    event.preventDefault();
    let id = document.getElementById("hall").value;
    let assigntime = new Date();
    let newobj = {
        assignto: name,
        notification: 1,
        assigntime: assigntime
    }
    let req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:5000/tasks/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(newobj));
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                assigned();
            }
        }
    }
}
function assigned() {
    let y = `<div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="icon-box">
                            <span style="font-size:35px;color:white;color: transparent;
                                text-shadow: 0 0 0 white;">✔</span>
                        </div>
                        <h4 class="modal-title w-100">Stunning!</h4>
                    </div>
                    <div class="modal-body">
                        <p class="text-center" style="font-size:18px;">Task Assigned Successfully </p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-block" onclick="clo()"  >OK</button>
                    </div>
                </div>
            </div>`
    document.getElementById("myModal6").innerHTML = y;
    $("#myModal6").modal('show');
}
function clo() {
    $("#myModal6").modal('hide');
    window.location.reload();
}
