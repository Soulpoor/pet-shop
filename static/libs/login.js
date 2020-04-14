$(document).ready(function(){

    // sign-in
    $("#SignInButton").click(function(){
        
        var username = $('#username').val();
        var passwd = $('#passwd').val();

        $.get(`http://localhost:8080/login?name=${username}&password=${passwd}`, function(data, status){
            if (data.success) {
                // 
                window.localStorage.setItem('token', data.token);
                //
                $('#login-container').addClass('login-container-none');
                $('#data-grid').removeClass('data-grid-none');
                // read data
                $.get(`http://localhost:8080/fetchAnimals`, function(data, status) {
                    console.log(">> fetch data: ", data);
                })
            } else {
                $('#login-alert').html(data.result);
                $('#login-alert').removeClass('d-none');
            }
        })
    });

    // sign-up
    $('#SignUpButton').click(function(){

        var username = $('#username').val();
        var passwd = $('#passwd').val();

        var isConfirm = window.confirm(`Are you confirm to register by ${username}`);

        if (isConfirm) {
            $.get(`http://localhost:8080/reg?name=${username}&password=${passwd}`, function(data, status){
                if (data.success) {
                    //
                    $('#login-container').addClass('login-container-none');
                    $('#data-grid').removeClass('data-grid-none');
                    //
                } else {
                    $('#login-alert').html(data.result);
                    $('#login-alert').removeClass('d-none');
                }
            })
        }
    });

});