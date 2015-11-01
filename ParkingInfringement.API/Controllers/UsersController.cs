using AppPundits.Parking.Filters;
using AppPundits.Parking.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Linq;

namespace AppPundits.Parking.Controllers
{
    public class UsersController : ApiController
    {
        [IdentityBasicAuthentication] // Enable authentication via an ASP.NET Identity user name and password
        [Authorize] // Require some form of authentication
        public IEnumerable<IdentityUser> GetAll()
        {
            var manager = UsersDbContext.GetUserManager();
            return manager.Users.ToList();
        }

        [IdentityBasicAuthentication]
        [Authorize]
        [Route("info")]
        public UserInfo Get()
        {
            UserInfo info = new UserInfo
            {
                UserName = User.Identity.Name
            };

            ClaimsIdentity identity = User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                List<ClaimModel> claims = new List<ClaimModel>();

                foreach (Claim claim in identity.Claims)
                {
                    claims.Add(new ClaimModel
                    {
                        Type = claim.Type,
                        Value = claim.Value
                    });
                }

                info.Claims = claims;
            }

            return info;
        }

        [IdentityBasicAuthentication]
        [Authorize]
        public async Task<IHttpActionResult> Post([FromBody]RegisterUserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var manager = UsersDbContext.GetUserManager();

            var user = new IdentityUser() { UserName = model.UserName, Email = model.Email, PhoneNumber = model.PhoneNumber };

            IdentityResult result = await manager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return GetErrorResult(result);

            result = await manager.AddToRoleAsync(model.UserName, model.Role);
            if (!result.Succeeded)
                return GetErrorResult(result);

            return Ok();
        }

        [HttpPost]
        [IdentityBasicAuthentication]
        [Route("SendPasswordEmail")]
        public async Task<IHttpActionResult> SendPasswordEmail(SendPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var manager = UsersDbContext.GetUserManager();
            var user = await manager.FindByNameAsync(model.User.UserName);
            await manager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + model.Url + "\">here</a>");

            return Ok();
        }

        [HttpPost]
        [IdentityBasicAuthentication]
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IdentityResult result = await UsersDbContext.GetUserManager().AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);

            if (!result.Succeeded)
                return GetErrorResult(result);

            return Ok();
        }
        
        [IdentityBasicAuthentication]
        [Authorize]
        public void Put(int id, [FromBody]string value)
        {
        }

        [IdentityBasicAuthentication]
        [Authorize]
        public void Delete(int id)
        {
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }

    public class RegisterUserModel
    {
        [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        public string Role { set; get; }

        [Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 4)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class UserInfo
    {
        public string UserName { get; set; }

        public IEnumerable<ClaimModel> Claims { get; set; }
    }

    public class ClaimModel
    {
        public string Type { get; set; }

        public string Value { get; set; }
    }

    public class SendPasswordBindingModel
    {
        public IdentityUser User { set; get; }
        public string Url { set; get; }
    }
}
