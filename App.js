


class Producto{
    constructor(nombre, precio, anio){
        this.nombre = nombre;
        this.precio = precio;
        this.anio = anio;
        }

}

// interfaz la cula utilizamos para manipula el documento
class UI{
    agregarProducto(product){

        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
            <div class="card text-center mb-4">
                    <div class="card-body">
                        <strong>Product Nombre</strong>: ${product.nombre}
                        <strong>Product Precio</strong>: ${product.precio}
                        <strong>Product Año</strong>: ${product.anio}
                        <a href="#" class="btn btn-danger" name="eliminar" >Eliminar</a>
                    </div>
             </div>
            `;
        // insertar el producto a la lista
        productList.appendChild(element);
        this.resetearForm(); // llamamos el metodo para resetear el formulario

    }
    eliminarProductos(element){
        if( element.name === "eliminar"){
            element.parentElement.parentElement.parentElement.remove();
            this.mostrarMensaje("Producto eliminado satisfacroriamente", "info")
        }

    }

    // mensajes de alerta para crear y eliminar productos 
    mostrarMensaje(message, cssClass){
       const div =  document.createElement("div");
       div.className = `alert alert-${cssClass} mg-2`;
       div.appendChild(document.createTextNode(message));

       const container = document.querySelector(".container")
       const app = document.querySelector("#App");
       container.insertBefore(div, app);

       // Temporizador para que se quite el mensaje
       setTimeout(() => {
        document.querySelector(".alert").remove()
       }, 3000);
    }

    resetearForm(){
        document.getElementById("product-form").reset();
    }
}


// Manejo de los evevtos, capturandos los datos que tiene el formulario
document.getElementById("product-form")
        .addEventListener("submit", function( event ){
            const nombre = document.getElementById("name").value;
            const precio = document.getElementById("price").value;
            const anio = document.getElementById("anio").value;


            const product = new  Producto( nombre , precio,  anio );
            const ui = new UI();

            // si todo los campos no estan llenos se muestra este mensaje 
            if(nombre === "" || precio === "" || anio === ""){
                ui.mostrarMensaje("Todos los campos son obligatorios", "danger");
            }else{

           
            ui.agregarProducto(product);
            ui.mostrarMensaje("Producto agregado satisfactoriamente", "success");
            }

        event.preventDefault(); // cancela los eventos por defecto que tiene el formulario
});

document.getElementById("product-list").addEventListener("click", function(event){
    const ui = new UI();
    ui.eliminarProductos( event.target);
});
 // capturamos el evento click en la lista de productos
