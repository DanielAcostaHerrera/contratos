import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudOfertasProveedorService } from './solicitud-ofertas-proveedor.service';
import { CreateSolicitudOfertasProveedorInput } from './dto/create-solicitud-ofertas-proveedor.input';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(() => SolicitudOfertasProveedor)
export class SolicitudOfertasProveedorResolver {
  constructor(private readonly solicitudOfertasProveedorService: SolicitudOfertasProveedorService) {}

  @Mutation(() => SolicitudOfertasProveedor)
  @UseGuards(new AuthGuard())
  createSolicitudOfertasProveedor(@Args('createSolicitudOfertasProveedorInput') createSolicitudOfertasProveedorInput: CreateSolicitudOfertasProveedorInput) {
    return this.solicitudOfertasProveedorService.save(createSolicitudOfertasProveedorInput);
  }

  @Query(() => [SolicitudOfertasProveedor])
  @UseGuards(new AuthGuard())
  findAllSolicitudOfertasProveedor() {
    return this.solicitudOfertasProveedorService.findAll();
  }

  @Query(() => SolicitudOfertasProveedor)
  @UseGuards(new AuthGuard())
  findOneSolicitudOfertasProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasProveedorService.findOne(id);
  }

  @Mutation(() => SolicitudOfertasProveedor)
  @UseGuards(new AuthGuard())
  removeSolicitudOfertasProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasProveedorService.remove(id);
  }

  @Mutation(() => [SolicitudOfertasProveedor])
  @UseGuards(new AuthGuard())
  removeSeveralSolicitudOfertasProveedor(@Args('id', { type: () => [Int] }) id: number[]) {
    return this.solicitudOfertasProveedorService.removeSeveral(id);
  }

  @ResolveField(() => SolicitudOfertas, {nullable: true})
  solicitudOfertas(@Parent() solicitudOfertasProveedor: SolicitudOfertasProveedor): Promise<SolicitudOfertas> {
    return this.solicitudOfertasProveedorService.getSolicitudOfertas(solicitudOfertasProveedor.idOferta);
  }

  @ResolveField(() => Proveedores, {nullable: true})
  proveedor(@Parent() solicitudOfertasProveedor: SolicitudOfertasProveedor): Promise<Proveedores> {
    return this.solicitudOfertasProveedorService.getProveedor(solicitudOfertasProveedor.idProveedor);
  }
}
