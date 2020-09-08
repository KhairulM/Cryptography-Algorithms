<template>
  <div class="super-encryption">
    <h3>Super Encryption</h3>
    <p>Algoritma yang digunakan adalah <i>Standard Vigenere Cipher</i> + Cipher Transposisi matriks dengan <i>n = 2</i></p>
    <div class="keystring-container">
      <p>Vigenere Cipher Key:</p>
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
import { mapGetters, mapMutations } from "vuex";
import { 
  VigenereCipherEncrypt,
  VigenereCipherDecrypt
} from "@/utils/vigenere_cipher";
import { 
  TranspositionCipherEncrypt,
  TranspositionCipherDecrypt
} from "@/utils/transposition_cipher";
import { removeWhiteSpace } from "@/utils/preprocessor";

export default {
  name: "SuperEncryption",
  data() {
    return {
      keystring: "",
    }
  },
  computed: {
    ...mapGetters(['isProcessing', 'isEncrypt'])
  },
  methods: {
    ...mapMutations(["setPlaintext", "setCiphertext", "endProcessing"]),
    ...mapGetters(["getPlaintext", "getCiphertext"])
  },
  watch: {
    isProcessing(newVal) {
      if (newVal) {
        if (this.isEncrypt) {
          let vigRes = VigenereCipherEncrypt(this.getPlaintext(), removeWhiteSpace(this.keystring));
          let transRes = TranspositionCipherEncrypt(vigRes);
          this.setCiphertext(transRes);
        } else {
          let transRes = TranspositionCipherDecrypt(this.getCiphertext())
          let vigRes = VigenereCipherDecrypt(transRes, removeWhiteSpace(this.keystring));
          this.setPlaintext(vigRes);
        }

        this.endProcessing();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.super-encryption {
  .keystring-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    .keystring-input {
      margin-left: 10px;
      flex-grow: 1;
    }
  }
}
</style>