using Comment.Model;
using Comment.Repos.Comment;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Comment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentController : ControllerBase
    {

        
        public readonly ICommentRepository _commentrepository;

        public CommentController(ICommentRepository commentRepository)
        {

            _commentrepository = commentRepository;

        }




        
        public async Task<IActionResult> GetComment()
        {
            var comment = await _commentrepository.GetCommentList();
            return Ok(new { data = comment });
        }


        [HttpPost]
        public async Task<IActionResult> PostComment([FromBody] CommentModel comment)
        {



            if (comment != null)

            {
                Guid commentGuid = Guid.NewGuid();
                var entity = new Comments()
                {
                    CommentGuid = commentGuid,
                    firstName = comment.firstName,
                    lastName = comment.lastName,
                    comment = comment.comment
                };
                await _commentrepository.AddComment(entity);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteAttachmentComment([FromBody] CommentModel comment)
        {

            var entity = new Comments()
            {
                CommentGuid = comment.commentId,
                firstName = comment.firstName,
                lastName = comment.lastName,
                comment = comment.comment
            };

            await _commentrepository.DeleteComment(entity);
            
            return Ok();
        }
    }
}
