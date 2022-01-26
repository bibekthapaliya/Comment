using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Repos.Users
{
    public class User
    {
        public Guid userGuid { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
    }
}
