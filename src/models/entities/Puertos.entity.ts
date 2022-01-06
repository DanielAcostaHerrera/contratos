import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BasesCMarco } from "./BasesCMarco.entity";
import { Contratos } from "./Contratos.entity";
import { Embarques } from "./Embarques.entity";
import { FacturaResumen } from "./FacturaResumen.entity";
import { FichaCostoResumen } from "./FichaCostoResumen.entity";
import { PliegoConcurrenciaResumen } from "./PliegoConcurrenciaResumen.entity";
import { SuplementoEmbarques } from "./SuplementoEmbarques.entity";
import { SuplementoResumen } from "./SuplementoResumen.entity";

@ObjectType()
@Index("IX_NOM_Puertos", ["pais", "nombre"], { unique: true })
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
  pais: number;

  @Column("nvarchar", { name: "Deposito", nullable: true, length: 10 })
  @Field({nullable: true})
  deposito: string | null;

  @Field(() => [Embarques], { nullable: true })
  @OneToMany(() => Embarques, (embarques) => embarques.puertoDestino)
  embarques: Embarques[];
  
  @Field(() => [BasesCMarco], { nullable: true })
  @OneToMany(() => BasesCMarco, (basesCMarco) => basesCMarco.puerto)
  basesCMarco: BasesCMarco[];

  @Field(() => [FichaCostoResumen], { nullable: true })
  @OneToMany(() => FichaCostoResumen,(fichaCostoResumen) => fichaCostoResumen.puerto)
  fichaCostoResumen: FichaCostoResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.puertoEmbarque)
  pliegoConcurrenciaResumenEmbarque: PliegoConcurrenciaResumen[];

  @Field(() => [PliegoConcurrenciaResumen], { nullable: true })
  @OneToMany(() => PliegoConcurrenciaResumen,(pliegoConcurrenciaResumen) => pliegoConcurrenciaResumen.puertoDestino)
  pliegoConcurrenciaResumenDestino: PliegoConcurrenciaResumen[];

  @Field(() => [Contratos], { nullable: true })
  @OneToMany(() => Contratos, (contratos) => contratos.puertoOrigen)
  contratosOrigen: Contratos[];

  @Field(() => [Contratos], { nullable: true })
  @OneToMany(() => Contratos, (contratos) => contratos.puertoDestino)
  contratosDestino: Contratos[];

  @Field(() => [FacturaResumen], { nullable: true })
  @OneToMany(() => FacturaResumen,(facturaResumen) => facturaResumen.puertoDestino)
  facturaResumen: FacturaResumen[];

  @Field(() => [SuplementoEmbarques], { nullable: true })
  @OneToMany(() => SuplementoEmbarques,(suplementoEmbarques) => suplementoEmbarques.puertoDestino)
  suplementoEmbarques: SuplementoEmbarques[];

  @Field(() => [SuplementoResumen], { nullable: true })
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.puertoOrigen)
  suplementoResumenOrigen: SuplementoResumen[];

  @Field(() => [SuplementoResumen], { nullable: true })
  @OneToMany(() => SuplementoResumen,(suplementoResumen) => suplementoResumen.puertoDestino)
  suplementoResumenDestino: SuplementoResumen[];
}
