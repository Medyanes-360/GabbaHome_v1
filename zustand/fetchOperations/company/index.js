import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";

const useCompanyStore = create((set, get) => ({
  companies: [],

  getAllCompanies: async () => {
    const notification = startLoadingNotification(
      "Tüm Şirket Verileri Getiriliyor..."
    );

    const companiesData = getAPI("/company/get-companies");
    companiesData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, companies: res.companies }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteCompany: async (id) => {
    const notification = startLoadingNotification("Şirket Verisi Siliniyor...");
    const req = deleteAPI(`/company/delete-company?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen company'i çıkar:
          set((state) => ({
            ...state,
            companies: state.companies.filter((company) => company.id != id),
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
  createCompany: async (newCompany) => {
    const notification = startLoadingNotification(
      "Şirket Verisi Kaydediliyor..."
    );
    const req = postAPI(`/company/create-company`, newCompany);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            companies: [...state.companies, res.company],
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
  updateCompany: async (newCompany) => {
    const notification = startLoadingNotification(
      "Şirket Verisi Güncelleniyor..."
    );
    const req = putAPI(`/company/update-company`, newCompany);
    req
      .then((res) => {
        if (res.success) {
          // state'teki companies'ın içindeki update edilecek company'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let companies = get().companies;

          companies = [
            ...companies.filter((company) => company.id != newCompany.id),
            res.company,
          ];
          set((state) => ({
            ...state,
            companies: companies,
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
  setActiveCompany: async (companyId) => {
    const notification = startLoadingNotification(
      "Şirket Verisi Güncelleniyor..."
    );
    const req = putAPI(`/company/activate-company?id=${companyId}`);
    req
      .then((res) => {
        if (res.success) {
          // state'teki companies'ın içindeki update edilecek company'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let companies = get().companies;
          let companyToDeactivate = companies.find(
            (company) => company.isActive == true
          );
          let companyToActivate = companies.find(
            (company) => company.id == companyId
          );
          companyToDeactivate["isActive"] = false;
          companyToActivate["isActive"] = true;

          companies = [
            ...companies.filter((company) => {
              if (
                company.id == companyToActivate.id ||
                company.id == companyToDeactivate.id
              ) {
                return false;
              } else {
                return true;
              }
            }),
            companyToActivate,
            companyToDeactivate,
          ];
          set((state) => ({
            ...state,
            companies: companies,
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

export default useCompanyStore;
