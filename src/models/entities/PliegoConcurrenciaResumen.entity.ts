import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PliegoConcurrenciaDetalle } from "./PliegoConcurrenciaDetalle.entity";
import { PliegoConcurrencia } from "./PliegoConcurrencia.entity";
import { Monedas } from "./Monedas.entity";
import { Incoterm } from "./Incoterm.entity";
import { FormasPago } from "./FormasPago.entity";
import { FormasEntrega } from "./FormasEntrega.entity";
import { Puertos } from "./Puertos.entity";
import { TiposContenedor } from "./TiposContenedor.entity";
import { SolicitudCodificacion } from "./SolicitudCodificacion.entity";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Proveedores } from "../../modelsMercurio/entities/Proveedores.entity";
import { Paises } from "../../modelsMercurio/entities/Paises.entity";
import { CompaniasNavieras } from "../../modelsNomgen/entities/CompaniasNavieras.entity";

@ObjectType()
@Index("IX_PliegoConcurrenciaResumen", ["idPliego", "idProveedor"], {
  unique: true,
})
@Index("PK_PliegoConcurrenciaResumen", ["idPliegoResumen"], { unique: true })
@Entity("PliegoConcurrenciaResumen", { schema: "CONTRATO.dbo" })
export class PliegoConcurrenciaResumen {
  @PrimaryGeneratedColumn({ type: "int", name: "IdPliegoResumen" })
  @Field(() => Int)
  idPliegoResumen: number;

  @Column("int", { name: "IdPliego" })
  @Field(() => Int)
  idPliego: number;

  @Column("int", { name: "IdIncoterm" })
  @Field(() => Int)
  idIncoterm: number;

  @Column("int", { name: "IdFormaPago" })
  @Field(() => Int)
  idFormaPago: number;

  @Column("int", { name: "IdFormaEntrega" })
  @Field(() => Int)
  idFormaEntrega: number;

  @Column("int", { name: "IdPuertoEmbarque" })
  @Field(() => Int)
  idPuertoEmbarque: number;

  @Column("int", { name: "IdPuertoDestino" })
  @Field(() => Int)
  idPuertoDestino: number;

  @Column("int", { name: "IdTipoContenedor" })
  @Field(() => Int)
  idTipoContenedor: number;

  @Column("int", { name: "IdProveedor" })
  @Field(() => Int)
  idProveedor: number;

  @Column("int", { name: "PaisOrigenMercancia" })
  @Field(() => Int)
  idPaisOrigenMercancia: number;

  @Column("datetime", { name: "FechaOfertaRecibida" })
  @Field()
  fechaOfertaRecibida: Date;

  @Column("datetime", { name: "FechaEntregaOferta", nullable: true })
  @Field({nullable: true})
  fechaEntregaOferta: Date | null;

  @Column("int", { name: "IdMonedaOferta" })
  @Field(() => Int)
  idMonedaOferta: number;

  @Column("int", { name: "IdMonedaPago" })
  @Field(() => Int)
  idMonedaPago: number;

  @Column("int", { name: "IdMonedaCartaCredito" })
  @Field(() => Int)
  idMonedaCartaCredito: number;

  @Column("float", { name: "RateCambioOferta", precision: 53 })
  @Field(() => Float)
  rateCambioOferta: number;

  @Column("datetime", { name: "FechaRateCOferta" })
  @Field()
  fechaRateCOferta: Date;

  @Column("float", { name: "RateCambioCUC", precision: 53 })
  @Field(() => Float)
  rateCambioCuc: number;

  @Column("datetime", { name: "FechaRateCambio" })
  @Field()
  fechaRateCambio: Date;

  @Column("float", { name: "TasaInteres", precision: 53 })
  @Field(() => Float)
  tasaInteres: number;

  @Column("nvarchar", { name: "InicioFinanciamiento", length: 50 })
  @Field()
  inicioFinanciamiento: string;

  @Column("int", { name: "IdNaviera" })
  @Field(() => Int)
  idNaviera: number;

  @Column("int", { name: "TiempoPrimeraEntrega" })
  @Field(() => Int)
  tiempoPrimeraEntrega: number;

  @Column("float", { name: "Seguro", precision: 53 })
  @Field(() => Float)
  seguro: number;

  @Column("float", { name: "Flete", precision: 53 })
  @Field(() => Float)
  flete: number;

  @Column("float", { name: "RateCambioFlete", precision: 53 })
  @Field(() => Float)
  rateCambioFlete: number;

  @Column("int", { name: "Contenedores" })
  @Field(() => Int)
  contenedores: number;

  @Column("float", { name: "PesoBruto", precision: 53 })
  @Field(() => Float)
  pesoBruto: number;

  @Field(() => [PliegoConcurrenciaDetalle], {nullable: true})
  @OneToMany(() => PliegoConcurrenciaDetalle,(pliegoConcurrenciaDetalle) => pliegoConcurrenciaDetalle.pliegoResumen)
  pliegoConcurrenciaDetalles: PliegoConcurrenciaDetalle[];

  @Field(() => PliegoConcurrencia, {nullable: true})
  @ManyToOne(() => PliegoConcurrencia,(pliegoConcurrencia) => pliegoConcurrencia.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdPliego", referencedColumnName: "idPliego" }])
  pliegoConcurrencia: PliegoConcurrencia;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas,(monedas) => monedas.pliegoConcurrenciaResumenOferta)
  @JoinColumn([{ name: "IdMonedaOferta", referencedColumnName: "idMoneda" }])
  monedaOferta: Monedas;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas,(monedas) => monedas.pliegoConcurrenciaResumenPago)
  @JoinColumn([{ name: "IdMonedaPago", referencedColumnName: "idMoneda" }])
  monedaPago: Monedas;

  @Field(() => Monedas, {nullable: true})
  @ManyToOne(() => Monedas,(monedas) => monedas.pliegoConcurrenciaResumenCredito)
  @JoinColumn([{ name: "IdMonedaCartaCredito", referencedColumnName: "idMoneda" }])
  monedaCartaCredito: Monedas;

  @Field(() => Incoterm, {nullable: true})
  @ManyToOne(() => Incoterm,(incoterm) => incoterm.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdIncoterm", referencedColumnName: "idIncoterm" }])
  incoterm: Incoterm;

  @Field(() => FormasPago, {nullable: true})
  @ManyToOne(() => FormasPago,(formasPago) => formasPago.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdFormaPago", referencedColumnName: "idFormaPago" }])
  formaPago: FormasPago;

  @Field(() => FormasEntrega, {nullable: true})
  @ManyToOne(() => FormasEntrega,(formasEntrega) => formasEntrega.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdFormaEntrega", referencedColumnName: "idFormaEntrega" }])
  formaEntrega: FormasEntrega;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos,(puertos) => puertos.pliegoConcurrenciaResumenEmbarque)
  @JoinColumn([{ name: "IdPuertoEmbarque", referencedColumnName: "idPuerto" }])
  puertoEmbarque: Puertos;

  @Field(() => Puertos, {nullable: true})
  @ManyToOne(() => Puertos,(puertos) => puertos.pliegoConcurrenciaResumenDestino)
  @JoinColumn([{ name: "IdPuertoDestino", referencedColumnName: "idPuerto" }])
  puertoDestino: Puertos;

  @Field(() => TiposContenedor, {nullable: true})
  @ManyToOne(() => TiposContenedor,(tiposContenedor) => tiposContenedor.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdTipoContenedor", referencedColumnName: "idTipoContenedor" }])
  tipoContenedor: TiposContenedor;

  @Field(() => [SolicitudCodificacion], {nullable: true})
  @OneToMany(() => SolicitudCodificacion,(solicitudCodificacion) => solicitudCodificacion.pliegoResumen)
  solicitudCodificacion: SolicitudCodificacion[];


  @Field(() => Proveedores, {nullable: true})
  @ManyToOne(() => Proveedores,(proveedores) => proveedores.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdProveedor", referencedColumnName: "codigo" }])
  proveedor: Proveedores;

  @Field(() => Paises, {nullable: true})
  @ManyToOne(() => Paises,(paises) => paises.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "PaisOrigenMercancia", referencedColumnName: "pais" }])
  paisOrigenMercancia: Paises;

  @Field(() => CompaniasNavieras, {nullable: true})
  @ManyToOne(() => CompaniasNavieras,(companiasNavieras) => companiasNavieras.pliegoConcurrenciaResumen)
  @JoinColumn([{ name: "IdNaviera", referencedColumnName: "id" }])
  naviera: CompaniasNavieras;
}
