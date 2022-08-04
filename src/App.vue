<script setup>
import { reactive, onMounted, ref, onUnmounted } from "vue";
import Moralis from "moralis";
import { useWeb3Transfer } from "moralis";

const loggedin = ref(false);
const userEth = ref("");
const amount = ref("");
const receiver = ref("");

onMounted(() => {
  const serverUrl = "https://jpvntlbqfubt.usemoralis.com:2053/server";
  const appId = "ucTdILjwimEpaUWGncOw7SSLq3JE4pyXxQgvl1R1";
  Moralis.start({ serverUrl, appId });
});

const TransferEth = async () => {
  const options = {
    type: "native",
    amount: Moralis.Units.ETH(amount.value),
    receiver: receiver.value,
  };
  await Moralis.transfer(options);
  const transaction = await Moralis.transfer(options);
  const result = await transaction.wait();
  console.log(result);
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
  <div>
    <header class="flex justify-between p-4 bg-green-50 lg:px-12">
      <h1 class="text-3xl font-bold text-green-900">Alabo Excel DEFI</h1>
      <div v-if="loggedin" class="bg-green-100 py-2 px-3 text-sm rounded-full">
        {{ userEth.slice(0, 13) }}...
      </div>
      <button
        @click="login"
        class="p-3 bg-green-900 text-white w-32 rounded-md"
        v-else
      >
        Login
      </button>
    </header>
    <main class="my-6 text-center">
      <div class="my-3">
        <input
          type="text"
          placeholder="Enter Amount"
          v-model="amount"
          class="border border-gray-100 p-3 rounded-md"
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          placeholder="Enter Receiver"
          v-model="receiver"
          class="border border-gray-100 p-3 rounded-md"
        />
      </div>
      <div>
        <button
          class="w-32 bg-green-900 text-white p-3 rounded-md"
          @click="TransferEth"
        >
          Send
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
