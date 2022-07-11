import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Paises } from "../../modelsMercurio/entities/Paises.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { PuertoEmbarque } from "./PuertoEmbarque.entity";
import { SuplementoPuertoEmbarque } from "./SuplementoPuertoEmbarque.entity";

@ObjectType()
@Index("IX_NOM_Puertos", ["idPais", "nombre"], { unique: true })
@Index("IX_NOM_Puertos_Nombre", ["nombre"], {})
@Index("PK_NOM_Puertos", ["idPuerto"], { unique: true })
@Entity("NOM_Puertos", { schema: "CONTRATO.dbo" })
export class Puertos {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPuerto" })
  @Field(() => Int)
  idPuerto: number;

  @Column("nvarchar", { name: "Nombre", length: 50 })
  @Field()
  nombre: string;

  @Column("int", { name: "Pais" })
  @Field(() => Int)
  idPais: number;

  @Column("nvarchar", { name: "Deposito", nullable: true, length: 10 })
  @Field({nullable: true})
  deposito: string | null;

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.puertoEmbarque)
  pliegoConcurrenciaResumenEmbarque: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.puertoDestino)
  pliegoConcurrenciaResumenDestino: PliegoConcurrenciaResumen[];

  @Field(() => [FacturaResumen], { nullable: true })
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.puertoDestino)
  facturaResumen: FacturaResumen[];

  @Field(() => Paises , {nullable: true})
  @ManyToOne(() => Paises, (pais) => pais.puerto)
  @JoinColumn([{ name: "Pais", referencedColumnName: "pais" }])
  pais: Paises;

  @Field(() => [PuertoEmbarque], { nullable: true })
  @OneToMany(() => PuertoEmbarque,(puertoEmbarque) => puertoEmbarque.puertoOrigen)
  puertoEmbarquesOrigen: PuertoEmbarque[];

  @Field(() => [PuertoEmbarque], { nullable: true })
  @OneToMany(() => PuertoEmbarque,(puertoEmbarque) => puertoEmbarque.puertoDestino)
  puertoEmbarquesDestino: PuertoEmbarque[];

  @Field(() => SuplementoPuertoEmbarque, {nullable: true})
  @OneToMany(() => SuplementoPuertoEmbarque, (suplementoPuertoEmbarque) => suplementoPuertoEmbarque.puertoOrigen)
  suplementoPuertoEmbarquesOrigen: SuplementoPuertoEmbarque[];

  @Field(() => SuplementoPuertoEmbarque, {nullable: true})
  @OneToMany(() => SuplementoPuertoEmbarque, (suplementoPuertoEmbarque) => suplementoPuertoEmbarque.puertoDestino)
  suplementoPuertoEmbarquesDestino: SuplementoPuertoEmbarque[];
}
