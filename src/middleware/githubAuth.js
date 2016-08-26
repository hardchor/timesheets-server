/* eslint-disable no-param-reassign */
import config from '../config';

export default () => {
  return async (ctx, next) => {
    const { github: { clientId, scopes } } = config;

    const githubUrl = 'https://github.com/login/oauth/authorize';
    const authUrl = `${githubUrl}?client_id=${clientId}&scope=${scopes}`;
    ctx.redirect(authUrl);

    await next();
  };
};
