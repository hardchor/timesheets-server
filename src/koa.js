/* eslint-disable no-param-reassign */
import Koa from 'koa';
import proxy from 'koa-proxy';

const expressPort = process.env.EXPRESS_PORT || 4000;
const port = process.env.PORT || 3000;

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    console.error(err);
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(proxy({
  host: `http://localhost:${expressPort}`,
  match: /^\/(api\/|download|refresh|update)/,
}));

console.log(`Koa app listening on port ${port}!`);
app.listen(port);
