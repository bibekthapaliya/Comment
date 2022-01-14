using Comment.Providers;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.Repos.Comment
{

    public interface ICommentRepository {


        Task<bool> AddComment(Comments model);
        Task<IList<Comments>> GetCommentList();
       Task<bool> DeleteComment(Comments model);



    }





    public class CommentRepository : BaseRepository, ICommentRepository
    {


        public CommentRepository(IConfiguration configuration) : base(configuration)
        {

        }

        


        public async Task<bool> AddComment(Comments model)
        {
            using (IDbConnection conn = Connection)
            {
                var sqlQuery = @"INSERT INTO comment(commentGuid,firstName,lastName,comment)VALUES(@CommentGuid,@firstName,@lastName,@comment)";
                var count = await conn.ExecuteAsync(sqlQuery,model);
                
                if (count > 0)
                return true;
                

            }

            return false;
        }

        public async Task<bool> DeleteComment(Comments model)
        {
            using (IDbConnection conn = Connection)
            {
                
                var sql = @"DELETE  FROM comment where LOWER(commentGuid)= @CommentGuid";
                var count = await conn.ExecuteAsync(sql,model);
                if (count > 0)
                    return true;
            }
            return false;
        }

        public async Task<IList<Comments>> GetCommentList()
        {
            using (IDbConnection conn = Connection)
            {
                var sql = @"SELECT * FROM comment";
                var commentlist = await conn.QueryAsync<Comments>(sql);
                return commentlist.ToList();
            }
        }
    }
}
