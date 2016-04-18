
export const port = process.env.PORT || 5000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;


export const siteProfile = process.env.SITE_PROFILE || 'gdzc'
export const enableBreadcrumbs = false;
export const enableSettings = false;




var profiles = [];

profiles['gdzc'] = {siteName: '固定资产'};

export const title = '固定资产管理';

export const wxentConfig = {
  corpId: process.env.WXE_CORPID,
  secret: process.env.WXE_SECRET,
  angetId: process.env.WXE_AGENTID || 5,
  adminRoleId: process.env.ADMIN_ROLE_ID
};

// 微信企业号全局管理配置信息
export const wxentAdminConfig = {
  corpId: wxentConfig.corpId,
  secret: process.env.WXE_ADMIN_SECRET
};

// 用于微信企业号自助注册程序的配置信息
export const wxentSignupConfig = {
  newUserDptId: process.env.NEW_USER_DEPARTMENT_ID || 1
}

// 用于页面认证的配置信息
export const wxentAuthConfig = {
  corpId: wxentConfig.corpId,
  secret: process.env.WXE_AUTH_SECRET
}

// JKEF微信企业号配置
export const wxentJkefConfig = {
  acceptorsDeptId: process.env.JKEF_ACCEPTORS_DEPT_ID || 1
};


export const redisConfig = {
  host: process.env.HOST_REDIS || 'localhost',
  port: process.env.PORT_REDIS || 6379
};


// ynu数据库 服务器url
export const ynu_mongo_url = process.env.YNU_MONGO_URL || 'mongodb://localhost/ynu';

// 固定资产大型设备阈值
export const gdzc_dxsb_yz = 100000;
export const GdzcXlsTitles = {
  Glr: process.env.GDZC_TITLE_GLR || '管理人',
  Lyr: process.env.GDZC_TITLE_LYR || '领用人',
  Bqh: process.env.GDZC_TITLE_BQH || '标签号',
  Dj: process.env.GDZC_TITLE_DJ || '单价',
  Sl: process.env.GDZC_TITLE_SL || '数量',
  Yz: process.env.GDZC_TITLE_YZ || '原值',
  Gzrq: process.env.GDZC_TITLE_GZRQ || '购置日期',
  Synx: process.env.GDZC_TITLE_SYNX || '使用年限',
  Sbmc: process.env.GDZC_TITLE_SBMC || '设备名称'
};

export const acl_password = process.env.ACL_PASSWORD || 'password';
