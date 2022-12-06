import { db } from "./firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

$(function(){$
    console.log("LOGIN SCRIPT IS RUNNING");

    webFunctions();
});

function ifUserExist(id, password, page){
    getDoc(doc(db, "users", id)).then(docSnap => {
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            if(docSnap.data().Password == password){
                console.log("user exists");
                if(docSnap.data().Admin == true && page == "viewReports") {
                    self.location.replace("incidentsReported.html");
                }
                else {
                    self.location.replace("reportForm.html",);
                }
                localStorage.clear();
                localStorage.setItem("userID", id);
                return;
            }
            else {
                $("#incorrectCredentials").slideDown(500);
                document.getElementById("incorrectCredentials").style.display = "block";
                $("#incorrectCredentials").delay(2000).slideUp(500);
            }
        }
        else {
            $("#incorrectCredentials").slideDown(500);
            document.getElementById("incorrectCredentials").style.display = "block";
            $("#incorrectCredentials").delay(2000).slideUp(500);
            console.log("user does not exist");
        }
    })

};

function webFunctions(){
    var forgotPasswordModal = document.getElementById("forgotPasswordModal");

    $('#password').keyup(function(event){
        if (event.keyCode === 13) {
            $("#loginSubmitBtn").click();
        }
    });

    $('#loginSubmitBtn').click(function(){
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if(email == "" || password == ""){
            $("#noCredentials").slideDown(500);
            document.getElementById("noCredentials").style.display = "block";
            $("#noCredentials").delay(2000).slideUp(500);
            return;
        }

        ifUserExist(email, password, localStorage.getItem("page"));
    });

    $('#loginBackBtn').click(function(){
        self.location.href = "dashboard.html";
    });
    
    $('#forgotPassword').click(function() {
        forgotPasswordModal.style.display = "block";
    });

    $('#forgotPasswordBtn').click(function() {
        console.log("forgot password email");
        forgotPasswordModal.style.display = "none";
        $("#success").slideDown(500);
        document.getElementById("success").style.display = "block";
        $("#success").delay(2000).slideUp(500);
    });
    


    $('span').click(function() {
        forgotPasswordModal.style.display = "none";
    });

    self.onclick = function(event) {
        if (event.target == forgotPasswordModal) {
            forgotPasswordModal.style.display = "none";
        }
    };
};
