import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";

@ObjectType()
@Index(
  "PK_CTO_BasesCMarcoEspecificos",
  ["idBaseCMarco", "idEspecifico", "idPadre"],
  { unique: true }
)
@Entity("BasesCMarcoEspecificos", { schema: "dbo" })
export class BasesCMarcoEspecificos {
  @Column("int", { primary: true, name: "IdBaseCMarco" })
  @Field(() => Int)
  idBaseCMarco: number;

  @Column("int", { primary: true, name: "IdEspecifico" })
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

  @Column("int", { primary: true, name: "idPadre" })
  @Field(() => Int)
  idPadre: number;

  @Field(() => BasesCMarco)
  @ManyToOne(
    () => BasesCMarco,
    (basesCMarco) => basesCMarco.basesCMarcoEspecificos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "IdBaseCMarco", referencedColumnName: "idBaseCMarco" }])
  baseCMarco: BasesCMarco;
}
