import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";

@ObjectType()
@Index("IX_NOM_Puertos", ["pais", "nombre"], { unique: true })
@Index("IX_NOM_Puertos_Nombre", ["nombre"], {})
@Index("PK_NOM_Puertos", ["idPuerto"], { unique: true })
@Entity("NOM_Puertos", { schema: "dbo" })
export class Puertos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPuerto" })
  @Field(() => Int)
  idPuerto: number;

  @Column("nvarchar", { name: "Nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("int", { name: "Pais" })
  @Field(() => Int)
  pais: number;

  @Column("nvarchar", { name: "Deposito", nullable: true, length: 10 })
  @Field()
  deposito: string | null;

  @Field(() => [BasesCMarco], { nullable: true })
  @OneToMany(() => BasesCMarco, (basesCMarco) => basesCMarco.puerto)
  basesCMarco: BasesCMarco[];
}
