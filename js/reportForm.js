import { db } from "/js/firebase.js"
import { collection, addDoc, doc, setDoc, Timestamp, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

$(function () {$;
  console.log("REPORT FORM SCRIPT IS RUNNING");

  //   var id = "12343"

  //   var docData = {
  //     Date: "test",
  //     //Geopoint: geo,
  //     //Link: link,
  //     Location: "test",
  //     Type: "test",
  //     Description: "test",
  //     id: id
  // }

  // setDoc(doc(db, "reported", id), docData);


  webFunctions();
});

//TODO: user authentication clarify
function ifUserExist(email, password) {
  getDoc(doc(db, "users", email)).then((docSnap) => {
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if (docSnap.data().password == password) {
        console.log("user exists");
        self.location.replace("reportIncident.html");
        return;
      }
    }
  });

  getDoc(doc(db, "admins", email)).then((docSnap) => {
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      if (docSnap.data().password == password) {
        console.log("user exists");
        self.location.replace("incidentsReported.html");
        return;
      }
    }
  });

  $("#incorrectCredentials").slideDown(500);
  document.getElementById("incorrectCredentials").style.display = "block";
  $("#incorrectCredentials").delay(2000).slideUp(500);
  console.log("user/admin doesn't exist");
  return;
}

function contactFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("contact-choice");
  // Get the output text
  var contactInfo = document.getElementById("contact-info");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    contactInfo.style.display = "block";
  } else {
    contactInfo.style.display = "none";
  }
};

function reportSubmitted(){
  console.log($('#incident-type').val());
};

function webFunctions() {

  

  $('#contact-choice').click(function () {
    contactFunction()
  });

  $('#reportingForm').submit(function( event ) {
    event.preventDefault()
    //addReportedIncidentToDB()
    var type = document.getElementById("incident-type").value;
    var date = document.getElementById("incident-date").value;
    var timestamp = new Date(date)
    var location = document.getElementById("location").value;
    //var geolocation = document.getElementById("geolocation");
    var description = document.getElementById("incident-description").value;
    //alert("Type= "+type.value + " " + "date = "+ date.value + " " + "location = "+location.value + " " + "desc = " +description.value);
    console.log(date)
    

    var id = Math.floor((Math.random() * 1000) + 1).toString();

    var docData = {
      Date: Timestamp.fromDate(timestamp),
      //Geopoint: geo,
      //Link: link,
      Location: location,
      Type: type,
      Description: description,
  }

  setDoc(doc(db, "reported", id), docData);

  });

}

async function addReportedIncidentToDB(){
  // const docRef = await addDoc(collection(db, "reported", "incid"), {
  //     Date: date,
  //     //Geopoint: geo,
  //     //Link: link,
  //     Location: location,
  //     Type: type,
  //     Description: description
  // });

  var type = document.getElementById("incident-type").value;
  var date = document.getElementById("incident-date").value;
  var location = document.getElementById("location").value;
  //var geolocation = document.getElementById("geolocation");
  var description = document.getElementById("incident-description").value;
  // var date = document.getElementById('incidentDate').value;
  // var geo = document.getElementById('incidentGeopoint').value;
  // var link = document.getElementById('incidentLink').value;
  // var loc = document.getElementById('incidentLoc').value;
  // var type = document.getElementById('incidentType').value;
  var id = 123;
  
  // var docData = {
  //     Date: date,
  //     //Geopoint: geo,
  //     //Link: link,
  //     Location: location,
  //     Type: type,
  //     Description: description,
  //     id: id
  // }

  // db.collection("reported").add({
  //   name: "Tokyo",
  //   country: "Japan"
  // });

  //REMOVED TRY CATCH STATEMENT
    //setDoc(doc(db, "reported", id), docData);
    //console.log("ADDED!!!!!!!");
    // const docRef = await addDoc(collection(db, "reported", ), {
    //   Date: date,
    //   //Geopoint: geo,
    //   //Link: link,
    //   Location: location,
    //   Type: type,
    //   Description: description
    // });

}