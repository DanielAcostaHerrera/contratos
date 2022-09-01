import { BasesGeneralesClausulasService } from './../bases-generales-clausulas/bases-generales-clausulas.service';
import { PaisesService } from './../paises/paises.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClasificacionesService } from 'src/clasificaciones/clasificaciones.service';
import { CompradoresService } from 'src/compradores/compradores.service';
import { IncotermService } from 'src/incoterm/incoterm.service';
import { BasesGenerales } from 'src/models/entities/BasesGenerales.entity';
import { Clasificaciones } from 'src/models/entities/Clasificaciones.entity';
import { Compradores } from 'src/models/entities/Compradores.entity';
import { Incoterm } from 'src/models/entities/Incoterm.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { Between, Equal, FindOptionsOrder, In, Like, Repository } from 'typeorm';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { LogsService } from 'src/logs/logs.service';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { ProformaClausulasService } from 'src/proforma-clausulas/proforma-clausulas.service';
import { CreateBasesGeneralesClausulaInput } from 'src/bases-generales-clausulas/dto/create-bases-generales-clausula.input';
import { Usuarios } from 'src/models/entities/Usuarios.entity';
import { FilterBasesGeneralesInput } from './dto/filter-bases-generales.input';
import { CountBasesGenerales } from './dto/count-bases-generales.input';
import { orderBy } from 'lodash';
import { BasesGeneralesPagination } from 'src/pagination/PaginationDto';

@Injectable()
export class BasesGeneralesService {
  constructor(
    @InjectRepository(BasesGenerales)
    public readonly basesGeneralesRepository: Repository<BasesGenerales>,
    private clasificacionesService: ClasificacionesService,
    private tipoContratoService: TipoContratoService,
    private incotermService: IncotermService,
    private compradoresService: CompradoresService,
    private paisesService: PaisesService,
    private proveedoresService: ProveedoresService,
    private logsService: LogsService,
    private basesGeneralesClausulasService: BasesGeneralesClausulasService,
    private proformaClausulasService: ProformaClausulasService,
  ) {}

  async save(
    usuarioToken: Usuarios,
    createBasesGeneralesInput: CreateBasesGeneralesInput,
  ): Promise<BasesGenerales> {
    var today = new Date();
    var esNuevo = false;
    var result: BasesGenerales;
    if (createBasesGeneralesInput.idBasesGenerales) {
      esNuevo = false;
      var baseVieja = await this.findOne(
        createBasesGeneralesInput.idBasesGenerales,
      );

      await this.basesGeneralesClausulasService.removeSeveralByBaseGeneralId(
        createBasesGeneralesInput.idBasesGenerales,
      );

      createBasesGeneralesInput.actualizado = new Date();
      result = await this.basesGeneralesRepository.save(
        createBasesGeneralesInput,
      );

      if (result) {
        let clausulas = createBasesGeneralesInput.basesGeneralesClausulas;
        for (let index = 0; index < clausulas.length; index++) {
          const proformaClausula = clausulas[index];

          var basesGeneralesClausula = new CreateBasesGeneralesClausulaInput();
          basesGeneralesClausula.idBasesGeneralesClausulas =
            proformaClausula.idBasesGeneralesClausulas;
          basesGeneralesClausula.clausula = proformaClausula.clausula;
          basesGeneralesClausula.excepcional = proformaClausula.excepcional;
          basesGeneralesClausula.idBasesGenerales = result.idBasesGenerales;
          basesGeneralesClausula.idTipoClausula =
            proformaClausula.idTipoClausula;
          basesGeneralesClausula.orden = proformaClausula.orden;
          basesGeneralesClausula.modificado = new Date();
          await this.basesGeneralesClausulasService.save(
            basesGeneralesClausula,
          );
        }
      }
    }

    if (!createBasesGeneralesInput.idBasesGenerales) {
      esNuevo = true;
      var basesAnteriores = await this.findAll(5, 0);
      var ultimaBase = basesAnteriores[0];

      if (ultimaBase.fecha.getFullYear() === today.getFullYear()) {
        createBasesGeneralesInput.consecutivo = ultimaBase.consecutivo + 1;
      } else {
        createBasesGeneralesInput.consecutivo = 1;
      }
      createBasesGeneralesInput.fecha = new Date();
      createBasesGeneralesInput.actualizado = new Date();
      result = await this.basesGeneralesRepository.save(
        createBasesGeneralesInput,
      );

      if (result) {
        //await this.basesGeneralesClausulasService.removeSeveralByBaseGeneralId(result.idBasesGenerales);

        let clausulas = createBasesGeneralesInput.basesGeneralesClausulas;
        for (let index = 0; index < clausulas.length; index++) {
          const proformaClausula = clausulas[index];

          var basesGeneralesClausula = new CreateBasesGeneralesClausulaInput();
          basesGeneralesClausula.idBasesGeneralesClausulas =
            proformaClausula.idBasesGeneralesClausulas;
          basesGeneralesClausula.clausula = proformaClausula.clausula;
          basesGeneralesClausula.excepcional = proformaClausula.excepcional;
          basesGeneralesClausula.idBasesGenerales = result.idBasesGenerales;
          basesGeneralesClausula.idTipoClausula =
            proformaClausula.idTipoClausula;
          basesGeneralesClausula.orden = proformaClausula.orden;
          basesGeneralesClausula.modificado = new Date();
          await this.basesGeneralesClausulasService.save(
            basesGeneralesClausula,
          );
        }
      }
    }

    if (result && esNuevo) {
      await this.logsService.save(
        usuarioToken.ejecutivo.nombre,
        'Insertada una nueva base general con número consecutivo ' +
          result.consecutivo +
          '',
      );
    }
    if (result && !esNuevo) {
      var texto =
        'Modificada la base general con número consecutivo ' +
        result.consecutivo +
        '';
      if (baseVieja.fecha != result.fecha) {
        texto += ', cambiada la fecha';
      }
      if (baseVieja.idTipoContrato != result.idTipoContrato) {
        texto += ', cambiado el tipo de contato';
      }
      if (baseVieja.idIncoterm != result.idIncoterm) {
        texto += ', cambiado el incoterm';
      }
      if (baseVieja.lugardeFirma != result.lugardeFirma) {
        texto += ', cambiado el lugar de firma';
      }
      if (baseVieja.idPais != result.idPais) {
        texto += ', cambiado el país';
      }
      if (baseVieja.idProveedor != result.idProveedor) {
        texto += ', cambiado el proveedor';
      }
      if (baseVieja.idComprador != result.idComprador) {
        texto += ', cambiado el comprador';
      }
      if (baseVieja.vigencia != result.vigencia) {
        texto += ', cambiada la vigencia';
      }
      if (baseVieja.aprobado != result.aprobado) {
        texto += ', cambiado el estado de aprobado';
      }
      if (baseVieja.cancelado != result.cancelado) {
        texto += ', cambiado el estado de cancelado';
      }
      if (baseVieja.activo != result.activo) {
        texto += ', cambiado el estado de activo';
      }
      if (baseVieja.actualizado != result.actualizado) {
        texto += ', cambiada la fecha de actualización';
      }
      await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }
    return result;
  }

  async countBasesGenerales(
    _where?: FilterBasesGeneralesInput,
  ): Promise<CountBasesGenerales> {
    let bases: BasesGenerales[];
    let count = new CountBasesGenerales();
    if (_where) {
      bases = await this.basesGeneralesRepository.find({
        where: {
          // ...(_where.idTipoContrato && {
          //   idTipoContrato: _where.idTipoContrato,
          // }),
          // ...(_where.idIncoterm && { idIncoterm: _where.idIncoterm }),
          // ...(_where.idPais && { idPais: _where.idPais }),
          // ...(_where.idProveedor && { idProveedor: _where.idProveedor }),
          // ...(_where.idComprador && { idComprador: _where.idComprador }),
          ...(_where.vigencia && { vigencia: _where.vigencia }),
          ...(_where.aprobado && { aprobado: _where.aprobado }),
          ...(_where.activo && { activo: _where.activo }),
          ...(_where.noContrato && {
            noContrato: Like(`%${_where.noContrato}%`),
          }),
          ...(_where.lugardeFirma && {
            lugardeFirma: Like(`%${_where.lugardeFirma}%`),
          }),
          ...(_where.fecha &&
            _where.fechaVencimiento && {
              fecha: Between(_where.fecha, _where.fechaVencimiento),
            }),
          ...(_where.actualizadoDesde &&
            _where.actualizadoHasta && {
              actualizado: Between(
                _where.actualizadoDesde,
                _where.actualizadoHasta,
              ),
            }),
        },
      });
    }
    if (!_where) {
      bases = await this.basesGeneralesRepository.find();
    }
    count.cantidad = bases.length;
    return count;
  }

  getOrderObject(
    campo: string,
    orden: number,
  ): FindOptionsOrder<BasesGenerales> {
    if (orden && campo) {
      //Relation field
      if (campo.includes('.')) {
        const relation = campo.split('.')[0];
        const relationProp = campo.split('.')[1];
        return {
          [relation]: {
            [relationProp]: orden,
          },
        };
      } else { //Normal field
        return {
          [campo]: orden,
        };
      }
    } else { //default order by fecha
      return {
        fecha: 'DESC',
      };
    }
  }

  async findAll(
    take?: number,
    skip?: number,
    _where?: FilterBasesGeneralesInput,
    campo?: string,
    orden?: number,
  ): Promise<BasesGeneralesPagination> {
    const [bases, count] = await this.basesGeneralesRepository.findAndCount({
      order: this.getOrderObject(campo, orden),
      ...(_where && {
        where: {
          ...((_where.idIncoterm && _where.idIncoterm.length > 0) && { idIncoterm: In(_where.idIncoterm) }),
          ...((_where.idPais && _where.idPais.length > 0) && { idPais: In(_where.idPais) }),
          ...((_where.idProveedor && _where.idProveedor.length > 0) && { idProveedor: In(_where.idProveedor) }),
          ...((_where.idComprador && _where.idComprador.length > 0) && { idComprador: In(_where.idComprador) }),
          ...(_where.aprobado !== null && { aprobado: _where.aprobado }),
          ...(_where.cancelado !== null && { cancelado: _where.cancelado }),
          ...(_where.noContrato && {
            noContrato: Like(`%${_where.noContrato}%`),
          }),
          ...(_where.fecha && {
            fecha: Equal(_where.fecha),
          }),
          ...(_where.fechaVencimiento && {
            fechaVencimiento: Equal(_where.fechaVencimiento),
          }),
        },
      }),
      relations: [
        'incoterm',
        'compradores',
        'pais',
        'proveedor',
      ],
      ...(take && { take: take }),
      ...(skip && { skip: skip }),
    });
    return new BasesGeneralesPagination(bases, count)
  }

  async findOne(id: number): Promise<BasesGenerales> {
    let bases = await this.basesGeneralesRepository.findOne({
      where: { idBasesGenerales: id },
      relations: [
        'basesGeneralesClausulas',
        'tipoDeContrato',
        'incoterm',
        'compradores',
        'pais',
        'proveedor',
      ],
      order: {
        basesGeneralesClausulas: {
          orden : "ASC"
        }
      },
    });
    let clausulas = bases.basesGeneralesClausulas;
    for (let index = 0; index < clausulas.length; index++) {
      clausulas[index].numero = index + 1;
    }
    return bases;
  }

  async remove(usuarioToken: Usuarios, id: number): Promise<any> {
    const basesGenerales = await this.findOne(id);
    var result = await this.basesGeneralesRepository.remove(basesGenerales);
    if (result) {
      await this.logsService.save(
        usuarioToken.ejecutivo.nombre,
        'Eliminada la base general con número consecutivo ' +
          result.consecutivo +
          '',
      );
    }

    return result;
  }

  async removeSeveral(usuarioToken: Usuarios, id: number[]): Promise<any> {
    const basesGenerales = await this.basesGeneralesRepository.findByIds(id);
    var result = await this.basesGeneralesRepository.remove(basesGenerales);
    if (result) {
      var texto = 'Eliminadas las bases generales con números consecutivos ';
      for (let index = 0; index < result.length; index++) {
        if (index != result.length - 1)
          texto += result[index].consecutivo + ', ';
        else texto += result[index].consecutivo;
      }
      await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }

    return result;
  }

  async getClasificacion(clasificacionId: number): Promise<Clasificaciones> {
    return this.clasificacionesService.findOne(clasificacionId);
  }

  async getTipoContrato(tipoContratoId: number): Promise<TipoContrato> {
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getIncoterm(incotermId: number): Promise<Incoterm> {
    return this.incotermService.findOne(incotermId);
  }

  async getComprador(compradorId: number): Promise<Compradores> {
    return this.compradoresService.findOne(compradorId);
  }

  async getPais(paisId: number): Promise<Paises> {
    return this.paisesService.findOne(paisId);
  }

  async getProveedor(proveedorId: number): Promise<Proveedores> {
    return this.proveedoresService.findOne(proveedorId);
  }

  async getClausulasFromBaseGeneral(
    idIncoterm: number,
    idProveedor: number,
  ): Promise<BasesGeneralesClausulas[]> {
    return new Promise<BasesGeneralesClausulas[]>(async (resolve, reject) => {
      console.log(idIncoterm, idProveedor);
      const basesGenerales = await this.basesGeneralesRepository.find({
        where: { idIncoterm, idProveedor, aprobado: true },
        order: {
          fecha: 'DESC',
        },
      });
      if (basesGenerales.length == 0) {
        reject(
          'No existe una base general anterior aprobada para ese proveedor y ese incoterm',
        );
      } else {
        resolve(
          this.basesGeneralesClausulasService.findAllByIdBaseGeneral(
            basesGenerales[0].idBasesGenerales,
          ),
        );
      }
    });
  }

  async actualizarClausulasFromBaseGeneral(
    idBasesGenerales: number,
  ): Promise<BasesGeneralesClausulas[]> {
    return new Promise<BasesGeneralesClausulas[]>(async (resolve, reject) => {
      const basesGenerales = await this.basesGeneralesRepository.findOne({
        where: { idBasesGenerales },
        order: {
          fecha: 'DESC',
        },
      });

      if (!basesGenerales) {
        reject('No existe esa base general');
      } else {
        const proformaClausulas =
          await this.proformaClausulasService.findAllById(
            basesGenerales.idTipoContrato,
            basesGenerales.idIncoterm,
          );
        if (proformaClausulas.length == 0) {
          reject('Esta base general no tiene una proforma predefinida');
        } else {
          //await this.basesGeneralesClausulasService.removeSeveralByBaseGeneralId(basesGenerales.idBasesGenerales);

          var basesGeneralesClausulasArray: BasesGeneralesClausulas[] = [];

          for (let index = 0; index < proformaClausulas.length; index++) {
            const proformaClausula = proformaClausulas[index];

            var basesGeneralesClausula = new BasesGeneralesClausulas();
            basesGeneralesClausula.clausula = proformaClausula.clausula;
            basesGeneralesClausula.excepcional = false;
            basesGeneralesClausula.idBasesGenerales =
              basesGenerales.idBasesGenerales;
            basesGeneralesClausula.idTipoClausula =
              proformaClausula.idTipoClausula;
            basesGeneralesClausula.orden = proformaClausula.orden;
            basesGeneralesClausula.modificado = new Date();
            basesGeneralesClausulasArray.push(basesGeneralesClausula);
          }

          resolve(basesGeneralesClausulasArray);
        }
      }
    });
  }
}
