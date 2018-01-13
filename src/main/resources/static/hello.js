/**
 * Created by e125761 on 2017/07/09.
 */
var p1 = document.getElementById("p1");
p1.addEventListener("click", helloFunction);

function helloFunction() {
    document.getElementById("p1").innerHTML="Hello, World!";
}