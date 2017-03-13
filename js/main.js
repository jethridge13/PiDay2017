var rounds = 500;
var max = 120;
var run = false;
var wait = 1;
var coprime = 0;
var cofactor = 0;
var estimate = 0;
var difference = 0;

$(document).ready(function () {
    document.getElementById("rounds").value = rounds;
    document.getElementById("max").value = max;
    document.getElementById("range").value = wait;
    document.getElementById("pi").innerHTML = "<h3>" + Math.PI + "</h3>";
});

// Open the side help bar
function openNav() {
    document.getElementById("sidenav").style.width = "250px";
}

// Close the side help bar
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

function updateRounds() {
    var obj = document.getElementById("rounds");
    var r = parseInt(obj.value);
    if (r > 0) {
        rounds = r
    }
}

function updateMax() {
    var obj = document.getElementById("max");
    var r = parseInt(obj.value);
    if (r > 0) {
        max = r
    }
}

function updateSpeed() {
    var obj = document.getElementById("range");
    var r = parseInt(obj.value);
    if (r > 0) {
        wait = r
    }
}

function start() {
    if (!run) {
        run = true;
        coprime = 0;
        cofactor = 0;
        document.getElementById("stop").disabled = false;
        document.getElementById("start").disabled = true;
        mainLoop(0);
    }
}

function mainLoop(i) {
    setTimeout(function () {
        console.log(i);
        // Generate random numbers
        var one = Math.ceil(Math.random() * max);
        var two = Math.ceil(Math.random() * max);
        // Math
        var factor = gcd(one, two);
        if(factor > 1){
            cofactor++;
        } else{
            coprime++;
        }
        estimate = Math.sqrt(6/(coprime/(coprime+cofactor)));
        difference = Math.abs((Math.PI-estimate)/Math.PI)*100;
        updateCo();
        // Update page with math
        document.getElementById("number1").innerHTML = one;
        document.getElementById("number2").innerHTML = two;
        // Update counter logic
        i++;
        if (i < rounds && run) {
            mainLoop(i);
        } else {
            document.getElementById("stop").disabled = true;
            document.getElementById("start").disabled = false;
            run = false;
        }
    }, wait);
}

function stop() {
    run = false;
}

function gcd(a, b){
    var t;
    while(b != 0){
        t = a;
        a = b;
        b = t%b;
    } return a;
}

function updateCo(){
    document.getElementById("coprime").innerHTML = "<h3>" + coprime + "</h3>";
    document.getElementById("cofactor").innerHTML = "<h3>" + cofactor + "</h3>";
    document.getElementById("estimate").innerHTML = "<h3>" + estimate + "</h3>";
    document.getElementById("difference").innerHTML = "<h3>" + difference +"%</h3>";
}