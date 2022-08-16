<script setup>
import { reactive, onMounted, ref, onUnmounted } from "vue";
import Moralis from "moralis";
import { useWeb3Transfer } from "moralis";

const amount = ref("");
const receiver = ref("");

// onMounted(() => {
//   const serverUrl = "https://jpvntlbqfubt.usemoralis.com:2053/server";
//   const appId = "ucTdILjwimEpaUWGncOw7SSLq3JE4pyXxQgvl1R1";
//   Moralis.start({ serverUrl, appId });
// });

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
  listenToUpdates();
};

const state = reactive({ userAuth: "" });

const getTransactions = async () => {
  const options = {
    chain: "testnet",
    address: userEth.value,
    from_block: "0",
  };
  const transactions = await Moralis.Web3API.account.getTransactions(options);
  console.log(transactions.result);

  const options2 = {
    chain: "testnet",
    address: userEth.value,
    to_block: "1234",
  };
  const balance = await Moralis.Web3API.account.getNativeBalance(options2);
  console.log(balance);

};

const listenToUpdates = async () => {
  let query = new Moralis.Query("EthTransactions");
  let subscription = await query.subscribe();
  subscription.on("create", (object) => {
    console.log("new transaction created");
    console.log(object);
  });
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
      <h1 class="text-3xl font-bold text-green-900">DEFI</h1>
      
     

    </header>
    <main v-if="loggedin" class="my-6 text-center">
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
