import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
import "react-toastify/dist/ReactToastify.css";

const useStoreStore = create((set, get) => ({
  stores: [],

  getAllStores: async () => {
    const notification = startLoadingNotification(
      "Mağaza Verileri Getiriliyor..."
    );

    const storesData = getAPI("/store/get-stores");
    storesData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, stores: res.stores }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteStore: async (id) => {
    const notification = startLoadingNotification("Mağaza Siliniyor...");
    const req = deleteAPI(`/store/delete-store?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen store'i çıkar:
          set((state) => ({
            ...state,
            stores: state.stores.filter((store) => store.id != id),
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
  createStore: async (newStore) => {
    const notification = startLoadingNotification("Mağaza Kaydediliyor...");
    const req = postAPI(`/store/create-store`, newStore);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            stores: [...state.stores, res.store],
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
  updateStore: async (newStore) => {
    const notification = startLoadingNotification("Mağaza Güncelleniyor...");
    const req = putAPI(`/store/update-store`, newStore);
    req
      .then((res) => {
        if (res.success) {
          // state'teki stores'ın içindeki update edilecek store'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let stores = get().stores;

          stores = [
            ...stores.filter((store) => store.id != newStore.id),
            res.store,
          ];
          set((state) => ({
            ...state,
            stores: stores,
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

export default useStoreStore;
