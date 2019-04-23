package com.example.demo.dao;

import com.example.demo.bean.Houdaobut;

import java.util.List;

public interface HoudaobutMapper {
    /**
     * 添加houdaobut信息
     *
     * @param houdaobut
     */
    int insert(Houdaobut houdaobut);

    /**
     * 选择指定 款号
     * @param kuanhao
     * @return 返回指定对应的所有信息
     */
    List<Houdaobut> selectByKuanhao(String kuanhao);
}