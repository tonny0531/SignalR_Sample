using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Hubs
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All
                .SendAsync("ReceiveMessage", user, message); //這裡的字串會牽扯到前端監聽的事件
        }
    }
}
