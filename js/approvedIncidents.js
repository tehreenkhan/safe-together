import { db } from "/js/firebase.js"
import { collection, getDocs} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

var current_page = 1;
var records_per_page = 3;
var approvedIncidentsList = [];

$(function(){$
    console.log("APPROVED INCIDENTS SCRIPT IS RUNNING");

    getAllApprovedIncidents(displayApprovedIncidents);

    webFunctions();
});
    
function changePage(page)
{
    document.querySelectorAll(".incidentTile").forEach(a=>a.style.display = "none");
    var nextBtn = document.getElementById("nextBtn");
    var prevBtn = document.getElementById("prevBtn");
    let index = approvedIncidentsList.length - (page - 1) * 3 - 1;

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    updatePagesBar();

    if(index >= 0){
        let elem1 = approvedIncidentsList[index].id;
        document.getElementById(elem1).style.display = "block";
    }

    if(index - 1 >= 0) {
        let elem2 = approvedIncidentsList[index - 1].id;
        document.getElementById(elem2).style.display = "block";   
    }

    if(index - 2 >= 0) {
        let elem3 = approvedIncidentsList[index - 2].id;
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
    return Math.ceil(approvedIncidentsList.length / records_per_page);
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

function getApprovedIncident(id) {
    for (const el of approvedIncidentsList){
        if(el.id == id){
            return el;
        }
    }
    return null;
};

async function getAllApprovedIncidents(functionRun){
    const incidents = await getDocs(collection(db, "incidents"));
    incidents.forEach(doc => {
        approvedIncidentsList.push({id: '' + doc.id, date: doc.data().Date.toDate(), geo: [doc.data().Geopoint._lat, doc.data().Geopoint._long], link: doc.data().Link, loc: doc.data().Location, type: doc.data().Type, onMap: doc.data().onMap});
    });
    functionRun();
};

function displayApprovedIncidents(){
    let elem = document.getElementById("approvedIncidentTiles");
    let html = "";
    approvedIncidentsList.forEach(doc => {
        html = "<div class='incidentTile' id='"+ doc.id + "'> <p class='incidentContents incidentTitle'>" + doc.type + " @ " + doc.loc + "</p><br><p class='incidentContents date'>" + doc.date + "</p><br><p class='incidentContents description'>" + doc.link + "</p><br><p class='incidentContents details'><a class='clickable viewDetailsApproved'>View Details</a></div>" + html;
    });
    elem.insertAdjacentHTML("beforeend", html);
    addPagesBar();
    changePage(1);
};


function updateModal(incident, modal){
    let elem = document.querySelector('#'+modal.id);
    let elem2 = elem.querySelector(".incidentDetails");
    elem2.insertAdjacentHTML("beforeend", "<p class='incidentContents incidentTitle'>" + incident.type + " @ " + incident.loc + "</p><br><p class='incidentContents date'>" + incident.date + "</p><p class='description'> Link: <a target='_blank' href='" + incident.link + "'>" + incident.link + "</a><br><br> Geopoint: " + incident.geo[0] + "°N, " + incident.geo[1] + "°W" + "</a><br> On Map: " + incident.onMap + "</p>");

    modal.style.display = "block";
};

function clearModal(modal){
    let elem = document.querySelector('#'+modal.id);
    let elem2 = elem.querySelector(".incidentDetails");
    elem2.outerHTML = '<div class="incidentDetails"></div>';


    modal.style.display = "none";
}; 

function webFunctions(){
    var viewDetailsModalApproved = document.getElementById("viewDetailsModalApproved");

    $('.incidentTiles').on('click', '.viewDetailsApproved', function(event) {
        updateModal(getApprovedIncident(event.target.parentElement.parentElement.id), viewDetailsModalApproved);
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
        clearModal(viewDetailsModalApproved);
    });

    self.onclick = function(event) {
        if (event.target == viewDetailsModalApproved){
            clearModal(viewDetailsModalApproved);
        }
    };
};


