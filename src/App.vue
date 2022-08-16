<script setup>
import { reactive, onMounted, ref, onUnmounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import Moralis from "moralis";
import { useWeb3Transfer } from "moralis";

const loggedin = ref(false);
const userEth = ref("");

onMounted(() => {
  const serverUrl = "https://jpvntlbqfubt.usemoralis.com:2053/server";
  const appId = "ucTdILjwimEpaUWGncOw7SSLq3JE4pyXxQgvl1R1"; 
  Moralis.start({ serverUrl, appId });
});


const login = async () => {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Welcome to Alabo Excel DEFI",
    })
      .then((user) => {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        state.userAuth = user.get("ethAddress");
        userEth.value = user.get("ethAddress");
        loggedin.value = true;

        getTransactions();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<template>
  <div class="text-white w-full bg-[#0D0D0D]">
    <Header :loggedin="loggedin" :userEth="userEth" :login="login" />
    <router-view />
    <Footer />
  </div>
</template>
<style>
@font-face {
  font-family: "Gilroy-bold";
  src: url("./assets/Gilroy-ExtraBold.otf");
}
@font-face {
  font-family: "Gilroy";
  src: url("./assets/Gilroy-Light.otf");
}
div {
  font-family: "Gilroy";
}
.bold {
  font-family: "Gilroy-bold";
}
</style>