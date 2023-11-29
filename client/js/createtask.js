/**
 * createtask.js
 * Description: exports the methods for create the task by Admin.
 */

function view() {
	let username = localStorage.getItem("Username");
	document.getElementById("lab").innerHTML = username;
}
window.onload = view;
// HTTP request to Create the task and send back the response
function createtask() {
	let Taskname = document.getElementById("taskname").value;
	let Description = document.getElementById("description").value;
	let Status = document.getElementById("status").value;
	let Priority = document.querySelector('input[name="priority"]:checked').value;
	let Duration = document.getElementById("duration").value;
	if (Taskname == '') {
		alert("Please, Provide Task Name");
		event.preventDefault();
	}
	else if (Duration == '') {
		alert("Please, Provide Duration");
		event.preventDefault();
	}
	else {
		let taski = Math.floor(Math.random() * 90000) + 10000;
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:5000/tasks", true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
		xhr.send(JSON.stringify({ taskname: Taskname, description: Description, priority: Priority, status: Status, duration: Duration, notification: 0, taskid: taski }));
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 201) {
					JSON.parse(xhr.responseText);
					let successPrompt = `<div class="modal-dialog modal-confirm">
            					<div class="modal-content">
                			 		<div class="modal-header">
                        				<div class="icon-box">
                        					<span style="font-size:35px;color:white;color: transparent;
                        					text-shadow: 0 0 0 white;">✔</span>
                                		</div>
                        				<h4 class="modal-title w-100">Awesome!</h4>
									</div>
									<div class="modal-body">
										<p class="text-center" style="font-size:18px;">Task Successfully Created</p>
									</div>
									<div class="modal-footer">
										<button class="btn btn-block" onclick="clo()"  >OK</button>
									</div>
								</div>
							</div>`
					document.getElementById("myModal4").innerHTML = successPrompt;
					$("#myModal4").modal('show');
				}
				else {
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
										<p class="text-center" style="font-size:18px;color:#800000">Sorry,Please Retry </p>
									</div>
									<div class="modal-footer">
										<button style="background-color:#800000" class="btn btn-block" onclick="closePrompt()"  >OK</button>
									</div>
								</div>
							</div>`
					document.getElementById("myModal4").innerHTML = errorPrompt;
					$("#myModal4").modal('show');
				}
			}
		}
	}
}
//Hide the Popup
function closePrompt() {
	$("#myModal4").modal('hide');
	window.location.href = "admin.html";
}
