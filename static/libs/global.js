$(document).ajaxSuccess(function( event, xhr, settings ) {
    const currentListerTarget   = event.currentTarget.activeElement.id;
    const currentResponseData   = xhr.responseJSON;
    const currentResponseStatus = xhr.status;

    if (currentResponseData.token && currentResponseStatus) {
        // $.ajaxSetup({
        //     headers:{"Authorization": currentResponseData.token},
        // });
    }

    console.log(">> [Ajax-Success]: ", currentListerTarget, currentResponseStatus, currentResponseData);
});