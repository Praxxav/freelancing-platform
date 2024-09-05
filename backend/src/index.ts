import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { servicesRouter } from './routes/services';
import { cors } from 'hono/cors'



export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();
app.use('/*', cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/services', servicesRouter)

export default app