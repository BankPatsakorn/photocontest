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

function initializeApp() {
    var platform = getParameterFromUrl('platform');
    var profilingPath = getProfilingUrlByPlatform(platform);

    $(document).ready(function () {
        var funcCampaign = getParameterFromUrl('funcCampaign');
        var subject = getParameterFromUrl('subject');
        $.ajax({
            url: `${apiEndpoint}/api/campaign-terms-privacy/${funcCampaign}/${subject}`,
            type: 'GET',
            success: function (response) {
                var data = response.data;
                if (data != null) {
                    $("#terms-content").html(response.data.content);
                } else {
                    $("#terms-content").html('');
                }
            },
            error: function (data) {
            }
        });
    });

    $("#btnAccept").click(function () {
        liff.getProfile()
            .then(profile => {

                $.ajax({
                    url: `${apiEndpoint}/api/users/line/${profile.userId}`,
                    type: 'GET',
                    success: function (userData) {
                        if (typeof userData.error !== 'undefined') {
                            if (userData.error.code == "USERS_LINE_ID_NOT_FOUND") {
                                window.location.href = profilingPath;
                                return
                            }
                        }

                        $.ajax({
                            url: `${apiEndpoint}/api/campaign-user-consent`,
                            type: 'POST',

                            data: JSON.stringify({
                                "funcCampaign": "Photobooth",
                                "lineId": profile.userId,
                                "termsVersion": 1,
                                "confirmConsent": true,
                                "confirmDate": new Date(),
                                "createBy": userData.userId
                            }),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                window.location.href = `photobooth.html?platform=${platform}&lineId=${profile.userId}`;
                            },
                            error: function (data) {
                            }
                        });
                    },
                    error: function (data) {
                        const response = data.responseJSON
                        if (response.error && response.error.code == "USERS_LINE_ID_NOT_FOUND") {
                            window.location.href = profilingPath;
                            return;
                        }
                    }
                });

            })
            .catch((err) => {
                console.log('error', err);
            });
    })
}

$(function () {
    initializeLiff(liffId)
})