export default {
  data () {
    return {
      sitemap: []
    }
  },
  mounted () {
    this.setSiteMap()
  },
  methods: {
    setSiteMap () {
      this.$store.dispatch('setSiteMap', this.sitemap)
    }
  }
}
