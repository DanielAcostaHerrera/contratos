import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Ejecutivo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
