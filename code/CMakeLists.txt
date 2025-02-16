cmake_minimum_required(VERSION 3.10)

project(gzwebsj)

set(CMAKE_CXX_STANDARD 17)

set(SOURCE_FILES main.cpp)

set(CMAKE_PREFIX_PATH "/usr/lib/x86_64-linux-gnu/")

set(CURL_INCLUDE_DIRS "/usr/lib/x86_64-linux-gnu/")

find_package(CURL REQUIRED)

include_directories(/usr/local/include)

include_directories(${CURL_INCLUDE_DIRS})

link_directories(/usr/local/lib)

add_executable(gzwebsj ${SOURCE_FILES})

link_directories(/usr/lib/x86_64-linux-gnu ${CURL_LIBRARIES})

target_link_libraries(gzwebsj ${CURL_LIBRARIES})
