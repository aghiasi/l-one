using WebApplication8.Models;

namespace WebApplication8.Dtos
{
    public record class userDto(
        int id , 
        string name,
        string fname,
        long phone,
        string city,
        string state
        );
    public class PaginatedList<T>
    {
        public List<User> Items { get; }
        public int PageIndex { get; }
        public int TotalPages { get; }
        public bool HasPreviousPage => PageIndex > 1;
        public bool HasNextPage => PageIndex < TotalPages;

        public PaginatedList(List<User> items, int pageIndex, int totalPages)
        {
            Items = items;
            PageIndex = pageIndex;
            TotalPages = totalPages;
        }
    }


}
