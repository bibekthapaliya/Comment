using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Model
{
    public class UserModel
    {
        public Guid userGuid { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

    }
}
