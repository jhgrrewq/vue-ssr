<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
    </nav>
    <!-- 视图 -->
    <router-view :key="$route.path"></router-view>
  </div>
</template>