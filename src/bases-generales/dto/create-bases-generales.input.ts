import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateBasesGeneralesClausulaInput } from 'src/bases-generales-clausulas/dto/create-bases-generales-clausula.input';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';

@InputType()
export class CreateBasesGeneralesInput {
  @Field(() => Int, { nullable: true})
  idBasesGenerales?: number;

  @Field(() => Int, { nullable: true})
  consecutivo?: number;

  @Field({ nullable: true})
  fecha?: Date;

  @Field(() => Int)
  idTipoContrato: number;

  @Field(() => Int)
  idIncoterm: number;

  @Field()
  lugardeFirma: string;

  @Field(() => Int)
  idPais: number;

  @Field(() => Int)
  idProveedor: number;

  @Field(() => Int)
  idComprador: number;

  @Field(() => Int)
  vigencia: number;

  @Field()
  aprobado: boolean;

  @Field()
  cancelado: boolean;

  @Field()
  activo: boolean;

  @Field({ nullable: true})
  actualizado?: Date;

  @Field(()=> [CreateBasesGeneralesClausulaInput],{ nullable: true})
  basesGeneralesClausulas?: CreateBasesGeneralesClausulaInput[];
}
