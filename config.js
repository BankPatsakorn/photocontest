// API Liff ID
const liffId = "1653532581-pmy50Neo";

const apiEndpoint = "https://www.toyotaprofiling.com";
// const apiEndpoint = "https://b942b62aad4a.ap.ngrok.io";

//const profilingPath = "https://liff.line.me/1653532581-n9L8wDEQ?questionnaire_code=99998"; //PROD
const profilingForLinePath = "https://liff.line.me/1653532581-n9L8wDEQ?questionnaire_code=99998"; // DEV
const profilingForFacebookPath = "https://liff.line.me/1653532581-n9L8wDEQ?questionnaire_code=99997"; // DEV

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