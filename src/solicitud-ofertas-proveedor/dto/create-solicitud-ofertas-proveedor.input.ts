import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudOfertasProveedorInput {
  @Field(() => Int,{nullable: true})
  idOfertasProveedor?: number;

  @Field(() => Int)
  idOferta: number;

  @Field(() => Int)
  idProveedor: number;

  @Field({nullable: true})
  representante: string | null;

  @Field({nullable: true})
  cargo: string | null;
}
