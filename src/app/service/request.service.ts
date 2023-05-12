import { Observable } from "rxjs";
import { RequestResponse } from "../types/request.response";
import { ApiObservable } from "./api";



export function callApiToGetRequestById(id: number): Observable<RequestResponse> {
  return ApiObservable.fetchGet<RequestResponse>(`http://localhost:3001/api/request/${id}`)
}

export function callApiToDeleteById(id: number | undefined): Observable<void> {
  return ApiObservable.fetchDelete<void>(`http://localhost:3001/api/request/${id}`)
}
