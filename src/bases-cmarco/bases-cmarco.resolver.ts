import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { BasesCmarcoService } from './bases-cmarco.service';
import { CreateBasesCmarcoInput } from './dto/create-bases-cmarco.input';
import { BasesCMarco } from 'src/models/entities/BasesCMarco.entity';
import { Puertos } from 'src/models/entities/Puertos.entity';
import { Proformas } from 'src/models/entities/Proformas.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';

@Resolver(() => BasesCMarco)
export class BasesCmarcoResolver {
  constructor(private readonly basesCmarcoService: BasesCmarcoService) {}

  @Mutation(() => BasesCMarco)
  createBasesCmarco(@Args('createBasesCmarcoInput') createBasesCmarcoInput: CreateBasesCmarcoInput) {
    return this.basesCmarcoService.save(createBasesCmarcoInput);
  }

  @Query(() => [BasesCMarco])
  findAllBaseCMarco() {
    return this.basesCmarcoService.findAll();
  }

  @Query(() => BasesCMarco)
  findOneBaseCMarco(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoService.findOne(id);
  }

  @ResolveField(() => Puertos, {nullable: true})
  puerto(@Parent() puerto: Puertos) {
    return this.basesCmarcoService.getPuerto(puerto.idPuerto);
  }

  @ResolveField(() => Proformas, {nullable: true})
  proforma(@Parent() proformas: Proformas) {
    return this.basesCmarcoService.getProforma(proformas.idProforma);
  }

  @ResolveField(() => Compradores, {nullable: true})
  comprador(@Parent() comprador: Compradores) {
    return this.basesCmarcoService.getComprador(comprador.idComprador);
  }

  @Mutation(() => BasesCMarco)
  removeBasesCmarco(@Args('id', { type: () => Int }) id: number) {
    return this.basesCmarcoService.remove(id);
  }
}
