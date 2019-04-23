package com.example.demo.service;

import com.example.demo.bean.Caijianbut;
import com.example.demo.dao.CaijianbutMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaijianbutService {
    @Autowired
    private CaijianbutMapper caijianbutMapper;

    public List<Caijianbut> selectByKuanhao(String kuanhao){
        return caijianbutMapper.selectByKuanhao(kuanhao);
    }

    public int insert(String kuanhao,String yanse,Integer xs,Integer s,Integer m,Integer l,Integer xl,Integer xxl,Integer xxxl){
        Caijianbut caijianbut = new Caijianbut();
        caijianbut.setKuanhao(kuanhao);
        caijianbut.setYanse(yanse);
        caijianbut.setXs(xs);
        caijianbut.setS(s);
        caijianbut.setM(m);
        caijianbut.setL(l);
        caijianbut.setXl(xl);
        caijianbut.setXxl(xxl);
        caijianbut.setXxxl(xxxl);
        return caijianbutMapper.insert(caijianbut);
    }
}

