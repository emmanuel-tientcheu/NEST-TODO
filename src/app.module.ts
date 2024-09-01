import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user';

@Module({
  imports: [
    UserModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'manu',  // Remplacez par votre nom d'utilisateur PostgreSQL
    //   password: 'password',      // Remplacez par votre mot de passe PostgreSQL
    //   database: 'todo',  // Remplacez par le nom de votre base de données
    //   entities: [User], // Liste des entités que vous allez utiliser
    //   synchronize: true, // Synchroniser les entités avec la base de données (attention en production)
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
   
  ],
})
export class AppModule {}
