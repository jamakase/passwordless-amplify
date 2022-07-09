export const config: {
  userPoolId?: string;
  userPoolWebClientId?: string;
} = {
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
};

export default config;