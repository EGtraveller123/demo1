package com.example.demo.dao;


import com.example.demo.bean.User;

public interface UserMapper {
//    //注册
//    int insert(User user);

    //登录
    User login(String username,String userpwd);
}
