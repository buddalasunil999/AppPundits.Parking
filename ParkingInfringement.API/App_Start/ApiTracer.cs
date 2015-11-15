using log4net;
using System;
using System.Net.Http;
using System.Web.Http.Tracing;

namespace ParkingInfringement.API
{
    public class ApiTracer : ITraceWriter
    {
        private static readonly ILog log = log4net.LogManager.GetLogger(typeof(ApiTracer));
        public void Trace(HttpRequestMessage request, string category, TraceLevel level, Action<TraceRecord> traceAction)
        {
            TraceRecord rec = new TraceRecord(request, category, level);
            traceAction(rec);
            WriteLog(rec);
        }

        public void WriteLog(TraceRecord rec)
        {
            String strLog = string.Format("{0};{1};{2};{3}", rec.Category, rec.Operator, rec.Operation, rec.Message);
            log.Info(strLog);
        }
    }
}
