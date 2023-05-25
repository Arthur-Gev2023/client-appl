import { Observable } from "rxjs";
import { CreateRequestDto } from "../types/createdRequest.response";
import { RequestResponse } from "../types/request.response";
import { ApiObservable } from "./api";



export function callApiToGetRequestById(id: number): Observable<RequestResponse> {
  return ApiObservable.fetchGet<RequestResponse>(`http://localhost:3001/api/request/${id}`)
}

export function callApiToDeleteById(id: number | undefined): Observable<void> {
  return ApiObservable.fetchDelete<void>(`http://localhost:3001/api/request/${id}`)
}


export function callApiToCreateRequest(createRequestDto: CreateRequestDto): Observable<RequestResponse> {
  return ApiObservable.fetchPost<RequestResponse>(`http://localhost:3001/api/request`, createRequestDto)
}