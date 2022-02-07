import * as dotenv from 'dotenv';
dotenv.config();
interface IEnvConfig {
    PORT: number;
    MONGO_URL: string;
}
export const EnvAppConfig: IEnvConfig = {
    PORT: (process.env.PORT || 3000) as number,
    MONGO_URL: process.env.MONGO_URL,
};
