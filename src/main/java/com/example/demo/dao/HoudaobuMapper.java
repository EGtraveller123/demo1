package com.example.demo.dao;

import com.example.demo.bean.Houdaobu;

import java.util.List;

public interface HoudaobuMapper {

    /**
     *
     * @param kuanhao
     * @return
     */
    List<Houdaobu> selectByKuanhao(String kuanhao);


    /**
     * 更新
     * @param houdaobu
     */
    int update(Houdaobu houdaobu);

    /**
     *
     * @param houdaobu
     * @return
     */
    int insert(Houdaobu houdaobu);
}