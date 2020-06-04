using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.CodeAnalysis;
using Newtonsoft.Json;
using Xunit;

namespace RiskManagementAPI.Tests
{
    public class TokenFixture
    {
        private string _token;

        public TokenFixture()
        {
            var client = new WebApplicationFactory<RiskManagementAPI.Startup>().CreateClient();
            _token = GetToken(client).Result;
            Console.WriteLine(_token);
        }

        public string GetToken()
        {
            return _token;
        }

        private static async Task<string> GetToken(HttpClient client)
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("http://localhost/User/Authenticate"),
                Content = new StringContent("{ \"Username\": \"Jan\",\"Password\": \"pwd\" }", Encoding.UTF8,
                    "application/json")
            };

            var response = await client.SendAsync(request).ConfigureAwait(false);
            var jsonResponse =
                JsonConvert.DeserializeObject<AuthenticationTest.AResp>(await response.Content.ReadAsStringAsync());
            return jsonResponse.Token;
        }
    }

    public class ProjectTest : IClassFixture<WebApplicationFactory<RiskManagementAPI.Startup>>,
        IClassFixture<TokenFixture>
    {
        public HttpClient Client { get; }

        public ProjectTest(WebApplicationFactory<RiskManagementAPI.Startup> fixture, TokenFixture tokenFixture)
        {
            Client = fixture.CreateClient();
            Client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", tokenFixture.GetToken());
        }

        [Fact]
        public async Task GetProjects_Success()
        {
            var response = await Client.GetAsync("/Project");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var jsonResponse = JsonConvert.DeserializeObject(await response.Content.ReadAsStringAsync());
            jsonResponse.Should().NotBe("");
            Console.WriteLine(jsonResponse);
        }

        [Fact]
        public async Task Insert_Project()
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("http://localhost/Project/Create"),
                Content = new StringContent(
                    "{ \"Name\": \"Some new project\",\"Description\": \"Description of some new project\" }",
                    Encoding.UTF8, "application/json")
            };

            var response = await Client.SendAsync(request).ConfigureAwait(false);
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var jsonResponse = JsonConvert.DeserializeObject<List<RiskManagementAPI.Models.Project>>(await response.Content.ReadAsStringAsync());
            Console.WriteLine(jsonResponse);
        }
    }
}