import { GqlModuleOptions } from "@nestjs/graphql";
import { join } from "path";



export const graphqlConfig = (): GqlModuleOptions => {
    return {
        //playground: process.env.NODE_ENV === 'development',
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        //uploads: {
            // maxFileSize: 20_000_000,//20 mb
            // maxFiles: 5,
        // }
        // tracing: false,
        // buildSchemaOptions: {
        //     numberScalarMode: 'integer',
        // }

    }
}