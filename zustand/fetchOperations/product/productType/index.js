import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
const useProductTypeStore = create((set, get) => ({
  productTypes: [],

  getAllProductTypes: async () => {
    const notification = startLoadingNotification("Renk Güncelleniyor...");
    const productTypesData = getAPI("/product/product-type/get-types");
    productTypesData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, productTypes: res.productTypes }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteProductType: async (id) => {
    const notification = startLoadingNotification("Renk Güncelleniyor...");
    const req = deleteAPI(`/product/product-type/delete-type?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen productType'i çıkar:
          set((state) => ({
            ...state,
            productTypes: state.productTypes.filter(
              (productType) => productType.id != id
            ),
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
  createProductType: async (newProductType) => {
    const notification = startLoadingNotification("Renk Güncelleniyor...");
    const req = postAPI(`/product/product-type/create-type`, newProductType);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            productTypes: [...state.productTypes, res.productType],
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
  updateProductType: async (newProductType) => {
    const notification = startLoadingNotification("Renk Güncelleniyor...");
    const req = putAPI(`/product/product-type/update-type`, newProductType);
    req
      .then((res) => {
        if (res.success) {
          // state'teki productTypes'ın içindeki update edilecek productType'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let productTypes = get().productTypes;

          productTypes = [
            ...productTypes.filter(
              (productType) => productType.id != newProductType.id
            ),
            res.productType,
          ];
          set((state) => ({
            ...state,
            productTypes: productTypes,
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
}));

export default useProductTypeStore;
