package com.example.demo.dao;

import com.example.demo.bean.Yewubut;

import java.util.List;

public interface YewubutMapper {
    /**
     * @param yewubut
     */
    //添加
    int insert(Yewubut yewubut);
    /**
     * @param kuanhao
     */
    //删除
    int delete(String kuanhao);
    /**
     * @param kuanhao
     */
    //查询
    List<Yewubut> selectByKuanhao(String kuanhao);
}
