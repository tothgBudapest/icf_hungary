export interface Artwork {
    id: number;
    title: string;
    artist_display: string;
    thumbnail_url: string;
    api_link: string;
    is_public_domain: boolean;
    classification_title: string;
    date_display: string;
    place_of_origin: string;
    medium_display: string;
}

export interface ArtworkState {
    data: Artwork[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalPages: number;
    pageSize: number;
}

export interface ArtworkPagination {
    total_pages: number;
    total_count: number;
    current_page: number;
    per_page: number;
    next_url: string | null;
    prev_url: string | null;
}

export interface ArtworkApiResponse {
    data: Artwork[];
    pagination: ArtworkPagination;
}

export interface FetchArtworksResponse {
    data: Artwork[];
    totalPages: number;
}

export interface FetchArtworksRequest {
    currentPage: number;
    searchQuery: string;
}
