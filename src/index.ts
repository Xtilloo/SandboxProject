import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from 'hono/adapter';
import { validateLtiLaunch } from './lti';

type Bindings = {
    LTI_CLIENT_ID: string,
    APP_URL: string
}

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('/*', cors());

app.get("/", (c) => {
  return c.json(
    {
      error: false,
      message: "Server running...",
    },
    200
  );
});

// Health check
app.get(
    '/health', 
    (c) => {
        return c.json({ status: 'ok', runtime: 'hono'})  
    }
);

// OpenID Connect (OIDC) login
app.get('/auth/login', async (c) => {
    return c.text("LTI OIDC Login Flow would happen here");
});

// LTI Launch
app.post('/auth/launch', async (c) => {
    const isValid = await validateLtiLaunch(c);

    if (!isValid) return c.text("Unauthorized", 401);

    const {APP_URL} = env(c);

    return c.html(`
        <h1>LTI Launch Successful</h1>
        <p>Welcome text.</p>
        <p>Running at: ${APP_URL}</p>    
    `);
});

export default app;