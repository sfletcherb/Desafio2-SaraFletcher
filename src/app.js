const fs = require("fs").promises;

class ProductManager {
  constructor(path = "./productsList.json") {
    this.path = path;
    this.products = [];
  }

  // Método para crear el archivo.
  async createField() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log("Couldn't create field:", error);
    }
  }

  // Método para devolver arreglo vacio.
  async getProducts() {
    try {
      const contentArray = await fs.readFile(this.path, "utf-8");
      const newArray = JSON.parse(contentArray);
      /* console.log(newArray); */
      return newArray;
    } catch (error) {
      console.log("Couldn't read file:", error);
    }
  }

  // Metodo para Agregar un producto al arreglo products
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const fields = [title, description, price, thumbnail, code, stock];
      const notEmptyFields = fields.every((fieldEmpty) => fieldEmpty);
      if (!notEmptyFields) {
        throw new Error("All fields are required");
      }

      const codeExist = this.products.some((items) => items.code === code);
      if (codeExist) {
        throw new Error("The code already exists");
      }

      const newProduct = {
        id: this.products.length + 1,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.push(newProduct);

      //Guardar productos nuevos en archivo.
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log("Couldn't add file:", error);
    }
  }

  // Método obtener productos según id
  async getProductById(id) {
    try {
      const contenido = await this.getProducts();
      const findId = contenido.find((item) => item.id === id);
      console.log("PRODUCTO", findId);
    } catch (error) {
      console.log("Couldn't find product");
    }
  }

  async updateProduct(id, products) {
    try {
      const index = this.products.findIndex((item) => item.id === id);

      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...products };
      } else {
        console.log("id not found");
      }

      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log("Couldn't update product", error);
    }
  }

  async deleteProduct(id) {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      const index = products.findIndex((item) => item.id === id);

      if (index !== -1) {
        products.splice(index, 1);

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      }
    } catch (error) {
      console.log("Couldn't delete product", error);
    }
  }
}

// Crear la instancia de la clase ProductManager
const productList = new ProductManager();

// Devolver un arreglo vacio.
productList.createField();
productList.getProducts();

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

// Aparecer el producto agregado
/* productList.getProducts(); */

// Devolver el producto con id especificado
productList.getProductById(2);

// Actualizar campos de producto
/* productList.updateProduct(2, {
  title: "producto actualizado",
  description: "Este es un producto actualizado",
  precio: 60,
}); */

// Eliminar producto
/* productList.deleteProduct(3); */
/* productList.deleteProduct(5); */
