import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    plaintext: "",
    ciphertext: "",
    encrypt: null,
    fromFile: false,
    processing: false
  },
  getters: {
    getPlaintext: state => state.plaintext,
    getCiphertext: state => state.ciphertext,
    isProcessing: state => state.processing,
    isEncrypt: state => state.encrypt,
    isFromFile: state => state.fromFile
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
    setFromFile(state, fromFile) {
      state.fromFile = fromFile;
    }
  }
});

export default store;
