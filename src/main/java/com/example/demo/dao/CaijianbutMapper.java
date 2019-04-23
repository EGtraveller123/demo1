package com.example.demo.dao;

import com.example.demo.bean.Caijianbut;

import java.util.List;

public interface CaijianbutMapper {
    /**
     * 添加caijianbut信息
     * @param caijianbut
     */
    int insert(Caijianbut caijianbut);

    /**
     * 选择指定 款号
     * @param kuanhao
     * @return 返回指定对应的所有信息
     */
    List<Caijianbut> selectByKuanhao(String kuanhao);
}