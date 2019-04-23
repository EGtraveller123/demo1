package com.example.demo.controller;

import com.example.demo.bean.Yewubu;
import com.example.demo.service.YewubuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ywb")
public class YewubuController{

    @Autowired
    private YewubuService yewubuService;

    @RequestMapping(value = "/bykuanhao",method = RequestMethod.GET)
    public List<Yewubu> selectByKuanhao(@RequestParam("kuanhao") String kuanhao) {
        return yewubuService.selectByKuanhao(kuanhao);
    }

    @RequestMapping(value = "/all",method = RequestMethod.GET)
    public List<Yewubu> selectAll(){
        return yewubuService.selectAll();
    }

    @RequestMapping(value = "/bykehu",method = RequestMethod.GET)
    public List<Yewubu> selectByKehu(@RequestParam("kehu") String kehu){
        return yewubuService.selectByKehu(kehu);
    }

    @RequestMapping(value = "/insert",method = RequestMethod.GET)
    public int insert(@RequestParam("kuanhao") String kuanhao,
                      @RequestParam("kehu")String kehu,
                      @RequestParam("ywbshuliang")Integer ywbshuliang,
                      @RequestParam("mianliao")String mianliao,
                      @RequestParam("chriqi")String chriqi){
        return yewubuService.insert(kuanhao,kehu,ywbshuliang,mianliao,chriqi);
    }
    @RequestMapping(value = "/update",method = RequestMethod.GET)
    public int update(@RequestParam("kuanhao") String kuanhao,
                      @RequestParam("kehu")String kehu,
                      @RequestParam("ywbshuliang")Integer ywbshuliang,
                      @RequestParam("mianliao")String mianliao,
                      @RequestParam("chriqi")String chriqi){
        return yewubuService.update(kuanhao,kehu,ywbshuliang,mianliao,chriqi);
    }

    @RequestMapping(value = "/delete",method = RequestMethod.GET)
    public int delete(@RequestParam("kuanhao")String kuanhao){
        return yewubuService.delete(kuanhao);
    }

}
