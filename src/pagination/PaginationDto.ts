import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BasesGeneralesPagination {
    @Field(() => [BasesGenerales])
    data: BasesGenerales[];
    
    @Field(() => Int)
  count: number;

  constructor(data: BasesGenerales[], count: number) {
    this.data = data;
    this.count = count;
  }
}