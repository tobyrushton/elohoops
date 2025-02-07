package handlers

type Response[DT any, MT any] struct {
	Data DT
	Meta MT
}

type PaginationMeta struct {
	CurrentPage int
	TotalPages  int
}
