package com.example.demo.dao;

import com.example.demo.bean.Caijianbu;

import java.util.List;

public interface CaijianbuMapper {

    /**
     * @param kuanhao
     * @return
     */
    List<Caijianbu> selectByKuanhao(String kuanhao);

    /**
     * 更新
     * @param caijianbu
     */
    int update(Caijianbu caijianbu);

    /**
     * @param caijianbu
     */
    int insert(Caijianbu caijianbu);
}