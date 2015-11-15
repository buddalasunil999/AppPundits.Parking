using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Authentication.Startup))]
namespace Authentication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
