import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: 'localhost',
      type: 'postgres',
      port: 5432,
      username: 'blink',
      password: '',
      database: 'blink_nest',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    HealthCheckModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}