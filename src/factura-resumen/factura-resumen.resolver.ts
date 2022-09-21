import { Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { FacturaResumenService } from './factura-resumen.service';
import { CreateFacturaResumanInput } from './dto/create-factura-resuman.input';
import { FacturaResumen } from 'src/models/entities/FacturaResumen.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => FacturaResumen)
export class FacturaResumenResolver {
  constructor(private readonly facturaResumenService: FacturaResumenService) {}

  @Mutation(() => FacturaResumen)
  @UseGuards(new AuthGuard())
  createFacturaResuman(@Args('createFacturaResumanInput') createFacturaResumanInput: CreateFacturaResumanInput) {
    return this.facturaResumenService.save(createFacturaResumanInput);
  }

  @Query(() => [FacturaResumen])
  @UseGuards(new AuthGuard())
  findAllFacturaResumen() {
    return this.facturaResumenService.findAll();
  }

  @Query(() => FacturaResumen)
  @UseGuards(new AuthGuard())
  findOneFacturaResumen(@Args('id', { type: () => Int }) id: number) {
    return this.facturaResumenService.findOne(id);
  }

  @Mutation(() => FacturaResumen)
  @UseGuards(new AuthGuard())
  removeFacturaResuman(@Args('id', { type: () => Int }) id: number) {
    return this.facturaResumenService.remove(id);
  }

  @Mutation(() => [FacturaResumen])
  @UseGuards(new AuthGuard())
  removeSeveralFacturaResuman(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.facturaResumenService.removeSeveral(id);
  }
}
