import { Module } from '@nestjs/common';
import { EmbarquesService } from './embarques.service';
import { EmbarquesResolver } from './embarques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Embarques } from 'src/models/entities/Embarques.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    Embarques
  ])],
  providers: [EmbarquesResolver, EmbarquesService],
  exports: [EmbarquesService]
})
export class EmbarquesModule {}
