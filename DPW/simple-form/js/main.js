// Ben Forshey
// DWP Online
// 12 Feb 2015
// Simple Form

// document ready
window.onload = function () {
    var fontSelect = document.getElementById("message-font"),
        senderMessage = document.getElementById("sender-message"),
        manageReceipt = document.getElementById("manage-receipt-text"),
        textToToggle = document.getElementById("text-to-toggle");

    // function to test the value of a radio button and toggle class names accordingly (visually hiding and showing)
    var toggleReceiptText = function () {

        if (document.getElementById("confirm-receipt--answer-yes").checked) {
            textToToggle.className = "";
        } else if (document.getElementById("confirm-receipt--answer-no").checked) {
            textToToggle.className = "visuallyHidden";
        }
    };


    // function with switch case to set class name based on value of select in form.html
    var changeMessageFont = function () {
        // set value of the select element to variable
        var fontSelectValue = document.getElementById("message-font").value;
        // test for case of value and set appropriate class name
        switch (fontSelectValue) {
            case 'Source Sans Pro':
                senderMessage.className = "is-font-1";
                break;
            case 'Josefin Sans':
                senderMessage.className = "is-font-2";
                break;
            case 'Raleway':
                senderMessage.className = "is-font-3";
                break;
            case 'Arvo':
                senderMessage.className = "is-font-4";
                break;
            case 'Josefin Slab':
                senderMessage.className = "is-font-5";
                break;
            case 'MMerriweather':
                senderMessage.className = "is-font-6";
                break;
            default:
                senderMessage.className = "is-font-2";
        }
    };
    // add event listener to call funtion (though not a function call with "()"!)
    fontSelect.addEventListener("change", changeMessageFont);
    // event listener for div that contains the radio buttons for the function referenced
    manageReceipt.addEventListener("click", toggleReceiptText);

};
