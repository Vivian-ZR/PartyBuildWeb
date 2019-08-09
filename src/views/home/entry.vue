<template>
  <div class="entry">
    <img class="entry-img" :src="entryImgUrl" alt="entry" @click="Jump(jumpNav)">
    <div class="entry-title">{{ entryNav }}</div>
  </div>
</template>

<script>
export default {
  name: 'entry',
  data () {
    return {
    }
  },
  props: {
    entryNav: {
      type: String,
      requierd: true
    },
    entryImgUrl: {
      type: String,
      required: true
    },
    jumpNav: {
      type: String,
      required: true
    }
  },
  methods: {
    Jump: function(url) {
      this.$router.push({path: url});
    }
  }
}
</script>

<style>
.entry {
  float: left;
  width: calc(50% - 20px);
  margin: 10px;
  margin-bottom: 16%;
  cursor: pointer;
}
.entry-img {
  width: 100%;
}
.entry-title {
  color: rgba(255, 255, 255, 1);
  position: relative;
  margin-top: -45%;
  margin-left: 10%;
  font-size: 1.6vmax;
}
</style>
