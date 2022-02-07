import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionResumenInput {
  @Field(() => Int, {nullable: true})
  idNegociacion?: number;

  @Field(() => Int)
  consecutivo: number;

  @Field()
  fecha: Date;

  @Field(() => Int)
  idComite: number;

  @Field(() => Int)
  idTipoCompras: number;

  @Field(() => Int)
  idGrupo: number;

  @Field(() => Int)
  idMoneda: number;

  @Field()
  mercancias: string;

  @Field()
  aprobada: boolean;

  @Field()
  cancelada: boolean;

  @Field({nullable: true})
  nota: string | null;

  @Field(() => Int,{nullable: true})
  idProveedor: number | null;

  @Field(() => Float,{nullable: true})
  importeTrd: number | null;

  @Field(() => Float,{nullable: true})
  importeGae: number | null;

  @Field(() => Float,{nullable: true})
  importeCuc: number | null;

  @Field({nullable: true})
  comentarios: string | null;

  @Field({nullable: true})
  operacion: boolean | null;

  @Field(() => Float,{nullable: true})
  tasa: number | null;

  @Field({nullable: true})
  terminado: boolean | null;
}
