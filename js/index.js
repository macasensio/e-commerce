//variables
const cart = document.querySelector('.cart')
const cartTable = document.querySelector('.cart-table tbody')
const listCourses = document.querySelector('.list-courses')
const emptyCart = document.querySelector('.empty-cart')

let articulosCarrito = []

//eventListeners
loadEventListeners()
function loadEventListeners() {
    listCourses.addEventListener('click', agregandoCurso)
    cart.addEventListener('click', eliminarCurso)
    emptyCart.addEventListener('click', vaciarCarrito)

}

//functions
function agregandoCurso (e) {
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.course-price span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    //revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            } else {
                return curso
            }
        }) 
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito)
    carritoHTML()
}

//muestra el carrito de compras en el HTML
function carritoHTML(){

    limpiarHTML()

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, id, cantidad } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td class="cart-img"><img src="${imagen}" alt="${titulo}" /></td>
            <td class="cart-titulo">${titulo}</td>
            <td class="cart-precio">${precio}</td>
            <td class="cart-cantidad">${cantidad}</td>
            <td><a href="#" class="cart-x" data-id="${id}">X</a></td>
        `
        cartTable.appendChild(row)
    })

}

//Elimina los cursos del cartTable
function limpiarHTML(){
    //forma lenta
    //cartTable.innerHTML = ''
    //forma rápida
    while(cartTable.firstChild) {
        cartTable.removeChild(cartTable.firstChild)
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('cart-x')){
        const cursoId = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML()

    }
}

function vaciarCarrito(){
    console.log('vaciando carrito...')
    articulosCarrito = []
    limpiarHTML()
}
