package com.example.demo.service;

import com.example.demo.bean.Houdaobu;
import com.example.demo.dao.HoudaobuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoudaobuService {
    @Autowired
    private HoudaobuMapper houdaobuMapper;

    public List<Houdaobu> selectByKuanhao(String kuanhao){
        return houdaobuMapper.selectByKuanhao(kuanhao);
    }

    public int update(String kuanhao,Integer hdbshuliang){
        Houdaobu houdaobu = new Houdaobu();
        houdaobu.setKuanhao(kuanhao);
        houdaobu.setHdbshuliang(hdbshuliang);
        return houdaobuMapper.update(houdaobu);
    }

    public int insert(String kuanhao,Integer hdbshuliang){
        Houdaobu houdaobu = new Houdaobu();
        houdaobu.setKuanhao(kuanhao);
        houdaobu.setHdbshuliang(hdbshuliang);
        return houdaobuMapper.insert(houdaobu);
    }
}
