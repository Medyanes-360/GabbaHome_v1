import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
const useFabricCategoryStore = create((set, get) => ({
  fabricCategories: [],

  getAllFabricCategories: async () => {
    const notification = startLoadingNotification(
      "Kartela Kategorileri Getiriliyor..."
    );
    const fabricCategoriesData = getAPI(
      "/component/fabric-category/get-categories"
    );
    fabricCategoriesData
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            fabricCategories: res.fabricCategories,
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

  deleteFabricCategory: async (id) => {
    const notification = startLoadingNotification(
      "Kartela Kategorisi Siliniyor..."
    );
    const req = deleteAPI(
      `/component/fabric-category/delete-category?id=${id}`
    );
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen fabric'i çıkar:
          set((state) => ({
            ...state,
            fabricCategories: state.fabricCategories.filter(
              (category) => category.id != id
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
  createFabricCategory: async (newFabricCategory) => {
    const notification = startLoadingNotification(
      "Kartela Kategorisi Kaydediliyor..."
    );
    const req = postAPI(
      `/component/fabric-category/create-category`,
      newFabricCategory
    );
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            fabricCategories: [...state.fabricCategories, res.fabricCategory],
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
  updateFabricCategory: async (newFabricCategory) => {
    const notification = startLoadingNotification(
      "Kartela Kategorisi Güncelleniyor..."
    );
    const req = putAPI(
      `/component/fabric-category/update-category`,
      newFabricCategory
    );
    req
      .then((res) => {
        if (res.success) {
          // state'teki category'ın içindeki update edilecek category'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let fabricCategories = get().fabricCategories;

          fabricCategories = [
            ...fabricCategories.filter(
              (fabricCategory) => fabricCategory.id != newFabricCategory.id
            ),
            res.fabricCategory,
          ];
          set((state) => ({
            ...state,
            fabricCategories: fabricCategories,
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

export default useFabricCategoryStore;
