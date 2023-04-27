export interface ProjectResponse {
    id: number;
    name: string;
    requests: { id: number; name: string }[];
}
