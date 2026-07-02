const productos = {
    "remera-dollz": {
        nombre: "REMERA ADOLLZ",
        precio: 25600,
        categoria: "remeras",
        talles: ["S", "M", "L", "XL"],
        descripcion: "100% algodón de alta calidad con estampa oficial retro grunge.",
        colores: [
            { nombre: "negro", codigo: "#000000", img: "./img/remeranegra.png" },
            { nombre: "Rosa", codigo: "#f1297c", img: "./img/remerarosa.png" },
            { nombre: "blanco", codigo: "#ffffff", img: "./img/remerablanca.png" },
        ]
    },
    "remera-angelz": {
        nombre: "REMERA ANGELZ",
        precio: 26000,
        categoria: "remeras",
        talles: ["S", "M", "L"],
        descripcion: "Estampa exclusiva Angelz en frente y espalda. Oversized fit.",
        colores: [
            { nombre: "blanco", codigo: "#ffffff", img: "./img/remerablanca.png" }
        ]
    },
    "hoodie-angelz": {
        nombre: "HOODIE ANGELZ",
        precio: 42000,
        categoria: "hoodies",
        talles: ["M", "L", "XL"],
        descripcion: "Frisa pesada ideal para el invierno, capucha forrada y cordones custom.",
        colores: [
            { nombre: "negro", codigo: "#000000", img: "./img/hoodies.png" },
            { nombre: "blanco", codigo: "#ffff", img: "./img/hoodies.png" }
        ]
    },
    "totebag-numberone": {
        nombre: "TOTE NUMBER 1",
        precio: 15000,
        categoria: "accesorios",
        talles: ["Único"],
        descripcion: "Totebag estampada de lona resistente con diseño exclusivo.",
        colores: [
            { nombre: "blanco", codigo: "#ffffff", img: "./img/toteb.png" },
            { nombre: "negro", codigo: "#000000", img: "./img/toten.png" }
        ]
    },
    "remera-angelzclub": {
        nombre: "REMERA ANGELZ CLUB",
        precio: 25600,
        categoria: "remeras",
        talles: ["M", "L", "XL"],
        descripcion: "100% algodón de alta calidad con estampa oficial retro grunge.",
        colores: [
            { nombre: "negro", codigo: "#000000", img: "./img/angelzclubN.png" }
        ]
    },
    "poster-popstar": {
        nombre: "POSTER POPSTAR",
        precio: 10000,
        categoria: "accesorios",
        talles: ["único"],
        descripcion: "Poster a color impreso en papel de alta calidad",
        colores: [
            { nombre: "negro", codigo: "#000000", img: "./img/popstarposter.png" }
        ]
    },
    "poster-quema": {
        nombre: "POSTER QUEMA",
        precio: 10000,
        categoria: "accesorios",
        talles: ["único"],
        descripcion: "Poster a color impreso en papel de alta calidad",
        colores: [
            { nombre: "negro", codigo: "#000000", img: "./img/quemaposter.png" }
        ]
    },
    "poster-sincontrol": {
        nombre: "POSTER SIN CONTROL",
        precio: 10000,
        categoria: "accesorios",
        talles: ["único"],
        descripcion: "Poster a color impreso en papel de alta calidad",
        colores: [
            { nombre: "negro", codigo: "#000000", img: "./img/sincontrolposter.png" }
        ]
    }
};

let productoActual = null;
let idProductoActual = "";
let colorSeleccionado = null;
let talleSeleccionado = "";
let cantidadSeleccionada = 1;

// Esperamos a que la página se cargue primero

document.addEventListener('DOMContentLoaded', () => {
    
    const popup = document.getElementById('popup-tienda');
    const vistaSeleccion = document.getElementById('vista-seleccion');
    const vistaExito = document.getElementById('vista-exito');

    const imgDinamica = document.getElementById('dinamic-img');
    const precioDinamico = document.getElementById('dinamic-precio');
    const contenedorColores = document.getElementById('contenedor-colores');
    const contenedorTalles = document.getElementById('contenedor-talles');

    const botonesComprar = document.querySelectorAll('.btn-comprar');

    function dibujarCatalogo(){
        Object.keys(productos).forEach(id => {
            const prod = productos[id];

            const contenedorTarjetas = document.getElementById(`lista-${prod.categoria}`);

            if (contenedorTarjetas){
                const divItem = document.createElement('div');

                divItem.className = `${prod.categoria}-item`;

                divItem.innerHTML = `

                <div class = "${prod.categoria}-info">
                    <img src="${prod.colores[0].img}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p>${prod.descripcion || "Edición limitada de Adollz."}</p>
                </div>
                <button class="btn-comprar" data-id="${id}">Comprar</button>
                `;

                contenedorTarjetas.appendChild(divItem);
            }
        });
    }

    dibujarCatalogo();

    const mainContainer = document.querySelector('.main');

    mainContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-comprar')) {

            idProductoActual = e.target.getAttribute('data-id');
            productoActual = productos[idProductoActual];

            if(productoActual){
                console.log("Cargando datos de: ", productoActual.nombre);

                colorSeleccionado = productoActual.colores[0];
                talleSeleccionado = productoActual.talles[0];


                if(imgDinamica){
                    imgDinamica.src = productoActual.colores[0].img;
                }
                
                if(precioDinamico){
                    precioDinamico.innerText = `$ ${productoActual.precio.toLocaleString('es-AR')}`;
                }

                dibujarColores(contenedorColores, imgDinamica);
                dibujarTalles(contenedorTalles);
                

                if (vistaSeleccion) vistaSeleccion.classList.remove('hidden');
                if (vistaExito) vistaExito.classList.add('hidden');

                if(popup) popup.classList.add('active');
            }else{
                console.error("Error: El data-id del botón no coincide con ningún producto");
            }
        }
    });

    //crear circulos de color
    function dibujarColores(contenedor, imagenPrincipal) {

        if(!contenedor) return;

        contenedor.innerHTML = "";

        productoActual.colores.forEach(color =>{

            const divColor = document.createElement('div');

            divColor.className = `color-circle ${color.nombre === colorSeleccionado.nombre ? 'selected' : ''}`;

            divColor.style.backgroundColor = color.codigo;

            divColor.addEventListener('click', () => {

                contenedor.querySelector('.color-circle.selected')?.classList.remove('selected');

                divColor.classList.add('selected');

                colorSeleccionado = color;
                if (imagenPrincipal){
                    imagenPrincipal.src = color.img;
                }
                console.log("Cambiaste al color: ", color.nombre);

            });

            contenedor.appendChild(divColor);

        });

    }

    function dibujarTalles(contenedor){

        if (!contenedor) return;

        contenedor.innerHTML = "";

        productoActual.talles.forEach(talle => {

            const btnTalle = document.createElement('button');

            btnTalle.className = `talle-btn ${talle === talleSeleccionado ? 'selected' : ''}`;

            btnTalle.innerText = talle;

            btnTalle.addEventListener('click', () => {

                contenedor.querySelector('.talle-btn.selected')?.classList.remove('selected');

                btnTalle.classList.add('selected');

                talleSeleccionado = talle;
                console.log("Cambiaste al talle: ", talleSeleccionado);

            });

            contenedor.appendChild(btnTalle);

        });

    }

    const btnCanMas = document.getElementById('btn-cantidad-mas');
    const btnCanMenos = document.getElementById('btn-cantidad-menos');
    const numeroCantidad = document.getElementById('numero-cantidad');
    const msgLimite = document.getElementById('msg-limite-cantidad');

    if(btnCanMas && btnCanMenos && numeroCantidad && msgLimite){
        btnCanMas.addEventListener('click', () => {
            if(cantidadSeleccionada < 5){
                cantidadSeleccionada++;
                numeroCantidad.innerText = cantidadSeleccionada;

                if (cantidadSeleccionada === 5) {
                    numeroCantidad.classList.add('limite-alcanzado');
                    msgLimite.classList.remove('hidden');
                }

            }
        });

        btnCanMenos.addEventListener('click', () => {
            if(cantidadSeleccionada > 1){
                cantidadSeleccionada--;
                numeroCantidad.innerText = cantidadSeleccionada;
            
                numeroCantidad.classList.remove('limite-alcanzado');
                msgLimite.classList.add('hidden');
            }
        });
    }

    const btnAgregarCarrito = document.getElementById('btn-agregar-carrito');
    if(btnAgregarCarrito){
        btnAgregarCarrito.addEventListener('click', () => {

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            const nuevoItem = {
                id: idProductoActual,
                nombre: productoActual.nombre,
                precio: productoActual.precio,
                color: colorSeleccionado.nombre,
                talle: talleSeleccionado,
                descripcion: productoActual.descripcion,
                imagen: colorSeleccionado.img,
                cantidad: cantidadSeleccionada
            };

            carrito.push(nuevoItem);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            console.log("Producto guardado con éxito en el carrito: ", nuevoItem);

            if (vistaSeleccion) vistaSeleccion.classList.add('hidden');
            if (vistaExito) vistaExito.classList.remove('hidden');

        });
    }

    const cerrarPopupGlobal = () => {
        if (popup) popup.classList.remove('active');

        cantidadSeleccionada = 1;
        if (numeroCantidad) numeroCantidad.innerText = 1;
        if (numeroCantidad) numeroCantidad.classList.remove('limite-alcanzado');
        if (msgLimite) msgLimite.classList.add('hidden');
    };

    const btnCerrar = document.getElementById('btn-cerrar-popup');
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarPopupGlobal);

    const btnSeguirComprando = document.getElementById('btn-seguir-comprando');
    if (btnSeguirComprando){
        btnSeguirComprando.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarPopupGlobal();
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

});

