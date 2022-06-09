import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNegociacionProveedoresInput {
  @Field(() => Int, {nullable: true})
  idNegociacionProveedores?: number;

  @Field(() => Int)
  idNegociacion: number;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Float,{nullable: true})
  importe: number | null;

  @Field()
  ladi: boolean;
}
