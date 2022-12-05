import { db } from "/js/firebase.js"
import { collection, addDoc, GeoPoint, doc, setDoc, Timestamp, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

var latitude = 0.0;
var longitude = 0.0;

var contact = false;
var email;

$(function () {$;
  console.log("REPORT FORM SCRIPT IS RUNNING");
  checkUser();
  webFunctions();
});


function checkUser() {
  var userID = localStorage.getItem("userID");
  console.log(userID);
  getUserDoc(userID);
}

async function getUserDoc(userID){
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);
  email = docSnap.data().Email;
  document.getElementById("contact-email").value = email;
  console.log(email);
};

//Handles contact checkbox appear/disappear
function contactFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("contact-choice");
  // Get the output text
  var contactFields = document.getElementById("contact-info");

  // If the checkbox is checked, display the output text and save inputted phone number (if applicable)
  if (checkBox.checked == true) {
    contact = true;
    contactFields.style.display = "block";
  } else {
    contact = false;
    contactFields.style.display = "none";
    document.getElementById("contact-phone").value = ""; //set phone number to "" if does not want to be contacted
  }
};

function reportSubmitted(){
  console.log($('#incident-type').val());
};

//Used for geolocation, asks for permission from user
function getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
};
//Used for geolocation, finds coordinates of current location if uesr allows
function showPosition(position) {
  window.confirm("Geolocation has been successfully received!");
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log("Latitude: " + latitude + 
  " Longitude: " + longitude);
};

//Handles events on page
function webFunctions() {

  $('#contact-choice').click(function () {
    contactFunction()
  });

  $('#geolocation').click(function () {
    const btn = document.getElementById('geolocation');
    btn.className = "btn btn-secondary"
    getLocation()
  });

  $('#reportingForm').submit(function( event ) {
    event.preventDefault() //prevents form from refreshing after submission, will remove later (just for console testing)
    const form = document.getElementById('reportingForm');
    var type = document.getElementById("incident-type").value;
    var date = document.getElementById("incident-date").value;
    var timestamp = new Date(date)
    var location = document.getElementById("location").value;
    var description = document.getElementById("incident-description").value;
    var geopoint = new GeoPoint(latitude,longitude)
    var contactPhone = document.getElementById("contact-phone").value;
    
    

    var id = Math.floor((Math.random() * 1000) + 1).toString();

    var docData = {
      Date: Timestamp.fromDate(timestamp),
      Geopoint: geopoint,
      Location: location,
      Type: type,
      Description: description,
      Contact: contact,
      Email: email,
      Phone: contactPhone
    }

  setDoc(doc(db, "reported", id), docData);
  console.log(id)

  window.confirm("Report has been successfully submitted! Your incident number is " + id + ". Record this number in case you wish to follow up on this incident.")
  form.reset();
  checkUser();
});

}