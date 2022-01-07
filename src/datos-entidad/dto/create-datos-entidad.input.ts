import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDatosEntidadInput {
  @Field(() => Int)
  codigo: number;

  @Field({nullable: true})
  cuentaUsd: string | null;

  @Field({nullable: true})
  codAgenciaUsd: string | null;

  @Field({nullable: true})
  agenciaUsd: string | null;

  @Field({nullable: true})
  faxAgenciaUsd: string | null;

  @Field({nullable: true})
  cuentaMn: string | null;

  @Field({nullable: true})
  codAgenciaMn: string | null;

  @Field({nullable: true})
  agenciaMn: string | null;

  @Field({nullable: true})
  faxAgenciaMn: string | null;

  @Field({nullable: true})
  codigoEnt: string | null;

  @Field({nullable: true})
  codigoMincex: string | null;

  @Field({nullable: true})
  licCComercio: string | null;

  @Field({nullable: true})
  nombre: string | null;

  @Field({nullable: true})
  compaIa: string | null;
}
