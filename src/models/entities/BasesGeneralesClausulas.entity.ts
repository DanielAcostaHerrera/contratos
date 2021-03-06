import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TiposDeClausulas } from "./TiposDeClausulas.entity";
import { BasesGenerales } from "./BasesGenerales.entity";
import { ProformaClausulas } from "./ProformaClausulas.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Index("PK_CTO_BasesGeneralesClausulas", ["idBasesGeneralesClausulas"], { unique: true })


@Entity("BasesGeneralesClausulas", { schema: "CONTRATO.dbo" })
export class BasesGeneralesClausulas {
  @PrimaryGeneratedColumn({ type: "int", name: "IdBasesGeneralesClausulas" })
  @Field(() => Int)
  idBasesGeneralesClausulas: number;

  @Column("int", { name: "IdBasesGenerales" })
  @Field(() => Int)
  idBasesGenerales: number;

  @Column("int", { name: "IdTipoClausula" })
  @Field(() => Int)
  idTipoClausula: number;

  @Column("int", { name: "Orden" })
  @Field(() => Int)
  orden: number;

  @Column("nvarchar", { name: "Clausula" })
  @Field()
  clausula: string;

  @Column("bit", { name: "Excepcional", default: () => "(0)" })
  @Field()
  excepcional: boolean;

  @Column("datetime", { name: "Modificado", default: () => "getdate()" })
  @Field()
  modificado: Date;

  @Field(() => Int)
  numero: number;

  @Field(() => TiposDeClausulas , {nullable: true})
  @ManyToOne(() => TiposDeClausulas,(tiposDeClausulas) => tiposDeClausulas.basesGeneralesClausulas)
  @JoinColumn([{ name: "IdTipoClausula", referencedColumnName: "idTipoClausula" }])
  tiposDeClausulas: TiposDeClausulas;

  @Field(() => BasesGenerales , {nullable: true})
  @ManyToOne(() => BasesGenerales,(basesGenerales) => basesGenerales.basesGeneralesClausulas,{ onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "IdBasesGenerales", referencedColumnName: "idBasesGenerales" }])
  basesGenerales: BasesGenerales;
}
