<template>
  <div class="vigenere-cipher">
    <div class="keystring-container">
      <p>Cipher Key:</p>
      <input
        v-model="keystring"
        class="keystring-input"
        type="text"
        placeholder="sayasukakriptografi"
      />
    </div>
  </div>
</template>

<script>
import {
  VigenereCipherEncrypt,
  VigenereCipherDecrypt
} from "@/utils/vigenere_cipher";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "VigenereCipher",
  data() {
    return {
      keystring: ""
    };
  },
  methods: {
    ...mapMutations(["setPlaintext", "setCiphertext", "endProcessing"]),
    ...mapGetters(["getPlaintext", "getCiphertext"])
  },
  computed: {
    ...mapGetters(["isProcessing", "isEncrypt"])
  },
  watch: {
    isProcessing(newVal) {
      if (newVal) {
        if (this.isEncrypt) {
          this.setCiphertext(
            VigenereCipherEncrypt(this.getPlaintext(), this.keystring.replace(/\s/g, ''))
          );
        } else {
          this.setPlaintext(
            VigenereCipherDecrypt(this.getCiphertext(), this.keystring.replace(/\s/g, ''))
          );
        }

        this.endProcessing();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.vigenere-cipher {
  width: 100%;

  .keystring-container {
    display: flex;
    align-items: center;
    width: 100%;

    .keystring-input {
      margin-left: 10px;
      flex-grow: 1;
    }
  }
}
</style>
