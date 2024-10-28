import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
import "react-toastify/dist/ReactToastify.css";
const useCollectionStore = create((set, get) => ({
  collections: [],

  getAllCollections: async () => {
    const notification = startLoadingNotification(
      "Koleksiyonlar Getiriliyor..."
    );

    const collectionsData = getAPI("/collection/collection/get-collections");
    collectionsData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, collections: res.collections }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) => {
        endLoadingNotification(notification, "error", "Error!: " + er);
      })
      .finally(() => {});
  },
  getCollection: async (collectionId) => {
    const notification = startLoadingNotification("Koleksiyon Getiriliyor...");
    const collectionData = await getAPI(
      `/collection/collection/get-collection?id=${collectionId}`
    )
      .then((res) => {
        if (res.success) {
          endLoadingNotification(notification, "success", res.message);
          return res.collection;
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) => {
        endLoadingNotification(notification, "error", "Error!: " + er);
      })
      .finally(() => {});

    return collectionData;
  },

  deleteCollection: async (id) => {
    const notification = startLoadingNotification("Koleksiyon Siliniyor...");
    const req = deleteAPI(`/collection/collection/delete-collection?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen collection'i çıkar:
          set((state) => ({
            ...state,
            collections: state.collections.filter(
              (collection) => collection.id != id
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
      .finally(() => {});
  },
  createCollection: async (newCollection) => {
    const notification = startLoadingNotification("Koleksiyon Kaydediliyor...");
    const req = postAPI(
      `/collection/collection/create-collection`,
      newCollection
    );
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            collections: [...state.collections, res.collection],
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      )
      .finally(() => {});
  },
  updateCollection: async (newCollection) => {
    const notification = startLoadingNotification(
      "Koleksiyon Güncelleniyor..."
    );
    const req = putAPI(
      `/collection/collection/update-collection`,
      newCollection
    );
    req
      .then((res) => {
        if (res.success) {
          // state'teki collections'ın içindeki update edilecek collection'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let collections = get().collections;

          collections = [
            ...collections.filter(
              (collection) => collection.id != newCollection.id
            ),
            res.collection,
          ];
          set((state) => ({
            ...state,
            collections: collections,
          }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      )
      .finally(() => {});
  },
}));

export default useCollectionStore;
