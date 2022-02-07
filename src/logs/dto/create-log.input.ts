import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateLogInput {
  @Field(() => Int,{nullable: true})
  idLog ?: number;
  
  @Field()
  mensaje: string;

  @Field()
  fecha: string;

  @Field()
  usuario: string;
}
