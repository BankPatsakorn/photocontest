function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api

            if (!liff.isLoggedIn()) {
                liff.login({ redirectUri: window.location.href });
            }

            initializeApp()

        })
        .catch((err) => {
            console.log(err.code, err.message);
        })
}

function loadCampaignMaster() {
    $.ajax({
        url: `${apiEndpoint}/campaign-master?func_campaign=Fortune Telling`,
        type: 'GET',
        success: function (data) {
            data.filter(d => d.sub_campaign == "status").forEach(element => {
                if (element.is_active == 1) {
                    $("#formGroupStatus").append(`
                    <div class="form-check">
                                        <input id="status_${element.ordering}" required class="form-check-input" type="radio" name="status" name="radioStatus" value="${element.ordering}" data-campaign_master_id="${element.id}" data-status_name="${element.name_th}">
                                        <label class="form-check-label" for="status_${element.ordering}">
                                            ${element.name_th}
                                        </label>
                                    </div>
                    `)
                }

            });

            data.filter(d => d.sub_campaign == "lifestyle").forEach(element => {
                if (element.is_active == 1) {
                    $("#formGroupLifestyle").append(`
                <div class="form-check">
                                    <input id="lifestyle_${element.ordering}" required class="form-check-input" type="radio" name="lifestyle" value="${element.ordering}" data-campaign_master_id="${element.id}" data-lifestyle_name="${element.name_th}">
                                    <label class="form-check-label" for="lifestyle_${element.ordering}">
                                    ${element.name_th}
                                    </label>
                                </div>
                `)
                }
            });
        },
        error: function (data) {
            if (data.status == 422) {
                if (data.responseJSON.error.code == "USERS_LINE_ID_NOT_FOUND") {
                    // window.location.href = profilingPath;
                }
            }
            // 
            console.log(data.responseJSON)
        }
    });
}

function initializeApp() {

    loadCampaignMaster()



    liff.getProfile()
        .then(profile => {
            $.ajax({
                url: `${apiEndpoint}/users/line?line_id=${profile.userId}`,
                type: 'GET',
                success: function (userData) {
                    // Set birthdate by profile data
                    flatpickr(("#inputBirthDate")).setDate(userData.birthDate)
                    initFlatpickr()

                    $("#btnSubmit").click(function () {

                        if ($('#formSubmit').valid()) { //checks if it's valid
                            // it's valid
                        } else {
                            Swal.fire({
                                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                                type: 'error',
                                customClass: {
                                    confirmButton: 'btn py-2 btn-primary'
                                }
                            })
                            return
                        }


                        var formData = {
                            birthDate: $("#inputBirthDate").val(),
                            status: $("input:radio[name ='status']:checked").val(),
                            lifestyle: $("input:radio[name ='lifestyle']:checked").val()
                        }
                        let status_campaign_master_id = $("input:radio[name ='status']:checked").data("campaign_master_id")
                        let lifestyle_campaign_master_id = $("input:radio[name ='lifestyle']:checked").data("campaign_master_id")
                        let zodiacIndex = getZodiacIndex(formData.birthDate)
                        let campaign_result_id = `${formData.lifestyle}${zodiacIndex}${formData.status}`

                        let zodiac = zodiacList.find(zl => zl.index == zodiacIndex)

                        let status_name = $("input:radio[name ='status']:checked").data("status_name")
                        let lifestyle_name = $("input:radio[name ='lifestyle']:checked").data("lifestyle_name")



                        if (typeof userData.error !== 'undefined') {
                            if (userData.error.code == "USERS_LINE_ID_NOT_FOUND") {
                                window.location.href = profilingPath;
                                return
                            }
                        }

                        $.ajax({
                            url: `${apiEndpoint}/user-campaign-result`,
                            type: 'POST',

                            data: JSON.stringify({
                                "func_campaign": "Fortune telling",
                                "user_id": userData.userId,
                                "line_id": profile.userId,
                                "confirm_birthdate": $("#inputBirthDate").val(),
                                "user_zodiac": zodiac.name_th,
                                "sub_campaign_status": status_campaign_master_id,
                                "status_name": status_name,
                                "sub_campaign_lifestyle": lifestyle_campaign_master_id,
                                "lifestyle_name": lifestyle_name,
                                "campaign_result_id": campaign_result_id,
                                "submit_date": new Date(),
                                "create_by": profile.userId,
                            }),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                liff.closeWindow();

                            },
                            error: function (data) {


                            }
                        });
                    })
                },
                error: function (data) {

                    // 
                    console.log(data.responseJSON)
                }
            });
        })
        .catch((err) => {
            console.log('error', err);
        });



    function getZodiacIndex(birthDate) {
        var result = ""
        var compareDate = moment(birthDate.substr(5), "MM-DD")
        $.each(zodiacList, function (key, val) {
            if (compareDate.isBetween(moment(val.startDate, "MM-DD"), moment(val.endDate, "MM-DD"), 'days', '[]')) {
                result = val.index
            }
        })
        return result
    }

    function getZodiacName(birthDate) {
        var result = ""
        var compareDate = moment(birthDate.substr(5), "MM-DD")
        $.each(zodiacList, function (key, val) {
            if (compareDate.isBetween(moment(val.startDate, "MM-DD"), moment(val.endDate, "MM-DD"), 'days', '[]')) {
                result = val.th_name
            }
        })
        return result
    }





}

$(function () {


    initializeLiff(liffId)

    // jQuery validate
    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });


})

function initFlatpickr() {
    // init flatpicker
    var fp = flatpickr(document.querySelector('.flat-picker'), {
        altFormat: "Y-m-d",
        altInput: true,
        disableMobile: "true",
        maxDate: "today",
    });

    $(".icon-date-picker").click(function () {
        $(".flat-picker").click()
    })

    $('.flat-picker.input:visible').prop('readonly', false)
}