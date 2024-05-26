/* ==== variables ==== */


document.getElementById('theForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = document.getElementById('theForm');
    

    var email = document.getElementById('email').value;
    var verifyEmail = document.getElementById('verifyMail').value;
    var messageMail = document.getElementById('messageMail');
    
    var contraseña = document.getElementById("password").value;
    var messagePassword = document.getElementById('messagePassword');
    var conconfirmPassword = document.getElementById('confirmPassword').value;

    var mensaje = document.getElementById("characteresPassword");
    var tieneAlMenos8Caracteres = contraseña.length >= 8;
    var tieneMayuscula = /[A-Z]/.test(contraseña);
    var tieneNumero = /\d/.test(contraseña);


    messageMail.style.display = 'none';
    messagePassword.style.display = 'none';
    mensaje.style.display = 'none';


    if (email !== verifyEmail) {
        messageMail.style.display = 'flex';

    } else if (!tieneAlMenos8Caracteres || !tieneMayuscula || !tieneNumero) {
        mensaje.style.display = "flex";

    } else if (contraseña !== conconfirmPassword) {
        messagePassword.style.display = 'flex';

    } else {
        form.action = "/register"
        form.submit();
    }

});

    
/* === Verificar correo ==== */