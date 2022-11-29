import { db } from "./firebase.js"
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

var map;
var markers_i = [];
var markers_e = [];
var markers_s = [];
var markers_list = [];

$(function () {
    $
    console.log("MAP SCRIPT IS RUNNING");

    getAllApprovedIncidents(initMarker);


    webFunctions();
});

async function getAllApprovedIncidents(fucntionRun) {
    const poles = await getDocs(collection(db, "poles"));
    poles.forEach(doc => {
        markers_e.push({ coords: { lat: doc.data().Geopoint._lat, lng: doc.data().Geopoint._long }, content: doc.data().title+doc.data().content, type: 'emergency_poles' });
    });
    const incidents = await getDocs(collection(db, "incidents"));
    incidents.forEach(doc => {
        markers_i.push({ coords: { lat: doc.data().Geopoint._lat, lng: doc.data().Geopoint._long }, content: doc.data().Type, type: 'incidents' });
    });
    const security = await getDocs(collection(db, "guards"));
    security.forEach(doc => {
        markers_s.push({ coords: { lat: doc.data().Geopoint._lat, lng: doc.data().Geopoint._long }, type: 'security' });
    });
    console.log(markers_e)
    fucntionRun();
};

function initMap() {
    var options = {
        zoom: 17,
        center: { lat: 43.6577, lng: -79.3788 }
    }
    map = new google.maps.Map(document.getElementById('map'), options);
}

function initMarker() {
    var icons = {
        emergency_poles: {
            name: 'Emergency Poles',
            icon: './images/phone.png'
        },
        security: {
            name: 'Security Guards',
            icon: './images/security.png'
        },
        incidents: {
            name: 'Active Incidents',
            icon: './images/warning.png'
        }
    };

    var markers = markers_e.concat(markers_i, markers_s);

    for (var i = 0; i < markers.length; i++) {
        // Add marker
        addMarker(markers[i], icons);
    }
}

function addMarker(props, icons) {


    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        icon: icons[props.type].icon
    });


    // Check for customicon
    if (props.icon) {
        // Set icon image
        marker.setIcon(props.icon);
    }

    // Check content
    if (props.content) {
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }
    markers_list.push({
        marker: marker,
        type: props.type
    });
}

function showMarker(type) {
    for (var i = 0; i < markers_list.length; i++) {
        if (markers_list[i].type == type) {
            markers_list[i].marker.setMap(map);
        }
    }
}

function hideMarker(type) {
    for (var i = 0; i < markers_list.length; i++) {
        if (markers_list[i].type == type) {
            markers_list[i].marker.setMap(null);
        }
    }
}

function webFunctions() {
    var checkBox1 = document.querySelector("input[name=myCheck1]");
    
    checkBox1.addEventListener('change', function () {
        if (this.checked == true) {
            showMarker('emergency_poles');
        } else {
            hideMarker('emergency_poles');
        }
    })
    

    var checkBox2 = document.querySelector("input[name=myCheck2]");
    
    checkBox2.addEventListener('change', function () {
        if (this.checked == true) {
            showMarker('incidents');
        } else {
            hideMarker('incidents');
        }
    })

    var checkBox3 = document.querySelector("input[name=myCheck3]");
    
    checkBox3.addEventListener('change', function () {
        if (this.checked == true) {
            showMarker('security');
        } else {
            hideMarker('security');
        }
    })
}

google.maps.event.addDomListener(window, 'load', initMap);
