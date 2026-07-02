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

document.addEventListener('mousemove', parallax);

function parallax(e){
    document.querySelectorAll('.object').forEach(function(move){

        var moving_value = move.getAttribute('data-value');
        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;

        // move.style.transform = 'translateX('+x+'px) translateY('+y+'px)';
        move.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    });
}

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