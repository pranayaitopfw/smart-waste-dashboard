import { db } from "./firebase-config.js";

import {
ref,
onValue
}
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const trashRef = ref(db, "trashLevel");
const gasRef = ref(db, "gasValue");

const trashData = [];
const gasData = [];
const labels = [];

const trashChart = new Chart(
document.getElementById("trashChart"),
{
type:"line",
data:{
labels:labels,
datasets:[{
label:"Trash %",
data:trashData
}]
}
}
);

const airChart = new Chart(
document.getElementById("airChart"),
{
type:"line",
data:{
labels:labels,
datasets:[{
label:"MQ135",
data:gasData
}]
}
}
);

onValue(trashRef,(snapshot)=>{

const level = snapshot.val() || 0;

document.getElementById(
"trashPercent"
).innerText = level + "%";

document.getElementById(
"ringText"
).innerText = level + "%";

const circle =
document.getElementById("progressCircle");

const offset =
565 - (565 * level / 100);

circle.style.strokeDashoffset =
offset;

let status = "Empty";

if(level > 30)
status = "Medium";

if(level > 70)
status = "Nearly Full";

if(level > 90)
status = "FULL";

document.getElementById(
"binStatus"
).innerText = status;

labels.push(
new Date().toLocaleTimeString()
);

trashData.push(level);

if(labels.length > 20){

labels.shift();
trashData.shift();

}

trashChart.update();

});

onValue(gasRef,(snapshot)=>{

const gas = snapshot.val() || 0;

let quality = "GOOD";

if(gas > 1200)
quality = "MODERATE";

if(gas > 1800)
quality = "POOR";

document.getElementById(
"airStatus"
).innerText = quality;

gasData.push(gas);

if(gasData.length > 20)
gasData.shift();

airChart.update();

document.getElementById(
"lastUpdate"
).innerText =
new Date().toLocaleTimeString();

if(gas > 1800){

document.getElementById(
"alertBox"
).innerHTML =
"⚠ Bad Odor Detected";

}
else{

document.getElementById(
"alertBox"
).innerHTML =
"No Active Alerts";

}

});
