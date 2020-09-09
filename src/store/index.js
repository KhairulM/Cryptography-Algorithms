import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    plaintext: "",
    ciphertext: "",
    encrypt: null,
    fromFile: false,
    processing: false
  }
}

const store = new Vuex.Store({
  state: getDefaultState(),
  getters: {
    getPlaintext: state => state.plaintext,
    getCiphertext: state => state.ciphertext,
    isProcessing: state => state.processing,
    isEncrypt: state => state.encrypt,
    isFromFile: state => state.fromFile
  },
  mutations: {
    resetStore(state) {
      Object.assign(state, getDefaultState());
    },
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
