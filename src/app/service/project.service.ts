import { Observable } from 'rxjs';
import { ProjectResponse } from '../types/project.response';
import { ApiObservable } from './api';

export function callApiToGetAllProjects(): Observable<ProjectResponse[]> {
    return ApiObservable.fetchGet<ProjectResponse[]>('http://localhost:3001/api/project')
}




