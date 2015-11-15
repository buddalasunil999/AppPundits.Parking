using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;

namespace ParkingInfringement.API
{
    public class GlobalExceptionLogger
    : ExceptionLogger
    {
        private static readonly ILog Log4Net = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public override void Log(ExceptionLoggerContext context)
        {
            Log4Net.Error(string.Format("Unhandled exception thrown in {0} for request {1}: {2}",
                                        context.Request.Method, context.Request.RequestUri, context.Exception));
        }
    }
}
