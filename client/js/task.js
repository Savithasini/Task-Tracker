/**
 * task.js
 * Description: exports the methods for User can view the Task Assigned and Update the status.
 */

var username = localStorage.getItem("Username");
var result;
function win() {
    document.getElementById("lab").innerHTML = username;
    let et = ""
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/tasks/" + username, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                result = JSON.parse(req.response);
                if (result.length == 0) {
                    et += `<div style="margin:40px; margin-left:200px;color:rgb(109, 80, 105);"> <h3>Still No Task is Assigned to ${username}by Admin</h3></div>`;
                    let z = `<img class="mySlides" style="width:50%;height:10%;margin-top: 0px;margin-left: 350px;clear: left;"
                                src="https://www.acbar.org/Website/Loader/loader3.gif" >
                            <svg viewBox="0 0 1320 300">
                                <text x="30%" y="10px" dy=".35em" text-anchor="middle"></text>
                            </svg>	`
                    document.body.style.overflow = 'hidden';
                    document.getElementById("few").innerHTML = z;
                    document.getElementById("box").innerHTML = et;
                }
                else {
                    et += `<div style="margin:40px; margin-left:200px;color:rgb(109, 80, 105);"> <h3>Below is the available Tasks Assigned to ${username}</h3></div>`
                    for (let i in result) {
                        et += `<div id="carding">
                                    <div style=" padding-left: 100px; width:500px;display: inline-block; margin-bottom:80px"><div class="d-flex flex-column justify-content-center align-items-center" id="order-heading">
                                        <div class="h4">Task Details</div>
                                            <div class="pt-1">
                                                <p>Task  is currently &nbsp<span  style="color:white;">${result[i].status} </span></p>
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
                                            <div class="h6" style="margin-left:140px">
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
                                        <div class="  justify-content-start align-items-center ">
                                            <input type="button" style="margin-top:20px;margin-left:150px;border:none;height:50px;color:white;background-color:rgb(109, 80, 105);border-radius:5px;" class="tas" data-toggle="modal" data-target="#formModal" onclick="status('${result[i]._id}')"  Value="Update Status"/>
                                        </div>
                                </div>`;
                    function alerting() {
                        if (result[i].notification == 1) {
                            let x = `<div class="modal-dialog modal-confirm">
                                        <div class="modal-content"  style="color: rgb(109, 80, 105)">
                                            <div class="modal-header" style="color: rgb(109, 80, 105)">
                                                <div class="icon-box" style="background-color: rgb(109, 80, 105)">
                                                    <span style="font-size:35px;color:white;color: transparent;
                                                    text-shadow: 0 0 0 white;">🔔</span>
                                                    <span class="icon-button__badge">1</span>
                                                </div>
                                                <h4 class="modal-title w-100">Awesome!</h4>
                                            </div>
                                            <div class="modal-body">
                                                <p class="text-center" style="font-size:18px;">${username} have New Task Assigned by Admin</p>
                                                <p class="text-center" style="font-size:20px;"><b> Task Name:&nbsp&nbsp${result[i].taskname}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button  style="background-color: rgb(109, 80, 105)" class="btn btn-block" onclick="clo()"  >OK</button>
                                            </div>
                                        </div>
                                    </div>`
                                document.getElementById("myModal").innerHTML = x;
                                $("#myModal").modal('show');
                                let xhr3 = new XMLHttpRequest();
                                xhr3.open("PUT", "http://localhost:5000/tasks/" + result[i]._id, true);
                                xhr3.setRequestHeader("content-type", "application/json");
                                xhr3.send(JSON.stringify({ notification: 0 }));
                                xhr3.onreadystatechange = function () {
                                    if (xhr3.readyState == 4) {
                                        if (xhr3.status == 200) {
                                        }
                                    }
                                }
                            }
                        }
                        setTimeout(alerting, 1000);
                    }
                }
                document.getElementById("box").innerHTML = et;
            }
        }
    }
}
window.onload = win;
function clo() {
    $("#myModal").modal('hide');
    $("#myModal7").modal('hide');
    window.location.reload();
}
function status(id) {
    document.getElementById("bud").innerHTML = `<button class="btn" onclick="assign('${id}')" style="background-color: rgb(109, 80, 105); margin-left: 200px;color: white; margin-bottom: 50px; font-size: 16px; width: 100px; height: 40px;"> Update</button>`;
}

//Assign the task to User
function assign(x) {
    event.preventDefault();
    let status = document.getElementById("hall").value;
    let comments = document.getElementById("comment").value;
    let newobj = {
        status: status,
        comment: comments
    }
    let req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:5000/tasks/" + x, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(newobj));
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                event.preventDefault();
                let b = `<div class="modal-dialog modal-confirm">
                            <div class="modal-content"  style="color:green">
                                <div class="modal-header" style="color: green">
                                    <div class="icon-box" style="background-color: green">
                                        <span style="font-size:35px;color:white;color: transparent;
                                            text-shadow: 0 0 0 white;">✔
                                        </span>
                                    </div>
                                    <h4 class="modal-title w-100">Stunning!</h4>
                                </div>
                                <div class="modal-body">
                                    <p class="text-center" style="font-size:18px;">Status Updated Sucessfully</p>
                                </div>
                                <div class="modal-footer">
                                    <button  style="background-color: green" class="btn btn-block" onclick="clo()"  >OK</button>
                                </div>
                            </div>
                        </div>`
                document.getElementById("myModal").innerHTML = b;
                $("#myModal").modal('show');
            }
        }
    }
}

//Function to display all the object related to search
function searching() {
    let task = "";
    let search = document.getElementById("searching").value;
    if (!search) {
        win();
    } else {
        let req = new XMLHttpRequest();
        req.open("GET", "http://localhost:5000/tasksearch/" + search, true);
        req.setRequestHeader("Content-type", "application/json");
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    let result = JSON.parse(req.response);
                    if (result.length > 0) {
                        task += `<div style="margin:40px; margin-left:200px;color:rgb(109, 80, 105); "> <h3>Below is the available Tasks Assigned to ${username}</h3></div>`
                        for (let i in result) {
                            if (result[i].assignto == username) {
                                task += `<div id="carding">
                                            <div style=" padding-left: 100px; width:500px;display: inline-block; margin-bottom:80px"><div class="d-flex flex-column justify-content-center align-items-center" id="order-heading">
                                                <div class="h4">Task Details</div>
                                                    <div class="pt-1">
                                                        <p>Task  is currently &nbsp<span  style="color:white;">${result[i].status} </span></p>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-top" >
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
                                                    <div  style="margin-left:140px">
                                                        ${result[i].taskid}
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-top"  >
                                                    <div class="text-muted" style="margin-left:30px">
                                                        Description
                                                    </div>
                                                    <div class=" h6" style="margin-left:110px">
                                                        ${result[i].description}
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-top"  >
                                                <div class="text-muted" style="margin-left:30px">
                                                    Priority
                                                </div>
                                                <div class="h6" style="margin-left:140px;">
                                                    ${result[i].priority}
                                                </div>
                                            </div>
                                        <div class=" d-flex justify-content-start align-items-center pl-3 py-3 mb-8 border-top " id="des"  >
                                            <div class="text-muted" style="margin-left:30px; ">
                                                Duration
                                            </div>
                                            <div class=" h6" style="margin-left:130px">
                                                ${result[i].duration}&nbsp days
                                            </div>
                                        </div>
                                        <div class="  justify-content-start align-items-center " >
                                            <input type="button" style="margin-top:20px;margin-left:150px;border:none;height:50px;color:white;background-color:rgb(109, 80, 105);border-radius:5px;" class="tas" data-toggle="modal" data-target="#formModal" onclick="status('${result[i]._id}')"  Value="Update Status"/>
                                        </div >
                                    </div> `
                            }
                        }
                    }
                    else {
                        task += `<div style="margin:40px; margin-left:200px;color:rgb(109, 80, 105);"> <h3>No ${search} Task is the available</h3></div>`
                    }
                    document.getElementById("box").innerHTML = task;
                }
            }
        }
    }
}
function clickPress() {
    searching();
}