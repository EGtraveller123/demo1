package com.example.demo.bean;

public class Caijianbu {
    private Integer id;
    private String kuanhao;
    private Integer cjbshuliang;

    @Override
    public String toString() {
        return "Caijianbu{" +
                "id=" + id +
                ", kuanhao='" + kuanhao + '\'' +
                ", cjbshuliang=" + cjbshuliang +
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

    public Integer getCjbshuliang() {
        return cjbshuliang;
    }

    public void setCjbshuliang(Integer cjbshuliang) {
        this.cjbshuliang = cjbshuliang;
    }
}
