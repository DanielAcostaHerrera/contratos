import { CreateEmbalajeInput } from './create-embalaje.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmbalajeInput extends PartialType(CreateEmbalajeInput) {
  @Field(() => Int)
  id: number;
}
