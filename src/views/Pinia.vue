<template>
  <div>counter:{{ counter }}</div>
  <div>doubleCount:{{ doubleCount }}</div>
  <a-button @click="main.randomizeCounter()">counter(round)</a-button>
  <a-button type="primary" @click="main.increment()">counter++</a-button>

  <div>{{ name }}</div>
  <a-button @click="amend()">修改</a-button>
</template>
<script setup lang="ts">
//引入想要的pinia文件 {} 里面就是对应导出的名字
import { useMain } from "@/store/user";
import { storeToRefs } from "pinia";

const main = useMain();
// 解构main里面的state和getters的数据，
// 使用storeToRefs解构才有响应式，响应式可以直接修改数据，不过这我只用来渲染
const { counter, name, doubleCount } = storeToRefs(main);

//（常用方法三种）
//常用方法一： 使用数据
console.log(counter);
//使用方法(方法目前不能解构)
main.increment();

// 常用方法二：修改数据
// counter = 9999

//常用方法三：
//进阶使用$patch，多个修改
const amend = () => {
  main.$patch((state) => {
    state.counter += 10;
    state.name = "张三";
  });
};
</script>
