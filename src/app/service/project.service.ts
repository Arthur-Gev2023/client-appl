import { Observable } from 'rxjs';
import { ProjectResponse } from '../types/project.response';
import { ApiObservable } from './api';
import { RequestResponse } from '../types/request.response';

export function callApiToGetAllProjects(): Observable<ProjectResponse[]> {
    return ApiObservable.fetchGet<ProjectResponse[]>('http://localhost:3001/api/project')
}



export function callApiToGetRequestsByProjectId(projectId: number): Observable<ProjectResponse[]> {
    return ApiObservable.fetchGet<ProjectResponse[]>(`http://localhost:3001/api/project/${projectId}`);
}
