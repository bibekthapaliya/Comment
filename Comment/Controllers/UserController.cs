using Comment.Repos.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {

            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var user = await _userRepository.GetUsers();
            return Ok(new { data = user });
        }




    }
        
}
