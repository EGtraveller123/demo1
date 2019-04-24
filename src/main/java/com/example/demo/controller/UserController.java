package com.example.demo.controller;

import com.example.demo.bean.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/login")
public class UserController {
    @Autowired
    private UserService userService;

//    @RequestMapping(value = "/registerUser",method = RequestMethod.GET)
//    public int insert(@RequestParam("username") String username,
//                      @RequestParam("userpwd") String userpwd){
//        return userService.insert(username,userpwd);
//    }

    @RequestMapping(value = "/login")
    public ModelAndView login(User user, HttpServletRequest request, HttpSession session){
        ModelAndView modelAndView = new ModelAndView();
        String username = request.getParameter("username");
        String userpwd = request.getParameter("userpwd");
        user.setUsername(username);
        user.setUserpwd(userpwd);
        user = this.userService.login(user);
        if(user!=null){
            session.setAttribute("user",user);
            //这里是主页面
            modelAndView.setViewName("mjfs.html");
            return modelAndView;
        }else{
            session.setAttribute("error","账号或密码错误!请重新输入");
        }
        modelAndView.setViewName("login.html");
        return modelAndView;
    }
}
