/* eslint-disable no-param-reassign */
import querystring from 'querystring';
import requestGithubToken from '../api/requestGithubToken';

export default () => async (ctx, next) => {
  const { code } = ctx.query;
  const authTokenUrl = '/github/result';

    // get oauth token from github
  if (code) {
    const response = await requestGithubToken(code);
    const qs = querystring.stringify(response);

    ctx.redirect(`${authTokenUrl}?${qs}`);
  } else {
    ctx.redirect(`${authTokenUrl}?error=auth_error`);
  }

  await next();
};
