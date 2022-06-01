import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedores } from "../../modelsMercurio/entities/Proveedores.entity";
import { Contratos } from "./Contratos.entity";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";

@ObjectType()
@Index("PK_ContratoMarco", ["idCMarco"], { unique: true })
@Entity("ContratoMarco", { schema: "CONTRATO.dbo" })
export class ContratoMarco {
  @PrimaryGeneratedColumn({ type: "int", name: "IdCMarco" })
  @Field(() => Int)
  idCMarco: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("datetime", { name: "Fecha" })
  @Field()
  fecha: Date;

  @Column("int", { name: "Consecutivo" })
  @Field(() => Int)
  consecutivo: number;

  @Column("float", { name: "Monto", precision: 53 })
  @Field(() => Float)
  monto: number;

  @Column("float", { name: "Contratado", precision: 53 })
  @Field(() => Float)
  contratado: number;

  @Column("float", { name: "Pendiente", precision: 53 })
  @Field(() => Float)
  pendiente: number;

  @Column("datetime", { name: "Creado" })
  @Field()
  creado: Date;

  @Column("datetime", { name: "Actualizado" })
  @Field()
  actualizado: Date;

  @Field(() => [Contratos], {nullable: true})
  @OneToMany(() => Contratos, (contratos) => contratos.contratoMarco)
  contratos: Contratos[];

  @Field(() => [FichaCostoResumen], {nullable: true})
  @OneToMany(() => FichaCostoResumen, (fichaCostoResumen) => fichaCostoResumen.contratoMarco)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => Proveedores, {nullable: true})
  @ManyToOne(() => Proveedores, (proveedores) => proveedores.contratos)
  @JoinColumn([{ name: "IdProveedor", referencedColumnName: "codigo" }])
  proveedor: Proveedores;
}
