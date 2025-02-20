import { Application, Session } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';
import { config } from './configs/config.js'
import { viewEngine, engineFactory, adapterFactory, oakCors } from "./deps.js";

const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();

app.use(session.use()(session));

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

app.use(oakCors())

app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.authMiddleware);
app.use(middleware.serveStaticFilesMiddleware);

app.use(router.routes());

app.listen({ port: config.port });
  
export default app;
