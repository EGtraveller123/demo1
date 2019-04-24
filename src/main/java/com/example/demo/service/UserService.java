package com.example.demo.service;

import com.example.demo.bean.User;
import com.example.demo.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

//    public int insert(String username,String userpwd){
//        User user = new User();
//        user.setUsername(username);
//        user.setUserpwd(userpwd);
//        return userMapper.insert(user);
//    }

    public User login(User user){
        user = this.userMapper.login(user.getUsername(),user.getUserpwd());
        return user;
    }
}
