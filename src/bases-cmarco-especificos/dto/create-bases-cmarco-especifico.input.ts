import { InputType, Int, Float, Field } from '@nestjs/graphql';

@InputType()
export class CreateBasesCmarcoEspecificoInput {
  @Field(() => Int, { nullable: true})
  idBaseCMarcoEspecificos?: number;

  @Field(() => Int)
  idBaseCMarco: number;

  @Field(() => Int)
  idEspecifico: number;

  @Field(() => Int)
  idPadre: number;

  @Field(() => Float,{ nullable: true})
  pDisponible: number | null;

  @Field(() => Float,{ nullable: true})
  pReservado: number | null;

  @Field(() => Float,{ nullable: true})
  pEjecutado: number | null;

  @Field(() => Float,{ nullable: true})
  pPendiente: number | null;
}
