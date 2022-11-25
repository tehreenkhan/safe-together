import { db } from "/js/firebase.js"
import { collection, addDoc, doc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

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
    
    removeIncidentFromDB(id);
};

async function removeIncidentFromDB(id) {
    await deleteDoc(doc(db, "incidents", id));
}

async function addApprovedIncidentToDB(){
        var date = document.getElementById('incidentDate').value = "";
        var geo = document.getElementById('incidentGeopoint').value = "";
        var link = document.getElementById('incidentLink').value = "";
        var loc = document.getElementById('incidentLoc').value = "";
        var type = document.getElementById('incidentType').value = "";

    try {
        const docRef = await addDoc(collection(db, "approvedIncidents"), {
            Date: date,
            Geopoint: geo,
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
    var pages = numPages();
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
    const incidents = await getDocs(collection(db, "incidents"));
    incidents.forEach(doc => {
        incidentsList.push({id:  '' + doc.id, date: doc.data().Date, geo: doc.data().Geopoint, link: doc.data().Link, loc: doc.data().Location, type: doc.data().Type});
    });
    functionRun();
};

function displayReportedIncidents(){
    let elem = document.querySelector(".incidentTiles");
    let html = "";
    incidentsList.forEach(doc => {
        html = "<div class='incidentTile' id='"+ doc.id + "'> <p class='incidentContents incidentTitle'>" + doc.type + " @ " + doc.loc + "</p><br><p class='incidentContents date'>" + doc.date + "</p><br><p class='incidentContents description'>" + doc.link + "</p><br><p class='incidentContents details'><a href='#' class='viewDetails'>View Details</a><button class='approve approveIncident' type='button'>Approve</button><button class='reject rejectIncident' type='button'>Reject</button></p></div>" + html;
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
        document.getElementById('incidentDate').value = incident.date;
        document.getElementById('incidentGeopoint').value = incident.geopoint;
        document.getElementById('incidentLink').value = incident.link;
        document.getElementById('incidentLoc').value = incident.loc;
        document.getElementById('incidentType').value = incident.type;
    }
    else {
        let elem = document.querySelector('#'+modal.id);
        let elem2 = elem.querySelector(".incidentDetails");
        elem2.insertAdjacentHTML("beforeend", "<p class='incidentContents incidentTitle'>" + incident.type + " @ " + incident.loc + "</p><br><p class='incidentContents date'>" + incident.date + "</p><br><p class='description'>" + incident.link + "</p>");
    }

    modal.style.display = "block";
};

function clearModal(modal){
    if(modal == approveIncidentModal) {
        document.getElementById('incidentDate').value = "";
        document.getElementById('incidentGeopoint').value = "";
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

function webFunctions(){
    var viewDetailsModal = document.getElementById("viewDetailsModal");
    var approveIncidentModal= document.getElementById("approveIncidentModal");
     
    $('.incidentTiles').on('click', '.viewDetails', function(event) {
        var incident = getIncident(event.target.parentElement.parentElement.id);
        updateModal(incident, viewDetailsModal);
    });

    $('.incidentTiles').on('click', '.approveIncident', function(event) {
        var incident = getIncident(event.target.parentElement.parentElement.id);
        updateModal(incident, approveIncidentModal);
    });

    $('#approveForm').on('click', '.approveIncidentEdit', function(event) {
        //addApprovedIncidentToDB();
    });

    $('.incidentTiles').on('click', '.rejectIncident', function(event) { 
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
