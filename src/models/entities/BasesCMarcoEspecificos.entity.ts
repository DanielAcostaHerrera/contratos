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

  @Column("float", { name: "PDisponible", nullable: true, precision: 53 })
  @Field(() => Float)
  pDisponible: number | null;

  @Column("float", { name: "PReservado", nullable: true, precision: 53 })
  @Field(() => Float)
  pReservado: number | null;

  @Column("float", { name: "PEjecutado", nullable: true, precision: 53 })
  @Field(() => Float)
  pEjecutado: number | null;

  @Column("float", { name: "PPendiente", nullable: true, precision: 53 })
  @Field(() => Float)
  pPendiente: number | null;

  @Column("int", { name: "idPadre" })
  @Field(() => Int)
  idPadre: number;

  @Field(() => BasesCMarco , {nullable: true})
  @ManyToOne(() => BasesCMarco,(basesCMarco) => basesCMarco.basesCMarcoEspecificos,{ onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  baseCMarco: BasesCMarco;
}
