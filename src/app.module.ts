import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuditSubscriber } from './common/subscribers/audit.subscriber';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, AuditSubscriber],
})
export class AppModule {}
