namespace WebApplication8.Models
{
    public record class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Fname { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public long phone { get; set; }
    }
}
