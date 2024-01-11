import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessoresModule } from './professores/professores.module';
import { AlunosModule } from './alunos/alunos.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { TokenInvalidoModule } from './token-invalido/token-invalido.module';
import { config } from './ormconfig';
import { FilesModule } from './files/files.module';
import { FotoModule } from './foto/foto.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    /* TypeOrmModule.forRoot(config), */
    AlunosModule,
    ProfessoresModule,
    AuthModule,
    MeModule,
    TokenInvalidoModule,
    FilesModule,
    FotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
