<template>
  <div class="playfair-cipher">
    <h3>Playfair Cipher</h3>
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
import { mapGetters, mapMutations } from "vuex";
import { filterAlphabets } from "@/utils/preprocessor";
import {
  PlayfairCipherEncrypt,
  PlayfairCipherDecrypt
} from "@/utils/playfair_cipher";

export default {
  name: "PlayfairCipher",
  data() {
    return {
      keystring: ""
    };
  },
  computed: {
    ...mapGetters(["isProcessing", "isEncrypt"])
  },
  methods: {
    ...mapMutations(["setPlaintext", "setCiphertext", "endProcessing"]),
    ...mapGetters(["getPlaintext", "getCiphertext"])
  },
  watch: {
    isProcessing(newVal) {
      if (newVal) {
        let keystring = filterAlphabets(this.keystring);

        if (this.isEncrypt) {
          let plaintext = this.getPlaintext();
          plaintext = plaintext.toLowerCase();
          plaintext = filterAlphabets(plaintext);

          this.setCiphertext(PlayfairCipherEncrypt(plaintext, keystring));
        } else {
          let ciphertext = this.getCiphertext();
          ciphertext = ciphertext.toLowerCase();
          ciphertext = filterAlphabets(ciphertext);

          this.setPlaintext(PlayfairCipherDecrypt(ciphertext, keystring));
        }

        this.endProcessing();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.playfair-cipher {
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
