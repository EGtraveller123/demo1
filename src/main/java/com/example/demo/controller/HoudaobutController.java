package com.example.demo.controller;

import com.example.demo.bean.Houdaobut;
import com.example.demo.service.HoudaobutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hdbt")
public class HoudaobutController {
    @Autowired
    private HoudaobutService houdaobutService;

    @RequestMapping(value = "/bykuanhao",method = RequestMethod.GET)
    public List<Houdaobut> selectByKuanhao(@RequestParam("kuanhao") String kuanhao){
        return houdaobutService.selectByKuanhao(kuanhao);
    }

    @RequestMapping(value = "/insert",method = RequestMethod.GET)
    public int insert(@RequestParam("kuanhao") String kuanhao,
                      @RequestParam("yanse")String yanse,
                      @RequestParam("xs")Integer xs,
                      @RequestParam("s")Integer s,
                      @RequestParam("m")Integer m,
                      @RequestParam("l")Integer l,
                      @RequestParam("xl")Integer xl,
                      @RequestParam("xxl")Integer xxl,
                      @RequestParam("xxxl")Integer xxxl){
        return houdaobutService.insert(kuanhao,yanse,xs,s,m,l,xl,xxl,xxxl);
    }
}
