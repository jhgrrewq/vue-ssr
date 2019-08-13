<template>
  <div>
    <pre v-if="goodInfo">{{goodInfo}}</pre>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      goodInfo: null
    }
  },
  computed: {
    paramsId() {
      return this.$route.params.id || ''
    }
  },
  methods: {
    async getInfo() {
      if (this.paramsId) {
        const res = await axios.get("/api/detail", { params: {
          id: this.paramsId
        }})
        const { data: goodInfo } = res.data
        if (goodInfo) {
          this.goodInfo = goodInfo
        }
      } else {
        return { goodInfo: null }
      }
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>