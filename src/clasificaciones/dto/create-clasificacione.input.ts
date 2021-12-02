import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClasificacioneInput {
  @Field(() => Int, { nullable: true})
  idClasificacion?: number;

  @Field()
  clasificacion: string;
}
