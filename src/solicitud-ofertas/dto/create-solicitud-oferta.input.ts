import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSolicitudOfertaInput {
  @Field(() => Int,{nullable: true})
  idOferta?: number;

  @Field(() => Int)
  idSolicitudContrato: number;

  @Field(() => Int,{nullable: true})
  consecutivo: number | null;

  @Field()
  solicitud: string;

  @Field()
  fechaSolicitudOferta: Date;

  @Field()
  fechaEnviadaOferta: Date;

  @Field()
  fechaFin: Date;

  @Field()
  contraOferta: boolean;

  @Field()
  terminada: boolean;

  @Field()
  cancelada: boolean;

  @Field(() => Int)
  elaboradoPor: number;

  @Field(() => Int)
  aprobadoPor: number;
}
