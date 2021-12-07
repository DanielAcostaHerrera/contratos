import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDatosEntidadInput {
  @Field(() => Int)
  codigo: number;

  @Field()
  cuentaUsd: string | null;

  @Field()
  codAgenciaUsd: string | null;

  @Field()
  agenciaUsd: string | null;

  @Field()
  faxAgenciaUsd: string | null;

  @Field()
  cuentaMn: string | null;

  @Field()
  codAgenciaMn: string | null;

  @Field()
  agenciaMn: string | null;

  @Field()
  faxAgenciaMn: string | null;

  @Field()
  codigoEnt: string | null;

  @Field()
  codigoMincex: string | null;

  @Field()
  licCComercio: string | null;

  @Field()
  nombre: string | null;

  @Field()
  compaIa: string | null;
}
