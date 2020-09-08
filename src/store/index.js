import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    plaintext: "",
    ciphertext: "",
    encrypt: null,
    processing: false,
  },
  getters: {
    getPlaintext: state => state.plaintext,
    getCiphertext: state => state.ciphertext,
    isProcessing: state => state.processing,
    isEncrypt: state => state.encrypt,
  },
  mutations: {
    setPlaintext(state, plaintext) {
      state.plaintext = plaintext;
    },
    setCiphertext(state, ciphertext) {
      state.ciphertext = ciphertext;
    },
    startProcessing(state) {
      state.processing = true;
    },
    endProcessing(state) {
      state.processing = false;
    },
    setEncrypt(state, encrypt) {
      state.encrypt = encrypt;
    },
  }
});

export default store;
