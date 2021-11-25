import { CreateEjecutivoInput } from './create-ejecutivo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEjecutivoInput extends PartialType(CreateEjecutivoInput) {
  @Field(() => Int)
  id: number;
}
