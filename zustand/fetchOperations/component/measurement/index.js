import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
const useMeasurementStore = create((set, get) => ({
  measurements: [],

  getAllMeasurements: async () => {
    const notification = startLoadingNotification("Ölçüler Getiriliyor...");
    const measurementsData = getAPI("/component/measurement/get-measurements");
    measurementsData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, measurements: res.measurements }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteMeasurement: async (id) => {
    const notification = startLoadingNotification("Ölçü Siliniyor...");
    const req = deleteAPI(`/component/measurement/delete-measurement?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen measurement'i çıkar:
          set((state) => ({
            ...state,
            measurements: state.measurements.filter(
              (measurement) => measurement.id != id
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
  createMeasurement: async (newMeasurement) => {
    const notification = startLoadingNotification("Ölçü Kaydediliyor...");
    const req = postAPI(
      `/component/measurement/create-measurement`,
      newMeasurement
    );
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            measurements: [...state.measurements, res.measurement],
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
  updateMeasurement: async (newMeasurement) => {
    const notification = startLoadingNotification("Ölçü Güncelleniyor...");
    const req = putAPI(
      `/component/measurement/update-measurement`,
      newMeasurement
    );
    req
      .then((res) => {
        if (res.success) {
          // state'teki measurements'ın içindeki update edilecek measurement'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let measurements = get().measurements;

          measurements = [
            ...measurements.filter(
              (measurement) => measurement.id != newMeasurement.id
            ),
            res.measurement,
          ];
          set((state) => ({
            ...state,
            measurements: measurements,
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

export default useMeasurementStore;
