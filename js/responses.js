function getBotResponse(input) {
    if (input == "yes") {
        return "please provide your contact information";
    } else if (input == "no") {
        return "what can we help you with today?";
    } else if (input == "") {
        return "";
    }

    // Simple responses
    if (input == "hello") {
        return "Ready to activate walk safe assistance?";
    } else if (input == "goodbye") {
        return "Thank you for using WalkSafe assistance. Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}