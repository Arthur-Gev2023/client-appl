import { Observable, from, mergeMap } from "rxjs";


export function fetchGetObservable<T>(url: string): Observable<T> {
    return from(fetch(url))
        .pipe(
            mergeMap(response => from(response.json())),
        );
}