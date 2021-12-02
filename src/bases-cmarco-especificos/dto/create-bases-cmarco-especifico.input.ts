import { InputType, Int, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesCmarcoEspecificoInput {
  @Field(() => Int, { nullable: true})
  idBaseCMarcoEspecificos?: number;

  @Field(() => Int)
  idBaseCMarco: number;

  @Field(() => Int)
  idEspecifico: number;

  @Field(() => Float)
  pDisponible: number | null;

  @Field(() => Float)
  pReservado: number | null;

  @Field(() => Float)
  pEjecutado: number | null;

  @Field(() => Float)
  pPendiente: number | null;

  @Field(() => Int)
  idPadre: number;
}
