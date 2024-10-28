import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";

const useEmployeeStore = create((set, get) => ({
  employees: [],

  getAllEmployees: async () => {
    const notification = startLoadingNotification(
      "Tüm Çalışan Verileri Getiriliyor..."
    );

    const employeesData = getAPI("/employee/get-employees");
    employeesData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, employees: res.employees }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteEmployee: async (id) => {
    const notification = startLoadingNotification(
      "Çalışan Verisi Siliniyor..."
    );
    const req = deleteAPI(`/employee/delete-employee?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen employee'i çıkar:
          set((state) => ({
            ...state,
            employees: state.employees.filter((employee) => employee.id != id),
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
  createEmployee: async (newEmployee) => {
    const notification = startLoadingNotification(
      "Çalışan Verisi Kaydediliyor..."
    );
    const req = postAPI(`/employee/create-employee`, newEmployee);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            employees: [...state.employees, res.employee],
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
  updateEmployee: async (newEmployee) => {
    const notification = startLoadingNotification(
      "Çalışan Verisi Güncelleniyor..."
    );
    const req = putAPI(`/employee/update-employee`, newEmployee);
    req
      .then((res) => {
        if (res.success) {
          // state'teki employees'ın içindeki update edilecek employee'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let employees = get().employees;

          employees = [
            ...employees.filter((employee) => employee.id != newEmployee.id),
            res.employee,
          ];
          set((state) => ({
            ...state,
            employees: employees,
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

export default useEmployeeStore;
