import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { EjecutivoService } from './ejecutivo.service';
import { CreateEjecutivoInput } from './dto/create-ejecutivo.input';
import { Ejecutivos } from 'src/models/entities/Ejecutivos.entity';
import { Cargos } from 'src/models/entities/Cargos.entity';
import { GruposDeCompras } from 'src/models/entities/GruposDeCompras.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => Ejecutivos)
export class EjecutivoResolver {
  constructor(private readonly ejecutivoService: EjecutivoService) {}

  @Mutation(() => Ejecutivos)
  @UseGuards(new AuthGuard())
  createEjecutivo(@Args('createEjecutivoInput') createEjecutivoInput: CreateEjecutivoInput) {
    return this.ejecutivoService.save(createEjecutivoInput);
  }

  @Query(() => [Ejecutivos])
  @UseGuards(new AuthGuard())
  findAllEjecutivos() {
    return this.ejecutivoService.findAll();
  }

  @Query(() => Ejecutivos)
  @UseGuards(new AuthGuard())
  findOneEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.findOne(id);
  }

  @Mutation(() => Ejecutivos)
  @UseGuards(new AuthGuard())
  removeEjecutivo(@Args('id', { type: () => Int }) id: number) {
    return this.ejecutivoService.remove(id);
  }

  @Mutation(() => [Ejecutivos])
  @UseGuards(new AuthGuard())
  removeSeveralEjecutivo(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.ejecutivoService.removeSeveral(id);
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
