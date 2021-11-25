import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmbalajeInput {
  @Field()
  id: number;

  @Field({nullable: true})
  codigo: string | null;

  @Field({nullable: true})
  descripcion: string | null;

  @Field({nullable: true})
  abreviatura: string | null;
}
