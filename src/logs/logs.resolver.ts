import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LogsService } from './logs.service';
import { Logs } from 'src/models/entities/Logs.entity';

@Resolver(() => Logs)
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Mutation(() => Logs)
  createLog(
  @Args('usuarioLog') usuarioLog: string,
  @Args('mensajeLog') mensajeLog: string) {
    return this.logsService.save(usuarioLog,mensajeLog);
  }

  @Query(() => [Logs])
  findAllLog() {
    return this.logsService.findAll();
  }

  @Query(() => Logs)
  findOneLog(@Args('id', { type: () => Int }) id: number) {
    return this.logsService.findOne(id);
  }

  @Mutation(() => Logs)
  removeLog(@Args('id', { type: () => Int }) id: number) {
    return this.logsService.remove(id);
  }

  @Mutation(() => [Logs])
  removeSeveralGruposDeCompra(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.logsService.removeSeveral(id);
  }
}
