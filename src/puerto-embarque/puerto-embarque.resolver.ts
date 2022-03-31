import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PuertoEmbarqueService } from './puerto-embarque.service';
import { CreatePuertoEmbarqueInput } from './dto/create-puerto-embarque.input';
import { PuertoEmbarque } from 'src/models/entities/PuertoEmbarque.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Embarques } from 'src/models/entities/Embarques.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => PuertoEmbarque)
export class PuertoEmbarqueResolver {
  constructor(private readonly puertoEmbarqueService: PuertoEmbarqueService) {}

  @Mutation(() => PuertoEmbarque)
  @UseGuards(new AuthGuard())
  createPuertoEmbarque(@Args('createPuertoEmbarqueInput') createPuertoEmbarqueInput: CreatePuertoEmbarqueInput) {
    return this.puertoEmbarqueService.save(createPuertoEmbarqueInput);
  }

  @Query(() => [PuertoEmbarque])
  @UseGuards(new AuthGuard())
  findAllPuertoEmbarque() {
    return this.puertoEmbarqueService.findAll();
  }

  @Query(() => PuertoEmbarque)
  @UseGuards(new AuthGuard())
  findOnePuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.puertoEmbarqueService.findOne(id);
  }

  @Mutation(() => PuertoEmbarque)
  @UseGuards(new AuthGuard())
  removePuertoEmbarque(@Args('id', { type: () => Int }) id: number) {
    return this.puertoEmbarqueService.remove(id);
  }

  @Mutation(() => [PuertoEmbarque])
  @UseGuards(new AuthGuard())
  removeSeveralPuertoEmbarque(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.puertoEmbarqueService.removeSeveral(id);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoOrigen(@Parent() puertoEmbarque: PuertoEmbarque): Promise<Puertos> {
    return this.puertoEmbarqueService.getPuertoOrigen(puertoEmbarque.idPuertoOrigen);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puertoDestino(@Parent() puertoEmbarque: PuertoEmbarque): Promise<Puertos> {
    return this.puertoEmbarqueService.getPuertoDestino(puertoEmbarque.idPuertoDestino);
  }

  @ResolveField(() => Embarques, {nullable: true})
  embarques(@Parent() puertoEmbarque: PuertoEmbarque): Promise<Embarques> {
    return this.puertoEmbarqueService.getEmbarque(puertoEmbarque.idEmbarque);
  }
}
