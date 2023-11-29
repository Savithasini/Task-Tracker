/**
 * admin.js
 * Description: exports the methods for Admin Tasks like Admin can view all the task, edit the task, delete the task.
 */


/**
 * Get all the task and Display it
 * @returns {Object}  return all the tasks
 */
function getTask() {
	let username = localStorage.getItem("Username");
	document.getElementById("lab").innerHTML = username;
	let req = new XMLHttpRequest();
	req.open("GET", "http://localhost:5000/tasks", true);
	req.setRequestHeader("Content-type", "application/json");
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				let result = JSON.parse(req.response);
				let head = `
				<table id="sortable" class="table user-list " >
			 <thead >
				 <tr style="font-size:20px; ">
				 <th style="padding-left:20px" class="sort " onclick="sortTable(0)">Task id <span id="icon-id" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th style="padding-left:20px" class="sort"  onclick="sortTable(1)">Taskname <span id="icon-name" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th class="sort" onclick="sortTable(2)"  >Priority <span id="icon-priority" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th class="sort" onclick="sortTable(3)">Created<span id="icon-created" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th class="sort" onclick="sortTable(4)">Assigned To<span id="icon-assignedto" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th class="sort" onclick="sortTable(5)" >Assign Time<span id="icon-assigntime" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th class="text-center" onclick="sortTable(6)">Status<span id="icon-status" class="icon"><i class="fas fa-sort"></i></span></th>
					 <th class="text-center ">Comments</th>
					 <th>&nbsp;</th>
				 </tr>
			 </thead>
			 <tbody class="list">`;
				let content = "";
				for (let i in result) {
					let assign;
					if (result[i].assignto == undefined) {
						assign = '-';
					}
					else {
						assign = result[i].assignto;
					}
					let date = result[i].created_at;
					let date1 = new Date(date);
					let day = date1.getDate();
					let month = date1.getMonth() + 1;
					let year = date1.getFullYear();
					let hour = date1.getHours();
					let min = date1.getMinutes();
					let dates = result[i].assigntime;
					let date2 = new Date(dates);
					let day1 = date2.getDate();
					let month1 = date2.getMonth() + 1;
					let year1 = date2.getFullYear();
					let hour1 = date2.getHours();
					let min1 = date2.getMinutes();
					let currentDate = day + "/" + month + "/" + year + "   " + hour + "." + min;
					let assignDate = day1 + "/" + month1 + "/" + year1 + "   " + hour1 + "." + min1;
					let assignTime;
					let comments;
					if (!result[i].assigntime) {
						assignTime = '-'
					}
					else {
						assignTime = assignDate;
					}
					if (!result[i].comment) {
						comments = '-'
					}
					else {
						comments = result[i].comment;
					}
					content += `
					<tr>
					<td   class="text-center ">
								${result[i].taskid}
							</td>
							<td  style="padding-left:15px">
								<span  style="display:block">${result[i].taskname}</span>
								<span class="user-subhead" >${result[i].description}</span>
							</td>
							<td class="text-center ">
								${result[i].priority}
							</td>
							<td  class="text-center ">
								${currentDate}
							</td>
							<td   class="text-center" style="width:170px">
								<span class="label label-success">${assign}</span>
							</td>
							<td   class="text-center" style="width:170px">
								<span class="label label-success">${assignTime}</span>
							</td>
							<td   id="st${i}" class="text-center com" style="width: 115px;>
								<span   class="label label-success" ><label id="sts${i}">${result[i].status}</label></span>
							</td>
							<td  scope="row" class="text-center " style="width: 115px;>
								<span  class="label label-success" id='com${i}'>${comments}</span>
							</td>
							<td   style="width: 10%;">
								<a href="./updatetask.html" class="table-link" style="color:rgb(109, 80, 105)" onclick="update('${result[i]._id}')">
									<span class="fa-stack">
										<i class="fas fa-edit" style="font-size:25px"></i>
									</span>
								</a>
								<a data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="delet('${result[i]._id}')" class="table-link " style="color:rgb(109, 80, 105)">
									<span class="fa-stack">
										<i class="fas fa-trash-alt" style="font-size:25px;color:#C21807"></i>
									</span>
								</a>
							</td>
						</tr>`
				}
				document.getElementById("main").innerHTML = head + content + "</tbody></table>";
				for (let k = 0; k <= result.length; k++) {
					if (document.getElementById(`sts${k}`).innerHTML == 'Completed') {
						document.getElementById(`sts${k}`).style.borderRadius = '25px';
						document.getElementById(`sts${k}`).style.color = 'White';
						document.getElementById(`sts${k}`).style.height = '35px';
						document.getElementById(`sts${k}`).style.padding = '5px'
						document.getElementById(`sts${k}`).style.backgroundColor = 'Green';
					}
					if (document.getElementById(`sts${k}`).innerHTML == 'Not Started') {
						document.getElementById(`sts${k}`).style.borderRadius = '25px';
						document.getElementById(`sts${k}`).style.color = 'White';
						document.getElementById(`sts${k}`).style.height = '35px';
						document.getElementById(`sts${k}`).style.padding = '5px'
						document.getElementById(`sts${k}`).style.backgroundColor = '#C21807';
					}
					if (document.getElementById(`sts${k}`).innerHTML == 'In progress') {
						document.getElementById(`sts${k}`).style.borderRadius = '25px';
						document.getElementById(`sts${k}`).style.color = 'White';
						document.getElementById(`sts${k}`).style.height = '35px';
						document.getElementById(`sts${k}`).style.padding = '5px'
						document.getElementById(`sts${k}`).style.backgroundColor = '#F9A602';
					}
				}
			}
		}
	}
}
window.onload = getTask;
/**
 * Confirmation pop up for Delete the Task by Specific Task id
 * @param {String} id  Id used to delete the task
 */
function delet(id) {
	let confirmButton = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
			<button type="button" style="background-color:rgb(109, 80, 105); color:white" class="btn " id="confirmDelete"  onclick='cancelFn("${id}")' >Delete</button>`;
	document.getElementById("foot").innerHTML = confirmButton;
}
/**
 * Delete Task by Id
 * @param {String} id  Id used to delete the task
 */
function cancelFn(id) {
	window.location.href = "admin.html";
	getTask();
	let req = new XMLHttpRequest();
	req.open("DELETE", "http://localhost:5000/tasks/" + id, true);
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
			}
		}
	}
}
/**
 * Update the Task by Id
 * @param {String} id  Id used to update the task
 */
function update(id) {
	localStorage.setItem("Taskid", id)
}
function clickPress() {
	search()
}
/**
 * Search the Task in Task bar it will fetch the details from database
 * @return {Object} return all the Tasks related to Search
 */
function search() {
	let et = "";
	let search = document.getElementById("search1").value;
	if (!search) {
		getTask();
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
						let head = `<table class="table user-list "  >
			 <thead >
				 <tr style="font-size:18px; ">
				 <th><span><h5>Task Id</h5></span></th>
					 <th style="padding-left:20px"><span><h5>Taskname</h5></span></th>
					 <th><span><h5>Priority</h5></span></th>
					 <th><span><h5>Created</h5></span></th>
					 <th><span><h5>Assigned To</h5></span></th>
					 <th><span><h5>Assign Time</h5></span></th>
					 <th class="text-center"><span><h5>Status</h5></span></th>
					 <th class="text-center"><span><h5>Comments</h5></span></th>
					 <th>&nbsp;</th>
				 </tr>
			 </thead>	<tbody>`;
						let content = "";
						for (let i in result) {
							let dates = result[i].assigntime;
							let date2 = new Date(dates);
							let day1 = date2.getDate();
							let month1 = date2.getMonth() + 1;
							let year1 = date2.getFullYear();
							let hour1 = date2.getHours();
							let min1 = date2.getMinutes();
							let assignDate = day1 + "/" + month1 + "/" + year1 + "   " + hour1 + "." + min1;
							let assignTime;
							if (!result[i].assigntime) {
								assignTime = '-'
							}
							else {
								assignTime = assignDate;
							}
							let ass;
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
							let date = result[i].created_at;
							let date1 = new Date(date);
							let day = date1.getDate();
							let month = date1.getMonth() + 1;
							let year = date1.getFullYear();
							let hour = date1.getHours();
							let min = date1.getMinutes();
							let currentDate = day + "/" + month + "/" + year + "   " + hour + "." + min;
							et += `
						<tr>
						<td class="text-center ">
									${result[i].taskid}
								</td>
								<td style="padding-left:20px">
									<span  style="display:block">${result[i].taskname}</span>
									<span class="user-subhead" >${result[i].description}</span>
								</td>
								<td class="text-center ">
									${result[i].priority}
								</td>
								<td class="text-center ">
									${currentDate}
								</td>
								<td class="text-center" style="width:150px">
									<span class="label label-success">${assign}</span>
								</td>
								<td class="text-center" style="width:150px">
									<span class="label label-success">${assignTime}</span>
								</td>
								<td class="text-center com" style="width: 120px;>
									<span  class="label label-success" ><label id="sts2${i}">${result[i].status}</label></span>
								</td>
								<td class="text-center " style="width: 120px;>
									<span  class="label label-success" >${comments}</span>
								</td>
								<td style="width: 10%;">
									<a href="./updatetask.html" class="table-link" style="color:rgb(109, 80, 105)" onclick="update('${result[i]._id}')">
										<span class="fa-stack">

										<i class="fas fa-edit" style="font-size:25px"></i>
										</span>
									</a>
									<a data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="delet('${result[i]._id}')" class="table-link " style="color:rgb(109, 80, 105)">
										<span class="fa-stack">
										<i class="fas fa-trash-alt" style="font-size:25px;color:#C21807"></i>
										</span>
									</a>
								</td>
							</tr>`
						}
						document.getElementById("main").innerHTML = head + et + "</tbody></table>";
						for (let k = 0; k <= result.length; k++) {
							if (document.getElementById(`sts2${k}`).innerHTML == 'Completed') {
								document.getElementById(`sts2${k}`).style.borderRadius = '25px';
								document.getElementById(`sts2${k}`).style.color = 'White';
								document.getElementById(`sts2${k}`).style.height = '35px';
								document.getElementById(`sts2${k}`).style.padding = '5px'
								document.getElementById(`sts2${k}`).style.backgroundColor = 'Green';
							}
							if (document.getElementById(`sts2${k}`).innerHTML == 'Not Started') {
								document.getElementById(`sts2${k}`).style.borderRadius = '25px';
								document.getElementById(`sts2${k}`).style.color = 'White';
								document.getElementById(`sts2${k}`).style.height = '35px';
								document.getElementById(`sts2${k}`).style.padding = '5px'
								document.getElementById(`sts2${k}`).style.backgroundColor = '#C21807';
							}
							if (document.getElementById(`sts2${k}`).innerHTML == 'In progress') {
								document.getElementById(`sts2${k}`).style.borderRadius = '25px';
								document.getElementById(`sts2${k}`).style.color = 'White';
								document.getElementById(`sts2${k}`).style.height = '35px';
								document.getElementById(`sts2${k}`).style.padding = '5px'
								document.getElementById(`sts2${k}`).style.backgroundColor = '#F9A602';
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
function starts() {
	window.location.href = "register.html"
}
/**
 * Sort the Table column
 * @param {number} columnIndex  used to sort the table
 */
function sortTable(columnIndex) {
	let table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById("sortable");
	switching = true;
	dir = "asc";
	if (
		document
			.getElementById("icon-" + getColumnId(columnIndex))
			.innerHTML.includes("up")
	) {
		dir = "desc";
	}
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("td")[columnIndex];
			y = rows[i + 1].getElementsByTagName("td")[columnIndex];
			let xValue = isNaN(parseFloat(x.innerHTML))
				? x.innerHTML.toLowerCase()
				: parseFloat(x.innerHTML);
			let yValue = isNaN(parseFloat(y.innerHTML))
				? y.innerHTML.toLowerCase()
				: parseFloat(y.innerHTML);
			if (dir === "asc") {
				if (xValue > yValue) {
					shouldSwitch = true;
					break;
				}
			} else if (dir === "desc") {
				if (xValue < yValue) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount === 0 && dir === "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
	resetIcons();
	if (dir === "asc") {
		document.getElementById("icon-" + getColumnId(columnIndex)).innerHTML =
			'<i class="fas fa-sort-up"></i>';
	} else {
		document.getElementById("icon-" + getColumnId(columnIndex)).innerHTML =
			'<i class="fas fa-sort-down"></i>';
	}
}
function resetIcons() {
	document.getElementById("icon-id").innerHTML = '<i class="fas fa-sort"></i>';
	document.getElementById("icon-name").innerHTML =
		'<i class="fas fa-sort"></i>';
	document.getElementById("icon-priority").innerHTML =
		'<i class="fas fa-sort"></i>';
	document.getElementById("icon-created").innerHTML =
		'<i class="fas fa-sort"></i>';
	document.getElementById("icon-assignedto").innerHTML =
		'<i class="fas fa-sort"></i>';
	document.getElementById("icon-assigntime").innerHTML =
		'<i class="fas fa-sort"></i>';
	document.getElementById("icon-status").innerHTML =
		'<i class="fas fa-sort"></i>';
}
function getColumnId(columnIndex) {
	switch (columnIndex) {
		case 0:
			return "id";
		case 1:
			return "name";
		case 2:
			return "priority";
		case 3:
			return "created";
		case 4:
			return "assignedto";
		case 5:
			return "assigntime";
		case 7:
			return "status";
		default:
			return "";
	}
}