<template>
  <el-input
    v-model="other"
    type="textarea"
    :rows="20"
    placeholder="请输入内容"
  />
  <!-- <el-button @click="onSubmit" type="primary">提交</el-button> -->
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    other: {
      get: function () {
        return this.$store.getters.getOther
      },
      set: function (newValue) {
        this.$store.dispatch('updateOther', newValue)
      }
    }
  },
  methods: {
    onSubmit(){
      this.$emit('onSubmit')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
