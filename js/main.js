$(function(){$
    console.log("MAIN SCRIPT IS RUNNING");

    webFunctions();
});

function webFunctions(){
    $('#accessSafeBtn').click(function(){
        self.location.href = "dashboard.html";
    });

    $('.dashboardBtn').click(function() {
        self.location.replace("dashboard.html");
    });

    $('.mapBtn').click(function() {
        self.location.replace("map.html");
    });

    $('.emProceduresBtn').click(function() {
        self.location.replace("emergency.html");
    });

    $('.settingsBtn').click(function() {
        self.location.replace("accountSettings.html");
    });

    $('.walksafeBtn').click(function() {
        self.location.replace("walksafe.html");
    });

    $('.reportIncidentBtn').click(function() {
        self.location.replace("login.html");
    });
    $('.listViewBtn').click(function() {
        self.location.replace("listView.html");
    });

};