export interface Video extends VideoBody {
    id: number;
}

export interface VideoBody {
    title: string ;
    duration: number;
    url_id: string ;
}
