import { defineStore } from 'pinia';

export const useDialogsStore = defineStore('dialogs', {
  state: () => ({
    dialogs: []
  }),
  actions: {
    openDialog(dialog) {
      this.dialogs.push(dialog);
    },
    closeDialog(dialog) {
      const index = this.dialogs.indexOf(dialog);
      if (index !== -1) {
        this.dialogs.splice(index, 1);
      }
    },
    closeDialogs() {
      this.dialogs.forEach(dialog => {
        dialog.close(); // Assuming you have a method to close the dialog
      });
      this.dialogs = []; // Clear the dialogs state
    }
  }
});