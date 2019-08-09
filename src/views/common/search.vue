<!-- 搜索框 -->
<template>
  <div class="search">
    <div class="input">
      <div class="search-choice" @mouseover="searchOption = true" @mouseout="searchOption = false">
        {{ choise }}
        <i class="iconfont">&#xe8ee;</i>
      </div>
      <input v-model="selectInput" type="text" class="search-input" placeholder="关联词搜索">
      <i class="iconfont search-input-icon">&#xe8f0;</i>
    </div>
    <div @click="apiQuery"  class="query">搜索</div>
      <div v-show="searchOption" @mouseover="searchOption = true" @mouseout="searchOption = false" class="search-choice-option">
        <div @click="queryChoise" v-for="item in selectChoise" :key="item.id" >{{ item }}</div>
      </div>
  </div>  
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchOption: false,
      choise: '选项',
      selectInput: ''
    }
  },
  props: {
    selectChoise: {
      type: Array,
      required: true
    }
  },
  methods: {
    queryChoise: function (e) {
      this.choise = e.target.innerHTML;
    },
    apiQuery: function () {
      let _choise = this.choise;
      let _selectInput = this.selectInput;
      // let _page = this.page;  
      if (_choise === "选项") {
        alert("请选择选项！");
      } else {
        this.$parent.QueryPage(_choise, _selectInput, '');
      }
    }
  }  
}
</script>

<style>
.search {
  position: relative;
  width: 657px;
  height: 35px;
  margin: auto;
}
.input {
  position: relative;
  display: inline-block;
  height: 37px;
  width: 540px;
  margin-right: 13px;
  border: 1px solid rgba(170,170,170,1);
  border-radius:5px;
}
.search-choice {
  height: 36px;
  width: 90px;
  text-align: center;
  line-height: 35px;
  font-size:16px;
  font-family:SourceHanSansSC-Normal;
  font-weight:400;
  color: rgba(68,68,68,1);
  background:rgba(223,223,223,1);
  cursor: pointer;
  display: inline-block;
}
.search-input {
  display: inline-block;
  position: relative;
  height: 34px;
  width: 420px;
  top: -2px;
  border-radius:0 5px 5px 0;
  font-size:16px;
  font-family:SourceHanSansSC-Normal;
  font-weight:400;
  margin-left: 30px;
  /* background-color: aqua; */
}
.search-input::-webkit-input-placeholder {
  color:rgba(153,153,153,1);
}
.search-input-icon {
  position: relative;
  top: -32px;
  font-size: 26px !important;
  color: rgba(223,223,223,1);
  left: 95px;
}
.query {
  position: relative;
  display: inline-block;
  height: 35px;
  width: 100px;
  top: -37px;
  border:1px solid rgba(170,170,170,1);
  border-radius:5px;
  font-size:16px;
  font-family:SourceHanSansSC-Normal;
  font-weight:400;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
.query:hover {
  background:rgba(223,223,223,1);
}
.search-choice-option {
  position: relative;
  width: 90px;
  top: -38px;
  font-size:16px;
  cursor: pointer;
  background-color: beige;
  background:rgba(255,255,255,1);
  border:1px solid rgba(223,223,223,1);
  box-shadow:0px 2px 6px 1px rgba(86,86,86,0.15);
  text-align: center;
  line-height: 20px;
}
.search-choice-option div:hover {
  background:rgba(215,215,215,1);
}

</style>
