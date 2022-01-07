import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodigosParaLaVenta } from "../../modelsMercurio/entities/CodigosParaLaVenta.entity";
import { Paises } from "../../modelsMercurio/entities/Paises.entity";
import { Referencias } from "../../modelsMercurio/entities/Referencias.entity";
import { FacturaResumen } from "./FacturaResumen.entity";

@ObjectType()
@Index("PK_FacturaDesglose", ["idFacturaDesglose"], { unique: true })
@Entity("FacturaDesglose", { schema: "CONTRATO.dbo" })
export class FacturaDesglose {
  @PrimaryGeneratedColumn({ type: "int", name: "IdFacturaDesglose" })
  @Field(() => Int)
  idFacturaDesglose: number;

  @Column("int", { name: "Referencia", nullable: true })
  @Field(() => Int,{nullable: true})
  idReferencia: number | null;
  
  @Column("int", { name: "IdFactura", nullable: true })
  @Field(() => Int)
  idFactura: number;

  @Column("int", { name: "Codigo" })
  @Field(() => Int)
  idCodigo: number;

  @Column("int", { name: "Paquete" })
  @Field(() => Int)
  paquete: number;

  @Column("float", { name: "Bultos", precision: 53, default: () => "(1)" })
  @Field(() => Float)
  bultos: number;

  @Column("float", { name: "Cantidad", precision: 53, default: () => "(1)" })
  @Field(() => Float)
  cantidad: number;

  @Column("float", { name: "PrecioPaquete", precision: 53 })
  @Field(() => Float)
  precioPaquete: number;

  @Column("float", { name: "Precio", precision: 53 })
  @Field(() => Float)
  precio: number;

  @Column("int", { name: "PaisOrigen", nullable: true })
  @Field(() => Int,{nullable: true})
  idPaisOrigen: number | null;

  @Column("float", { name: "Suplemento", precision: 53, default: () => "(0)" })
  @Field(() => Float)
  suplemento: number;

  @Column("float", { name: "Packing", precision: 53, default: () => "(1)" })
  @Field(() => Float)
  packing: number;

  @Column("int", { name: "Cajas", default: () => "(1)" })
  @Field(() => Int)
  cajas: number;

  @Field(() => FacturaResumen, {nullable: true})
  @ManyToOne(() => FacturaResumen,(facturaResumen) => facturaResumen.facturaDesgloses)
  @JoinColumn([{ name: "IdFactura", referencedColumnName: "idFactura" }])
  facturaResumen: FacturaResumen;

  @Field(() => Referencias, {nullable: true})
  @ManyToOne(() => Referencias,(referencias) => referencias.facturaDesgloses)
  @JoinColumn([{ name: "Referencia", referencedColumnName: "referenciaId" }])
  referencia: Referencias;

  @Field(() => CodigosParaLaVenta, {nullable: true})
  @ManyToOne(() => CodigosParaLaVenta,(codigosParaLaVenta) => codigosParaLaVenta.facturaDesgloses)
  @JoinColumn([{ name: "Codigo", referencedColumnName: "idCodigo" }])
  codigo: CodigosParaLaVenta;

  @Field(() => Paises, {nullable: true})
  @ManyToOne(() => Paises,(paises) => paises.facturaDesgloses)
  @JoinColumn([{ name: "PaisOrigen", referencedColumnName: "pais" }])
  pais: Paises;
}
