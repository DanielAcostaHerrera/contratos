import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFacturaContenedorInput {
  @Field(() => Int,{nullable: true})
  idFacturaContenedor?: number;

  @Field(() => Int)
  idFactura: number;

  @Field(() => Int)
  idContenedor: number;
}