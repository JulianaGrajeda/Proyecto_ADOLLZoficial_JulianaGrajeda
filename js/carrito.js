document.addEventListener('DOMContentLoaded', () => {
    const comprasContainer = document.querySelector('.carrito-scroll-box');
    const resumenContainer = document.querySelector('.resumen-container');

    const COSTO_ENVIO = 7560;

    function renderizarCarrito(){

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            comprasContainer.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
            actualizarResumen(0);
            return;
        }
        
        comprasContainer.innerHTML = "";
        let subtotal = 0;

        carrito.forEach((item, index) => {
            subtotal += item.precio * item.cantidad;

            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrito';
            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="item-img">
                <div class="item-detalles">
                    <h3>${item.nombre}</h3>
                    <p class="item-meta-desc">${item.descripcion || "Producto oficial de Adollz."}</p>
                    <div class="item-meta-grupo">
                        <p class="item-meta">COLOR: ${item.color.toUpperCase()}</p>
                        <p class="item-meta">TALLE: ${item.talle}</p>
                        <div class="item-cantidad">
                            <div class="cantidad-fila">
                                <p class="item-meta">CANTIDAD:</p>

                                <div class="cantidad-control">
                                    <button class="btn-cantidad-restar" data-index="${index}">-</button>

                                    <span class="cantidad-numero ${item.cantidad === 5 ? 'limite-alcanzado' : ''}">
                                        ${item.cantidad}
                                    </span>

                                    <button
                                        class="btn-cantidad-sumar ${item.cantidad === 5 ? 'deshabilitado' : ''}"
                                        data-index="${index}">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        ${
                            item.cantidad === 5
                            ? `<span class="msg-limite">
                                    <i class="fa-solid fa-triangle-exclamation"></i>
                                    Máximo permitido: 5 unidades por producto.
                                </span>`
                            : ""
                        }

                    </div>
                </div>
                <div class="item-precio-eliminar">
                    <span class="item-precio">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                    <button class="btn-eliminar" data-index="${index}"><i class="fa-solid fa-trash" style="color: #f1297c;"></i></button>
                </div>
            `;
            comprasContainer.appendChild(itemElement);
        });

        actualizarResumen(subtotal);
        configurarBotonesEliminar();
        configurarBotonesCantidad();
    }

    function actualizarResumen(subtotal){
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const totalItems = carrito.reduce((acc,item) => acc + item.cantidad, 0);

        const envio = subtotal > 0 ? COSTO_ENVIO : 0;
        const total = subtotal + envio;

        let desglose = document.querySelector('.resumen-desglose');
        if(!desglose){
            desglose = document.createElement('div');
            desglose.className = 'resumen-desglose';
            const btnPagar = document.querySelector('.btn-pagar');
            btnPagar.parentNode.insertBefore(desglose, btnPagar);
        }

        desglose.innerHTML = `
            <div class="resumen-fila">
                <span>PRODUCTO (${totalItems})</span>
                <span>$${subtotal.toLocaleString('es-AR')}</span>
            </div>
            <div class="resumen-fila">
                <span>ENVIO</span>
                <span>$${envio.toLocaleString('es-AR')}</span>
            </div>
            <hr class="linea-divisoria">
            <div class="resumen-fila total-fila">
                <span>TOTAL</span>
                <span class="total-precio">$${total.toLocaleString('es-AR')}</span>
            </div>
        `;
    }

    function configurarBotonesEliminar(){
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

                carrito.splice(index, 1);

                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContadorCarrito();
                renderizarCarrito();
            });
        });
    }

    function configurarBotonesCantidad(){
        const botonesMas = document.querySelectorAll('.btn-cantidad-sumar');
        const botonesMenos = document.querySelectorAll('.btn-cantidad-restar');

        botonesMas.forEach(boton => {
            boton.addEventListener('click', (e) => {

                const index = e.currentTarget.dataset.index;

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

                if(carrito[index].cantidad < 5){

                    carrito[index].cantidad++;

                    localStorage.setItem("carrito", JSON.stringify(carrito));

                    actualizarContadorCarrito();
                    renderizarCarrito();

                }

            });

        });

        botonesMenos.forEach(boton => {

            boton.addEventListener('click', (e) => {

                const index = e.currentTarget.dataset.index;

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

                if(carrito[index].cantidad > 1){

                    carrito[index].cantidad--;

                }else{

                    carrito.splice(index,1);

                }

                localStorage.setItem("carrito", JSON.stringify(carrito));

                actualizarContadorCarrito();
                renderizarCarrito();

            });

        });

    }

    renderizarCarrito();

    const btnCarritoPagar = document.getElementById('btn-carrito-pagar');
    if (btnCarritoPagar){

        btnCarritoPagar.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
            if (carrito.length === 0){

                const aviso = document.createElement('div');
                aviso.className = 'modal-overlay';
                aviso.innerHTML = `
                    <div class="modal-cartel">
                        <h2>El carrito está vacio.</h2>
                        <button class="btn-modal-cerrar">ENTENDIDO</button>
                    </div>
                `;

                document.body.appendChild(aviso);

                const btnCerrarAviso = aviso.querySelector('.btn-modal-cerrar');
                btnCerrarAviso.addEventListener('click', () => {
                    aviso.remove()
                });

                return;

            }
        
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.innerHTML = `
                <div class="modal-cartel">
                    <div class="modal-img">
                        <img src="img/check.png">
                    </div>
                    <h2>¡COMPRA REALIZADA CON ÉXITO!</h2>
                    <button class="btn-modal-cerrar">ENTENDIDO</button>
                    <a href="index.html">VOLVER AL INICIO</a>
                </div>
            `;

            document.body.appendChild(modalOverlay);
            localStorage.removeItem('carrito');
            actualizarContadorCarrito();

            const btnCerrarModal = modalOverlay.querySelector('.btn-modal-cerrar');
            btnCerrarModal.addEventListener('click', () => {
                modalOverlay.remove();
                renderizarCarrito();
            });
        
        });

    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    function actualizarContadorCarrito(){
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        const totalItems = carrito.reduce((acumulador, prod) => acumulador + (prod.cantidad || 1), 0);

        const contadorElemento = document.getElementById('contador-carrito');
        if (contadorElemento) {
            contadorElemento.innerText = totalItems;
        }
    }

    actualizarContadorCarrito();

});