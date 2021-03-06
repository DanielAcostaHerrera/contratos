import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pagos } from "./Pagos.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { SuplementoPagos } from "./SuplementoPagos.entity";

@ObjectType()
@Index("PK_FormasPago", ["idFormaPago"], { unique: true })
@Entity("FormasPago", { schema: "CONTRATO.dbo" })
export class FormasPago {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFormaPago" })
  @Field(() => Int)
  idFormaPago: number;

  @Column("nvarchar", { name: "FormaPago", length: 100 })
  @Field()
  formaPago: string;

  @Column("int", { name: "Dias" })
  @Field(() => Int)
  dias: number;

  @Field(() => [PliegoConcurrenciaResumen], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.formaPago)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];

  @Field(() => [SuplementoPagos], {nullable: true})
  @OneToMany(() => SuplementoPagos,(suplementoPagos) => suplementoPagos.formasPago)
  suplementoPagos: SuplementoPagos[];

  @Field(() => [Pagos], { nullable: true })
  @OneToMany(() => Pagos,(pagos) => pagos.formaPago)
  pagos: Pagos[];
}
