import { Observable, from, mergeMap } from "rxjs";

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
}