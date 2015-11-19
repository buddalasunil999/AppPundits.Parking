using Microsoft.AspNet.Identity;
using MySql.AspNet.Identity;
using ParkingInfringement.API.Models;
using System;
using System.ComponentModel;
using System.Configuration;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;

namespace ParkingInfringement.API.Filters
{
    public class IdentityBasicAuthenticationAttribute : BasicAuthenticationAttribute
    {
        protected override async Task<IPrincipal> AuthenticateAsync(string userName, string password, CancellationToken cancellationToken)
        {
            var userManager = new ApplicationUserManager(new MySqlUserStore<ApplicationUser>());

            cancellationToken.ThrowIfCancellationRequested(); // Unfortunately, UserManager doesn't support CancellationTokens.
            ApplicationUser user = await userManager.FindAsync(userName, password);

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
    
    public class EmailService : IIdentityMessageService
    {
        static bool mailSent = false;

        public async Task SendAsync(IdentityMessage message)
        {
            await configSendGridasync(message);
        }

        // Use NuGet to install SendGrid (Basic C# client lib) 
        private async Task configSendGridasync(IdentityMessage data)
        {
            SmtpClient client = new SmtpClient(ConfigurationManager.AppSettings["smtphost"]);
            // Specify the e-mail sender. 
            // Create a mailing address that includes a UTF8 character 
            // in the display name.
            MailAddress from = new MailAddress(ConfigurationManager.AppSettings["fromaddress"], ConfigurationManager.AppSettings["fromdisplayname"],
            System.Text.Encoding.UTF8);
            // Set destinations for the e-mail message.
            MailAddress to = new MailAddress(data.Destination);
            // Specify the message content.
            MailMessage message = new MailMessage(from, to);
            message.Body = data.Body;
            // Include some non-ASCII characters in body and subject. 
            string someArrows = new string(new char[] { '\u2190', '\u2191', '\u2192', '\u2193' });
            message.Body += Environment.NewLine + someArrows;
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.Subject = data.Subject + someArrows;
            message.SubjectEncoding = System.Text.Encoding.UTF8;
            // Set the method that is called back when the send operation ends.
            client.SendCompleted += new
            SendCompletedEventHandler(SendCompletedCallback);
            // The userState can be any object that allows your callback  
            // method to identify this send operation. 
            // For this example, the userToken is a string constant. 
            string userState = "test message1";
            client.SendAsync(message, userState);
        }

        private static void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        {
            // Get the unique identifier for this asynchronous operation.
            String token = (string)e.UserState;

            if (!e.Cancelled && e.Error == null)
            {
                mailSent = true;
            }
        }
    }
    
    public class SmsService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}
