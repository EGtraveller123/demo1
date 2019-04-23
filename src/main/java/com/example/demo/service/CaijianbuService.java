package com.example.demo.service;

import com.example.demo.bean.Caijianbu;
import com.example.demo.dao.CaijianbuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaijianbuService {
    @Autowired
    private CaijianbuMapper caijianbuMapper;

    public List<Caijianbu> selectByKuanhao(String kuanhao){
        return caijianbuMapper.selectByKuanhao(kuanhao);
    }

    public int insert(String kuanhao,Integer cjbshuliang){
        Caijianbu caijianbu = new Caijianbu();
        caijianbu.setKuanhao(kuanhao);
        caijianbu.setCjbshuliang(cjbshuliang);
        return caijianbuMapper.insert(caijianbu);
    }
}
