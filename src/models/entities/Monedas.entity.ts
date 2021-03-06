import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contratos } from "./Contratos.entity";
import { NegociacionResumen } from "./NegociacionResumen.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";

@ObjectType()
@Index("IX_NOM_MonedasAbreviatura", ["abreviatura"], { unique: true })
@Index("PK_NOM_Monedas", ["idMoneda"], { unique: true })
@Entity("NOM_Monedas", { schema: "CONTRATO.dbo" })
export class Monedas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdMoneda" })
  @Field(() => Int)
  idMoneda: number;

  @Column("varchar", { name: "Moneda", length: 50 })
  @Field()
  moneda: string;

  @Column("nvarchar", { name: "Abreviatura", nullable: true, length: 3 })
  @Field({nullable: true})
  abreviatura: string | null;

  @Field(() => [NegociacionResumen], {nullable: true})
  @OneToMany(() => NegociacionResumen,(negociacionResumen) => negociacionResumen.monedas)
  negociacionResumen: NegociacionResumen[];

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.monedaOferta)
  pliegoConcurrenciaResumenOferta: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.monedaPago)
  pliegoConcurrenciaResumenPago: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.monedaCartaCredito)
  pliegoConcurrenciaResumenCredito: PliegoConcurrenciaResumen[];

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.moneda)
  contratos: Contratos[];

  @Field(() => [SuplementoResumen], {nullable: true})
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.moneda)
  suplementoResumen: SuplementoResumen[];
}
