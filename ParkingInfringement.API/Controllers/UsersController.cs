using ParkingInfringement.API.Filters;
using ParkingInfringement.API.Models;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Linq;
using MySql.AspNet.Identity;

namespace ParkingInfringement.API.Controllers
{
    public class UsersController : ApiController
    {
        [IdentityBasicAuthentication]
        [Authorize]
        public IEnumerable<UserInfo> GetAll()
        {
            var users = new List<UserInfo>();

            var manager = new ApplicationUserManager(new MySqlUserStore<ApplicationUser>());

            return users;
        }

        [IdentityBasicAuthentication]
        [Authorize]
        [Route("api/users/info")]
        public UserInfo Get()
        {
            UserInfo info = new UserInfo
            {
                UserName = User.Identity.Name
            };

            var manager = new ApplicationUserManager(new MySqlUserStore<ApplicationUser>());
            info.Roles = manager.GetRoles(User.Identity.GetUserId());

            return info;
        }

        [IdentityBasicAuthentication]
        [Authorize]
        public async Task<IHttpActionResult> Post([FromBody]RegisterUserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var manager = new ApplicationUserManager(new MySqlUserStore<ApplicationUser>());

            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email, PhoneNumber = model.PhoneNumber };

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
        [Route("api/users/SendPasswordEmail")]
        public async Task<IHttpActionResult> SendPasswordEmail(SendPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var manager = new ApplicationUserManager(new MySqlUserStore<ApplicationUser>());
            var user = await manager.FindByNameAsync(model.User.UserName);
            await manager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + model.Url + "\">here</a>");

            return Ok();
        }

        [HttpPost]
        [IdentityBasicAuthentication]
        [Route("api/users/SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var manager = new ApplicationUserManager(new MySqlUserStore<ApplicationUser>());
            IdentityResult result = await manager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);

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

        public IEnumerable<string> Roles { get; set; }
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
