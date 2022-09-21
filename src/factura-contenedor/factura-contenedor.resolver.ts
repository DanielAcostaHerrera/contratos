import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { FacturaContenedorService } from './factura-contenedor.service';
import { CreateFacturaContenedorInput } from './dto/create-factura-contenedor.input';
import { FacturaContenedor } from 'src/models/entities/FacturaContenedor.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FacturaContenedor)
export class FacturaContenedorResolver {
  constructor(private readonly facturaContenedorService: FacturaContenedorService) {}

  @Mutation(() => FacturaContenedor)
  @UseGuards(new AuthGuard())
  createFacturaContenedor(@Args('createFacturaContenedorInput') createFacturaContenedorInput: CreateFacturaContenedorInput) {
    return this.facturaContenedorService.save(createFacturaContenedorInput);
  }

  @Query(() => [FacturaContenedor])
  @UseGuards(new AuthGuard())
  findAllFacturaContenedor() {
    return this.facturaContenedorService.findAll();
  }

  @Query(() => FacturaContenedor)
  @UseGuards(new AuthGuard())
  findOneFacturaContenedor(@Args('id', { type: () => Int }) id: number) {
    return this.facturaContenedorService.findOne(id);
  }

  @Mutation(() => FacturaContenedor)
  @UseGuards(new AuthGuard())
  removeFacturaContenedor(@Args('id', { type: () => Int }) id: number) {
    return this.facturaContenedorService.remove(id);
  }

  @Mutation(() => [FacturaContenedor])
  @UseGuards(new AuthGuard())
  removeSeveralFacturaContenedor(@Args('id', { type: () => [Int]}) id: number[]) {
    return this.facturaContenedorService.removeSeveral(id);
  }

  @Mutation(() => [FacturaContenedor])
  @UseGuards(new AuthGuard())
  removeSeveralFacturaContenedorByFacturaId(@Args('id', { type: () => Int}) id: number) {
    return this.facturaContenedorService.removeSeveralByFacturaId(id);
  }
}
