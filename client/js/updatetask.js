/**
 * updatetask.js
 * Description: exports the methods for Admin to Update the Task.
 */
var tasks;
var taskId = localStorage.getItem("Taskid");
//Function to Update the task, Autorefill of previous Details
function view() {
    let username = localStorage.getItem("Username");
    document.getElementById("lab").innerHTML = username;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/user", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let datas = JSON.parse(xhr.responseText);
                let select = document.getElementById('assignto');
                for (let i = 1; i <= datas.length; i++) {
                    let option = "";
                    option = '<option value="' + datas[i - 1].username + '" >' + datas[i - 1].username + '</option>';
                    select.insertAdjacentHTML('beforeend', option);
                }
            }
        }
    }
    let xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "http://localhost:5000/tasklist/" + taskId, true);
    xhr3.setRequestHeader("content-type", "application/json");
    xhr3.send();
    xhr3.onreadystatechange = function () {
        if (xhr3.readyState == 4) {
            if (xhr3.status == 200) {
                tasks = JSON.parse(xhr3.responseText);
                document.getElementById("duration").value = tasks.duration;
                document.getElementById("taskname").value = tasks.taskname;
                document.getElementById("description").value = tasks.description;
                let radioElements = document.getElementsByName("priority");
                for (let i = 0; i < radioElements.length; i++) {
                    if (radioElements[i].getAttribute('value') == tasks.priority) {
                        radioElements[i].checked = true;
                    }
                }
            }
        }
    }
}
window.onload = view;
//Update the tasks
function updateFn() {
    let Taskname = document.getElementById("taskname").value;
    let Description = document.getElementById("description").value;
    let Duration = document.getElementById("duration").value;
    let Priority = document.querySelector('input[name="priority"]:checked').value;
    let xhr3 = new XMLHttpRequest();
    xhr3.open("PUT", "http://localhost:5000/tasks/" + taskId, true);
    xhr3.setRequestHeader("content-type", "application/json");
    xhr3.send(JSON.stringify({ taskname: Taskname, description: Description, priority: Priority, duration: Duration }));
    xhr3.onreadystatechange = function () {
        if (xhr3.readyState == 4) {
            if (xhr3.status == 200) {
                JSON.parse(xhr3.responseText)
                let successPrompt = `<div class="modal-dialog modal-confirm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div class="icon-box">
                                        <span style="font-size:35px;color:white;color: transparent;
                                            text-shadow: 0 0 0 white;">✔</span>
                                    </div>
                                    <h4 class="modal-title w-100">Stunning!</h4>
                                </div>
                                <div class="modal-body">
                                    <p class="text-center" style="font-size:18px;">Task Updated Successfully </p>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-block" onclick="clo()"  >OK</button>
                                </div>
                            </div>
                        </div>`
                document.getElementById("myModal5").innerHTML = successPrompt;
                $("#myModal5").modal('show');
            }
        }
    }
}
function clo() {
    $("#myModal5").modal('hide');
    window.location.href = "admin.html";
}