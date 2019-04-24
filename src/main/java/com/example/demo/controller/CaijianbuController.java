package com.example.demo.controller;

import com.example.demo.bean.Caijianbu;
import com.example.demo.service.CaijianbuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/cjb")
public class CaijianbuController {
    @Autowired
    private CaijianbuService caijianbuService;

    @RequestMapping(value = "/bykuanhao")
    public List<Caijianbu> selectByKuanhao(@RequestParam("kuanhao") String kuanhao) {
        return caijianbuService.selectByKuanhao(kuanhao);
    }

    @RequestMapping(value = "/update", method = RequestMethod.GET)
    public int updateCaijianbu(@RequestParam("cjbshuliang") Integer cjbshuliang,
                               @RequestParam("kuanhao") String kuanhao) {
//        int update = caijianbuService.update(kuanhao, cjbshuliang);
//        if(update>1){
//            return 1;
//        }else {
//            return 0;
//        }
//
//    }
        return caijianbuService.update(cjbshuliang,kuanhao);
    }

    @RequestMapping(value = "/insert",method = RequestMethod.GET)
    public int insertCaijian(@RequestParam("kuanhao") String kuanhao,
                             @RequestParam("cjbshuliang") Integer cjbshuliang){
        return caijianbuService.insert(kuanhao,cjbshuliang);
    }
}
