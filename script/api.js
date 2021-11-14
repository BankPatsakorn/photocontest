$(function () {
  getCarModel();
});

function getCarModel() {
  //$.getJSON("https://jsonplaceholder.typicode.com/posts",
  // $.getJSON("./carmodel.json",
  //     function(data) {
  //         console.info(data);    
  //         $('#ddlCarModel').append(
  //             data.map(function(v) {
  //               return $('<option/>', {
  //                 value: v.id,
  //                 text: v.name_th
  //               })
  //             })
  //           ).change(function() {
  //             console.log(this.value);
  //           });     
  // });
  var mydata = JSON.parse(data);
  const result = mydata.filter((x) => {
    return x.is_active == 1;
  })
  $('#ddlCarModel').append(
    result.map(function (v) {
      return $('<option/>', {
        value: v.id,
        text: v.name_th
      })
    })
  ).change(function () {
    console.log(this.value);
  });
}
function sendData(jsonData, jsonImgBase64) {
  //console.log(jsonImgBase64);
  $.ajax({
    url: "https://www.toyotaprofiling.com/api/photoboothx/upload",
    method: "POST",
    data: jsonImgBase64,
    dataType: 'json',
    contentType: "application/json",
    success: function (result) {
      callSaveData(jsonData);
      console.log('success upload file');
      return true;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      callSaveData(jsonData);//Test only
      console.log('Error upload file:' + errorThrown);
      return false;
    }
  });
}
function callSaveData(jsonData) {
  $.ajax({
    url: "https://www.toyotaprofiling.com/api/campaign-result-photobooth/submit",
    method: "POST",
    data: jsonData,
    dataType: 'json',
    contentType: "application/json",
    success: function (result) {
      console.log('success');
      liff.closeWindow();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log('Error:' + errorThrown);
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