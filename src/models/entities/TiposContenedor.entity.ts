import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";

@ObjectType()
@Index("PK_CTO_TiposContenedor", ["idTipoContenedor"], { unique: true })
@Entity("TiposContenedor", { schema: "CONTRATO.dbo" })
export class TiposContenedor {
  @PrimaryGeneratedColumn({ type: "int", name: "IdTipoContenedor" })
  @Field(() => Int)
  idTipoContenedor: number;

  @Column("nvarchar", { name: "TipoContenedor", length: 50 })
  @Field()
  tipoContenedor: string;

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.tipoContenedor)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];
}
