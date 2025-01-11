// Tab features...
function openTab(id) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("main");
  console.log("tabContent: ", tabcontent);
  const activeTab = document.querySelector(".main[style*='display: flex']");
  if (activeTab && activeTab.id === id) return; // Do nothing if already active

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    if (id == "tabSwitch4") {
      timeGetter();
      console.log("Function Liyo!");
    } else if (id == "tabSwitch2") {
      alaramSeter(array);
      console.log("alaram function liyo...");
    } else if (id == "tabSwitch1") {
      showSetAlaram();
    }
  }
  document.getElementById(id).style.display = "flex";
}
document.getElementById("defaultOpen").click();

// StopWatch Features

let timepassed = 0;
let intervalTime = null;
let runningState = false;

function formatTime(timepassed) {
  const totalSecond = Math.floor(timepassed / 1000);
  //console.log(totalSecond);
  const hours = Math.floor(totalSecond / 3600);
  //console.log("Hours: ",hours);
  const remainingSecond = totalSecond % 3600;
  //console.log("Remaining Second: ", remainingSecond);
  const minutes = Math.floor(remainingSecond / 60);
  //console.log("Minutes: ",minutes);
  const second = Math.floor(remainingSecond % 60);
  //console.log("Second: ",second);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(second).padStart(2, "0")}`;
}

const format = formatTime(7265000);
console.log(format);

const placeToDisplay = document.getElementById("tabh1");
console.log("Select h1: ", placeToDisplay);
function updateTimer() {
  placeToDisplay.textContent = formatTime(timepassed);
}

function startWatch() {
  if (!runningState) {
    runningState = true;
    intervalTime = setInterval(() => {
      timepassed += 1000; // increase by 1000ms i.e. 1 sec
      updateTimer();
    }, 1000);
  }
}

function stopWatch() {
  if (runningState) {
    runningState = false;
    clearInterval(intervalTime);
  }
}

function resetWatch() {
  stopWatch();
  timepassed = 0;
  updateTimer();
}

//WorldTime Match
async function timeGetter() {
  //console.log("ID: ", id);
  const countriesAndCities = {
    Nepal: "Kathmandu",
    USA: "New York",
    India: "Mumbai",
    Japan: "Tokyo",
  };
  const content = document.getElementsByClassName("main");
  const keysArray = Object.keys(countriesAndCities);
  const valuesArray = Object.values(countriesAndCities);

  for (let i = 0; i < keysArray.length; i++) {
    const city = valuesArray[i];
    const country = keysArray[i];
    const targetElement = content[3]?.children[i]; // Safely access children
    if (!targetElement) {
      console.error(`Element for city ${city} not found.`);
      continue;
    }

    try {
      const response = await fetch(
        `https://api.ipgeolocation.io/timezone?apiKey="YourAPIKey"&location=${city}, ${country}`
      );
      if (!response.ok) throw new Error("Failed to fetch time data");

      const data = await response.json();
      console.log(data);
      targetElement.textContent = `${data.geo.city} : ${data.time_12}`;
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error);
      targetElement.textContent = "Error fetching time.";
    }
  }
}

// Get all scrollable elements and the audio element
const scrollableElements = document.querySelectorAll(".scroll1");
const scrollSound = document.getElementById("scrollSound");

// Function to play the scroll sound
function playScrollSound(soundObject) {
  // Reset the sound to start from the beginning
  if (soundObject.id == "scrollSound") {
    soundObject.currentTime = 0;
    soundObject.play();
  } else if (soundObject.id == "alarmSound") {
    soundObject.play();
    // setTimeout(()=>{
    //   soundObject.pause();
    // },1000*60);
    showNotification(soundObject);
  }
}

// Add scroll event listeners to each scrollable element
scrollableElements.forEach((element) => {
  element.addEventListener("scroll", () => {
    playScrollSound(scrollSound);
  });
});

// reuseable code for date maker...
//function alaramSeter() {
//const datePlace = document.getElementsByClassName("scroll1");
//console.log("From set alaram: ", datePlace);
// for(i=0;i<datePlace.length;i++){
//   if(i==0){
//     for(j=1;j<=24;j++){
//       p=document.createElement("p");
//       p.innerHTML=j;
//       datePlace[0].appendChild(p);
//     }
//     console.log("Repeat Vaye hai mah! ");
//   }
//   if(i==1){
//     for(j=1;j<=60;j++){
//       p=document.createElement("p");
//       p.innerHTML=j;
//       datePlace[1].appendChild(p);
//     }
//   }
//   if(i==2){
//     for(j=1;j<=60;j++){
//       p=document.createElement("p");
//       p.innerHTML=j;
//       datePlace[2].appendChild(p);
//     }
//   }
// }
function alaramSeter(array) {
  const datePlace = document.getElementsByClassName("scroll1");
  //const amPm = document.getElementsByClassName("amPm")[0];

  for (let i = 0; i < datePlace.length; i++) {
    datePlace[i].innerHTML = ""; // Clear previous content

    const maxValue = i === 0 ? 24 : 60;
    console.log(maxValue);
    for (let j = 0; j < maxValue; j++) {
      const p = document.createElement("p");
      p.innerHTML = j;
      p.addEventListener("click", () => {
        alert(`You clicked ${j}`);
        array(j, i);
      });
      datePlace[i].appendChild(p);
    }
  }
}
let timeArray = [];
let obj = {};
function array(time, index) {
  console.log(`Time: ${time}, index: ${index}`);
  //timeArray.splice(index,0,time);
  if (index == 0) {
    obj.hours = time;
    if (obj.hours <= 12) {
      obj.period = "AM";
    } else {
      obj.period = "PM";
    }
  } else if (index == 1) {
    obj.minutes = time;
  } else {
    obj.second = time;
  }
  console.log("Alaram time: ", obj);
  if (Object.keys(obj).length === 4) {
    // timeArray.push(obj);
    // Retrieve existing data
    obj.set = "on";
    obj.triggered = false;
    obj.dismissed = false;
    let existingData = JSON.parse(localStorage.getItem("time")) || [];
    // Add new data to the array
    existingData.push(obj);
    obj = {};
    console.log("arrayOfObj: ", timeArray);
    console.log("obj pushed!");
    localStorage.setItem("time", JSON.stringify(existingData));
  }
}

function showSetAlaram() {
  const div = document.getElementsByClassName("set1")[0];
  console.log("is it an Array? ", div);
  const timeArray1 = localStorage.getItem("time");
  console.log("length: ", timeArray1);
  const alarms = JSON.parse(timeArray1);
  console.log(alarms);
  if (!alarms) {
    const h1 = document.createElement("h1");
    h1.innerHTML = "No any alaram set yet!";
    div.appendChild(h1);
  } else {
    console.log("Aba chalxah!...");
    div.innerHTML = "";
    for (let i = 0; i < alarms.length; i++) {
      const h1 = document.createElement("h1");
      h1.innerHTML = `${alarms[i].hours} : ${alarms[i].minutes} : ${alarms[i].second} ${alarms[i].period}`;
      div.appendChild(h1);
    }
  }
}

const pick = document.getElementById("alarmSound");

// Alarm set vako lai bajaune feature..
setInterval(() => {
  const now = new Date();
  const timeNow = now.toTimeString().slice(0, 5);
  console.log(timeNow);
  const data = JSON.parse(localStorage.getItem("time"));
  let dataChanged = false;
  data.forEach((item) => {
    if (item.set === "on") {
      const alarmTime = `${item.hours}:${item.minutes}`;
      console.log("Checking alarm time:", alarmTime);
      if (alarmTime === timeNow && !item.triggered && !item.dismissed) {
        playScrollSound(pick);
        item.triggered = true;
        dataChanged = true;
      }
    }
  });
  if (dataChanged) {
    localStorage.setItem("time", JSON.stringify(data));
  }
}, 1000);

const notificationContainer = document.getElementById("notification-container");
const closeNotification = document.getElementById("dismiss-button");

function showNotification(soundObject) {
  document.getElementById("notification-message").textContent =
    "Alarm is ringing....";
  notificationContainer.classList.remove("hidden");

  // multiple eventlistener add hune vako le code add gareko...
  closeNotification.removeEventListener("click", handleDissmiss);

  function handleDissmiss() {
    hideNotification(soundObject);
  }

  closeNotification.addEventListener("click", handleDissmiss);
}

function hideNotification(soundObject) {
  notificationContainer.classList.add("hidden");
  soundObject.pause();
  soundObject.currentTime = 0;
  resetAlarmStatus();
}

function resetAlarmStatus() {
  const data = JSON.parse(localStorage.getItem("time"));
  if (!data) return;

  data.forEach((item) => {
    if(item.triggered==true){
      item.dismissed=true;
    }
    item.triggered = false; // Reset the triggered status
  });
  localStorage.setItem("time", JSON.stringify(data));
}
