
export const port = process.env.PORT || 5000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;


export const enableBreadcrumbs = false;
export const enableSettings = false;




export const wxentConfig = {
  corpId: process.env.WXE_CORPID,
  secret: process.env.WXE_SECRET,
  angetId: process.env.WXE_AGENTID,
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
