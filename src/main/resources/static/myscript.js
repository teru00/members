/**
 * Created by e125761 on 2017/07/01.
 */
/*
var p1 = document.getElementById("p1");
p1.addEventListener("click", renderUsers);
*/
var div = document.getElementById("div1");
div.removeChild(div.firstChild);
renderUsers();
function selectDb() {
    var div = document.getElementById("div1");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    var selectValue = document.getElementById('mySelect').value;
    switch (selectValue) {
        case 'users':
            renderUsers();
            break;
        case 'messages':
            renderMessages();
            break;
    }
}

function renderUsers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/demo/all");
    xhr.onreadystatechange = function () {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var element = document.getElementById("div1");
            console.log(this.responseText);
            if (null === document.getElementById("user-form")) {
                var form = createForm("user-form");
                form.appendChild(createInput("name", "text", "name"));
                form.appendChild(createInput("email", "text", "email"));
                form.appendChild(createButton("postApi()"));
                element.appendChild(form);
            } else {}
            var table;
            if (null === document.getElementById("user-table")) {
                table = document.createElement("TABLE");
                table.id = "user-table";
                element.appendChild(table);
            } else {
                table = document.getElementById("user-table")
            }
            var objects = JSON.parse(this.responseText);

            if (table.rows[0]) {

            } else {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(-1);
                var cell3 = row.insertCell(-1);
                cell1.innerHTML = "id";
                cell2.innerHTML = "name";
                cell3.innerHTML = "email";
            }
            for (var num in objects) {
                num = parseInt(num);
                if (table.rows[num+1]) {
                } else {
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(-1);
                    var cell3 = row.insertCell(-1);
                    cell1.innerHTML = objects[num].id.toString();
                    cell2.innerHTML = objects[num].name;
                    cell3.innerHTML = objects[num].email;
                }
            }
        }
    };
    xhr.send();
}

function renderMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/demo/messages");
    xhr.onreadystatechange = function () {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var table;
            if (null === document.getElementById("message-table")) {
                table = document.createElement("TABLE");
                table.id = "message-table";
                var element = document.getElementById("div1");
                element.appendChild(table);
            } else {
                table = document.getElementById("message-table")
            }
            var objects = JSON.parse(this.responseText);

            if (table.rows[0]) {

            } else {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(-1);
                var cell3 = row.insertCell(-1);
                cell1.innerHTML = "star";
                cell2.innerHTML = "title";
                cell3.innerHTML = "body";
            }
            for (var num in objects) {
                num = parseInt(num);
                if (table.rows[num+1]) {
                } else {
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(-1);
                    var cell3 = row.insertCell(-1);
                    cell1.innerHTML = objects[num].star;
                    cell2.innerHTML = objects[num].title;
                    cell3.innerHTML = objects[num].body;
                }
            }
        }
    };

    xhr.send();
}
function postApi() {
    var form = document.getElementById("user-form");
    var name = form.elements["name"].value;
    var email = form.elements["email"].value;
    var params = "name=" + name + "&" + "email=" + email;
    var url = "http://localhost:8080/demo/post";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            renderUsers();
        }
    }
    xhr.send(params);
}
function createForm(id) {
    var form = document.createElement("form");
    form.setAttribute("id", id);
    return form;
}
function createInput(id, inputType, name) {
    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", inputType);
    input.setAttribute("name", name);
    return input;
}
function createButton(action) {
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Submit");
    button.setAttribute("onclick", action);
    return button;
}