<template>
  <div class="vigenere-cipher">
    <h3>{{ `${variantStr} Vigenere Cipher` }}</h3>
    <div class="option-container">
      <button class="option" @click="onClickOptionStandard">Standard</button>
      <button class="option" @click="onClickOptionFull">
        Full Vigenere Cipher
      </button>
      <button class="option" @click="onClickOptionAutoKey">
        Auto Key Vigenere Cipher
      </button>
      <button class="option" @click="onClickOptionExtended">
        Extended Vigenere Cipher
      </button>
    </div>
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
  VigenereCipherDecrypt,
  FullVigenereCipherEncrypt,
  FullVigenereCipherDecrypt,
  ExtendedVigenereCipherEncrypt,
  ExtendedVigenereCipherDecrypt
} from "@/utils/vigenere_cipher";

import { mapGetters, mapMutations } from "vuex";
import { filterAlphabets, filterASCII } from "@/utils/preprocessor";

export default {
  name: "VigenereCipher",
  data() {
    return {
      keystring: "",
      variantStr: "Standard",
      variantInt: 1
    };
  },
  methods: {
    onClickOptionStandard() {
      this.variantStr = "Standard";
      this.variantInt = 1;
      this.setFromFile(false);
    },
    onClickOptionFull() {
      this.variantStr = "Full";
      this.variantInt = 2;
      this.setFromFile(false);
    },
    onClickOptionAutoKey() {
      this.variantStr = "Auto Key";
      this.variantInt = 3;
      this.setFromFile(false);
    },
    onClickOptionExtended() {
      this.variantStr = "Extended";
      this.variantInt = 4;
      this.setFromFile(true);
    },
    ...mapMutations([
      "setPlaintext",
      "setCiphertext",
      "endProcessing",
      "setFromFile"
    ]),
    ...mapGetters(["getPlaintext", "getCiphertext"])
  },
  computed: {
    ...mapGetters(["isProcessing", "isEncrypt"])
  },
  watch: {
    isProcessing(newVal) {
      if (newVal) {
        // preprocessing
        let keystring = this.keystring;
        let plaintext = this.getPlaintext();
        let ciphertext = this.getCiphertext();

        if (this.variantInt != 4) {
          keystring = keystring.toLowerCase();
          keystring = filterAlphabets(keystring);

          plaintext = plaintext.toLowerCase();
          plaintext = filterAlphabets(plaintext);

          ciphertext = ciphertext.toLowerCase();
          ciphertext = filterAlphabets(ciphertext);
        } else {
          keystring = filterASCII(keystring);
          plaintext = filterASCII(plaintext);
          ciphertext = filterASCII(ciphertext);
        }

        if (this.isEncrypt) {
          switch (this.variantInt) {
            case 1:
              this.setCiphertext(VigenereCipherEncrypt(plaintext, keystring));
              break;
            case 2:
              this.setCiphertext(
                FullVigenereCipherEncrypt(plaintext, keystring)
              );
              break;
            case 3:
              {
                if (keystring.length < plaintext.length) {
                  keystring += plaintext.slice(
                    0,
                    plaintext.length - this.keystring.length
                  );
                  this.keystring = keystring;
                }

                this.setCiphertext(VigenereCipherEncrypt(plaintext, keystring));
              }
              break;
            case 4:
              this.setCiphertext(
                ExtendedVigenereCipherEncrypt(plaintext, keystring)
              );
              break;
            default:
              break;
          }
        } else {
          switch (this.variantInt) {
            case 1:
              this.setPlaintext(VigenereCipherDecrypt(ciphertext, keystring));
              break;
            case 2:
              this.setPlaintext(
                FullVigenereCipherDecrypt(ciphertext, keystring)
              );
              break;
            case 3:
              this.setPlaintext(VigenereCipherDecrypt(ciphertext, keystring));
              break;
            case 4:
              this.setPlaintext(
                ExtendedVigenereCipherDecrypt(ciphertext, keystring)
              );
              break;
            default:
              break;
          }
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

  .option-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .option {
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

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
