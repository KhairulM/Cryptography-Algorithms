<template>
  <div class="affine-cipher">
    <h3>Affine Cipher</h3>
    <div class="key-input-container">
      <p>Key <i>m</i> (must be co-prime with 26):</p>
      <input type="number" class="key-input" v-model="mKey" min="0" />
    </div>
    <div class="key-input-container">
      <p>Key <i>n</i>:</p>
      <input type="number" class="key-input" v-model="nKey" min="0" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  AffineCipherEncrypt,
  AffineCipherDecrypt
} from "@/utils/affine_cipher";
import { filterAlphabets } from "@/utils/preprocessor";

export default {
  name: "AffineCipher",
  data() {
    return {
      mKey: null,
      nKey: null
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
        // check if m is co-prime with 26
        this.mKey = parseInt(this.mKey);
        this.nKey = parseInt(this.nKey);

        let gcd = (a, b) => {
          if (!b) return a;
          return gcd(b, a % b);
        };

        if (gcd(this.mKey, 26) === 1) {
          if (this.isEncrypt) {
            let plaintext = this.getPlaintext();
            plaintext = plaintext.toLowerCase();
            plaintext = filterAlphabets(plaintext);

            this.setCiphertext(
              AffineCipherEncrypt(plaintext, this.mKey, this.nKey)
            );
          } else {
            let ciphertext = this.getCiphertext();
            ciphertext = ciphertext.toLowerCase();
            ciphertext = filterAlphabets(ciphertext);

            this.setPlaintext(
              AffineCipherDecrypt(ciphertext, this.mKey, this.nKey)
            );
          }
        } else {
          alert("Key m is not co-prime with 26 (length of the alphabet)");
        }

        this.endProcessing();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.affine-cipher {
  .key-input-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    .key-input {
      margin-left: 10px;
      flex-grow: 1;
    }
  }
}
</style>
