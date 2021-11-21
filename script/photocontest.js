var base64image = "";
const urlParams = new URLSearchParams(window.location.search);
const lineId = urlParams.get('lineId');
const platform = urlParams.get('platform');

$(document).ready(function () {
    loading();
    var obj = { lineId: lineId };
    var objJsonData = JSON.stringify(obj);

    getUserImages(objJsonData);
    $(".regular").slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: false,
        nextArrow: false
    });

});
function submit() {
    loading();
    if (listImages.length == 20) {
        alertPicLimit();
    } else {
        var filepath = lineId + "_" + listImages.length;
        var currentData = new Date();

        var obj = { lineId: lineId, urlImage: filepath, urlImageSmall: filepath, submitDate: currentData, submitFrom: (platform ? platform : 'Line') };
        var objJsonData = JSON.stringify(obj);


        var objImage = { data: base64image, picname: filepath };
        var objJsonImage = JSON.stringify(objImage);

        sendData(objJsonData, objJsonImage);
        changePage("divUpload");
    }
}
function encodeImageFileAsURL(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT', reader.result)
        base64image = reader.result;
    }
    reader.readAsDataURL(file);
}
function changePage(i) {
    var divPage = document.getElementById(i);
    divPage.style.display = 'none';
    var divThankyou = document.getElementById('divThankyou');
    divThankyou.style.display = 'block';
}
var loadFile = function (event) {
    validateSize(event);

    encodeImageFileAsURL(event);
    console.log(event);
    var output = document.getElementById('OutputImg');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }

    document.getElementById("btnUploadImg").src = "img/aw/Re_Upload_Button-1.png";

};
function validateSize(input) {
    const fileSize = input.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 3) {

        alert('File size exceeds 2 MiB');
        // $(file).val(''); //for clearing with Jquery
    } else {
        // Proceed further
    }
}

function alertPicLimit() {
    Swal.fire({
        position: 'top',
        imageUrl: 'img/aw/campaign_logo.png',
        title: "<p style='text-align:center'><span style='color:red;'>ขออภัย</span> ท่านได้ทำการอัปโหลดรูปภาพครบตามจำนวนแล้ว</p>",
        text: "ขอบคุณที่ร่วมกิจกรรม",
        showCloseButton: true,
        confirmButtonClass: 'customSweetAlertConfirmButton',
        confirmButtonText: 'Close'

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
    })
}
