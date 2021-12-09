import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SolicitudOfertasProveedorService } from './solicitud-ofertas-proveedor.service';
import { CreateSolicitudOfertasProveedorInput } from './dto/create-solicitud-ofertas-proveedor.input';
import { SolicitudOfertasProveedor } from 'src/models/entities/SolicitudOfertasProveedor.entity';
import { SolicitudOfertas } from 'src/models/entities/SolicitudOfertas.entity';

@Resolver(() => SolicitudOfertasProveedor)
export class SolicitudOfertasProveedorResolver {
  constructor(private readonly solicitudOfertasProveedorService: SolicitudOfertasProveedorService) {}

  @Mutation(() => SolicitudOfertasProveedor)
  createSolicitudOfertasProveedor(@Args('createSolicitudOfertasProveedorInput') createSolicitudOfertasProveedorInput: CreateSolicitudOfertasProveedorInput) {
    return this.solicitudOfertasProveedorService.save(createSolicitudOfertasProveedorInput);
  }

  @Query(() => [SolicitudOfertasProveedor])
  findAllSolicitudOfertasProveedor() {
    return this.solicitudOfertasProveedorService.findAll();
  }

  @Query(() => SolicitudOfertasProveedor)
  findOneSolicitudOfertasProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasProveedorService.findOne(id);
  }

  @Mutation(() => SolicitudOfertasProveedor)
  removeSolicitudOfertasProveedor(@Args('id', { type: () => Int }) id: number) {
    return this.solicitudOfertasProveedorService.remove(id);
  }

  @ResolveField(() => SolicitudOfertas, {nullable: true})
  solicitudOfertas(@Parent() solicitudOfertasProveedor: SolicitudOfertasProveedor): Promise<SolicitudOfertas> {
    return this.solicitudOfertasProveedorService.getSolicitudOfertas(solicitudOfertasProveedor.idOferta);
  }
}