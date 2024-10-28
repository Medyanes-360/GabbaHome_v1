import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
const useFabricStore = create((set, get) => ({
  fabrics: [],

  getAllFabrics: async () => {
    const notification = startLoadingNotification("Kartelalar Getiriliyor...");
    const fabricsData = getAPI("/component/fabric/get-fabrics");
    fabricsData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, fabrics: res.fabrics }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteFabric: async (id) => {
    const notification = startLoadingNotification("Kartela Siliniyor...");
    const req = deleteAPI(`/component/fabric/delete-fabric?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen fabric'i çıkar:
          set((state) => ({
            ...state,
            fabrics: state.fabrics.filter((fabric) => fabric.id != id),
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
  createFabric: async (newFabric) => {
    const notification = startLoadingNotification("Kartela Kaydediliyor...");
    const req = postAPI(`/component/fabric/create-fabric`, newFabric);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            fabrics: [...state.fabrics, res.fabric],
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
  updateFabric: async (newFabric) => {
    const notification = startLoadingNotification("Kartela Güncelleniyor...");
    const req = putAPI(`/component/fabric/update-fabric`, newFabric);
    req
      .then((res) => {
        if (res.success) {
          // state'teki fabrics'ın içindeki update edilecek fabric'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let fabrics = get().fabrics;

          fabrics = [
            ...fabrics.filter((fabric) => fabric.id != newFabric.id),
            res.fabric,
          ];
          set((state) => ({
            ...state,
            fabrics: fabrics,
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

export default useFabricStore;
