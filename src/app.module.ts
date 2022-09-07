import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MovieModule } from "@app/movie/movie.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "@app/ormconfig";
import { UserModule } from "@app/user/user.module";
import { AuthMiddleware } from "@app/user/middlewares/auth.middleware";
import {HallModule} from "@app/hall /hall.module";
import {SessionModule} from "@app/session/session.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(ormconfig),
      MovieModule,
      UserModule,
      HallModule,
      SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
