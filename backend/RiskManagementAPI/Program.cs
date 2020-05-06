using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace RiskManagementAPI
{
    public class Program
    {
        public static String DatabaseServerPort = "5432";
        public static String DatabaseServerAddress = "172.17.0.2";

        public static String DatabaseContextConnectionString =
            "Server=172.17.0.2;Port=5432;User Id=postgres;Password=pwd;";

        public static void Main(string[] args)
        {
            if (args.Length > 2 && args[0].Length > 0 && args[1].Length > 0)
            {
                PrepareConnectionString(args);
            }
            else
            {
                throw new MissingFieldException("You need to provide database address and port in arguments!");
            }

            CreateHostBuilder(args).Build().Run();
        }

        private static void PrepareConnectionString(string[] args)
        {
            DatabaseServerPort = args[0];
            DatabaseServerAddress = args[1];
            DatabaseContextConnectionString = "Server=" + DatabaseServerAddress + ";Port=" + DatabaseServerPort +
                                                 ";User Id=postgres;Password=pwd;";
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}