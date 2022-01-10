import { Especificos } from './../../modelsMercurio/entities/Especificos.entity';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";

@ObjectType()
@Index(
  "PK_CTO_BasesCMarcoEspecificos",
  ["idBaseCMarcoEspecificos"],
  { unique: true }
)

@Index(
  "IX_BasesCMarcoEspecificos",
  ["idBaseCMarco", "idEspecifico", "idPadre"],
  { unique: true }
)
@Entity("BasesCMarcoEspecificos", { schema: "CONTRATO.dbo" })
export class BasesCMarcoEspecificos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdBaseCMarcoEspecificos" })
  @Field(() => Int)
  idBaseCMarcoEspecificos: number;

  @Column("int", { name: "IdBaseCMarco" })
  @Field(() => Int)
  idBaseCMarco: number;

  @Column("int", { name: "IdEspecifico" })
  @Field(() => Int)
  idEspecifico: number;

  @Column("int", { name: "IdPadre" })
  @Field(() => Int)
  idPadre: number;

  @Column("float", { name: "PDisponible", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pDisponible: number | null;

  @Column("float", { name: "PReservado", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pReservado: number | null;

  @Column("float", { name: "PEjecutado", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pEjecutado: number | null;

  @Column("float", { name: "PPendiente", nullable: true, precision: 53 })
  @Field(() => Float,{nullable: true})
  pPendiente: number | null;

  @Field(() => BasesCMarco , {nullable: true})
  @ManyToOne(() => BasesCMarco,(basesCMarco) => basesCMarco.basesCMarcoEspecificos,{ onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  baseCMarco: BasesCMarco;

  @Field(() => Especificos , {nullable: true})
  @ManyToOne(() => Especificos,(especificos) => especificos.basesCMarcoEspecificos)
  @JoinColumn([{ name: "IdEspecifico", referencedColumnName: "id" }])
  especifico: Especificos;
}
