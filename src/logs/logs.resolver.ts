import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LogsService } from './logs.service';
import { Logs } from 'src/models/entities/Logs.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Logs)
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => [Logs])
  @UseGuards(new AuthGuard())
  findAllLog() {
    return this.logsService.findAll();
  }

  @Query(() => Logs)
  @UseGuards(new AuthGuard())
  findOneLog(@Args('id', { type: () => Int }) id: number) {
    return this.logsService.findOne(id);
  }

  @Mutation(() => Logs)
  @UseGuards(new AuthGuard())
  removeLog(@Args('id', { type: () => Int }) id: number) {
    return this.logsService.remove(id);
  }

  @Mutation(() => [Logs])
  @UseGuards(new AuthGuard())
  removeSeveralGruposDeCompra(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.logsService.removeSeveral(id);
  }
}
