<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" 
    :nvaTitleOneOut="'党费管理'" 
    :nvaTitleTwoOutOne="'党费列表'" 
    :nvaTitleTwoOutTwo="'党费概况'" 
    :nvaTitleTwoOutThree="'党费缴纳'" 
    :nvaTitleTwoOutStyle="'navTitleTwo'"
    :navTitleOneRouter="'/partymessage'"
    :navTitleThreeRouter="'/partyPat'">
    </user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="partyMessage" :partyOut="true"></user-aside>

    <div class="user-message-body">
      <div class="party-survey-echart">
        <div><i></i> <span>党费标准</span></div>
        <Incumbency-chart :options="pieIncumbency" class="party-survey-echart-Incumbency"> </Incumbency-chart>
        <Incumbency-chart :options="pieRetire" class="party-survey-echart-Retire"> </Incumbency-chart>
        <div class="party-survey-echart-basics">
          <span class="party-survey-basics-one">农业党员</span>
          <span class="party-survey-basics-two">年缴纳党费：</span> <span>2.4-12元</span>
          <span class="party-survey-basics-three">学生，下岗失业人员</span>
          <span class="party-survey-basics-four">年缴纳党费：</span> <span>2.4元</span>
        </div>
      </div>
      <div class="party-survey-echart">
        <div><i></i> <span>党费收入、支出</span></div>
        <Incumbency-chart :options="pieIncumbency" class="party-survey-echart-Incumbency"> </Incumbency-chart>
        <Incumbency-chart :options="pieRetire" class="party-survey-echart-Retire"> </Incumbency-chart>
        <Incumbency-chart :options="categoryRetire" class="party-survey-echart-Incumbency"> </Incumbency-chart>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import Echarts from "vue-echarts/components/ECharts"
import "echarts/lib/chart/pie"
import "echarts/lib/chart/bar"
import 'echarts/lib/component/title'
import "echarts/lib/component/legend"

export default {
  name: 'partySurvey',
  data() {
    return {
      pieIncumbency: {
        title: {
          text: '在职党员',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: true,
          orient: 'vertical',
          right: 'right',
          y: '30%',
          data: ['3000元以下','30-5000','5000-10000','10000以上']
        },
        color: ['rgba(255,131,140,1)', 'rgba(255,69,83,1)', 'rgba(255,23,40,1)', 'rgba(197,1,5,1)'],
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data:[
              {value:335, name:'3000元以下'},
              {value:310, name:'30-5000'},
              {value:234, name:'5000-10000'},
              {value:135, name:'10000以上'}
            ]
          }
        ]
      },
      pieRetire: {
        title: {
          text: '退休干部，职工',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: true,
          orient: 'vertical',
          right: 'right',
          y: '30%',
          data: ['5000元以下','5000元以上']
        },
        color: ['rgba(255, 211, 35, 1)', 'rgba(235, 0, 6, 1)'],
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data:[
              {value:335, name:'5000元以下'},
              {value:310, name:'5000元以上'}
            ]
          }
        ]
      },
      categoryRetire: {
        title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['在职党员','退休干部、职工','学生，下岗失业人员','农民']
        },
        series: [
          {
            type: 'bar',
            data: [128978, 128978, 128978, 704970]
          }
        ]
      }
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "Incumbency-chart": Echarts
  },
}
</script>

<style>
.party-survey-echart {
  width: calc(100% - 50px);
  height: 450px;
  margin-left: 50px;
  margin-top: 60px;
  font-size:18px;
}
.party-survey-echart i {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 50px;
}
.party-survey-echart-Incumbency {
  display: inline-block;
  width: 32%;
  height: 80%;
  padding-top: 20px;
}
.party-survey-echart-Retire {
  display: inline-block;
  width: 35%;
  height: 80%;
  padding-top: 20px;
}
.party-survey-echart-basics {
  display: inline-block;
  width: 30%;
  height: 80%;
  padding-top: 20px;
  font-size:18px;
}
.party-survey-echart-basics span {
  float: left;
}
.party-survey-basics-one {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
}
.party-survey-basics-two {
  margin-left: 25%;
  margin-bottom: 100px;
}
.party-survey-basics-three {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
}
.party-survey-basics-four {
  margin-left: 30%;
}
</style>

