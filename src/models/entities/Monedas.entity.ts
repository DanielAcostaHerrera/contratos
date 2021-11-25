import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Monedas", ["idMoneda"], { unique: true })
@ObjectType()
@Entity("Monedas", { schema: "dbo" })
export class Monedas {
  @PrimaryGeneratedColumn({ type: "smallint", name: "IdMoneda" })
  @Field()
  idMoneda: number;

  @Column("varchar", { name: "Moneda", length: 50 })
  @Field()
  moneda: string;

  @Column("nvarchar", { name: "Abrev", nullable: true, length: 3 })
  @Field({nullable: true})
  abrev: string | null;

  @Column("uniqueidentifier", {
    name: "msrepl_tran_version",
    default: () => "newid()",
  })
  @Field()
  msreplTranVersion: string;
}
