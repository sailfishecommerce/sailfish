import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    slideCart: false,
    sidebarRight: false,
    loading: false,
    modal: false,
    authModal: "AUTHFORM",
    checkoutModal: "SECURE_CHECKOUT",
    displayCheckoutModal: false,
    displayAuthModal: false,
    topbarCounter: 0,
    quickViewModal: {
      active: false,
      productToView: null,
    },
  },
  reducers: {
    toggleSlideCart(state) {
      state.slideCart = !state.slideCart;
    },
    toggleSidebarRight(state) {
      state.sidebarRight = !state.sidebarRight;
    },
    toggleModal(state) {
      state.modal = !state.modal;
    },
    authModalForm(state, action: PayloadAction<string>) {
      state.authModal = action.payload;
    },
    checkoutModal(state, action: PayloadAction<string>) {
      state.checkoutModal = action.payload;
    },
    displayCheckoutModalAction(state) {
      state.displayCheckoutModal = !state.displayCheckoutModal;
    },
    updateLoadingAction(state) {
      state.loading = !state.loading;
    },
    quickViewModal(state, action) {
      state.quickViewModal.active = !state.quickViewModal.active;
      state.quickViewModal.productToView = action.payload;
    },
    toggleAuthModal(state) {
      state.displayAuthModal = !state.displayAuthModal;
    },
    updateTopbarCounter(state, action: PayloadAction<"inc" | "dec">) {
      if (
        state.topbarCounter < 2 &&
        state.topbarCounter >= 0 &&
        action.payload === "inc"
      ) {
        state.topbarCounter = state.topbarCounter + 1;
      } else if (action.payload === "inc" && state.topbarCounter === 3) {
        state.topbarCounter = 0;
      } else if (action.payload === "dec" && state.topbarCounter < 0) {
        state.topbarCounter = 3;
      } else if (action.payload === "dec" && state.topbarCounter > 0) {
        state.topbarCounter = state.topbarCounter - 1;
      } else {
        state.topbarCounter;
      }
    },
  },
});

export const {
  toggleSlideCart,
  toggleSidebarRight,
  toggleModal,
  authModalForm,
  updateLoadingAction,
  quickViewModal,
  toggleAuthModal,
  checkoutModal,
  displayCheckoutModalAction,
  updateTopbarCounter,
} = uiSlice.actions;

export default uiSlice.reducer;
