/**
 * viewalltask.js
 * Description: exports the methods to view all the Tasks.
 */

//Display all the tasks Available
function viewAllTask() {
	let username = localStorage.getItem("Username");
	document.getElementById("lab").innerHTML = username;
	let req = new XMLHttpRequest();
	req.open("GET", "http://localhost:5000/tasks", true);
	req.setRequestHeader("Content-type", "application/json");
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var result = JSON.parse(req.response);
				console.log(result)
				var head = `<table class="table user-list">
             					<thead >
                 					<tr style="font-size:18px; ">
				 						<th><span><h5>Task Id</h5></span></th>
                     					<th style="padding-left:80px"><span><h5>Taskname</h5></span></th>
                     					<th><span><h5>Priority</h5></span></th>
					 					<th><span><h5>Assigned To</h5></span></th>
					 					<th><span><h5>Assign Time</h5></span></th>
					 					<th class="text-center"><span><h5>Status</h5></span></th>
                     					<th><span><h5>Duration</h5></span></th>
                 					</tr>
             					</thead>
								<tbody>`;
				let content = "";
				for (let i in result) {
					if (result[i].assignto != undefined) {
						let date = result[i].assigntime;
						let date1 = new Date(date);
						let day = date1.getDate();
						let month = date1.getMonth() + 1;
						let year = date1.getFullYear();
						let hour = date1.getHours();
						let min = date1.getMinutes();
						let d = day + "/" + month + "/" + year + "   " + hour + "." + min;
						content += `<tr>
										<td class="text-center" style="width:10%">
											${result[i].taskid}
										</td>
										<td>
											<span class="user-link">${result[i].taskname}</span>
											<span class="user-subhead" style="margin-left:50px">${result[i].description}</span>
										</td>
										<td class="text-center">
											${result[i].priority}
										</td>
										<td class="text-center" style="width:150px">
											<span class="label label-success">${result[i].assignto}</span>
										</td>
										<td class="text-center">
											${d}
										</td>
										<td class="text-center" style="width: 120px;>
											<span class="label label-success"><label id="sts4${i}">${result[i].status}</label></span>
										</td>
										<td class="text-center">
											<span>${result[i].duration}</span>
										</td>
									</tr>
								`
					}
				}

				document.getElementById("main").innerHTML = head + content + "</tbody></table>"
			}
		}
	}
}
window.onload = viewAllTask;


/**
 * Search the Task in Task bar it will fetch the details from database
 * @return {Object} return all the Tasks related to Search
 */
function search() {
	let et = "";
	let search = document.getElementById("search1").value;
	console.log(search)
	if (!search) {
		viewAllTask();
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
						let head = `<table class="table user-list">
						<thead >
							<tr style="font-size:18px; ">
								<th><span><h5>Task Id</h5></span></th>
								<th style="padding-left:80px"><span><h5>Taskname</h5></span></th>
								<th><span><h5>Priority</h5></span></th>
								<th><span><h5>Assigned To</h5></span></th>
								<th><span><h5>Assign Time</h5></span></th>
								<th class="text-center"><span><h5>Status</h5></span></th>
								<th><span><h5>Duration</h5></span></th>
							</tr>
						</thead>
					   <tbody>`;
						for (let i in result) {
							let dates = result[i].assigntime;
							let date2 = new Date(dates);
							let day1 = date2.getDate();
							let month1 = date2.getMonth() + 1;
							let year1 = date2.getFullYear();
							let hour1 = date2.getHours();
							let min1 = date2.getMinutes();
							let assignDate = day1 + "/" + month1 + "/" + year1 + "   " + hour1 + "." + min1;
							var assignTime;
							if (!result[i].assigntime) {
								assignTime = '-'
							}
							else {
								assignTime = assignDate;
							}
							var ass;
							if (result[i].assignto == undefined) {
								ass = '-';
							}
							else {
								ass = result[i].assignto;
							}
							let comments;
							if (!result[i].comment) {
								comments = '-'
							}
							else {
								comments = result[i].comment;
							}
							let assign;
							if (result[i].assignto == undefined) {
								assign = '-';
							}
							else {
								assign = result[i].assignto;
							}
							et += `
							<tr>
							<td class="text-center" style="width:10%">
								${result[i].taskid}
							</td>
							<td>
								<span class="user-link">${result[i].taskname}</span>
								<span class="user-subhead" style="margin-left:50px">${result[i].description}</span>
							</td>
							<td class="text-center">
								${result[i].priority}
							</td>
							<td class="text-center" style="width:150px">
								<span class="label label-success">${result[i].assignto}</span>
							</td>
							<td class="text-center">
								${assignDate}
							</td>
							<td class="text-center" style="width: 120px;>
								<span class="label label-success"><label id="sts4${i}">${result[i].status}</label></span>
							</td>
							<td class="text-center">
								<span>${result[i].duration}</span>
							</td>
						</tr>`
						}
						document.getElementById("main").innerHTML = head + et + "</tbody></table>";
						for (let k = 0; k <= result.length; k++) {
							if (document.getElementById(`sts3${k}`).innerHTML == 'Completed') {
								document.getElementById(`sts3${k}`).style.borderRadius = '25px';
								document.getElementById(`sts3${k}`).style.color = 'White';
								document.getElementById(`sts3${k}`).style.height = '35px';
								document.getElementById(`sts3${k}`).style.padding = '5px'
								document.getElementById(`sts3${k}`).style.backgroundColor = 'Green';
							}
							if (document.getElementById(`sts3${k}`).innerHTML == 'Not Started') {
								document.getElementById(`sts3${k}`).style.borderRadius = '25px';
								document.getElementById(`sts3${k}`).style.color = 'White';
								document.getElementById(`sts3${k}`).style.height = '35px';
								document.getElementById(`sts3${k}`).style.padding = '5px'
								document.getElementById(`sts3${k}`).style.backgroundColor = '#C21807';
							}
							if (document.getElementById(`sts3${k}`).innerHTML == 'In progress') {
								document.getElementById(`sts3${k}`).style.borderRadius = '25px';
								document.getElementById(`sts3${k}`).style.color = 'White';
								document.getElementById(`sts3${k}`).style.height = '35px';
								document.getElementById(`sts3${k}`).style.padding = '5px'
								document.getElementById(`sts3${k}`).style.backgroundColor = '#F9A602';
							}
						}
					}
					else {
						content += `<div style="margin:40px; margin-left:200px;color:rgb(109, 80, 105);"> <h3>No ${search} Task is the available</h3></div>`
					}
				}
			}
		}
	}
}

function clickPress() {
	search()
}