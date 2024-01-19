import { Logger } from "@nestjs/common";
import mongoose, { ConnectOptions, Connection } from "mongoose"
import { envConfig } from "src/common/config/env.config"

export const createConnection = async (): Promise<Connection> => {
    const env = envConfig();

    const mongoClient = await mongoose.connect(env.mongodbUri, {
        autoCreate: true,
        
        autoIndex: false
    } as ConnectOptions);
    Logger.log('Database connected');
    return mongoClient.connection;
};