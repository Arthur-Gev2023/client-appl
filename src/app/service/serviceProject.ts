import { fetchGet } from './api';

export function getData() {
    return fetchGet('http://localhost:3001/project')
}



