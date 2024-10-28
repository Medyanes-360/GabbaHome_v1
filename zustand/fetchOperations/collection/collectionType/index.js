import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import useGlobalStore from "@/zustand/globalStore";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
const useCollectionTypeStore = create((set, get) => ({
  collectionTypes: [],

  getAllCollectionTypes: async () => {
    const notification = startLoadingNotification(
      "Koleksiyon Tipleri Getiriliyor..."
    );
    const collectionTypesData = getAPI("/collection/collection-type/get-types");
    collectionTypesData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, collectionTypes: res.collectionTypes }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      )
      .finally(() => {
        useGlobalStore.setState({
          ...useGlobalStore.getState(),
          isLoading: false,
        });
      });
  },

  deleteCollectionType: async (id) => {
    const notification = startLoadingNotification(
      "Koleksiyon Tipi Siliniyor..."
    );
    const req = deleteAPI(`/collection/collection-type/delete-type?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen collectionType'i çıkar:
          set((state) => ({
            ...state,
            collectionTypes: state.collectionTypes.filter(
              (collectionType) => collectionType.id != id
            ),
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      )
      .finally(() => {
        useGlobalStore.setState({
          ...useGlobalStore.getState(),
          isLoading: false,
        });
      });
  },
  createCollectionType: async (newCollectionType) => {
    const notification = startLoadingNotification(
      "Koleksiyon Tipi Kaydediliyor..."
    );
    const req = postAPI(
      `/collection/collection-type/create-type`,
      newCollectionType
    );
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            collectionTypes: [...state.collectionTypes, res.collectionType],
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      )
      .finally(() => {
        useGlobalStore.setState({
          ...useGlobalStore.getState(),
          isLoading: false,
        });
      });
  },
  updateCollectionType: async (newCollectionType) => {
    const notification = startLoadingNotification(
      "Koleksiyon Tipi Güncelleniyor..."
    );
    const req = putAPI(
      `/collection/collection-type/update-type`,
      newCollectionType
    );
    req
      .then((res) => {
        if (res.success) {
          // state'teki collectionTypes'ın içindeki update edilecek collectionType'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let collectionTypes = get().collectionTypes;

          collectionTypes = [
            ...collectionTypes.filter(
              (collectionType) => collectionType.id != newCollectionType.id
            ),
            res.collectionType,
          ];
          set((state) => ({
            ...state,
            collectionTypes: collectionTypes,
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      )
      .finally(() => {
        useGlobalStore.setState({
          ...useGlobalStore.getState(),
          isLoading: false,
        });
      });
  },
}));

export default useCollectionTypeStore;
