import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
import "react-toastify/dist/ReactToastify.css";

const useColorStore = create((set, get) => ({
  colors: [],

  getAllColors: async () => {
    const notification = startLoadingNotification("Renkler Getiriliyor...");

    const colorsData = getAPI("/component/color/get-colors");
    colorsData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, colors: res.colors }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteColor: async (id) => {
    const notification = startLoadingNotification("Renk Siliniyor...");
    const req = deleteAPI(`/component/color/delete-color?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen color'i çıkar:
          set((state) => ({
            ...state,
            colors: state.colors.filter((color) => color.id != id),
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
  createColor: async (newColor) => {
    const notification = startLoadingNotification("Renk Kaydediliyor...");
    const req = postAPI(`/component/color/create-color`, newColor);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            colors: [...state.colors, res.color],
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
  updateColor: async (newColor) => {
    const notification = startLoadingNotification("Renk Güncelleniyor...");
    const req = putAPI(`/component/color/update-color`, newColor);
    req
      .then((res) => {
        if (res.success) {
          // state'teki colors'ın içindeki update edilecek color'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let colors = get().colors;

          colors = [
            ...colors.filter((color) => color.id != newColor.id),
            res.color,
          ];
          set((state) => ({
            ...state,
            colors: colors,
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

export default useColorStore;
