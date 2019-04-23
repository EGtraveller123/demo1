package com.example.demo.bean;

public class Houdaobu {
    private Integer id;
    private String kuanhao;
    private Integer hdbshuliang;

    @Override
    public String toString() {
        return "Houdaobu{" +
                "id=" + id +
                ", kuanhao='" + kuanhao + '\'' +
                ", hdbshuliang=" + hdbshuliang +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKuanhao() {
        return kuanhao;
    }

    public void setKuanhao(String kuanhao) {
        this.kuanhao = kuanhao;
    }

    public Integer getHdbshuliang() {
        return hdbshuliang;
    }

    public void setHdbshuliang(Integer hdbshuliang) {
        this.hdbshuliang = hdbshuliang;
    }
}
