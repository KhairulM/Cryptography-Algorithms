<template>
  <div class="home">
    <div class="link-container">
      <router-link to="/vigenere-cipher">Vignere Cipher</router-link>
      <router-link to="/playfair-cipher">Playfair Cipher</router-link>
      <router-link to="/affine-cipher">Affine Cipher</router-link>
      <router-link to="/hill-cipher">Hill Cipher</router-link>
      <router-link to="/super-encryption">Super Encryption</router-link>
    </div>
    <router-view></router-view>
    <div v-if="isFromFile" class="file-input-container">
      <p>Select a file:</p>
      <input type="file" ref="fileInputHandler" />
    </div>
    <div v-else class="input-container">
      <p>Plaintext:</p>
      <textarea
        id="plaintext"
        v-model="plaintext"
        cols="30"
        rows="10"
      ></textarea>
      <p>Ciphertext:</p>
      <textarea
        id="ciphertext"
        ref="ciphertext"
        v-model="ciphertext"
        cols="30"
        rows="10"
      ></textarea>
    </div>
    <div class="action-container">
      <button class="button-encrypt" @click="onClickEncrypt">Encrypt</button>
      <button v-if="!isFromFile" class="button-download" @click="downloadCiphertext">Download Ciphertext</button>
      <button class="button-decrypt" @click="onClickDecrypt">Decrypt</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { saveFile } from "@/utils/file_op";

export default {
  name: "Home",
  data() {
    return {
      plaintext: "",
      ciphertext: "",
      fileReader: null
    };
  },
  computed: {
    ...mapGetters(["isProcessing", "isEncrypt", "isFromFile"])
  },
  methods: {
    downloadCiphertext() {
      saveFile(this.getCiphertext(), 'ciphertext.txt');
    },
    setFileResult(result) {
      if (this.isEncrypt) {
        this.setPlaintext(result);
      } else {
        this.setCiphertext(result);
      }
    },
    setPlainAndCipherText() {
      this.setPlaintext(this.plaintext);
      this.setCiphertext(this.ciphertext);
    },
    onClickEncrypt() {
      this.$store.commit("setEncrypt", true);

      if (this.isFromFile) {
        let file = this.$refs.fileInputHandler.files[0];
        this.fileReader.readAsBinaryString(file);
      } else {
        this.setPlainAndCipherText();
        this.startProcessing();
      }
    },
    onClickDecrypt() {
      this.$store.commit("setEncrypt", false);

      if (this.isFromFile) {
        let file = this.$refs.fileInputHandler.files[0];
        this.fileReader.readAsBinaryString(file);
      } else {
        this.setPlainAndCipherText();
        this.startProcessing();
      }
    },
    ...mapGetters(["getPlaintext", "getCiphertext"]),
    ...mapMutations(["setPlaintext", "setCiphertext", "startProcessing"])
  },
  watch: {
    isProcessing(newVal) {
      if (!newVal) {
        if (this.isEncrypt) this.ciphertext = this.getCiphertext();
        else this.plaintext = this.getPlaintext();

        if (this.isFromFile) {
          let tobeDownloadStr = this.isEncrypt
            ? this.getCiphertext()
            : this.getPlaintext();
          let fileName = this.isEncrypt ? "Encrypted" : "Decrypted";

          saveFile(tobeDownloadStr, fileName);
        }
      }
    }
  },
  created() {
    this.fileReader = new FileReader();
    this.fileReader.addEventListener("loadstart", function() {
      console.log("File reading started");
    });

    this.fileReader.addEventListener(
      "loadend",
      function(e) {
        // contents of file in variable
        let result = e.target.result;
        this.setFileResult(result);
        this.startProcessing();
      }.bind(this)
    );

    this.fileReader.addEventListener("error", function() {
      alert("Error : Failed to read file");
    });
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 20px;
  width: 40em;

  .link-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    & > a {
      text-decoration: none;
      color: white;
      background-color: grey;
      padding: 10px;
      border-radius: 5px;
    }
  }

  .file-input-container {
    margin-top: 10px;
    padding: 20px;
    width: calc(100%-40px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #e3e3e3;

    input {
      margin-top: 10px;
    }
  }

  .input-container {
    margin-top: 20px;

    textarea {
      display: block;
      width: 100%;

      &#plaintext {
        margin-bottom: 20px;
      }
    }
  }

  .action-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
