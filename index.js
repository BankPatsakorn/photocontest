function initializeLiff(myLiffId) {

    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp()
        })
        .catch((err) => {
            console.log(err.code, err.message);
            window.alert(err.message);
        })
}

function initializeApp() {

    if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
    }

    liff.getProfile()
        .then(profile => {
            var platform = getParameterFromUrl('platform');
            var profilingPath = getProfilingUrlByPlatform(platform);

            $.ajax({
                url: `${apiEndpoint}/api/users/line/${profile.userId}`,
                type: 'GET',
                success: function (data) {
                    if (typeof data.error !== 'undefined') {
                        if (data.error.code == "USERS_LINE_ID_NOT_FOUND") {
                            window.location.href = profilingPath;
                            return
                        }
                    }

                    $.ajax({
                        url: `${apiEndpoint}/api/campaign-result-photobooth/exist?lineId=${profile.userId}`,
                        type: 'GET',
                        success: function (data) {
                            if (!data.exist) {
                                window.location.href = `terms.html?funcCampaign=Photocontest&subject=terms_and_condition&platform=${platform}`
                            }
                            else {
                                // exist
                                console.log('user completed a question');
                                liff.closeWindow();
                            }
                        },
                        error: function (data) {
                            try {
                                console.log('error found on get photocontest result exist : ', data.responseJSON);
                            } finally {
                                liff.closeWindow();
                            }
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
}

window.onload = function () {
    initializeLiff(liffId)
}