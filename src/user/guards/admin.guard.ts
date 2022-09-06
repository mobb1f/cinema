import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ExpressRequestInterface} from "@app/types/expressRequest.interface";

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequestInterface>();

        if (request.user.admin){
            return true;
        }

        throw new HttpException('Not authorized like admin', HttpStatus.UNAUTHORIZED);
    }
}