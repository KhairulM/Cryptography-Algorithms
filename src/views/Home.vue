<template>
  <div class="home">
    <div class="link-container">
      <router-link to="/vigenere-cipher">Vignere Cipher</router-link>
      <router-link to="/playfair-cipher">Playfair Cipher</router-link>
      <router-link to="/affine-cipher">Affine Cipher</router-link>
      <router-link to="/hill-cipher">Hill Cipher</router-link>
    </div>
    <router-view></router-view>
    <div class="input-container">
      <p>Plaintext:</p>
      <textarea id="plaintext" v-model="plaintext" cols="30" rows="10"></textarea>
      <p>Ciphertext:</p>
      <textarea id="ciphertext" v-model="ciphertext" cols="30" rows="10"></textarea>
    </div>
    <div class="action-container">
      <button class="button-encrypt" @click="onClickEncrypt">Encrypt</button>
      <button class="button-decrypt" @click="onClickDecrypt">Decrypt</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      plaintext: "",
      ciphertext: "",
    }
  },
  computed: {
    ...mapGetters(['isProcessing'])
  },
  methods: {
    setPlainAndCipherText() {
      this.$store.commit("setPlaintext", this.plaintext);
      this.$store.commit("setCiphertext", this.ciphertext);
    },
    onClickEncrypt() {
      this.ciphertext = "";
      this.setPlainAndCipherText();
      this.$store.commit("setEncrypt", true);
      this.$store.commit("startProcessing");
    },
    onClickDecrypt() {
      this.plaintext = "";
      this.setPlainAndCipherText();
      this.$store.commit("setEncrypt", false);
      this.$store.commit("startProcessing");
    },
    ...mapGetters(['getPlaintext', 'getCiphertext'])
  },
  watch: {
    isProcessing(newVal) {
      if (!newVal) {
        this.plaintext = this.getPlaintext();
        this.ciphertext = this.getCiphertext();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 20px;
  width: 36em;

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
