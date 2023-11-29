function viewList() {
    let username = localStorage.getItem("Username");
    document.getElementById("lab").innerHTML = username;
    document.getElementById("box").innerHTML = localStorage.getItem("viewtask");
}
window.onload = viewList;
