<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
      <h1>{{ title }}</h1>
      <nav>
        <ul>
          <li><a href="#"><router-link :to="{name: 'home'}">Beranda</router-link></a></li>
          <li><a href="">Tentang</a></li>
        </ul>
      </nav>
    </header>
 
    <RouterView />
</template>
<script>
  export default {
    data() {
      return {
        title: "Welcome to my to do list"
      };
    }
  }
  </script>
  
  <style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 36px;
  background-color: #333;
}

nav ul {
  list-style: none;
  background-color: #333;
  padding: 0;
}

nav ul li {
  display: inline;
  background-color: #333;
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  background-color: #333;
  color: #fff;
}
  </style>
<style>
* {
  margin: 0;
  padding: 0;
  background-color: white;
}

</style>