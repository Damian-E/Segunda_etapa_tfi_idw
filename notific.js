document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('consulta');
    const elementoToast = document.getElementById('toastconsul');

    if (formulario && elementoToast) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();

            if (formulario.checkValidity()) {
                const unToast = new bootstrap.Toast(elementoToast);
                unToast.show();

                formulario.reset();
                formulario.classList.remove('was-validated');
            } else {
                evento.stopPropagation();
                formulario.classList.add('was-validated');
            }
        });
    }
});