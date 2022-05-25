import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export const DEFAULT_GRAPHQL_CONTEXT = 'usuario';
export const SECRET_KEY = 'Contratos2022';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context).getContext();
      const auth = ctx.req.headers.authorization;
  
      if (!auth) {
        return false;
      }
  
      if (auth.split(' ')[0] !== 'Bearer') {
        return false;
      }
  
      const token = auth.split(' ')[1];
      try {
        ctx[DEFAULT_GRAPHQL_CONTEXT] = jwt.verify(token, SECRET_KEY)['usuario'];
        return true;
      } catch (err) {
        return false;
      }
    }
  }
  
