import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function callApiToGetAllRequests(): Observable<any> {
    return ajax.get<any>('http://localhost:3001/request')
}