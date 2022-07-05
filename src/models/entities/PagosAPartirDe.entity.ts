import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pagos } from "./Pagos.entity";
import { SuplementoPagos } from "./SuplementoPagos.entity";

@ObjectType()
@Index("PK_PagosAPartirDe", ["idPartir"], { unique: true })
@Entity("PagosAPartirDe", { schema: "CONTRATO.dbo" })
export class PagosAPartirDe {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPartir" })
  @Field(() => Int)
  idPartir: number;

  @Column("nvarchar", { name: "APartirDe", length: 50 })
  @Field()
  aPartirDe: string;

  @Field(() => Pagos, {nullable: true})
  @OneToMany(() => Pagos, (pagos) => pagos.pagoAPartirDe)
  pagos: Pagos[];

  @Field(() => SuplementoPagos, {nullable: true})
  @OneToMany(() => SuplementoPagos, (suplementoPagos) => suplementoPagos.pagoAPartirDe)
  suplementoPagos: SuplementoPagos[];
}
