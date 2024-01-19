import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { graphqlConfig } from './common/config/graphql.config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load:[createConnection]
    // }),
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: 'mongodb://localhost:27017/swasthya-med_nestjs_ubuntu',
        
    //     autoCreate: true,
        
    //   })
    // }),
    MongooseModule.forRoot('mongodb://localhost:27017/swasthya-med_nestjs_ubuntu'),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: graphqlConfig,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
