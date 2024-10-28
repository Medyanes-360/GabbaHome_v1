import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
const useMetalStore = create((set, get) => ({
  metals: [],

  getAllMetals: async () => {
    const notification = startLoadingNotification("Metaller Getiriliyor...");
    const metalsData = getAPI("/component/metal/get-metals");
    metalsData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, metals: res.metals }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteMetal: async (id) => {
    const notification = startLoadingNotification("Metal Siliniyor...");
    const req = deleteAPI(`/component/metal/delete-metal?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen metal'i çıkar:
          set((state) => ({
            ...state,
            metals: state.metals.filter((metal) => metal.id != id),
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
  createMetal: async (newMetal) => {
    const notification = startLoadingNotification("Metal Kaydediliyor...");
    const req = postAPI(`/component/metal/create-metal`, newMetal);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            metals: [...state.metals, res.metal],
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
  updateMetal: async (newMetal) => {
    const notification = startLoadingNotification("Metal Güncelleniyor...");
    const req = putAPI(`/component/metal/update-metal`, newMetal);
    req
      .then((res) => {
        if (res.success) {
          // state'teki metals'ın içindeki update edilecek metal'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let metals = get().metals;

          metals = [
            ...metals.filter((metal) => metal.id != newMetal.id),
            res.metal,
          ];
          set((state) => ({
            ...state,
            metals: metals,
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

export default useMetalStore;
