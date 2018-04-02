<template>
  <div>
    <headers></headers>
    租赁页面
  </div>
</template>
<script>
import headers from '~/components/headers'
export default {
  data () {
    return {

    }
  },
  async asyncData ({ params, route, store, error, env }) {
    store.commit('headerType/urlInfo', route.path)
  },
  components: {
    headers
  }
}
</script>
