import { Observable, from, mergeMap } from "rxjs";

export function fetchGet<T>(url: string): Observable<T> {
    return from(fetch(url))
        .pipe(
            mergeMap(response => from(response.json())),
        );
}