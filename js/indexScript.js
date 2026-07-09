const actualForm = document.getElementById('actualForm');
const formContainer = document.getElementById('formContainer');
const successMessage = document.getElementById('success-message');

const subscribeBtn = document.getElementById('subscribeBtn');
const subscribeModal = document.getElementById('subscribeModal')
const closeModal = document.getElementById('closeModal')

subscribeBtn.addEventListener('click', (event) =>{
    subscribeModal.classList.add('open');
});

closeModal.addEventListener('click', (event) =>{
    subscribeModal.classList.remove('open');
});

actualForm.addEventListener('submit', (event)=>{

    event.preventDefault();

    const data = new FormData(event.target);

    fetch(event.target.action,{
        method: 'post',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if(response.ok){
            formContainer.style.display = 'none';
            successMessage.style.display = 'block';
            actualForm.reset();
        } else {
            alert('Ups! Algo salió mal, por favor intenta nuevamente.');
        }
    });

});

subscribeModal.addEventListener('click', (event) =>{
    if(event.target === subscribeModal){
        subscribeModal.classList.remove('open');
    }
});

// ==========================================
// EFECTO PARALLAX 
// ==========================================

if (window.innerWidth > 900) {
    document.addEventListener('mousemove', parallax);
}

function parallax(e){
    document.querySelectorAll('.object').forEach(function(move){

        var moving_value = move.getAttribute('data-value');
        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;

        // move.style.transform = 'translateX('+x+'px) translateY('+y+'px)';
        move.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    });
}

document.addEventListener('DOMContentLoaded', () =>{

    const preescena = document.querySelector('.preescena-content');
    const imgPreescena = document.querySelector('.preescena-content img');
    
    if (preescena && imgPreescena) {
        preescena.addEventListener('mousemove', (e) => {

            const bounds = preescena.getBoundingClientRect();
            
            const mouseX = (e.clientX - bounds.left) / bounds.width - 0.5;
            const mouseY = (e.clientY - bounds.top) / bounds.height - 0.5;
            
            const muevoX = mouseX * 25; 
            const muevoY = mouseY * 25;
            
            imgPreescena.style.transform = `scale(1.1) translate(${muevoX}px, ${muevoY}px)`;
        });
        
        preescena.addEventListener('mouseleave', () => {
            imgPreescena.style.transform = `scale(1) translate(0px, 0px)`;
        });
    }

    const formContacto = document.getElementById('form-contacto');

    if (formContacto){
        formContacto.addEventListener('submit', (e) => {
            
            e.preventDefault();

            const inputNombre = document.getElementById('nombre');
            const inputEmail = document.getElementById('email');
            const inputMensaje = document.getElementById('mensaje');

            const errorNombre = document.getElementById('error-nombre');
            const errorEmail = document.getElementById('error-email');
            const errorMensaje = document.getElementById('error-mensaje');

            let formularioValido = true;

            if (inputNombre.value.trim() === ""){
                errorNombre.classList.remove('hidden');
                inputNombre.classList.add('input-error');
                formularioValido = false;
            } else {
                errorNombre.classList.add('hidden');
                inputNombre.classList.remove('input-error');
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(inputEmail.value.trim())){
                errorEmail.classList.remove('hidden');
                inputEmail.classList.add('input-error');
                formularioValido = false;
            } else{
                errorEmail.classList.add('hidden');
                inputEmail.classList.remove('input-error');
            }

            if (inputMensaje.value.trim() === "") {
                errorMensaje.classList.remove('hidden');
                inputMensaje.classList.add('input-error');
                formularioValido = false;
            } else {
                errorMensaje.classList.add('hidden');
                inputMensaje.classList.remove('input-error');
            }

            if (formularioValido) {
                console.log("¡Validación manuel exitosa! Enviando propuesta... ");
                
                const datosFormulario = new FormData(formContacto);

                fetch(formContacto.action, {
                    method: 'POST',
                    body: datosFormulario,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok){
                        formContacto.reset();

                        const modalExito = document.createElement('div');
                        modalExito.className = 'modal-overlay-contacto';
                        modalExito.innerHTML = `
                            <div class ="modal-cartel">
                                <div class="modal-img">
                                    <img src="img/exitoconsulta.png" alt="Éxito">
                                </div>
                                <h2>¡PROPUESTA ENVIADA CON ÉXITO!</h2>
                                <p>
                                Gracias por comunicarte con nosotras. Nos pondremos en contacto con vos a la brevedad.
                                </p>

                                <button class="btn-modal-cerrar">ENTENDIDO</button>

                            </div>
                        `;

                        document.body.appendChild(modalExito);

                        const btnCerrarModal = modalExito.querySelector('.btn-modal-cerrar');
                        btnCerrarModal.addEventListener('click', () => {
                            modalExito.remove();
                        });

                    } else {
                        alert('Ups! Algo salió mal al enviar la propuesta, por favor intenta nuevamente.');
                    }
                })
                .catch(error => {
                    console.error("Error en el envío: ", error);
                    alert('Error de conexión. Intentalo de nuevo más tarde');
                });
            }

        });
    }

});