cmd_Release/obj.target/gzwebsj.node := g++ -o Release/obj.target/gzwebsj.node -shared -pthread -rdynamic -m64  -Wl,-soname=gzwebsj.node -Wl,--start-group Release/obj.target/gzwebsj/code/test.o Release/obj.target/node_modules/node-addon-api/nothing.a -Wl,--end-group 
