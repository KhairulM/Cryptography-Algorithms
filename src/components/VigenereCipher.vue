<template>
  <div class="vigenere-cipher">
    <h3>{{ `${variantStr} Vigenere Cipher` }}</h3>
    <div class="option-container">
      <button class="option" @click="onClickOptionStandard">Standard</button>
      <button class="option" @click="onClickOptionFull">Full Vigenere Cipher</button>
      <button class="option" @click="onClickOptionAutoKey">Auto Key Vigenere Cipher</button>
      <button class="option" @click="onClickOptionExtended">Extended Vigenere Cipher</button>
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
  ExtendedVigenereCipherDecrypt,
} from "@/utils/vigenere_cipher";

import { mapGetters, mapMutations } from "vuex";
import { removeWhiteSpace } from "@/utils/preprocessor";

export default {
  name: "VigenereCipher",
  data() {
    return {
      keystring: "",
      variantStr: "Standard",
      variantInt: 1,
    };
  },
  methods: {
    onClickOptionStandard() {
      this.variantStr = "Standard"
      this.variantInt = 1;
    },
    onClickOptionFull() {
      this.variantStr = "Full"
      this.variantInt = 2;
    },
    onClickOptionAutoKey() {
      this.variantStr = "Auto Key"
      this.variantInt = 3;
    },
    onClickOptionExtended() {
      this.variantStr = "Extended"
      this.variantInt = 4;
    },
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
          switch (this.variantInt) {
            case 1:
              this.setCiphertext(
                VigenereCipherEncrypt(removeWhiteSpace(this.getPlaintext()), removeWhiteSpace(this.keystring))
              );   
              break;
            case 2:
              this.setCiphertext(
                FullVigenereCipherEncrypt(removeWhiteSpace(this.getPlaintext()), removeWhiteSpace(this.keystring))
              );
              break;
            case 3:
              {
                let plaintext = this.getPlaintext();
                plaintext = removeWhiteSpace(plaintext);
                this.keystring = removeWhiteSpace(this.keystring);
                if (this.keystring.length < plaintext.length) {
                  this.keystring += plaintext.slice(0, plaintext.length - this.keystring.length);
                }

                this.setCiphertext(
                  VigenereCipherEncrypt(removeWhiteSpace(this.getPlaintext()), this.keystring)
                );
              }
              break;
            case 4:
              this.setCiphertext(
                ExtendedVigenereCipherEncrypt(this.getPlaintext(), this.keystring)
              );
              break;
            default:
              break;
          }
        } else {
          switch (this.variantInt) {
            case 1:
              this.setPlaintext(
                VigenereCipherDecrypt(removeWhiteSpace(this.getCiphertext()), removeWhiteSpace(this.keystring))
              );
              break;
            case 2:
              this.setPlaintext(
                FullVigenereCipherDecrypt(removeWhiteSpace(this.getCiphertext()), removeWhiteSpace(this.keystring))
              );
              break;
            case 3:
              this.setPlaintext(
                VigenereCipherDecrypt(removeWhiteSpace(this.getCiphertext()), removeWhiteSpace(this.keystring))
              );
              break;
            case 4:
              this.setPlaintext(
                ExtendedVigenereCipherDecrypt(this.getCiphertext(), this.keystring)
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
