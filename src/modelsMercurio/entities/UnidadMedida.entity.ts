import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContratoDesglose } from "../../models/entities/ContratoDesglose.entity";
import { FichaCompraDetalle } from "../../models/entities/FichaCompraDetalle.entity";

@ObjectType()
@Index("aaaaaUnidadMedida_PK", ["id"], { unique: true })
@Index("Abreviatura", ["abreviatura"], { unique: true })
@Index("Actualizacion", ["actualizacion"], {})
@Entity("UnidadMedida", { schema: "Mercurio.dbo" })
export class UnidadMedida {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  @Field(() => Int)
  id: number;

  @Column("nvarchar", { name: "Abreviatura", length: 5 })
  @Field()
  abreviatura: string;

  @Column("nvarchar", { name: "Nombre", length: 20 })
  @Field()
  nombre: string;

  @Column("datetime", { name: "Actualizacion", default: () => "getdate()" })
  @Field()
  actualizacion: Date;

  @Column("timestamp", { name: "upsize_ts", nullable: true })
  @Field({nullable: true})
  upsizeTs: Date | null;

  @Column("int", {
    name: "IDCircularACT",
    nullable: true,
    default: () => "[dbo].[AsignaCirc]()",
  })
  @Field(() => Int,{nullable: true})
  idCircularAct: number | null;

  @Field(() => [ContratoDesglose], { nullable: true })
  @OneToMany(() => ContratoDesglose,(contratoDesglose) => contratoDesglose.unidadMedida)
  contratoDesgloses: ContratoDesglose[];

  @Field(() => [FichaCompraDetalle], { nullable: true })
  @OneToMany(() => FichaCompraDetalle,(fichaCompraDetalle) => fichaCompraDetalle.unidadMedida)
  fichaCompraDetalles : FichaCompraDetalle[];

}
