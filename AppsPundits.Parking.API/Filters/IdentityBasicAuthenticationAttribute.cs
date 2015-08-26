using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;

namespace AppPundits.Parking.Filters
{
    public class IdentityBasicAuthenticationAttribute : BasicAuthenticationAttribute
    {
        protected override async Task<IPrincipal> AuthenticateAsync(string userName, string password, CancellationToken cancellationToken)
        {
            UserManager<IdentityUser> userManager = UsersDbContext.GetUserManager();

            cancellationToken.ThrowIfCancellationRequested(); // Unfortunately, UserManager doesn't support CancellationTokens.
            IdentityUser user = await userManager.FindAsync(userName, password);

            if (user == null)
            {
                // No user with userName/password exists.
                return null;
            }

            // Create a ClaimsIdentity with all the claims for this user.
            cancellationToken.ThrowIfCancellationRequested(); // Unfortunately, IClaimsIdenityFactory doesn't support CancellationTokens.
            ClaimsIdentity identity = await userManager.ClaimsIdentityFactory.CreateAsync(userManager, user, "Basic");
            return new ClaimsPrincipal(identity);
        }
    }

    public class UsersDbContext : IdentityDbContext<IdentityUser>
    {
        private static UserManager<IdentityUser> manager;

        public UsersDbContext() : base(nameOrConnectionString: "DefaultConnection")
        {
        }

        public static UserManager<IdentityUser> GetUserManager()
        {
            if (manager == null)
                manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(new UsersDbContext()));
            return manager;
        }

        //private class Initializer : CreateDatabaseIfNotExists<UsersDbContext>
        //{
        //    protected override void Seed(UsersDbContext context)
        //    {
        //        IdentityRole role = context.Roles.Add(new IdentityRole("User"));

        //        IdentityUser user = new IdentityUser("SampleUser");
        //        user.Roles.Add(new IdentityUserRole() { RoleId = role.Id, UserId = user.Id });
        //        user.Claims.Add(new IdentityUserClaim
        //        {
        //            ClaimType = "hasRegistered",
        //            ClaimValue = "true"
        //        });

        //        user.PasswordHash = new PasswordHasher().HashPassword("secret");
        //        context.Users.Add(user);
        //        context.SaveChanges();
        //        base.Seed(context);
        //    }
        //}
    }
}
