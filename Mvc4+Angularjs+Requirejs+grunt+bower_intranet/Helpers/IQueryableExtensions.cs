using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Mvc4_Angularjs_Requirejs_grunt_bower_intranet.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> OrderBy<T>(this IQueryable<T> items, string propertyName)
        {
            return ExecuteOrderBy<T>(items, propertyName, "OrderBy");
        }

        public static IQueryable<T> OrderByDescending<T>(this IQueryable<T> items, string propertyName)
        {
            return ExecuteOrderBy<T>(items, propertyName, "OrderByDescending");
        }

        public static IQueryable<T> ExecuteOrderBy<T>(this IQueryable<T> items, string propertyName, string exp)
        {
            var typeOfT = typeof(T);
            var parameter = Expression.Parameter(typeOfT, "parameter");
            var propertyType = typeOfT.GetProperty(propertyName).PropertyType;
            var propertyAccess = Expression.PropertyOrField(parameter, propertyName);
            var orderExpression = Expression.Lambda(propertyAccess, parameter);

            var expression = Expression.Call(typeof(Queryable), exp, new Type[] { typeOfT, propertyType }, items.Expression, Expression.Quote(orderExpression));
            return items.Provider.CreateQuery<T>(expression);
        }

    }
}