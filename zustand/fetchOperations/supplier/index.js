import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";

const useSupplierStore = create((set, get) => ({
  suppliers: [],

  getAllSuppliers: async () => {
    const notification = startLoadingNotification(
      "Tüm Çalışan Verileri Getiriliyor..."
    );

    const suppliersData = getAPI("/supplier/get-suppliers");
    suppliersData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, suppliers: res.suppliers }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteSupplier: async (id) => {
    const notification = startLoadingNotification(
      "Çalışan Verisi Siliniyor..."
    );
    const req = deleteAPI(`/supplier/delete-supplier?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen supplier'i çıkar:
          set((state) => ({
            ...state,
            suppliers: state.suppliers.filter((supplier) => supplier.id != id),
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
  createSupplier: async (newSupplier) => {
    const notification = startLoadingNotification(
      "Çalışan Verisi Kaydediliyor..."
    );
    const req = postAPI(`/supplier/create-supplier`, newSupplier);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            suppliers: [...state.suppliers, res.supplier],
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
  updateSupplier: async (newSupplier) => {
    const notification = startLoadingNotification(
      "Çalışan Verisi Güncelleniyor..."
    );
    const req = putAPI(`/supplier/update-supplier`, newSupplier);
    req
      .then((res) => {
        if (res.success) {
          // state'teki suppliers'ın içindeki update edilecek supplier'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let suppliers = get().suppliers;

          suppliers = [
            ...suppliers.filter((supplier) => supplier.id != newSupplier.id),
            res.supplier,
          ];
          set((state) => ({
            ...state,
            suppliers: suppliers,
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

export default useSupplierStore;
