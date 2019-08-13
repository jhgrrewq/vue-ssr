<template>
  <div>
    <h2>商品列表</h2>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <router-link :to="`/detail/${good.id}`">
          <span>{{good.text}}</span>
          <span>￥{{good.price}}</span>
        </router-link>
      </li>
    </ul>
    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      goods: []
    }
  },
  methods: {
    async getData() {
      const res = await axios.get('/api/goods')
      const { ok, goods } = res.data
      if (ok) {
        // 此处返回的数据会和 data 中的合并，同名会覆盖
        this.goods = goods
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
