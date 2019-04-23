package com.example.demo.service;

import com.example.demo.bean.Yewubut;
import com.example.demo.dao.YewubutMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YewubutService {
    @Autowired
    private YewubutMapper yewubutMapper;

    public int insert(String kuanhao,String yanse,Integer xs,Integer s,Integer m,Integer l,Integer xl,Integer xxl,Integer xxxl){
        Yewubut yewubut = new Yewubut();
        yewubut.setKuanhao(kuanhao);
        yewubut.setYanse(yanse);
        yewubut.setXs(xs);
        yewubut.setS(s);
        yewubut.setM(m);
        yewubut.setL(l);
        yewubut.setXl(xl);
        yewubut.setXxl(xxl);
        yewubut.setXxxl(xxxl);
        return yewubutMapper.insert(yewubut);
    }

    public int delete(String kuanhao){
        return yewubutMapper.delete(kuanhao);
    }

    public List<Yewubut> selectByKuanhao(String kuanhao){
        return yewubutMapper.selectByKuanhao(kuanhao);
    }
}
