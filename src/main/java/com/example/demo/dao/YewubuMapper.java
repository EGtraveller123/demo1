package com.example.demo.dao;


import com.example.demo.bean.Yewubu;

import java.util.List;

public interface YewubuMapper {

    /**
     * 选择所有的 Yewubu
     * @return 返回所有的 Yewubu
     */
    List<Yewubu> selectAll();


    /**
     * 选择指定 kuanhao
     * @param kuanhao
     * @return 返回指定KUANHAO对应的Yewubu信息
     */
    List<Yewubu> selectByKuanhao(String kuanhao);


    /**
     * 选择指定 kehu
     * @param kehu 客户的名称
     * @return 返回指定CustomerName对应的Customer
     */
    List<Yewubu> selectByKehu(String kehu);


    /**
     * 插入 Yewubu 到数据库中
     * 不需要指定主键，采用的数据库 AI 方式
     * @param yewubu Yewubu 实例
     */
    int insert(Yewubu yewubu);



    /**
     * 更新 Yewubu 到数据库
     * 该 Yewubu 必须已经存在于数据库中，即已经分配主键，否则将更新失败
     * @param yewubu Yewubu 实例
     */
    int update(Yewubu yewubu);


    /**
     * 根据款号删除客户信息
     *
     * @param kuanhao 客户ID
     */
    int delete(String kuanhao);


}
