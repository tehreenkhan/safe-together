var map;
var markers_list = [];
function initMap() {
    
    var options = {
        zoom: 17,
        center: { lat: 43.6577, lng: -79.3788 }
    }
    map = new google.maps.Map(document.getElementById('map'), options);

    //Icons
    var icons = {
        emergency_poles: {
            name: 'Emergency Poles',
            icon: 'phone.png'
        }
    };

    //Markers
    var markers = [
        {
            coords: { lat: 43.6600, lng: -79.3771 },
            content: '<h2>Emergency Phone: Interior wall mount</h2> Located on the 1st floor in the lobby',
            type: 'emergency_poles'
        },
        {
            coords: { lat: 43.6596, lng: -79.3776 },
            content: '<h2>Emergency phone: Exterior blue pole</h2>',
            type: 'emergency_poles'
        },
        {
            coords: { lat: 43.6594, lng: -79.3775 },
            content: '<h2>Emergency phone: Interior wall mount</h2> Located on the 1st floor in the lobby',
            type: 'emergency_poles'
        },
        {
            coords: { lat: 43.6590, lng: -79.3775 },
            content: '<h2>Emergency phone: Exterior blue pole</h2>',
            type: 'emergency_poles'
        }
    ];

    for (var i = 0; i < markers.length; i++) {
        // Add marker
        addMarker(markers[i]);
    }

    function addMarker(props) {
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

    var legend = document.getElementById('legend');
    var i = 0;
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<input checked="checked" type="checkbox" onchange="toggleType(this, event, \'' + markers[i].type + '\')"><img src="' + icon + '"> ' + name;
        legend.appendChild(div);
        i++;
    }
    
}

function toggleType(elm, event, type) {
    var on = elm.checked;
    for (var i = 0; i < markers_list.length; i++) {
        if (markers_list[i].type == type) {
            markers_list[i].marker.setMap(on ? map : null);
        }
    }
}
google.maps.event.addDomListener(window, 'load', initialize);