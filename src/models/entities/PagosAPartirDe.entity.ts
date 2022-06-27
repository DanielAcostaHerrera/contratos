import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pagos } from "./Pagos.entity";

@ObjectType()
@Index("PK_PagosAPartirDe", ["idPartir"], { unique: true })
@Entity("PagosAPartirDe", { schema: "dbo" })
export class PagosAPartirDe {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPartir" })
  @Field(() => Int)
  idPartir: number;

  @Column("nvarchar", { name: "APartirDe", length: 50 })
  @Field()
  aPartirDe: string;

  @Field(() => Pagos, {nullable: true})
  @OneToMany(() => Pagos, (pagos) => pagos.idPagosAPartirDe)
  pagos: Pagos[];
}
