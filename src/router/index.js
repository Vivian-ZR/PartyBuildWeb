import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import Home from '../views/home/Home.vue'
import Index from '../views/index/index.vue'

import userMessage from '../views/userInfo/userMessage/userMessage'
import userMessageAdd from '../views/userInfo/userMessage/userMessageAdd'
import userMessageInfo from '../views/userInfo/userMessage/userMessageInfo'
import UserMessageEdite from '../views/userInfo/userMessage/userMessageEdite'
import userInfo from '../views/userInfo/userInfo'
import userInfoAlready from '../views/userInfo/userInfoAlready'
import userMyIntegral from '../views/userInfo/userMyIntegral'
import userNewsList from '../views/userInfo/userNewsList'

import newsAdd from '../views/news/newsAdd'
import newsList from '../views/news/newsList'
import newsMessage from '../views/news/newsMessage'
import newsAritcle from '../views/news/newsAritcle'
import newsAritcle2 from '../views/news/newsAritcle2'
import editNews from '../views/news/editNews'

import studyClass from '../views/study/class'
import mystudyClass from '../views/study/myclass'
import studyClassMessage from '../views/study/classMessage'
import addClass from '../views/study/addClass'
import EditeClass from '../views/study/EditeClass'
import EditeClassChapter from '../views/study/editeClassChapter'
import editHour from '../views/study/editeHour'
import classDetails from '../views/study/classDetails'
import classvideo from '../views/study/classvideo'
import reportList from '../views/study/reportList'
import reportAritcle from '../views/study/reportAritcle'
import editReport from '../views/study/editReport'
import myreportList from '../views/study/myreportList'
import reportListMessage from '../views/study/reportListMessage'
import myreportAdd from '../views/study/myreportAdd'

import partyMessage from '../views/party/partyMessage'
import workMessage from '../views/party/workMessage'
import partySurvey from '../views/party/partySurvey'
import partyPat from '../views/party/partyPat'
import meetingMessage from '../views/party/MeetingMessage'

import democratic from '../views/org/democratic'
import democraticMessage from '../views/org/democraticMessage'
import democraticArchives from '../views/org/democraticArchives'
import democraticEdite from '../views/org/democraticEdite'
import planSummary from '../views/org/planSummary'
import planSummaryMessage from '../views/org/planSummaryMessage'
import planSummaryAdd from '../views/org/planSummaryAdd'
import planSummaryArchives from '../views/org/planSummaryArchives'
import planSummaryEdite from '../views/org/planSummaryEdite'
import democraticAdd from '../views/org/democraticAdd'

import eleArchives from '../views/partyOrgInfo/eleArchives'
import addEle from '../views/partyOrgInfo/addEle'
import editEle from '../views/partyOrgInfo/editEle'
import eleFramework from '../views/partyOrgInfo/eleFramework'
import editeEleHonor from '../views/partyOrgInfo/editeEleHonor'
import eleDemocratic from '../views/partyOrgInfo/eleDemocratic'
import eleUser from '../views/partyOrgInfo/eleUser'
import addPartyUser from '../views/partyOrgInfo/addPartyUser'
import editePartyUser from '../views/partyOrgInfo/editePartyUser'
import partyUserArchives from '../views/partyOrgInfo/PartyUserArchives'
import mobilePartyMembers from '../views/partyOrgInfo/mobilePartyMembers'
import mailList from '../views/partyOrgInfo/mailList'
import documentCabinet from '../views/partyOrgInfo/documentCabinet'

Vue.use(Router)

const router = new Router({
  base: '/web/',
  routes: [
    {
      path: '/home',
      name: 'Home',                           // 用户登录首页
      component: Home,
      meta: {
        requireAuth: true                     // 添加该字段，表示进入这个路由是需要登录的
      }
    }, {
      path: '/',
      name: 'Index',                          // 平台对外公开页面
      component: Index
    }, {
      path: '/userMessage',
      name: 'userMessage',                    // 用户中心--用户管理列表页
      component: userMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/userMessage/add',
      name: 'userMessageAdd',                 // 用户中心--用户管理--添加用户页
      component: userMessageAdd,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/userMessage/info',
      name: 'userMessageInfo',                // 用户中心--用户管理--用户详情页
      component: userMessageInfo,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/UserMessageEdite',
      name: 'UserMessageEdite',               // 用户中心--用户管理--用户详情页
      component: UserMessageEdite,
      meta: {
        requireAuth: true
      }
    },{
      path: '/userinfo',
      name: 'userInfo',                       // 用户中心--用户信息--正在学习的课程
      component: userInfo,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/userInfoAlready',
      name: 'userInfoAlready',                // 用户中心--用户信息--已经学过的课程
      component: userInfoAlready,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/userMyIntegral',
      name: 'userMyIntegral',                 // 用户中心--用户积分
      component: userMyIntegral,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/userNewsList',
      name: 'userNewsList',                   // 用户中心--消息列表
      component: userNewsList,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/newslist',
      name: 'newslist',                       // 新闻--新闻汇总页面
      component: newsList,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/newsmessage',
      name: 'newsmessage',                    // 新闻--新闻管理页面
      component: newsMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/newsAdd',
      name: 'newsAdd',                        // 新闻--新增新闻页面
      component: newsAdd,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/newsAritcle',
      name: 'newsAritcle',                    // 新闻--新闻详情页面
      component: newsAritcle,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/newsAritcle2',
      name: 'newsAritcle2',                    // 新闻--新闻详情页面
      component: newsAritcle2,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/editNews',
      name: 'editNews',                    // 新闻--新闻详情页面
      component: editNews,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/studyClass',
      name: 'studyClass',                     // 学习园地--学习课程列表页面
      component: studyClass,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/studyClassMessage',
      name: 'studyClassMessage',              // 学习园地--课程管理列表页面
      component: studyClassMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/addClass',
      name: 'addClass',                       // 学习园地--课程管理--添加课程页面
      component: addClass,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/EditeClass',
      name: 'EditeClass',                     // 学习园地--课程管理--编辑课程页面
      component: EditeClass,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/EditeClassChapter',
      name: 'EditeClassChapter',              // 学习园地--课程管理--编辑课程页面
      component: EditeClassChapter,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/editHour',
      name: 'editHour',                       // 学习园地--课程管理--编辑课时页面
      component: editHour,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/classDetails',
      name: 'classDetails',                   // 学习园地--课程详情页面
      component: classDetails,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/classvideo',
      name: 'classvideo',                     // 学习园地--视频播放页面
      component: classvideo,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/mystudyClass',
      name: 'mystudyClass',                   // 学习园地--我的课程列表页面
      component: mystudyClass,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/reportList',
      name: 'reportList',                     // 学习园地--汇报列表
      component: reportList,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/reportAritcle',
      name: 'reportAritcle',                  // 学习园地--汇报详情
      component: reportAritcle,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/editReport',
      name: 'editReport',                     // 学习园地--汇报编辑
      component: editReport,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/myreportList',
      name: 'myreportList',                   // 学习园地--我的汇报列表
      component: myreportList,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/reportListMessage',
      name: 'reportListMessage',              // 学习园地--我的汇报列表
      component: reportListMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/myreportAdd',
      name: 'myreportAdd',                    // 学习园地--我的汇报列表
      component: myreportAdd,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/partymessage',
      name: 'partymessage',                   // 党务管理--党费列表页面
      component: partyMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/partySurvey',
      name: 'partySurvey',                    // 党务管理--党费概况页面
      component: partySurvey,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/partyPat',
      name: 'partyPat',                       // 党务管理--党费缴纳页面
      component: partyPat,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/workmessage',
      name: 'workmessage',                    // 党务管理--工作管理页面
      component: workMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/meetingMessage',
      name: 'meetingMessage',                 // 党务管理--工作管理页面
      component: meetingMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/democratic',
      name: 'democratic',                      // 组织发展--公告信息页面
      component: democratic,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/democraticMessage',
      name: 'democraticMessage',               // 组织发展--公告信息页面
      component: democraticMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/democraticArchives',
      name: 'democraticArchives',              // 组织发展--公告信息详情页面
      component: democraticArchives,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/democraticEdite',
      name: 'democraticEdite',                 // 组织发展--公告信息编辑页面
      component: democraticEdite,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/democraticAdd',
      name: 'democraticAdd',                   // 组织发展--公告信息页面
      component: democraticAdd,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/planSummary',
      name: 'planSummary',                     // 组织发展--计划总结页面
      component: planSummary,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/planSummaryArchives',
      name: 'planSummaryArchives',             // 组织发展--计划总结页面
      component: planSummaryArchives,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/planSummaryEdite',
      name: 'planSummaryEdite',                // 组织发展--计划编辑页面
      component: planSummaryEdite,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/planSummaryMessage',
      name: 'planSummaryMessage',              // 组织发展--计划管理列表页面
      component: planSummaryMessage,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/planSummaryAdd',
      name: 'planSummaryAdd',                  // 组织发展--新增计划总结页面
      component: planSummaryAdd,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/eleArchives',
      name: 'eleArchives',                     // 党组织信息库--电子档案管理-组织档案列表
      component: eleArchives,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/addEle',
      name: 'addEle',                          // 党组织信息库--电子档案管理-增加组织档案
      component: addEle,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/editEle',
      name: 'editEle',                         // 党组织信息库--电子档案管理-编辑组织基础档案
      component: editEle,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/eleFramework',
      name: 'eleFramework',                    // 党组织信息库--电子档案管理-编辑组织架构档案
      component: eleFramework,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/editeEleHonor',
      name: 'editeEleHonor',                   // 党组织信息库--电子档案管理-编辑组织荣誉档案
      component: editeEleHonor,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/eleDemocratic',
      name: 'eleDemocratic',                   // 党组织信息库--电子档案管理-组织档案详情
      component: eleDemocratic,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/eleUser',
      name: 'eleUser',                         // 党组织信息库--电子档案管理-人员档案
      component: eleUser,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/addPartyUser',
      name: 'addPartyUser',                    // 党组织信息库--电子档案管理-添加人员档案
      component: addPartyUser,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/editePartyUser',
      name: 'editePartyUser',                  // 党组织信息库--电子档案管理-编辑党员档案
      component: editePartyUser,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/partyUserArchives',
      name: 'partyUserArchives',               // 党组织信息库--电子档案管理-党员档案详情
      component: partyUserArchives,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/mobilePartyMembers',
      name: 'mobilePartyMembers',              // 党组织信息库--流动党员列表
      component: mobilePartyMembers,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/mailList',
      name: 'mailList',                        // 党组织信息库--通讯录
      component: mailList,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/documentCabinet',
      name: 'documentCabinet',                 // 党组织信息库--电子档案管理-人员档案
      component: documentCabinet,
      meta: {
        requireAuth: true
      }
    }
  ]
})


/**
 * 全局前置守卫---判断用户是否登录
 * to:Route: 即将要进入的目标路由对象
 * from:Route: 当前导航正要离开的路由
 * next:Function: 一定要调用该方法来resolve这个钩子
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let status = store.state.status;
    if (status) {
      next();
    } else {
      next({ name: 'Index' });
    }
  }
});

export default router

