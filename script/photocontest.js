var base64image = "";
var base64imageSmall = "";
var base64imageLg = "";
const urlParams = new URLSearchParams(window.location.search);
const lineId = urlParams.get('lineId');//"Ue543604560f7aae69251d07f6ebefe4e";
const platform = urlParams.get('platform');//"Line";
var fileType = "";
var urlStorage = "https://tcaplinephotocontent.blob.core.windows.net/photocontest2021/";

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
    if (listImages.length == 20) {
        alertPicLimit();
    } else {
        if (document.getElementById('OutputImg').getAttribute('src') === 'img/aw/empty_pic.jpg') {
            alertUploadPic();
        } else {

            loading();
            var filepath = lineId + "_" + listImages.length;
            var filepathsmall = lineId + "_sm_" + listImages.length;
            var urlFileOriginal = urlStorage + filepath + "." + fileType;
            var urlFileSmall = urlStorage + filepathsmall + ".jpeg";
            var currentData = new Date();

            var obj = { lineId: lineId, urlImage: urlFileOriginal, urlImageSmall: urlFileSmall, submitDate: currentData, submitFrom: (platform ? platform : 'Line') };
            var objJsonData = JSON.stringify(obj);


            var objImage = { data: base64image, picname: filepath };
            var objJsonImage = JSON.stringify(objImage);

            var objImageSmall = { data: base64imageSmall, picname: filepathsmall };
            var objJsonImageSmall = JSON.stringify(objImageSmall);

            sendData(objJsonData, objJsonImage, objJsonImageSmall);


        }
    }


}
function encodeImageFileAsURL(event) {

    let output = document.getElementById('resize');
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");


    canvas.width = 128; // target width
    canvas.height = 128; // target height

    console.log(event);
    let file = event.target.files[0];
    fileType = event.target.files[0].name.split('.').pop().toLowerCase();
    if (fileType == "jpg") {
        fileType = "jpeg";
    }


    console.log("fileType : " + fileType);
    let reader = new FileReader();
    reader.onloadend = function () {
        console.log('RESULT', reader.result)
        //console.log('width', reader.width)
        base64image = reader.result;

        let srcData = reader.result; // <--- data: base64
        let newImage = document.createElement('img');
        let img = document.createElement('img');
        newImage.src = srcData;
        img.src = srcData;
        //Resize Small
        newImage.onload = function (e) {

            ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            // create a new base64 encoding       
            console.log('RESULT Resize', canvas.toDataURL("image/jpeg"))
            output.src = canvas.toDataURL("image/jpeg");
            base64imageSmall = canvas.toDataURL("image/jpeg");
        };



    }
    reader.readAsDataURL(file);
}


function encodeImageFileAsURL2(event) {

    let output = document.getElementById('resize2');
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    console.log(event);
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onloadend = function () {

        base64image = reader.result;

        let srcData = reader.result; // <--- data: base64
        let newImage = document.createElement('img');
        let img = document.createElement('img');
        newImage.src = srcData;
        img.src = srcData;
        //Resize Lg
        newImage.onload = function (e) {
            canvas.width = newImage.width * 0.5;
            canvas.height = newImage.height * 0.5;
            //   
            ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            // create a new base64 encoding       
            console.log('RESULT Resizelg', canvas.toDataURL("image/jpeg"))
            output.src = canvas.toDataURL("image/jpeg");
            base64image = canvas.toDataURL("image/jpeg");
            fileType = "jpeg";
        };
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
    if (listImages.length == 20) {
        alertPicLimit();
    } else {
        var fileSize = event.target.files[0].size / 1024 / 1024;
        if (fileSize >= 10) {
            alertPicLimitSize();
        } else {
            encodeImageFileAsURL(event);
            if (fileSize > 3 && fileSize < 10) {
                encodeImageFileAsURL2(event);//resize original by divided 2
            }
            var output = document.getElementById('OutputImg');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function () {
                URL.revokeObjectURL(output.src) // free memory
            }

            document.getElementById("btnUploadImg").src = "img/aw/Re_Upload_Button-1.png";
        }
    }
};
// function validateSize(input) {
//     const fileSize = input.target.files[0].size / 1024 / 1024; // in MiB
//     //fileSize > 5 ให้ย่อรูปลง /2
//     if (fileSize > 3 && fileSize < 10) {
//         encodeImageFileAsURL2(input);
//         //alert('File size exceeds 2 MiB');
//         // $(file).val(''); //for clearing with Jquery
//     } else {
//         // Proceed further
//         alertPicLimitSize();
//     }
// }

function alertPicLimit() {
    Swal.fire({
        position: 'top',
        imageUrl: 'img/aw/campaign_logo.png',
        title: "<p style='text-align:center'><span style='color:red;'>ขออภัย</span> ท่านได้ทำการอัปโหลด<br/>รูปภาพครบตามจำนวนแล้ว<br/><br/>ขอบคุณที่ร่วมกิจกรรม</p>",
        text: "",
        showCloseButton: true,
        confirmButtonClass: 'customSweetAlertConfirmButton',
        confirmButtonText: 'Close'

    }).then((result) => {
        closeWindow();
        /* Read more about isConfirmed, isDenied below */
    })
}

function alertPicLimitSize() {
    Swal.fire({
        position: 'top',
        imageUrl: 'img/aw/campaign_logo.png',
        title: "<p style='text-align:center'><span style='color:red;'>ขออภัย</span> ท่านได้ทำการอัปโหลด<br/>รูปภาพเกินขนาดที่กำหนด<br/></p>",
        text: "",
        showCloseButton: true,
        confirmButtonClass: 'customSweetAlertConfirmButton',
        confirmButtonText: 'Close'

    }).then((result) => {
        //closeWindow();
        /* Read more about isConfirmed, isDenied below */
    })
}

function alertUploadPic() {
    Swal.fire({
        position: 'top',
        imageUrl: 'img/aw/campaign_logo.png',
        title: "<p style='text-align:center;line-height:30px;'><span style='color:red;'>ขออภัย</span><br/> กรุณาอัปโหลดรูปภาพ</p>",
        text: "",
        showCloseButton: true,
        confirmButtonClass: 'customSweetAlertConfirmButton',
        confirmButtonText: 'Close'

    }).then((result) => {
        //closeWindow();
        /* Read more about isConfirmed, isDenied below */
    })
}

function closeWindow() {
    liff.closeWindow();
}