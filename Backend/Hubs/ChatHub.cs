using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Hubs
{
    public class ChatHub: Hub<MyHubClient>
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.ReceiveMessage(user,message);
                //.SendAsync("ReceiveMessage", user, message); //這裡的字串會牽扯到前端監聽的事件
        }

        public async Task JoinGroup(string user, string GroupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, GroupId);
            await SendToGroup(GroupId, $"{user} Join the Group");
        }

        public async Task SendToGroup(string GroupId, string msg)
        {
            await Clients.Group(GroupId).GetMsg(msg);
                //.SendAsync("GetMsg", msg);
        }
    }

    public interface MyHubClient
    {
        Task ReceiveMessage(string user,string msg);
        Task GetMsg(string msg);
    }
}
