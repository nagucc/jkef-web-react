/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

export default {
  title: '家琨教育基金会',
  description: '家琨教育基金会',
  googleAnalyticsId: 'UA-XXXXX-X',
  sidebar: [
  {
  	title: '首页',
  	icon: 'fa-home',
  	href: '/'
  },
  {
  	title: '电子阅览室',
  	icon: '',
  	href: '/reading-room'
  }
  ],
  projects: [{
      name: '奖学金',
      descs: ['为符合条件的中高考优秀者发放奖学金']
    }, {
      name: '助学金',
      descs: ['为大学以上的优秀学生发放助学金，并关注他们的成长',
          '与云南明德志愿服务中心合作']
    }, {
      name: '电子阅览室',
      descs: ['基于kindle创建的电子阅览室',
          '已有超过40台kindle加入',
          '与纳古志愿者协会合作']
    }, {
      name: '其他项目',
      descs: ['幼师成长计划']
    }
  ]
};

