//import { db } from "/js/firebase.js"
//import { collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

$(function () {
  $;
  console.log("REPORT FORM SCRIPT IS RUNNING");

  //webFunctions();
});

//TODO: change this?
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
}

function webFunctions() {
  /* var contactModal = document.getElementById("contactModal");

  $("#accessSafeBtn").click(function () {
    self.location.href = "login.html";
  });

  $("#loginSubmitBtn").click(function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email == "" || password == "") {
      $("#noCredentials").slideDown(500);
      document.getElementById("noCredentials").style.display = "block";
      $("#noCredentials").delay(2000).slideUp(500);
      return;
    }

    self.location.replace("incidentsReported.html");

    //ifUserExist(email, password);
  });

  $("#loginBackBtn").click(function () {
    self.location.href = "index.html";
  });

  $("#forgotPassword").click(function () {
    forgotPasswordModal.style.display = "block";
  });

  $("#forgotPasswordBtn").click(function () {
    console.log("forgot password email");
    forgotPasswordModal.style.display = "none";
    $("#success").slideDown(500);
    document.getElementById("success").style.display = "block";
    $("#success").delay(2000).slideUp(500);
  });

  $(".viewDetails").click(function () {
    viewDetailsModal.style.display = "block";
  });

  $(".approveIncident").click(function () {
    approveIncidentModal.style.display = "block";
  });

  $(".rejectIncident").click(function () {
    console.log("reject incident");
  });

  $("span").click(function () {
    forgotPasswordModal.style.display = "none";
  });

  $("span2").click(function () {
    viewDetailsModal.style.display = "none";
  });

  $("span2").click(function () {
    approveIncidentModal.style.display = "none";
  });

  self.onclick = function (event) {
    if (event.target == forgotPasswordModal) {
      forgotPasswordModal.style.display = "none";
    } else if (event.target == viewDetailsModal) {
      viewDetailsModal.style.display = "none";
    } else if (event.target == approveIncidentModal) {
      approveIncidentModal.style.display = "none";
    }
  }; */
}
