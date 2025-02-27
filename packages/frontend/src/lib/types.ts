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

export type Match = {
    ID: number,
    Player1ID: number,
    Player2ID: number,
    Result: number,
    Player1: Player,
    Player2: Player
}

export type CreateMatchResponse = {
    Data: Match
}

export type GetPlayersResponse = {
    Data: Player[]
}

export type PlayerRatings = {
    ID: number,
    PlayerID: number,
    Rating: number,
    Ranking: number,
    Day: Date,
    Player?: Player
}

export type GetPlayerRatingsResponse = {
    Data: PlayerRatings[]
}