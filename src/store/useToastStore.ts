import { create } from "zustand";

interface ToastState {
  message: string;
  isVisible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => {
  let timeoutId: NodeJS.Timeout;

  return {
    message: "",
    isVisible: false,
    showToast: (message: string) => {
      // Clear any existing timeout if triggered rapidly
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      set({ message, isVisible: true });

      // Auto-hide after 3 seconds
      timeoutId = setTimeout(() => {
        set({ isVisible: false });
      }, 3000);
    },
    hideToast: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      set({ isVisible: false });
    },
  };
});
