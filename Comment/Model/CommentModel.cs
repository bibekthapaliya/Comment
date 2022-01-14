using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Model
{
    public class CommentModel
    {
        
        public Guid commentId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string comment { get; set; }
    }
}
