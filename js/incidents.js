import { db } from "./firebase.js"
import { collection, addDoc, doc, getDocs, deleteDoc, Timestamp, GeoPoint } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

var current_page = 1;
var records_per_page = 3;
var incidentsList = [];

$(function(){$
    console.log("INCIDENTS SCRIPT IS RUNNING");

    getAllReportedIncidents(displayReportedIncidents);

    webFunctions();
});

function removeIncident(id){

    var pages = numPages();

    incidentsList =  incidentsList.filter(el => {
        return el.id != id;
    })

    document.getElementById(id).remove();
    
    changePage(current_page);
    
    if(pages > numPages()) {
        document.getElementById(''+ pages).remove();
    }
    
    removeIncidentFromReported(id);
};

async function removeIncidentFromReported(id) {
    await deleteDoc(doc(db, "reported", id));
}

async function addApprovedIncidentToDB(){
    var date = document.getElementById('incidentDate').value;
    var geoN = document.getElementById('incidentGeopointN').value;
    var geoW = document.getElementById('incidentGeopointW').value;
    var link = document.getElementById('incidentLink').value;
    var loc = document.getElementById('incidentLoc').value;
    var type = document.getElementById('incidentType').value;

    try {
        const docRef = await addDoc(collection(db, "incidents"), {
            Date: Timestamp.fromDate(new Date(date)),
            Geopoint: new GeoPoint(geoN, geoW),
            Link: link,
            Location: loc,
            Type: type
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
    
function changePage(page)
{
    document.querySelectorAll(".incidentTile").forEach(a=>a.style.display = "none");
    var nextBtn = document.getElementById("nextBtn");
    var prevBtn = document.getElementById("prevBtn");
    let index = incidentsList.length - (page - 1) * 3 - 1;

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    updatePagesBar();

    if(index >= 0){
        let elem1 = incidentsList[index].id;
        document.getElementById(elem1).style.display = "block";
    }

    if(index - 1 >= 0) {
        let elem2 = incidentsList[index - 1].id;
        document.getElementById(elem2).style.display = "block";   
    }

    if(index - 2 >= 0) {
        let elem3 = incidentsList[index - 2].id;
        document.getElementById(elem3).style.display = "block";
    }

    if (page == 1) {
        prevBtn.style.visibility = "hidden";
    } else {
        prevBtn.style.visibility = "visible";
    }

    if (page == numPages()) {
        nextBtn.style.visibility = "hidden";
    } else {
        nextBtn.style.visibility = "visible";
    }
};

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
};

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
};

function jumpToPage(page)
{
    if (page <= numPages()) {
        current_page = page;
        changePage(current_page);
    }
};

function numPages()
{
    return Math.ceil(incidentsList.length / records_per_page);
};

function addPagesBar(){
    let elem = document.querySelector(".incidentTiles");
    let html = '<div class="pagination center-text" id="pagesBar"><a href="#" id="prevBtn">&laquo;</a>';

    for (let i = 1; i <= numPages(); i++){
        (i == current_page) ? html += "<a class='active index' href='#' id='" + i + "'>" + i + '</a>' : html +=  "<a class='index' href='#'' id='" + i + "'>" + i + '</a>';
    }
    
    html += '<a href="#" id="nextBtn">&raquo;</a></div>';

    elem.insertAdjacentHTML("beforeend", html);
};

function updatePagesBar(){
    $('.pagination').find('.active')[0].classList.remove('active');
    document.getElementById(current_page).classList.add('active');
};

async function getAllReportedIncidents(functionRun){
    const incidents = await getDocs(collection(db, "reported"));
    incidents.forEach(doc => {
        incidentsList.push({id:  '' + doc.id, contact: doc.data().Contact, date: doc.data().Date.toDate(), desc: doc.data().Description, email: doc.data().Email, geo: [doc.data().Geopoint._lat, doc.data().Geopoint._long], loc: doc.data().Location, phone: doc.data().Phone, type: doc.data().Type});
    });
    functionRun();
};

function displayReportedIncidents(){
    let elem = document.querySelector(".incidentTiles");
    let html = "";
    incidentsList.forEach(doc => {
        html = "<div class='incidentTile' id='"+ doc.id + "'> <p class='incidentContents incidentTitle'>" + doc.type + " @ " + doc.loc + "</p><br><p class='incidentContents date'>" + doc.date + "</p><br><p class='incidentContents description'>" + doc.desc + "</p><br><p class='incidentContents details'><a class='clickable viewDetails'>View Details</a><button class='approve approveIncident' type='button'>Approve</button><button class='reject rejectIncident' type='button'>Reject</button></p></div>" + html;
    });
    elem.insertAdjacentHTML("beforeend", html);
    addPagesBar();
    changePage(1);
};

function getIncident(id) {
    for (const el of incidentsList){
        if(el.id == id){
            return el;
        }
    }
    return null;
};

function updateModal(incident, modal){
    if(modal == approveIncidentModal) {
        document.getElementById('incidentID').value = incident.id;
        document.getElementById('incidentDate').value = incident.date;
        document.getElementById('incidentGeopointN').value = incident.geo[0];
        document.getElementById('incidentGeopointW').value = incident.geo[1];
        document.getElementById('incidentLink').value = incident.link;
        document.getElementById('incidentLoc').value = incident.loc;
        document.getElementById('incidentType').value = incident.type;
    }
    else {
        let elem = document.querySelector('#'+modal.id);
        let elem2 = elem.querySelector(".incidentDetails");
        elem2.insertAdjacentHTML("beforeend", "<p class='incidentContents incidentTitle'>" + incident.type + " @ " + incident.loc + "</p><br><p class='incidentContents date'>" + incident.date + "</p><p class='description'> Description: " + incident.desc + "<br><br> Contact: " + incident.contact + "<br> Email: " + incident.email + "<br> Phone: " + incident.phone + "<br><br> Geopoint: " + incident.geo[0] + "°N, " + incident.geo[1] + "°W" + "</p>");
    }

    modal.style.display = "block";
};

function clearModal(modal){
    if(modal == approveIncidentModal) {
        document.getElementById('incidentID').value = "";
        document.getElementById('incidentDate').value = "";
        document.getElementById('incidentGeopointN').value = "";
        document.getElementById('incidentGeopointW').value = "";
        document.getElementById('incidentLink').value = "";
        document.getElementById('incidentLoc').value = "";
        document.getElementById('incidentType').value = "";
    }
    else {
        let elem = document.querySelector('#'+modal.id);
        let elem2 = elem.querySelector(".incidentDetails");
        elem2.outerHTML = '<div class="incidentDetails"></div>';
    }

    modal.style.display = "none";
}; 

function flashRed() {
  document.body.classList.add('red')
  window.setTimeout(function() {
    document.body.classList.remove('red')
  }, 1000)

}

function flashGreen() {
  document.body.classList.add('green')
  window.setTimeout(function() {
    document.body.classList.remove('green')
  }, 1000)
}

function webFunctions(){
    var viewDetailsModal = document.getElementById("viewDetailsModal");
    var approveIncidentModal= document.getElementById("approveIncidentModal");
     
    $('.incidentTiles').on('click', '.viewDetails', function(event) {
        updateModal(getIncident(event.target.parentElement.parentElement.id), viewDetailsModal);
    });

    $('.incidentTiles').on('click', '.approveIncident', function(event) {
        updateModal(getIncident(event.target.parentElement.parentElement.id), approveIncidentModal);
    });

    $('#approveForm').on('click', '.approveIncidentEdit', function(event) {
        removeIncident(document.getElementById('incidentID').value)
        addApprovedIncidentToDB();
        flashGreen();
        clearModal(approveIncidentModal);
    });

    $('.incidentTiles').on('click', '.rejectIncident', function(event) { 
        flashRed();
        removeIncident(event.target.parentElement.parentElement.id);
    });

    $('.incidentTiles').on('click', '#nextBtn', function(event) { 
        nextPage();
    });

    $('.incidentTiles').on('click', '#prevBtn', function(event) { 
        prevPage();
    });

    $('.incidentTiles').on('click', '.index', function(event) { 
        jumpToPage(parseInt(event.target.id));
    });

    $('span').click(function() {
        clearModal(viewDetailsModal);
    });

    $('span').click(function() {
        clearModal(approveIncidentModal);
    });

    self.onclick = function(event) {
        if (event.target == viewDetailsModal){
            clearModal(viewDetailsModal);
        }
        else if (event.target == approveIncidentModal){
            clearModal(approveIncidentModal);
        }
    };
};