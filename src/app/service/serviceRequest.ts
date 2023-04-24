import { fetchGetObservable } from './api';

export function getData() {
    return fetchGetObservable('http://localhost:3001/request')
}