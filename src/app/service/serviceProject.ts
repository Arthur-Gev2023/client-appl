import { Observable } from 'rxjs';
import { fetchGetObservable } from './api';

export function callApiToGetAllProjects(): Observable<any> {
    return fetchGetObservable('http://localhost:3001/project')
}



