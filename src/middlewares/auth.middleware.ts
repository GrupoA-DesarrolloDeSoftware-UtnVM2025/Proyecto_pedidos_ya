import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Permissions } from './decorators/permissons.decorator';
import axios from 'axios';
import * as process from "node:process";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector:Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization.replace('Bearer ','');
            const permissions = this.reflector.get(Permissions, context.getHandler());

            const baseURL = process.env.JWT_SERVICE_URL || 'http://localhost:3001';

            const requests = permissions.map((permission: string) =>
                axios.get(`${baseURL}/can-do/${permission}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            );
            const results = await Promise.allSettled(requests);

            // Verifica si al menos una respuesta es exitosa
            const atLeastOneAllowed = results.some(result =>
                result.status === 'fulfilled' && result.value.data
            );

            if (atLeastOneAllowed) {
                return true;
            } else {
                throw new UnauthorizedException("error")
            }

        } catch (error) {
            let errorMessage = error?.message;

            if (error.isAxiosError && error.response) {
                errorMessage = error.response.data?.message || error.response.data || error.message;
                throw new UnauthorizedException({
                    message: errorMessage,
                    error: error.response.data.error,
                    status: error.response.status
                });
            }
            throw new UnauthorizedException(errorMessage);
        }
    }
}