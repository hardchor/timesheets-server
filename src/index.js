/* eslint-disable no-param-reassign */
import Koa from 'koa';

// Koa application is now a class and requires the new operator.
const app = new Koa();

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

app.use(async ctx => {
  ctx.body = 'hello';
});

app.listen(process.env.PORT || 3000);
