using System;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Xunit;

namespace RiskManagementAPI.Tests
{
    public class AuthenticationTest : IClassFixture<WebApplicationFactory<RiskManagementAPI.Startup>>
    {
        public HttpClient Client { get; }

        public AuthenticationTest(WebApplicationFactory<RiskManagementAPI.Startup> fixture)
        {
            Client = fixture.CreateClient();
        }

        public class AResp
        {
            public string Username;
            public string Password;
            public string Token;
            public bool Success;
        }

        [Fact]
        public async Task AuthenticateUser_Success()
        {
            
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("http://localhost/User/Authenticate"),
                Content = new StringContent("{ \"Username\": \"Jan\",\"Password\": \"pwd\" }", Encoding.UTF8, "application/json")
            };

            var response = await Client.SendAsync(request).ConfigureAwait(false);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            
            var jsonResponse = JsonConvert.DeserializeObject<AResp>(await response.Content.ReadAsStringAsync());
            jsonResponse.Token.Should().NotBeEmpty();
            jsonResponse.Success.Should().BeTrue();
        }
        
        [Fact]
        public async Task AuthenticateUser_Failure()
        {
            
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("http://localhost/User/Authenticate"),
                Content = new StringContent("{ \"Username\": \"\",\"Password\": \"\" }", Encoding.UTF8, "application/json")
            };

            var response = await Client.SendAsync(request).ConfigureAwait(false);
            response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
            
            var jsonResponse = JsonConvert.DeserializeObject<AResp>(await response.Content.ReadAsStringAsync());
            jsonResponse.Token.Should().BeEmpty();
            jsonResponse.Success.Should().BeFalse();
        }
    }
}
