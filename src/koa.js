/* eslint-disable no-param-reassign */
import Koa from 'koa';
import proxy from 'koa-proxy';
import router from 'koa-router';
import githubAuth from './middleware/githubAuth';
import githubToken from './middleware/githubToken';

const expressPort = process.env.EXPRESS_PORT || 4000;
const port = process.env.PORT || 3000;

const app = new Koa();
const appRouter = router();

app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    console.error(err);
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async (ctx, next) => {
  ctx.request.proxiedHost = ctx.request.host;
  await next();
});

app.use(proxy({
  host: `http://localhost:${expressPort}`,
  match: /^\/(api|download|refresh|update|notes)\/?/,
  requestOptions: (request, opt) => {
    opt.headers.host = request.proxiedHost;

    return opt;
  },
}));

appRouter.get('/github/auth', githubAuth());
appRouter.get('/github/token', githubToken());

app
  .use(appRouter.routes())
  .use(appRouter.allowedMethods());

console.log(`Koa app listening on port ${port}!`);
app.listen(port);
