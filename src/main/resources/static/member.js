/**
 * Created by e125761 on 2017/09/25.
 */
var count = 0;

var div = document.getElementById("div1");
div.removeChild(div.firstChild);
// Create Form
var form = createForm("member-form");
form.appendChild(createInput("name", "text", "name"));
form.appendChild(createInput("email", "text", "email"));
form.appendChild(createButton("Submit", "create()"));
div.appendChild(form);

// Create Init Table
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/member/all");
xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var members = JSON.parse(this.responseText);
        console.log(members);
        createTable(members);
    }
};
xhr.send();

// Validation
var validator = new FormValidator('test-form', [{
    name: 'name',
    display: 'Username',
    rules: 'required'
}, {
    name: 'email',
    display: 'Email',
    rules: 'valid_email'
}], function(errors, event) {
    if (errors.length > 0) {
        var errorString = '';

        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
            errorString += errors[i].message + '<br />';
        }

        alert(errorString);
    }
});

// Event Handler
function create() {
    var form = document.getElementById("member-form");
    var name = form.elements["name"].value;
    var email = form.elements["email"].value;
    var param = "name=" + name + "&" + "email=" + email;
    var url = "http://localhost:8080/member/add";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var member = JSON.parse(this.responseText);
            var table = document.getElementById("member-table");
            var bodyRow = table.insertRow(-1);
            bodyRow.id = table.rows.length - 2;
            var cell1 = bodyRow.insertCell(0);
            var cell2 = bodyRow.insertCell(-1);
            var cell3 = bodyRow.insertCell(-1);
            var cell4 = bodyRow.insertCell(-1);

            cell1.innerHTML = member.name;
            cell1.setAttribute("onclick", "forNameInput(this)");
            cell2.innerHTML = member.email;
            cell2.setAttribute("onclick", "forEmailInput(this)");

            var delButton = createButton("DELETE", "destroy(this.parentElement.parentElement)");
            var updButton = createButton("UPDATE", "update(this.parentElement.parentElement)");

            cell3.appendChild(delButton);
            cell4.appendChild(updButton);
        }
    };
    xhr.send(param);
}

function destroy(row) {
    alert("本当によろしいですか？");
    var param = "id=" + row.id;
    var url = "http://localhost:8080/member/delete";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var members = JSON.parse(this.responseText);
            div.removeChild(div.lastElementChild);
            createTable(members);
        }
    };
    xhr.send(param);
}

function update(row) {
    var id = row.id;
    var name = row.cells[0].firstElementChild.value;
    var email = row.cells[1].firstElementChild.value;
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/member/update";
    var params = "id=" + String(id) + "&name=" + name + "&email=" + email;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var members = JSON.parse(this.responseText);
            div.removeChild(div.lastElementChild);
            createTable(members);
        }
    };
    xhr.send(params);
}

function forNameInput(cell) {
    cell.innerHTML = "";
    cell.appendChild(createInput("name", "text", "name"));
    cell.removeAttribute("onclick");
}

function forEmailInput(cell) {
    cell.innerHTML = "";
    cell.appendChild(createInput("email", "text", "email"));
    cell.removeAttribute("onclick");
}
// Custom
function createTable(members) {
    var table = document.createElement("table");
    table.id = "member-table";
    div.appendChild(table);

    var headerRow = table.insertRow(0);
    var cell1 = headerRow.insertCell(0);
    var cell2 = headerRow.insertCell(-1);
    var cell3 = headerRow.insertCell(-1);
    cell1.innerHTML = "name";
    cell2.innerHTML = "email";
    cell3.innerHTML = "DEL";

    var num;
    for (num = 0; num < members.length; num++) {
        var bodyRow = table.insertRow(-1);
        bodyRow.id = table.rows.length - 2;
        var cell1 = bodyRow.insertCell(0);
        var cell2 = bodyRow.insertCell(-1);
        var cell3 = bodyRow.insertCell(-1);
        var cell4 = bodyRow.insertCell(-1);

        cell1.innerHTML = members[num].name;
        cell1.setAttribute("onclick", "forNameInput(this)");
        cell2.innerHTML = members[num].email;
        cell2.setAttribute("onclick", "forEmailInput(this)");

        var delButton = createButton("DELETE", "destroy(this.parentElement.parentElement)");
        var updButton = createButton("UPDATE", "update(this.parentElement.parentElement)");

        cell3.appendChild(delButton);
        cell4.appendChild(updButton);
    }
}

function createForm(id) {
    var form = document.createElement("form");
    form.setAttribute("id", id);
    form.setAttribute("name", "member-form");
    return form;
}
function createInput(id, inputType, name) {
    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", inputType);
    input.setAttribute("name", name);
    return input;
}
function createButton(value, action) {
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", value);
    button.setAttribute("onclick", action);
    return button;
}
