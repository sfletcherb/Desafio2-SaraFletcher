const ProductManager = require("./app.js");

// Crear la instancia de la clase ProductManager
const productList = new ProductManager();

//Leer archivo y crear []
productList.readFile();

// Agregar producto
productList.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
productList.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  300,
  "Sin imagen",
  "def123",
  25
);
productList.addProduct(
  "producto prueba3",
  "Este es un producto prueba3",
  400,
  "Sin imagen",
  "ghi123",
  25
);
productList.addProduct(
  "producto prueba4",
  "Este es un producto prueba4",
  400,
  "Sin imagen",
  "ghi125",
  25
);

// Devolver el producto con id especificado
productList.getProductById(3);

// Actualizar campos de producto
productList.updateProduct(2, {
  title: "producto actualizado",
  description: "Este es un producto actualizado",
  precio: 60,
});

// Eliminar producto
productList.deleteProduct(1);
/* productList.deleteProduct(5); */
