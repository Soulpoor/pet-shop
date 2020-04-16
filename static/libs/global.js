(function(){
    $(document.body).on('SIGN_IN_SUCCESS', function(event, data) {
        //
        $.ajaxSetup({
            headers:{"Authorization": data.token},
        });
        // 
        $(document.body).trigger($.Event("AJAX_READY"));
    });

    // $(document).ajaxSuccess(function( event, xhr, settings ) {
    //     const currentListerTarget   = event.currentTarget.activeElement.id;
    //     const currentResponseData   = xhr.responseJSON;
    //     const currentResponseStatus = xhr.status;
    //     console.log(">> [Ajax-Success]: ", currentListerTarget, currentResponseStatus, currentResponseData);
    // });

    // $( document ).ajaxSend(function( event, request, settings ) {
    //     console.log(">> Ajax-send-request", settings);
    // });

})();