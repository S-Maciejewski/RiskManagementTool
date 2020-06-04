using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace RiskManagementAPI
{
    public class Program
    {
        public static String DatabaseServerPort = "5432";
        public static String DatabaseServerAddress = "localhost";

        public static String DatabaseContextConnectionString =
            "Server=localhost;Port=5432;User Id=postgres;Password=pwd;";

        public static void Main(string[] args)
        {
            if (args.Length >= 2 && args[0].Length > 0 && args[1].Length > 0)
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
            DatabaseServerAddress = args[0];
            DatabaseServerPort = args[1];
            DatabaseContextConnectionString = "Server=" + DatabaseServerAddress + ";Port=" + DatabaseServerPort +
                                                 ";User Id=postgres;Password=pwd;";
            Console.WriteLine(DatabaseContextConnectionString);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}