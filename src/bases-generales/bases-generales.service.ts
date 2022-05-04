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
import { Proformas } from 'src/models/entities/Proformas.entity';
import { TipoContrato } from 'src/models/entities/TipoContrato.entity';
import { ProformasService } from 'src/proformas/proformas.service';
import { TipoContratoService } from 'src/tipo-contrato/tipo-contrato.service';
import { Repository } from 'typeorm';
import { CreateBasesGeneralesInput } from './dto/create-bases-generales.input';
import { ProveedoresService } from 'src/proveedores/proveedores.service';
import { Paises } from 'src/modelsMercurio/entities/Paises.entity';
import { Proveedores } from 'src/modelsMercurio/entities/Proveedores.entity';
import { LogsService } from 'src/logs/logs.service';
import { MyLogger } from 'src/MyLogger';
import { BasesGeneralesClausulas } from 'src/models/entities/BasesGeneralesClausulas.entity';
import { ProformaClausulasService } from 'src/proforma-clausulas/proforma-clausulas.service';
import { CreateBasesGeneralesClausulaInput } from 'src/bases-generales-clausulas/dto/create-bases-generales-clausula.input';
import { Usuarios } from 'src/models/entities/Usuarios.entity';

@Injectable()
export class BasesGeneralesService {
  constructor(@InjectRepository(BasesGenerales) public readonly basesGeneralesRepository: Repository<BasesGenerales>, private clasificacionesService: ClasificacionesService,
  private tipoContratoService: TipoContratoService, private incotermService: IncotermService, private proformasService: ProformasService, 
  private compradoresService: CompradoresService, private paisesService: PaisesService, private proveedoresService: ProveedoresService,
  private logsService: LogsService,private basesGeneralesClausulasService: BasesGeneralesClausulasService,private proformaClausulasService: ProformaClausulasService) {}

  async save(usuarioToken: Usuarios,createBasesGeneralesInput: CreateBasesGeneralesInput) : Promise<BasesGenerales> {
    var today = new Date();
    var esNuevo = false;
    var result: BasesGenerales
    if(createBasesGeneralesInput.idBasesGenerales){
      esNuevo = false;
      var baseVieja = await this.findOne(createBasesGeneralesInput.idBasesGenerales);

      //await this.basesGeneralesClausulasService.removeSeveralByBaseGeneralId(createBasesGeneralesInput.idBasesGenerales);

      createBasesGeneralesInput.actualizado = new Date();
      createBasesGeneralesInput.fecha = baseVieja.fecha;
      result = await this.basesGeneralesRepository.save(createBasesGeneralesInput);

      let clausulas = createBasesGeneralesInput.basesGeneralesClausulas;
        for (let index = 0; index < clausulas.length; index++) {
          const proformaClausula = clausulas[index];
          
          var basesGeneralesClausula = new CreateBasesGeneralesClausulaInput();
          basesGeneralesClausula.idBasesGeneralesClausulas = proformaClausula.idBasesGeneralesClausulas;
          basesGeneralesClausula.clausula = proformaClausula.clausula; 
          basesGeneralesClausula.excepcional = proformaClausula.excepcional;
          basesGeneralesClausula.idBasesGenerales = result.idBasesGenerales;
          basesGeneralesClausula.idProformaClausula = proformaClausula.idProformaClausula;
          basesGeneralesClausula.idTipoClausula = proformaClausula.idTipoClausula;
          basesGeneralesClausula.orden = proformaClausula.orden;
          basesGeneralesClausula.modificado = new Date();
          await this.basesGeneralesClausulasService.save(basesGeneralesClausula)        
        }
    }

    if(!createBasesGeneralesInput.idBasesGenerales){
      esNuevo = true;
      var basesAnteriores = await this.findAll();
      var ultimaBase = basesAnteriores[0];
     
      if(ultimaBase.fecha.getFullYear() === today.getFullYear()){
        createBasesGeneralesInput.consecutivo = ultimaBase.consecutivo+1;    
      }
      else{
        createBasesGeneralesInput.consecutivo = 1;
      }
      createBasesGeneralesInput.fecha = new Date();
      createBasesGeneralesInput.actualizado = new Date();
      result = await this.basesGeneralesRepository.save(createBasesGeneralesInput);

      if(result){
        //await this.basesGeneralesClausulasService.removeSeveralByBaseGeneralId(result.idBasesGenerales);

        let clausulas = createBasesGeneralesInput.basesGeneralesClausulas;
        for (let index = 0; index < clausulas.length; index++) {
          const proformaClausula = clausulas[index];
          
          var basesGeneralesClausula = new CreateBasesGeneralesClausulaInput();
          basesGeneralesClausula.idBasesGeneralesClausulas = proformaClausula.idBasesGeneralesClausulas;
          basesGeneralesClausula.clausula = proformaClausula.clausula;
          basesGeneralesClausula.excepcional = proformaClausula.excepcional;
          basesGeneralesClausula.idBasesGenerales = result.idBasesGenerales;
          basesGeneralesClausula.idProformaClausula = proformaClausula.idProformaClausula;
          basesGeneralesClausula.idTipoClausula = proformaClausula.idTipoClausula;
          basesGeneralesClausula.orden = proformaClausula.orden;
          basesGeneralesClausula.modificado = new Date();
          await this.basesGeneralesClausulasService.save(basesGeneralesClausula)        
        }
      }
    }
    
    if(result && esNuevo){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Insertada una nueva base general con número consecutivo "+result.consecutivo+"");
    } 
    if(result && !esNuevo){
      var texto = "Modificada la base general con número consecutivo "+result.consecutivo+"";
        if(baseVieja.fecha != result.fecha){
          texto += ", cambiada la fecha";
        }
        if(baseVieja.idTipoContrato != result.idTipoContrato){
          texto += ", cambiado el tipo de contato";
        }
        if(baseVieja.idIncoterm != result.idIncoterm){
          texto += ", cambiado el incoterm";
        }
        if(baseVieja.idProforma != result.idProforma){
          texto += ", cambiada la proforma empleada";
        }
        if(baseVieja.lugardeFirma != result.lugardeFirma){
          texto += ", cambiado el lugar de firma";
        }
        if(baseVieja.idPais != result.idPais){
          texto += ", cambiado el país";
        }
        if(baseVieja.idProveedor != result.idProveedor){
          texto += ", cambiado el proveedor";
        }
        if(baseVieja.idComprador != result.idComprador){
          texto += ", cambiado el comprador";
        }
        if(baseVieja.vigencia != result.vigencia){
          texto += ", cambiada la vigencia";
        }
        if(baseVieja.aprobado != result.aprobado){
          texto += ", cambiado el estado de aprobado";
        }
        if(baseVieja.cancelado != result.cancelado){
          texto += ", cambiado el estado de cancelado";
        }
        if(baseVieja.activo != result.activo){
          texto += ", cambiado el estado de activo";
        }
        if(baseVieja.actualizado != result.actualizado){
          texto += ", cambiada la fecha de actualización";
        }
        await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }
    return result;
  }

  async findAll(): Promise<BasesGenerales[]> { 
    return await this.basesGeneralesRepository.find({order: {
        fecha : "DESC"
      }, relations: ['basesGeneralesClausulas','contratos']});
  }

  async findOne(id: number) : Promise<BasesGenerales> {
    return await this.basesGeneralesRepository.findOne(id, { relations: ['basesGeneralesClausulas','contratos']});
  }

  async remove(usuarioToken: Usuarios,id: number) : Promise<any> {
    const basesGenerales = await this.findOne(id);
    var result = await this.basesGeneralesRepository.remove(basesGenerales);
    if(result){
      await this.logsService.save(usuarioToken.ejecutivo.nombre, "Eliminada la base general con número consecutivo "+result.consecutivo+"");
    }
    
    return result;
  }

  async removeSeveral(usuarioToken: Usuarios,id: number[]) : Promise<any> {
    const basesGenerales = await this.basesGeneralesRepository.findByIds(id);
    var result = await this.basesGeneralesRepository.remove(basesGenerales);
    if(result){
      var texto = "Eliminadas las bases generales con números consecutivos ";
      for (let index = 0; index < result.length; index++) {
        if(index != result.length -1)
          texto += result[index].consecutivo+", ";
        else
          texto += result[index].consecutivo;
      }
      await this.logsService.save(usuarioToken.ejecutivo.nombre, texto);
    }
    
    return result;
  }

  async getClasificacion (clasificacionId: number) : Promise<Clasificaciones>{
    return this.clasificacionesService.findOne(clasificacionId);
  }

  async getTipoContrato (tipoContratoId: number) : Promise<TipoContrato>{
    return this.tipoContratoService.findOne(tipoContratoId);
  }

  async getIncoterm (incotermId: number) : Promise<Incoterm>{
    return this.incotermService.findOne(incotermId);
  }

  async getProforma (proformaId: number) : Promise<Proformas>{
    return this.proformasService.findOne(proformaId);
  }

  async getComprador (compradorId: number) : Promise<Compradores>{
    return this.compradoresService.findOne(compradorId);
  }

  async getPais (paisId: number) : Promise<Paises>{
    return this.paisesService.findOne(paisId);
  }

  async getProveedor (proveedorId: number) : Promise<Proveedores>{
    return this.proveedoresService.findOne(proveedorId);
  }

  async getClausulasFromBaseGeneral(idIncoterm: number,idProveedor: number) : Promise<BasesGeneralesClausulas[]> {
    return new Promise<BasesGeneralesClausulas[]>(async (resolve, reject) => {
      const basesGenerales = await this.basesGeneralesRepository.find({ where: {idIncoterm,idProveedor}, relations:['basesGeneralesClausulas','contratos'], order: {
        fecha: "DESC"
      }});
      if(!basesGenerales){
        reject('No existe una base general anterior para ese proveedor y ese incoterm');
      }
      else{ 
        resolve(basesGenerales[0].basesGeneralesClausulas);
      }
    }); 
  }

  async actualizarClausulasFromBaseGeneral(idBasesGenerales: number) : Promise<BasesGeneralesClausulas[]> {
    return new Promise<BasesGeneralesClausulas[]>(async (resolve, reject) => {
      const basesGenerales = await this.basesGeneralesRepository.findOne({ where: {idBasesGenerales}, relations:['basesGeneralesClausulas','contratos'], order: {
        fecha: "DESC"
      }});

      if(!basesGenerales){
        reject('No existe esa base general');
      }
      
      else{
        const proformaClausulas = await this.proformaClausulasService.findAllById(basesGenerales.idProforma)
        if(!proformaClausulas){
          reject('Esta base general no tiene una proforma predefinida');
        }
        else{
          var basesGeneralesClausulasArray : BasesGeneralesClausulas[] = []

          for (let index = 0; index < proformaClausulas.length; index++) {
            const proformaClausula = proformaClausulas[index];
            
            var basesGeneralesClausula = new BasesGeneralesClausulas();
            basesGeneralesClausula.clausula = proformaClausula.clausula;
            basesGeneralesClausula.excepcional = false;
            basesGeneralesClausula.idBasesGenerales = basesGenerales.idBasesGenerales;
            basesGeneralesClausula.idProformaClausula = proformaClausula.idProformaClausula;
            basesGeneralesClausula.idTipoClausula = proformaClausula.idTipoClausula;
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

