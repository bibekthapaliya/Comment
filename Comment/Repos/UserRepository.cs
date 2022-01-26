using Comment.Providers;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Repos.Users
{
    public interface IUserRepository
    {



        Task<IList<User>> GetUsers();





    };

    public class UserRepository : BaseRepository, IUserRepository
    {


        public UserRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public async Task<IList<User>> GetUsers()
        {
            using (IDbConnection conn = Connection)
            {
                var sql = @"SELECT * FROM users";
                var userlist = await conn.QueryAsync<User>(sql);
                return userlist.ToList();
            }
        }

        
    }



    }
