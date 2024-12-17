using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Diagnostics;
using WebApplication8.Dtos;
using WebApplication8.Models;
using Newtonsoft.Json;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using System.Net.Http.Json;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
using System;
using Microsoft.AspNetCore.Http.Features;
using static System.Net.WebRequestMethods;

namespace WebApplication8.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetUsers(int pageIndex = 1, int pageSize = 10)
        {
            string json = System.IO.File.ReadAllText("data.json");
            var result = JsonConvert.DeserializeObject<List<User>>(json);
            var count = result.Count();
            var user = result
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);
            var totalPages = (int)Math.Ceiling(count / (double)pageSize);
            var data = new PaginatedList<List<User>>(user.ToList(), pageIndex, totalPages);
            return Ok (data);
        }

        public IActionResult deleteuser(int id)
        {
            string json = System.IO.File.ReadAllText("data.json");
            dynamic jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
            var result = JsonConvert.DeserializeObject<List<User>>(json);
            result.RemoveAll(x => x.Id == id);
            string output = Newtonsoft.Json.JsonConvert.SerializeObject(result, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText("data.json", output);
            return Ok("data deleted");
        }
        [HttpPost]
        public IActionResult createuser([FromBody] User model)
        {
            string json = System.IO.File.ReadAllText("data.json");
            dynamic jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
            var result = JsonConvert.DeserializeObject<List<User>>(json);
            result.Add(model);
            string output = Newtonsoft.Json.JsonConvert.SerializeObject(result, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText("data.json", output);
            return Ok("user created ");

        }
        public IActionResult searchuser(int id, int pageIndex = 1, int pageSize = 10)
        {
            string json = System.IO.File.ReadAllText("data.json");
            var allusers = JsonConvert.DeserializeObject<List<User>>(json);
            var result = JsonConvert.DeserializeObject<List<User>>(json);
            result.RemoveAll(result=> result.Id != id);

            if(result.Count != 0)
            {
                return Ok(result);
            }
            else
            {
                var count = result.Count();
                var user = result
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize);
                var totalPages = (int)Math.Ceiling(count / (double)pageSize);
                var data = new PaginatedList<List<User>>(user.ToList(), pageIndex, totalPages);
                return Ok(data);
            }
        }
    }
}