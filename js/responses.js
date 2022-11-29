function getBotResponse(input) {
    if (input == "yes") {
        return "Please provide your Name.";
    } else if (input == "no") {
        return "what can we help you with today?";
    } else if (input == "") {
        return "";
    }

    if (input == "Tehreen" ) {
        return "Please provide your Phone Number.";
    } else if (input == "") {
        return "Incorrect format. Please enter again.";
    } 

    if (input == "123-456-7890" ) {
        return "Please provide a description of your location.";
    } else if (input == "") {
        return "Incorrect format. Please enter again.";
    } 

    // Simple responses
    if (input == "outside of SLC") {
        return "A dispatcher will contact you soon.";
    } else if (input == "ok goodbye") {
        return "Thank you for using WalkSafe assistance. Talk to you later!";
    } else {
        return "Try asking something else!";
    }
    
    if (input == "hello") {
        return "Ready to activate walk safe assistance?";
    } else if (input == "goodbye") {
        return "Thank you for using WalkSafe assistance. Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}
