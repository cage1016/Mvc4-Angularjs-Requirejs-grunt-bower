using System.Web;
using System.Web.Mvc;

namespace Mvc4_Angularjs_Requirejs_grunt_bower_intranet
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}