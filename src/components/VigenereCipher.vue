<template>
    <h1>Test</h1>
</template>

<script>
import { 
    VigenereCipherEncrypt, 
    VigenereCipherDecrypt 
} from "@/utils/vigenere_cipher";

export default {
    name: "VigenereCipher",
    data() {
        return {
            plaintext: "",
            ciphertext: "",
        }
    },
    methods: {
        VigenereCipherEncrypt,
        VigenereCipherDecrypt,
    }
}
</script>

<style>

</style>