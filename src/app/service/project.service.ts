import { ApiObservable } from './api';

export function callApiToGetAllProjects() {
    return ApiObservable.fetchGet('http://localhost:3001/project')
}



