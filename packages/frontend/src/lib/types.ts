export type Player = {
    ID: number,
    FirstName: string,
    LastName: string,
    NBAID: number,
    Rating: number,
    Active: boolean
}

export type LeaderboardResponse = {
    Data: Player[],
    Meta: {
        CurrentPage: number,
        TotalPages: number,
        PerPage: number
    }
}