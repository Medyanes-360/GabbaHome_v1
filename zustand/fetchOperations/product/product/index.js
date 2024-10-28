import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  showNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,

  getAllProducts: async () => {
    const notification = startLoadingNotification("Ürünler Getiriliyor...");
    const productsData = getAPI("/product/product/get-products");
    productsData
      .then((res) => {
        if (res.success) {
          endLoadingNotification(notification, "success", res.message);
          set((state) => ({ ...state, products: res.products }));
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },
  getProduct: async (productId) => {
    const notification = startLoadingNotification("Ürün Getiriliyor...");
    const productData = await getAPI(
      `/product/product/get-product?id=${productId}`
    )
      .then((res) => {
        if (res.success) {
          endLoadingNotification(notification, "success", res.message);
          return res.product;
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );

    return productData;
  },

  deleteProduct: async (id) => {
    const notification = startLoadingNotification("Ürün Siliniyor...");
    const req = deleteAPI(`/product/product/delete-product?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen product'i çıkar:
          set((state) => ({
            ...state,
            products: state.products.filter((product) => product.id != id),
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },
  createProduct: async (newProduct) => {
    const notification = startLoadingNotification("Ürün Kaydediliyor...");
    const req = postAPI(`/product/product/create-product`, newProduct);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            products: [...state.products, res.product],
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },
  updateProduct: async (newProduct) => {
    const notification = startLoadingNotification("Ürün Güncelleniyor...");
    const req = putAPI(`/product/product/update-product`, newProduct);
    req
      .then((res) => {
        if (res.success) {
          // state'teki products'ın içindeki update edilecek product'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let products = get().products;

          products = [
            ...products.filter((product) => product.id != newProduct.id),
            res.product,
          ];
          set((state) => ({
            ...state,
            products: products,
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },
  getProductImageCount: async (productId) => {
    const count = await getAPI(
      `/product/product/get-product-images/get-count?id=${productId}`
    )
      .then((res) => {
        if (res.success) {
          return res.count;
        } else {
        }
      })
      .catch((er) => console.error(er));

    return count;
  },
  setProductImages: async (productId) => {
    await getAPI(
      `/product/product/get-product-images/get-images?id=${productId}`
    )
      .then((res) => {
        if (res.success) {
          let currentProduct = get().products.find(
            (product) => product.id === productId
          );
          currentProduct.images = res.images;

          let newProducts = [
            ...get().products.filter(
              (product) => product.id != currentProduct.id
            ),
            currentProduct,
          ];
          set((state) => ({
            ...state,
            products: newProducts,
          }));
          showNotification("success", "Tüm Resimler Getirildi");
        } else {
          showNotification("error", "Error!: " + res.error);
        }
      })
      .catch((er) => showNotification("error", "Error!: " + res.error));
  },
}));

export default useProductStore;
