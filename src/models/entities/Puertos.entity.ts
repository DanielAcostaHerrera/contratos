import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Paises } from "../../modelsMercurio/entities/Paises.entity";
import { Contratos } from "./Contratos.entity";
import { Embarques } from "./Embarques.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { PuertoEmbarque } from "./PuertoEmbarque.entity";
import { SuplementoEmbarques } from "./SuplementoEmbarques.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";

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

  @Field(() => [FichaCostoResumen], { nullable: true })
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.puerto)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.puertoEmbarque)
  pliegoConcurrenciaResumenEmbarque: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.puertoDestino)
  pliegoConcurrenciaResumenDestino: PliegoConcurrenciaResumen[];

  @Field(() => [FacturaResumen], { nullable: true })
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.puertoDestino)
  facturaResumen: FacturaResumen[];

  @Field(() => [SuplementoEmbarques], { nullable: true })
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.puertoDestino)
  suplementoEmbarquesDestino: SuplementoEmbarques[];

  @Field(() => [SuplementoEmbarques], { nullable: true })
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.puertoOrigen)
  suplementoEmbarquesOrigen: SuplementoEmbarques[];

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
}
