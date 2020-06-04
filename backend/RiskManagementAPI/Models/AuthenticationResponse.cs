using System;

namespace RiskManagementAPI.Models
{
    public class AuthenticationResponse
    {
        public AuthenticationResponse(string username, string password, string token, bool success)
        {
            Username = username;
            Password = password;
            Token = token;
            Success = success;
        }

        public string Username { get; set; }
     
        public string Password { get; set; }
        
        public string Token { get; set; }
        
        public Boolean Success { get; set; }
    }
}