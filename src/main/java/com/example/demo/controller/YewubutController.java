package com.example.demo.controller;

import com.example.demo.bean.Yewubut;
import com.example.demo.service.YewubutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ywbt")
public class YewubutController {
    @Autowired
    private YewubutService yewubutService;

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
        return yewubutService.insert(kuanhao,yanse,xs,s,m,l,xl,xxl,xxxl);
    }

    @RequestMapping(value = "/delete",method = RequestMethod.GET)
    public int delete(@RequestParam("kuanhao")String kuanhao){
        return yewubutService.delete(kuanhao);
    }

    @RequestMapping(value = "/select",method = RequestMethod.GET)
    public List<Yewubut> selectByKuanhao(@RequestParam("kuanhao") String kuanhao){
        return yewubutService.selectByKuanhao(kuanhao);
    }
}
