using Microsoft.Extensions.Configuration;
using System;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Providers
{
    public class BaseRepository
    {
        private readonly IConfiguration _configuration;
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_configuration.GetConnectionString("CommentConnectionString"));
            }
        }
    }
}
