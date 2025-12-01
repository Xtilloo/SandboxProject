import { Context } from 'hono';
import { env } from 'hono/adapter';

export const getPlaformConfig = (envVars: any) => {
    return {
        iss: "https://canvas.instructure.com",
        clientId:  envVars.LTI_CLIENT_ID,
    };
};

export const validateLtiLaunch = async (c: Context) => {
    // Here is where the @atomicjolt/lti-endpoints would be used

    const envVars = env(c);

    console.log(`Validating launch for client: ${envVars.LTI_CLIENT_ID}`);
    return c.json(true, 200);
};