package com.example.demo.service;

import com.example.demo.bean.Houdaobut;
import com.example.demo.dao.HoudaobutMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoudaobutService {
    @Autowired
    private HoudaobutMapper houdaobutMapper;

    public List<Houdaobut> selectByKuanhao(String kuanhao){
        return houdaobutMapper.selectByKuanhao(kuanhao);
    }

    public int insert(String kuanhao,String yanse,Integer xs,Integer s,Integer m,Integer l,Integer xl,Integer xxl,Integer xxxl){
        Houdaobut houdaobut = new Houdaobut();
        houdaobut.setKuanhao(kuanhao);
        houdaobut.setYanse(yanse);
        houdaobut.setXs(xs);
        houdaobut.setS(s);
        houdaobut.setM(m);
        houdaobut.setL(l);
        houdaobut.setXl(xl);
        houdaobut.setXxl(xxl);
        houdaobut.setXxxl(xxxl);
        return houdaobutMapper.insert(houdaobut);
    }
}
