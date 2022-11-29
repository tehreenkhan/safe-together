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

};