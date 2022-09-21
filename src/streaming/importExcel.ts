import { Int, Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class ImportExcel {
  @Field(()=> String,{nullable: true})
  codigo?: string;

  @Field(()=> Float,{nullable: true})
  precio?: number;
}