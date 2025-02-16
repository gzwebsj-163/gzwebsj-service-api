#include <iostream>
#include <sstream>
#include <stdio.h>
#include "node.h"
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
namespace pingtou
{
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;

    char *Error(char *msg)
    {
        char *m = ">>>>error";
        if (msg != NULL)
        {
            fprintf(stderr, msg);
            return strcat(msg, m);
        }
        fprintf(stderr, m);
        return m;
    }

    char *Success(char *msg)
    {
        char *m = ">>>>success";
        if (msg != NULL)
        {
            fprintf(stdout, msg);
            return strcat(msg, m);
        }
        return m;
    }

    char *PtScok_Handle()
    {
        int sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_IP);
        if (sock == -1)
        {
            Error("Error in Sock");
            return "-1";
        }
        int sockfd;
        struct sockaddr_in sockaddr, client_address;
        char tmp[10] = {0};
        //_itoa(sock, tmp, 10);
        return tmp;
    }

    char *PtGetIp()
    {
        int st = 0;
        int i = 0;
        char buf[128] = {0};
        char *local_ip = NULL;
        if (gethostname(buf, sizeof(buf)) == 0)
        {
            struct hostent *tmp;
            tmp = gethostbyname(buf);
            if (tmp)
            {
                for (int i = 0; tmp->h_addr_list[i]; i++){
                    local_ip = NULL;
                    local_ip = inet_ntoa(*(struct in_addr*)(tmp->h_addr_list[i]));
                    if(local_ip){
                        char str_ip[10] = {0};
                        strcpy(str_ip,local_ip);
                        st = 0;
                        if(strcmp("127.0.0.1",str_ip)){
                            break;
                        }
                    }
                }
            }
        }
        return local_ip;
    }

    void Socket_Handle_Method(const v8::FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, PtScok_Handle()).ToLocalChecked());
    }

    void PtGetIp_Method(const v8::FunctionCallbackInfo<Value> &args){
        Isolate *isolate = args.GetIsolate();
        args.GetReturnValue().Set(String::NewFromUtf8(isolate,PtGetIp()).ToLocalChecked());
    }

    void Intn(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "PtSockHandle", Socket_Handle_Method);
        NODE_SET_METHOD(exports, "PtGetIp", PtGetIp_Method);
    }

    NODE_MODULE(NODE_GYP_MODULE_NAME, Intn);
}
