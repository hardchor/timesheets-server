/* eslint-disable no-param-reassign */
import requestGithubToken from '../api/requestGithubToken';

export default () => {
  return async (ctx, next) => {
    const { code } = ctx.query;

    // get oauth token from github
    if (code) {
      const response = await requestGithubToken(code);
      ctx.body = { code, response };
      console.log('##### response', response);
    } else {
      ctx.body = 'Oops! Something went wrong and we couldn\'t ' +
        'log you in using Github. Please try again.';
    }

    await next();
  };
};
