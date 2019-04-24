package com.example.demo.controller;

import com.example.demo.bean.Houdaobu;
import com.example.demo.service.HoudaobuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hdb")
public class HoudaobuController {
    @Autowired
    private HoudaobuService houdaobuService;

    @RequestMapping(value = "/bykuanhao",method = RequestMethod.GET)
    public List<Houdaobu> selectByKuanhao(@RequestParam("kuanhao") String kuanhao){
        return houdaobuService.selectByKuanhao(kuanhao);
    }

    @RequestMapping(value = "/update",method = RequestMethod.GET)
    public int updateHoudaobu(@RequestParam("kuanhao") String kuanhao,
                      @RequestParam("hdbshuliang") Integer hdbshuliang){
        return houdaobuService.update(kuanhao,hdbshuliang);
    }

    @RequestMapping(value = "/insert",method = RequestMethod.GET)
    public int insertHoudaobu(@RequestParam("kuanhao") String kuanhao,
                              @RequestParam("hdbshuliang") Integer hdbshuliang){
        return houdaobuService.insert(kuanhao,hdbshuliang);
    }
}
