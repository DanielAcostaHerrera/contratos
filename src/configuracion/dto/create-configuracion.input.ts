import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConfiguracionInput {
  @Field(() => Int,{nullable: true})
  idConfig?: number;

  @Field()
  lugarFirma: string;

  @Field(() => Int)
  idEntidad: number;

  @Field(() => Int)
  vigenciaContrato: number;

  @Field(() => Int)
  travesiaXDefecto: number;

  @Field()
  pathContratosPdf: string | null;

  @Field(() => Int)
  alertaVencContratos: number;
}
