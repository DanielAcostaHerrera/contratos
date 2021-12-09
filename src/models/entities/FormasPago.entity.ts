import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";

@ObjectType()
@Index("PK_FormasPago", ["idFormaPago"], { unique: true })
@Entity("FormasPago", { schema: "dbo" })
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

  @Field(() => [FichaCostoResumen])
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.idFormaPago)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => [PliegoConcurrenciaResumen])
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.formaPago)
  pliegoConcurrenciaResumen: PliegoConcurrenciaResumen[];
}
