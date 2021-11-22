// API Liff ID
const liffId = "1653436655-dErX5kRK";

const apiEndpoint = "https://dev.toyotaprofiling.com";
// const apiEndpoint = "https://b942b62aad4a.ap.ngrok.io";

//const profilingPath = "https://liff.line.me/1653532581-n9L8wDEQ?questionnaire_code=99998"; //PROD
const profilingForLinePath = "https://liff.line.me/1653436655-lkEzj0OK?questionnaire_code=99996"; // DEV
const profilingForFacebookPath = "https://liff.line.me/1653436655-lkEzj0OK?questionnaire_code=99995"; // DEV

function getParameterFromUrl(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function getProfilingUrlByPlatform(platform) {
    platform = (platform || '').toLowerCase()
    switch (platform) {
        case 'facebook': return profilingForFacebookPath;
        default: return profilingForLinePath;
    }
}