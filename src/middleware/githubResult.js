/* eslint-disable no-param-reassign */

export default () => async (ctx, next) => {
  const { query } = ctx;

  ctx.body = query;

  await next();
};
