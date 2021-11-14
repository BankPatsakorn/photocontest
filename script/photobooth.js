const urlParams = new URLSearchParams(window.location.search);
const lineId = urlParams.get('lineId');
const platform = urlParams.get('platform');
var selectedModel = "0";
var selectedImagePositionX = 0;
var selectedImagePositionY = 0;
var selectedImageWidth = 0;
var selectedImageHeight = 0;
var selectedFrame = 1;

var textPositionX = 0;
var textPositionY = 0;
$( function() {
    $(".draggableArea .draggableAreaIn").draggable({ containment: ".draggableArea",
    drag: function() {
        var offset = $(this).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        textPositionX = xPos;
        textPositionY = yPos;
        //console.log("X" + textPositionX);
        //console.log("Y" + textPositionY);
    } });
  
    // $(".draggableArea .draggableAreaIn").draggable({ containment: ".draggableArea",
    // drag: function() {
    //     var offset = $(this).offset();
    //     var xPos = offset.left;
    //     var yPos = offset.top;
    //     textPositionX = xPos;
    //     textPositionY = yPos;
    //     console.log("X" + textPositionX);
    //     console.log("Y" + textPositionY);
    // } }).resizable({ containment: ".draggableArea", handles: {'nw':'#nwgrip','ne':'#negrip','sw':'#swgrip','se':'#segrip','n':'#ngrip', 'e':'#egrip', 's':'#sgrip', 'w':'#wgrip'},
    // resize: function(e, ui) {
    //  //   console.log(ui.size.height);
    // //   console.log(ui.size.width);
    // } });
    $(".draggableAreaFrame1 .draggableAreaInFrame").draggable({ containment: ".draggableAreaFrame1",
    drag: function() {
        var offset = $(this).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        selectedImagePositionX = xPos;
        selectedImagePositionY = yPos;
        //console.info("drag");
    }}).resizable({containment: ".draggableAreaFrame1", minHeight:260, minWidth: 200, handles: {'nw':'#nwgrip','ne':'#negrip','sw':'#swgrip','se':'#segrip','n':'#ngrip', 'e':'#egrip', 's':'#sgrip', 'w':'#wgrip'},
    resize: function(e, ui) {
        // $(this).draggable("disable");
        selectedImageWidth = ui.size.width;
        selectedImageHeight = ui.size.height;
        console.info("resize");
       // console.info("resize w" + ui.size.width);
        //console.info("resize h" + ui.size.height);
    } });
    $(".draggableAreaFrame2 .draggableAreaInFrame").draggable({ containment: ".draggableAreaFrame2" ,
    drag: function() {
        var offset = $(this).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        selectedImagePositionX = xPos;
        selectedImagePositionY = yPos;
    }}).resizable({ containment: ".draggableAreaFrame2", minHeight:260, minWidth: 200, handles: {'nw':'#nwgrip','ne':'#negrip','sw':'#swgrip','se':'#segrip','n':'#ngrip', 'e':'#egrip', 's':'#sgrip', 'w':'#wgrip'},
    resize: function(e, ui) {
        selectedImageWidth = ui.size.width;
        selectedImageHeight = ui.size.height;
    } });
    $(".draggableAreaFrame3 .draggableAreaInFrame").draggable({ containment: ".draggableAreaFrame3" ,
    drag: function() {
        var offset = $(this).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        selectedImagePositionX = xPos;
        selectedImagePositionY = yPos;
    }}).resizable({ containment: ".draggableAreaFrame3", minHeight:260, minWidth: 200, handles: {'nw':'#nwgrip','ne':'#negrip','sw':'#swgrip','se':'#segrip','n':'#ngrip', 'e':'#egrip', 's':'#sgrip', 'w':'#wgrip'},
    resize: function(e, ui) {
        selectedImageWidth = ui.size.width;
        selectedImageHeight = ui.size.height;
    } });
    $(".draggableAreaFrame4 .draggableAreaInFrame").draggable({ containment: ".draggableAreaFrame4" ,
    drag: function() {
        var offset = $(this).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        selectedImagePositionX = xPos;
        selectedImagePositionY = yPos;
    }}).resizable({ containment: ".draggableAreaFrame4", minHeight:260, minWidth: 200, handles: {'nw':'#nwgrip','ne':'#negrip','sw':'#swgrip','se':'#segrip','n':'#ngrip', 'e':'#egrip', 's':'#sgrip', 'w':'#wgrip'},
    resize: function(e, ui) {
        selectedImageWidth = ui.size.width;
        selectedImageHeight = ui.size.height;
    } });
    $(".draggableAreaFrame5 .draggableAreaInFrame").draggable({ containment: ".draggableAreaFrame5" ,
    drag: function() {
        var offset = $(this).offset();
        var xPos = offset.left;
        var yPos = offset.top;
        selectedImagePositionX = xPos;
        selectedImagePositionY = yPos;
    }}).resizable({ containment: ".draggableAreaFrame5", minHeight:260, minWidth: 200, handles: {'nw':'#nwgrip','ne':'#negrip','sw':'#swgrip','se':'#segrip','n':'#ngrip', 'e':'#egrip', 's':'#sgrip', 'w':'#wgrip'},
    resize: function(e, ui) {
        selectedImageWidth = ui.size.width;
        selectedImageHeight = ui.size.height;
    } });
    document.getElementById("txtCaptureOnImage").innerHTML =  document.getElementById("txtTextCapture").value;
    document.getElementById("txtTextCapture").addEventListener('input', textCapture);
   
    // imageToBase64(document.getElementById("imgframe1"));
    // imageToBase64(document.getElementById("imgframe2"));
    // imageToBase64(document.getElementById("imgframe3"));
    // imageToBase64(document.getElementById("imgframe4"));
    // imageToBase64(document.getElementById("imgframe5"));

});

function nextCarousel(){
    clearPosition();
}
function previousCarousel(){
    clearPosition();
}
function clearPosition(){
    selectedImagePositionX = 0;
    selectedImagePositionY = 0;
    selectedImageWidth = 0;
    selectedImageHeight = 0;
    //console.info("Claer");
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.imgSelected')
                .attr('src', e.target.result)
                .width(350)
                .height(350);
        };
   
        reader.readAsDataURL(input.files[0]);
        ValidateSize(input);
    }
}
function ValidateSize(file) {
    var FileSize = file.files[0].size / 1024 / 1024; // in MiB
    if (FileSize > 5) {
        $(file).val(''); //for clearing with Jquery
        document.getElementById('lblFilename').innerHTML = "Choose file";
        Swal.fire({
            title: 'อัพโหลดรูปได้ไม่เกิน 5 MB',
            text: '',
            confirmButtonText: 'ปิด'
          });
    } else {

    }
}
function pageControl(i){
   
    if(validateUploadPage() == true){
        //Pass validate
    var divPage = document.getElementById(i);
    divPage.style.display='block';

    
    var divUpload = document.getElementById('divUpload');
    var divFrame = document.getElementById('divFrame');
    var divText = document.getElementById('divText');

        switch (i){
            case "divUpload":
                divFrame.style.display='none';
                divText.style.display='none';
              break;
            case "divFrame":
               
                showBorder("draggableAreaInFrame");
                // $("#draggableHelper").draggable({containment: "carousel-item"})
                // $("#image2").resizable({containment: "carousel-item"});
                divUpload.style.display='none';
                divText.style.display='none';
              break;
            case "divText":
                hideBorder("draggableAreaInFrame");
                PrintDiv();
               // showBorder("draggableAreaIn");
                divUpload.style.display='none';
                //divFrame.style.display='none';
              break;
            default:
                divUpload.style.display='block';
                divFrame.style.display='none';
                divText.style.display='none';
        }
    }else{
        //showFirstPage();
        Swal.fire({
            title: 'กรุณากรอกข้อมูลให้ครบ',
            text: '',
            confirmButtonText: 'ปิด'
          });
    }
 
}
function showFirstPage(){
    location.reload();
}
function validateUploadPage(){ 
    var inputFile = $('#customFile').val();

    selectedModel = document.getElementById("ddlCarModel").value;
    if(inputFile != '' && (selectedModel != "0")){
        return true;
    }else{
        return false;
    }
}
function validateFramePage(){
    return true;
}
function validateTextPage(){
    return true;
}

$('input[type="file"]').change(function(e){
    if(e.target.files[0]){

        var fileName = e.target.files[0].name;
        $('.custom-file-label').html(fileName);
      
        var ext = this.value.match(/\.([^\.]+)$/)[1];
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                    break;
                default:
                    Swal.fire({
                        title: 'อัพโหลดได้เฉพาะไฟล์รูปเท่านั้น',
                        text: '',
                        confirmButtonText: 'ปิด'
                      });
                    $('.custom-file-label').html('');
                    document.getElementById('lblFilename').innerHTML = "Choose file";
                    //imageSelected.style.display='none';
            }
    }
});

function textCapture(e){
    document.getElementById("txtCaptureOnImage").innerHTML = e.target.value;
    showBorder("draggableAreaIn");
    if(e.target.value.length == 0){
        hideBorder("draggableAreaIn");
    }
 }

 function changeTextColor(colorCode){
    document.getElementById("txtCaptureOnImage").style.color = colorCode;
    //document.getElementById("txtTextCapture").style.color = colorCode;
 }

 async function saveData(){
    showLoadingPopup();
    await hideBorder("draggableAreaIn");
    
    // document.getElementById("imgPhotobooth").width = 1122;
    // document.getElementById("imgPhotobooth").height = 1122;
    // $("#divTest").html($("#divAddText").html());
    //Create image and send data
    createFinalImageText();

    // var h = $("#divAddText")[0].ownerDocument.defaultView.innerHeight;
    // $("#divAddText")[0].ownerDocument.defaultView.innerHeight = $("#divAddText").height();

    // html2canvas($('#divAddText'), {
    //     onrendered: function (canvas) {
    //         $("#divAddText")[0].ownerDocument.defaultView.innerHeight = h;
    //         console.log("awef"+ canvas.toDataURL());
    //     }
    // });


    
//   html2canvas(document.querySelectorAll('.draggableArea'), { 
//       allowTaint: true,
//         taintTest: false, 
//         scale:3,
//         onrendered: function (canvas) {
//                //$("#finalImage").append(canvas);
//                document.getElementById("finalImage2").src = canvas.toDataURL();

//                var base64ImageFile = canvas.toDataURL();
            

//                //prepareData(base64ImageFile);
            
//                //alert(canvas.toDataURL());
//             },
//             width: document.querySelectorAll('.draggableArea').clientWidth,
//             height: document.querySelectorAll('.draggableArea').clientHeight
//         });
 }
 
function createFinalImageText(){
    var eleTextCapture = document.getElementById('txtTextCapture');
    var widthEleText = document.getElementsByClassName('draggableAreaIn')[0].offsetWidth;
    var heightEleText = document.getElementsByClassName('draggableAreaIn')[0].offsetHeight;
    var textLenght = 0;
    var heightCal = 130;
    var widthCal = 700;
           if(eleTextCapture.value){
             textLenght = eleTextCapture.value.length;
           }

           if(document.getElementById('txtCaptureOnImage').innerHTML != ""){
            html2canvas(document.querySelectorAll('.draggableAreaIn'), { allowTaint: true,taintTest: false,
                onrendered: function (canvas) {
                   // document.getElementById("finalImage").src = canvas.toDataURL();
                  
                    // if(widthEleText >= 150 && widthEleText < 180){
                    //     widthCal = 600;
                    //     heightCal = 400;
                    //     // if(textLenght < 10){
                    //     //     heightCal = 130;
                    //     // }else if(textLenght >=10 && textLenght < 20){
                    //     //     heightCal = 230;
                    //     // }else{
                    //     //     heightCal = 330;
                    //     // }
                    // }
                    if(widthEleText >= 200 && widthEleText < 250){
                        heightCal = 170;
                    }
                    if(widthEleText >= 250){
                        widthCal = widthEleText + 550;
                        heightCal = heightEleText + 190;
                    }
                    
                    console.info("Cal width"+widthCal + " Height:"+heightCal);
                //    if(textLenght < 24){
                //         heightCal = 130;
                //    }else if(textLenght > 25){
                //         heightCal = 230;
                //    }else{
                //         heightCal = 350;
                //    }
                   imageToDataUri(canvas.toDataURL(),widthCal,heightCal);
                }
            });
           }else{
                imageToDataUri("data:,",widthCal,heightCal);
           }
 
}
function imageToDataUri(datas, wantedWidth, wantedHeight)
{
    //console.log('String create imageToDataUri');
    if(datas != "data:,"){ 
        var img = document.createElement('img');
        img.onload = function()
            {        
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;
    
                ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
    
                var dataURI = canvas.toDataURL();
    
                createFinalImage(dataURI);
            };
    
        // We put the Data URI in the image's src attribute
        img.src = datas;
    }else{
        //alert("no text2");
        createFinalImage("");
    }
    
}
function createFinalImage(Textbase64ImageFile)
{
    if(Textbase64ImageFile != ""){

        var calPositionY = textPositionY;
        var calPositionX = textPositionX;
        if(textPositionY == 0 && textPositionX == 0){
            calPositionX = 80;
            calPositionY = 700;
        }else{
            //calPositionX = calPositionX * 2.2;
            if(calPositionX < 100){
                if(calPositionY > 350){
                    calPositionX *= 2.3;
                }else{
                    calPositionX *= 2.2;
                }

            }else {
                calPositionX *= 2.5;
                calPositionX += 50;
            };
    
            if(calPositionY < 200){
                calPositionY -= 60;
            }else {
                if(textPositionX < 100){
                    if(calPositionY > 250){
                        calPositionY *= 1.8;
                    }else{
                        calPositionY *= 1.3;
                    }
                    
                    
                }else{
                    if(calPositionY < 250){
                        calPositionY *= 1.4;

                    }else if(calPositionY >= 250 && calPositionY < 320){
                        calPositionY *= 1.7;

                    }else{
                        calPositionY *= 2;

                    }
                }
               
            };
        
        }
        console.log("sum x"+calPositionX + " Y:"+calPositionY);
        var photobase64ImageFile = document.getElementsByClassName("draggableArea")[0].style.backgroundImage;
        photobase64ImageFile = photobase64ImageFile.replace('url("','');
        photobase64ImageFile = photobase64ImageFile.replace('")','');
        mergeImages([
                { src: photobase64ImageFile, x: 0, y: 0 }, 
                { src: Textbase64ImageFile, x: calPositionX, y: calPositionY }
        ]).then(b64 =>    prepareData(b64));
    }else{
        var photobase64ImageFile = document.getElementsByClassName("draggableArea")[0].style.backgroundImage;
        photobase64ImageFile = photobase64ImageFile.replace('url("','');
        photobase64ImageFile = photobase64ImageFile.replace('")','');
        prepareData(photobase64ImageFile);
    }
              
      
    //console.log(document.getElementsByClassName("draggableArea")[0].style.backgroundImage.);
  
   // var div =  document.querySelectorAll('.draggableArea');
    // html2canvas(document.querySelectorAll('.draggableArea'), { allowTaint: true,
    //     taintTest: false,
    //     dpi:199,scale:2,
    //     onrendered: function (canvas) {
    //            //$("#finalImage").append(canvas);
    //            document.getElementById("finalImage").src = canvas.toDataURL();

    //            var base64ImageFile = canvas.toDataURL();
    //         

               
            
    //            //alert(canvas.toDataURL());
    //         }
    //     });
}
function prepareData(base64string){
    document.getElementById("finalImage").src = base64string;
    var filename = lineId;
    var filepath = "/site/wwwroot/public/photobooth2021/result_AW/"+ lineId +".png";
    //Image
    var objImage = { data:base64string, picname:filename};
    var objJsonImage = JSON.stringify(objImage);
    //Data
       
       var currentData = new Date();
       var obj = { lineId:lineId, carModelId: selectedModel,
       urlImage: filepath, submitDate: currentData,  submitFrom: platform };
       var JSONData = JSON.stringify(obj);
       console.info(JSONData);
   
       sendData(JSONData,objJsonImage);
}
function PrintDiv()
{
   
    var newDataUri = resizedataURL(document.querySelectorAll('.imgSelected.photo')[0].src,1100,1100);
   

//     html2canvas(document.querySelectorAll('.carousel-item.active'), {
//         allowTaint: true,
//   taintTest: false,
//   dpi:199,scale:2,
//       onrendered: function (canvas) {
//             // $("#previewImage").append(canvas);
//                // document.getElementById("finalImage").src = canvas.toDataURL();
//              document.getElementsByClassName("draggableArea")[0].style.backgroundImage ='url('+canvas.toDataURL()+')'
//             // var data = canvas.toDataURL("image/jpg");
// divFrame.style.display='none';
// showBorder("draggableAreaIn");
//              //console.log('canvas data: ', data); 
//           }
//       });
}
function resizedataURL(datas, wantedWidth, wantedHeight){
    //Default value
    if(selectedImageWidth == 0){
        selectedImageWidth = 310;
    }
    if(selectedImageHeight == 0){
        selectedImageHeight = 290;
    }
    if(selectedImagePositionX == 0){
        selectedImagePositionX= 25;
        if(screen.width >= 400){
            selectedImagePositionX= 50;
        }
    }
    if(selectedImagePositionY == 0){
        selectedImagePositionY=155;
    }
    
    console.info("screen.width  "+screen.width );
    console.info("selectedImageWidth "+selectedImageWidth);
    console.info("selectedImageHeight "+selectedImageHeight);
    if(selectedImageWidth < 200){
        selectedImageWidth = 200;
    }
    if(selectedImageHeight < 270){
        selectedImageHeight = 300;
    }
    wantedWidth = selectedImageWidth * 3.2; 
    wantedHeight = selectedImageHeight * 3.2;

    if(selectedImageHeight > 1100 || selectedImageWidth > 1100){
        wantedWidth = 1170;
        wantedHeight = 1170;
    }
    console.info("selectedImagePositionX "+selectedImagePositionX);
    console.info("selectedImagePositionY "+selectedImagePositionY);
  
    var positionX = selectedImagePositionX;
    var positionY = selectedImagePositionY;
    if(selectedImagePositionY <150){
        positionY = 0;//selectedImagePositionY-100;
    }
    else if(selectedImagePositionY >= 150 && selectedImagePositionY < 200){
        positionY = (selectedImagePositionY-65);//*1.8;
    }else {
        positionY = (selectedImagePositionY+70);//*1.8 ;
    };

    if(selectedImagePositionX < 100){
        positionX = positionX*2.6;
    }else if(selectedImagePositionX >= 100 && selectedImagePositionX < 200){
        positionX = positionX*2.8;
    }else {
        positionX = positionX*3 ;
    };
    //Small Screen
    if(screen.width < 400){
        if(selectedImagePositionX <= 25 && selectedImagePositionY <= 145){
            positionX = 10;
            wantedWidth -= 30;
            //wantedHeight += 10;
        }
        if(selectedImagePositionY >= 180 && selectedImagePositionY < 200){
            positionY += 30;
        }else if(selectedImagePositionY >= 200){
            positionY -= 40;
        }
        console.info("Small screen X "+positionX + " Y" + positionY);
    }
    //Bigger Screen
    if(screen.width >= 400){
        positionX = positionX - 55;
        wantedHeight -= 20;

        if(positionY != 0){
            positionY = positionY - 10;
        }
        if(selectedImagePositionX <= 60){
            positionX = positionX - 20; 
            positionY = positionY - 10;
        }else{
            positionY = positionY + 15;
        }
        if(selectedImagePositionY <= 150){
            positionY = positionY + 5;
        }else if(selectedImagePositionY >= 170 && selectedImagePositionY < 200){
            positionY = positionY + 25;
        }else if(selectedImagePositionY >= 200)
        {
            positionY = positionY - 25;
        }
        console.info("Big screen X "+positionX + " Y" + positionY);
    }
    //console.log("sum x:" + positionX + " y:" + positionY);
    return new Promise(async function(resolve,reject){

        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
        {        
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

            var dataURI = canvas.toDataURL();

            var getSourceImage = getPathFrame();
            // This is the return of the Promise
            resolve(dataURI);
            mergeImages([
                { src: dataURI, x: positionX, y: positionY },
                { src: getSourceImage, x: 0, y: 0 }
              
              ]).then(b64 => document.getElementsByClassName("draggableArea")[0].style.backgroundImage ='url('+b64+')');
                //.then(b64 => document.getElementById('imgPhotobooth').src = b64);
                //              document.getElementsByClassName("draggableArea")[0].style.backgroundImage ='url('+canvas.toDataURL()+')'
                    divFrame.style.display='none';
                    hideBorder("draggableAreaIn");
        };

        // We put the Data URI in the image's src attribute
        img.src = datas;

      
    })
}
function getPathFrame(){
    selectedFrame = document.querySelectorAll('.carousel-item.active')[0].id;
    var path = "";
    switch(selectedFrame){
        case "frame1" :
            path = "../photobooth2021/AW/Frame_1.png";
            break;
        case "frame2" :
            path = "../photobooth2021/AW/Frame_2.png";
            break;
        case "frame3" :
            path = "../photobooth2021/AW/Frame_3.png";
            break;
        case "frame4" :
            path = "../photobooth2021/AW/Frame_4.png";
            break;
        case "frame5" :
            path = "../photobooth2021/AW/Frame_5.png";
            break;
        default:
            path = "../photobooth2021/AW/Frame_1.png";
            break;
    }
   // path = "./img/AW/Frame_1.png";//Test
    return path;
}

function imageToBase64(img)
{
    if(img){

        var canvas, ctx, dataURL, base64;
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL("image/png");
        //alert(dataURL);
        base64 = dataURL.replace(/^data:image\/png;base64,/, "");
        return base64;
    }else{
        return "";
    }
}
 // Select the image

function hideBorder(id){
    var ele = document.getElementsByClassName("ui-resizable-handle");
    for(var i = 0; i < ele.length; i++)
    {
        ele[i].style = "width: 0px !important;height: 0px !important;border: 0px solid #000000 !important;";
    }
    var els = document.getElementsByClassName(id);
    for(var i = 0; i < els.length; i++)
    {
        els[i].style.borderColor = "transparent";
    }

   
 }
 function showBorder(id){
    var els = document.getElementsByClassName(id);
    for(var i = 0; i < els.length; i++)
    {
        els[i].style.borderColor = "orange";
    }

    var ele = document.getElementsByClassName("ui-resizable-handle");
    for(var i = 0; i < ele.length; i++)
    {
        ele[i].style = "width: 10px !important;height: 10px !important;border: 1px solid #000000 !important;";
    }
 }
 function showLoadingPopup() {
    let timerInterval
Swal.fire({
  title: 'กำลังอัพโหลดข้อมูล',
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
  };