import { Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountBasesGenerales {
  @Field(()=> Int,{nullable: true})
  cantidad?: number;
}