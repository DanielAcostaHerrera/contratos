import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTiposDeCompraInput {
  @Field(() => Int, {nullable: true})
  idTipoCompras?: number;

  @Field()
  compras: string | null;

}
