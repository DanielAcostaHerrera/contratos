import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { EjecutivoService } from './ejecutivo.service';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';

@Resolver(() => Ejecutivos)
export class EjecutivoResolver {
  constructor(private readonly ejecutivoService: EjecutivoService) {}

  @Mutation(() => Ejecutivos)
  createEjecutivo(@Args('createEjecutivoInput') createEjecutivoInput: CreateEjecutivoInput) {
    return this.ejecutivoService.save(createEjecutivoInput);
  }

  @Query(() => [Ejecutivos])
  findAllEjecutivos() {
    return this.ejecutivoService.findAll();
  }

  @Query(() => Ejecutivos)
  findOneEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.findOne(id);
  }

  @Mutation(() => Ejecutivos)
  removeEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.remove(id);
  }

  @ResolveField(() => Cargos, {nullable: true})
  cargo(@Parent() ejecutivos: Ejecutivos): Promise<Cargos> {
    return this.ejecutivoService.getCargo(ejecutivos.idCargo);
  }

  @ResolveField(() => GruposDeCompras, {nullable: true})
  grupo(@Parent() ejecutivos: Ejecutivos): Promise<GruposDeCompras> {
    return this.ejecutivoService.getGrupo(ejecutivos.idGrupo);
  }
}
