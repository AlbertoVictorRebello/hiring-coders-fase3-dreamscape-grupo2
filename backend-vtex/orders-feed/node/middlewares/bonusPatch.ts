import { json } from 'co-body';

export async function bonusPatch(ctx: Context, next: () => Promise<any>) {
  const body = (await json (ctx.req))

  ctx.set('Cache-Control','no-cache no-store');
  ctx.set('X-VTEX-Use-Https','true')
  ctx.set('Proxy-Authorization','ctx.authToken')
  ctx.set('Access-Control-Allow-Origin','*')

  const res = await ctx.clients.bonus.getPatch('', body).catch((reason)=>{
    return reason?.response?.data
  })


  ctx.body = res;

  await next()
}
