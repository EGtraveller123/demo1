package com.example.demo.service;

import com.example.demo.bean.Yewubu;
import com.example.demo.dao.YewubuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YewubuService {

    @Autowired
    private YewubuMapper yewubuMapper;

    public List<Yewubu> selectByKuanhao(String kuanhao) {
        return yewubuMapper.selectByKuanhao(kuanhao);
    }

    public List<Yewubu> selectAll(){
        return yewubuMapper.selectAll();
    }
    public List<Yewubu> selectByKehu(String kehu){
        return yewubuMapper.selectByKehu(kehu);
    }

    public int insert(String kuanhao,String kehu,Integer ywbshuliang,String mianliao,String chriqi){
        Yewubu yewubu = new Yewubu();
        yewubu.setKuanhao(kuanhao);
        yewubu.setKehu(kehu);
        yewubu.setYwbshuliang(ywbshuliang);
        yewubu.setMianliao(mianliao);
        yewubu.setChriqi(chriqi);
        return yewubuMapper.insert(yewubu);
    }

    public int update(String kuanhao,String kehu,Integer ywbshuliang,String mianliao,String chriqi){
        Yewubu yewubu = new Yewubu();
        yewubu.setKuanhao(kuanhao);
        yewubu.setKehu(kehu);
        yewubu.setYwbshuliang(ywbshuliang);
        yewubu.setMianliao(mianliao);
        yewubu.setChriqi(chriqi);
        return yewubuMapper.update(yewubu);
    }

    public int delete(String kuanhao){
//        Yewubu yewubu = new Yewubu();
//        yewubu.setKuanhao(yewubu.getKuanhao());
        return yewubuMapper.delete(kuanhao);
    }
}
