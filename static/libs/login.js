(function(api){
    $(document).ready(function(){

        // sign-in
        $("#SignInButton").click(function(){
            
            var username = $('#username').val();
            var passwd = $('#passwd').val();

            $.get(`${api}/login?name=${username}&password=${passwd}`, function(data, status){
                if (data.success) {
                    // 
                    window.localStorage.setItem('token', data.token);
                    //
                    $('#login-container').addClass('d-none');
                    // Dispatch the SIGN_IN_SUCCESS event to document.body.
                    $(document.body).trigger($.Event("SIGN_IN_SUCCESS"), data);
                    
                } else {
                    $('#login-alert').html(data.result);
                    $('#login-alert').removeClass('d-none');
                }
            })
        });

        // sign-out
        $('#SignOutButton').click(function(){
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('pets');
            $('#login-container').removeClass('d-none');
            $('#data-grid-container').addClass('d-none');
        });

        // sign-up
        $('#SignUpButton').click(function(){

            var username = $('#username').val();
            var passwd = $('#passwd').val();

            var isConfirm = window.confirm(`Are you confirm to register by ${username}`);

            if (isConfirm) {
                $.get(`${api}/reg?name=${username}&password=${passwd}`, function(data, status){
                    if (!data.success) {
                        $('#login-alert').html(data.result);
                        $('#login-alert').removeClass('d-none');
                    }
                })
            }
        });

    });
})('http://localhost:8080');