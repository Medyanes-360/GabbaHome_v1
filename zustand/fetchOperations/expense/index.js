import { deleteAPI, getAPI, postAPI, putAPI } from "@/services/fetchAPI";
import { create } from "zustand";
import {
  endLoadingNotification,
  startLoadingNotification,
} from "@/globalElements/notification";
import "react-toastify/dist/ReactToastify.css";

const useExpenseStore = create((set, get) => ({
  expenses: [],

  getAllExpenses: async () => {
    const notification = startLoadingNotification("Giderler Getiriliyor...");

    const expensesData = getAPI("/expense/get-expenses");
    expensesData
      .then((res) => {
        if (res.success) {
          set((state) => ({ ...state, expenses: res.expenses }));
          endLoadingNotification(notification, "success", res.message);
        } else {
          endLoadingNotification(notification, "error", "Error!: " + res.error);
        }
      })
      .catch((er) =>
        endLoadingNotification(notification, "error", "Error!: " + er)
      );
  },

  deleteExpense: async (id) => {
    const notification = startLoadingNotification("Gider Siliniyor...");
    const req = deleteAPI(`/expense/delete-expense?id=${id}`);
    req
      .then((res) => {
        if (res.success) {
          //eğer başarılıysa şu anki state'ten de silinen expense'i çıkar:
          set((state) => ({
            ...state,
            expenses: state.expenses.filter((expense) => expense.id != id),
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
  createExpense: async (newExpense) => {
    const notification = startLoadingNotification("Gider Kaydediliyor...");
    const req = postAPI(`/expense/create-expense`, newExpense);
    req
      .then((res) => {
        if (res.success) {
          set((state) => ({
            ...state,
            expenses: [...state.expenses, res.expense],
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
  updateExpense: async (newExpense) => {
    const notification = startLoadingNotification("Gider Güncelleniyor...");
    const req = putAPI(`/expense/update-expense`, newExpense);
    req
      .then((res) => {
        if (res.success) {
          // state'teki expenses'ın içindeki update edilecek expense'ı bulup update'liyoruz,
          // böylece boş yere fetch yapmamıza gerek olmayacak güncel bilgiyi almak için

          let expenses = get().expenses;

          expenses = [
            ...expenses.filter((expense) => expense.id != newExpense.id),
            res.expense,
          ];
          set((state) => ({
            ...state,
            expenses: expenses,
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

export default useExpenseStore;
