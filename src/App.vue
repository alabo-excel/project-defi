<script setup>
import Footer from "./components/Footer.vue";
import Home from "./views/home.vue";

import { reactive, onMounted, ref, onUnmounted } from "vue";
import Moralis from "moralis";
import { useWeb3Transfer } from "moralis";

const loggedin = ref(false);
const userEth = ref("");
const amount = ref("");
const receiver = ref("");
const loading = ref(false);

onMounted(() => {
  const serverUrl = "https://jpvntlbqfubt.usemoralis.com:2053/server";
  const appId = "ucTdILjwimEpaUWGncOw7SSLq3JE4pyXxQgvl1R1";
  Moralis.start({ serverUrl, appId });
});

const TransferEth = async () => {
  loading.value = true;
  const options = {
    type: "native",
    amount: Moralis.Units.ETH(amount.value),
    receiver: receiver.value,
  };
  await Moralis.transfer(options);
  const transaction = await Moralis.transfer(options);
  const result = await transaction.wait();
  console.log(result);
  amount.value = "";
  receiver.value = "";
  loading.value = false;
};
const state = reactive({ userAuth: "" });

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
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
onUnmounted(() => {
  Moralis.User.logOut();
  state.userAuth = "";
  // localStorage.clear();
});
</script>

<template>
  <div class="text-white w-full bg-[#0D0D0D]">
    <div
      class="
        lg:px-20 lg:p-8
        p-4
        flex
        justify-between
        absolute
        top-0
        w-full
        z-50
      "
    >
      <div class="text-3xl">Defi</div>
      <div
        v-if="loggedin"
        class="border border-green-100 py-2 px-3 text-sm rounded-full"
      >
        {{ userEth.slice(0, 13) }}...
      </div>
      <div v-else>
        <button
          class="border border-[#00E3A5] lg:p-4 p-2 lg:w-44 w-32"
          @click="login"
        >
          Connect
        </button>
      </div>
    </div>
    <main v-if="loggedin" class="text-center py-32 h-screen">
      <div class="my-3">
        <input
          type="text"
          placeholder="Enter Amount"
          v-model="amount"
          class="border w-1/2 border-gray-100 p-3 text-black rounded-md"
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          placeholder="Enter Receiver"
          v-model="receiver"
          class="border w-1/2 border-gray-100 p-3 text-black rounded-md"
        />
      </div>
      <div>
        <button
          class="w-32 bg-green-900 text-white p-3 rounded-md"
          @click="TransferEth"
        >
          {{loading ? "Processing..." : "Send"}}
        </button>
      </div>
    </main>
    <div v-else>
      <Home />
    </div>
    <div class="fixed bottom-0 w-full">
      <Footer />
    </div>
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