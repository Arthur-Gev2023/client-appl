import { Observable, from, mergeMap } from "rxjs";
import { CreateRequestDto } from "../types/createdRequest.response";

export class ApiObservable {
    /**
     * Call an API by giving the URL.
     * @param url 
     * @returns Observable of the result of the API
     */
    public static fetchGet<T>(url: string): Observable<T> {
        return from(fetch(url))
            .pipe(
                mergeMap(response => from(response.json())),
            );
    }

    public static fetchDelete<T>(url: string): Observable<T> {
        return from(fetch(url, { method: "DELETE" }))
            .pipe(
                mergeMap(response => from(response.json())),
            );
    }

    public static fetchPost<T>(url: string, requestDto: CreateRequestDto): Observable<T> {
        const options: RequestInit = {
            method: "POST",
            body: JSON.stringify(requestDto), // Convert requestDto to JSON string
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            }
        };

        return from(fetch(url, options)).pipe(
            mergeMap(response => from(response.json()))
        );
    }
}