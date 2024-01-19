import dotenv from 'dotenv';

export const envConfig = (): EnvConfig => {
    const mode = process.env.NODE_ENV;
    if (!mode || mode === 'development') {
        dotenv.config();
    } else {
        dotenv.config({
            path: `.env.${mode}`,
        });
    }

    return {
        mode,
        mongodbUri: process.env.MONGODB_URI,
    }
}

    export interface EnvConfig {
        mode: string;
        mongodbUri: string;
    }
