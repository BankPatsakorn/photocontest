// $(function () {
//   getUserImages();
// });

var data = '[{"id": 1,"funcCampaign": "PhotoContest","userId": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","lineId": "Ue543604560f7aae69251d07f6ebefe4e","isFinal": false,"urlImage": "photocontest.png","urlImageSmall": "photocontest.png","submitDate": "2021-11-20T14:41:20.973Z","submitFrom": "line","createBy": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","createDate": "2021-11-20T14:41:28.020Z","updateBy": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","updateDate": "2021-11-20T14:41:28.020Z"},{"id": 2,"funcCampaign": "PhotoContest","userId": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","lineId": "Ue543604560f7aae69251d07f6ebefe4e","isFinal": false,"urlImage": "photocontest.png","urlImageSmall": "photocontest.png","submitDate": "2021-11-20T15:25:11.373Z","submitFrom": "line","createBy": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","createDate": "2021-11-20T15:25:19.397Z","updateBy": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","updateDate": "2021-11-20T15:25:19.397Z"},{"id": 3,"funcCampaign": "PhotoContest","userId": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","lineId": "Ue543604560f7aae69251d07f6ebefe4e","isFinal": false,"urlImage": "photocontest.png","urlImageSmall": "photocontest.png","submitDate": "2021-11-20T15:25:22.343Z","submitFrom": "line","createBy": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","createDate": "2021-11-20T15:25:24.077Z","updateBy": "523E302E-1F1F-4EA9-A982-27DC9A208FAF","updateDate": "2021-11-20T15:25:24.077Z"}]';
var listImages;//test

function getUserImages(objJsonData) {
   
  $.ajax({
    url: "https://dev.toyotaprofiling.com/api/photocontest-result/getimage",
    method: "POST",
    data: objJsonData,
    dataType: 'json',
    contentType: "application/json",
    success: function (result) {
      console.log('success : ' + result);
      var dataList = JSON.stringify(result);
      listImages = JSON.parse(dataList);
      document.getElementById("numpic").innerHTML = "("+listImages.length+"/20)";
    
      var stringHtml = "";
      listImages.forEach(element => {
        $('#sectionPictures').slick('slickAdd',"<div><img src='https://dev.toyotaprofiling.com/photocontest2021/result_AW/"+ element.urlImageSmall +"' height='60'></div>");
      });
    
      for(let i=0; i<20-listImages.length; i++){
   
        $('#sectionPictures').slick('slickAdd',"<div><img src='img/aw/empty_pic.jpg' height='60'></div>");
    
      }
      spinner.hide();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log('Error:' + errorThrown); 
      spinner.hide();
    }
  });
}
function sendData(objJsonData, jsonImgBase64, jsonImgSmallBase64) {
  console.log(jsonImgBase64);
  $.ajax({
    url: "https://dev.toyotaprofiling.com/api/photocontest/upload",
    method: "POST",
    data: jsonImgBase64,
    dataType: 'json',
    contentType: "application/json",
    success: function (result) {
      //callSaveData(objJsonData);
      console.log('success upload file');
      uploadSmallImage(objJsonData, jsonImgSmallBase64);
      //spinner.hide();
      return true;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      callSaveData(objJsonData);//Test only
      console.log('Error upload file:' + errorThrown);
      spinner.hide();
      return false;
    }
  });
}
function uploadSmallImage(objJsonData,jsonImgSmallBase64) {
  console.log(jsonImgBase64);
  $.ajax({
    url: "https://dev.toyotaprofiling.com/api/photocontest/upload",
    method: "POST",
    data: jsonImgSmallBase64,
    dataType: 'json',
    contentType: "application/json",
    success: function (result) {
      callSaveData(objJsonData);
      console.log('success upload file');
      //spinner.hide();
      return true;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      callSaveData(objJsonData);//Test only
      console.log('Error upload file:' + errorThrown);
      spinner.hide();
      return false;
    }
  });
}
function callSaveData(jsonData) {
  $.ajax({
    url: "https://dev.toyotaprofiling.com/api/photocontest-result/submit",
    method: "POST",
    data: jsonData,
    dataType: 'json',
    contentType: "application/json",
    success: function (result) {
      console.log('success');
      spinner.hide();
      liff.closeWindow();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log('Error:' + errorThrown);
      spinner.hide();
    }
  });
}
// function uploadImageFile(base64string){
//   console.log(base64string);
//   $.ajax({
//     url: "url",
//     method: "POST",
//     data: base64string,
//     dataType: 'json',
//     contentType: "application/json",
//      success: function(result){
//         console.log('success upload file');
//         return true;
//      },
//      error: function(XMLHttpRequest, textStatus, errorThrown){

//          console.log('Error upload file:'+errorThrown);
//          return false;
//      }
// });

// }