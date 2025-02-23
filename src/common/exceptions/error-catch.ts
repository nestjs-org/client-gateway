import { RpcException } from "@nestjs/microservices";
import { catchError, Observable, ObservableInput } from "rxjs";

export function ErrorCatchCuston<T extends object, O>(error: T, cought: Observable<T>): ObservableInput<any>{   
    throw new RpcException(error);
}