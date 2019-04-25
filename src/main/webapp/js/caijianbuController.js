/**
 * Created by DELL on 2019/4/25.
 */
var search_type_goods = "none";
var search_keyWord = "";
var selectID;

$(function() {
    optionAction();
    searchAction();
    goodsListInit();
    bootstrapValidatorInit();
    addGoodsAction();
    editGoodsAction();
    deleteGoodsAction();
    importGoodsAction();
    exportGoodsAction()
})

// 下拉框選擇動作
function optionAction() {
    $(".dropOption").click(function() {
        var type = $(this).text();
        $("#search_input").val("");
        if (type == "所有") {
            $("#search_input").attr("readOnly", "true");
            search_type_goods = "searchAll";
        } else if (type == "货物ID") {
            $("#search_input").removeAttr("readOnly");
            search_type_goods = "searchByID";
        } else if (type == "货物名称") {
            $("#search_input").removeAttr("readOnly");
            search_type_goods = "searchByName";
        } else {
            $("#search_input").removeAttr("readOnly");
        }

        $("#search_type").text(type);
        $("#search_input").attr("placeholder", type);
    })
}

// 搜索动作
function searchAction() {
    $('#search_button').click(function() {
        search_keyWord = $('#search_input').val();
        tableRefresh();
    })
}

// 分页查询参数
function queryParams(params) {
    var temp = {
        limit : params.limit,
        offset : params.offset,
        searchType : search_type_goods,
        keyWord : search_keyWord
    }
    return temp;
}

// 表格初始化
function goodsListInit() {
    $('#goodsList')
        .bootstrapTable(
            {
                columns : [
                    {
                        field : 'id',
                        title : '货物ID'
                        //sortable: true
                    },
                    {
                        field : 'name',
                        title : '货物名称'
                    },
                    {
                        field : 'type',
                        title : '货物类型'
                    },
                    {
                        field : 'size',
                        title : '货物尺寸'
                    },
                    {
                        field : 'value',
                        title : '货物价值',
                    },
                    {
                        field : 'operation',
                        title : '操作',
                        formatter : function(value, row, index) {
                            var s = '<button class="btn btn-info btn-sm edit"><span>编辑</span></button>';
                            var d = '<button class="btn btn-danger btn-sm delete"><span>删除</span></button>';
                            var fun = '';
                            return s + ' ' + d;
                        },
                        events : {
                            // 操作列中编辑按钮的动作
                            'click .edit' : function(e, value,
                                                     row, index) {
                                selectID = row.id;
                                rowEditOperation(row);
                            },
                            'click .delete' : function(e,
                                                       value, row, index) {
                                selectID = row.id;
                                $('#deleteWarning_modal').modal(
                                    'show');
                            }
                        }
                    } ],
                url : 'goodsManage/getGoodsList',
                onLoadError:function(status){
                    handleAjaxError(status);
                },
                method : 'GET',
                queryParams : queryParams,
                sidePagination : "server",
                dataType : 'json',
                pagination : true,
                pageNumber : 1,
                pageSize : 5,
                pageList : [ 5, 10, 25, 50, 100 ],
                clickToSelect : true
            });
}

// 表格刷新
function tableRefresh() {
    $('#goodsList').bootstrapTable('refresh', {
        query : {}
    });
}

// 行编辑操作
function rowEditOperation(row) {
    $('#edit_modal').modal("show");

    // load info
    $('#goods_form_edit').bootstrapValidator("resetForm", true);
    $('#goods_name_edit').val(row.name);
    $('#goods_type_edit').val(row.type);
    $('#goods_size_edit').val(row.size);
    $('#goods_value_edit').val(row.value);
}

// 添加供应商模态框数据校验
function bootstrapValidatorInit() {
    $("#goods_form,#goods_form_edit").bootstrapValidator({
        message : 'This is not valid',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        excluded : [ ':disabled' ],
        fields : {
            goods_name : {
                validators : {
                    notEmpty : {
                        message : '货物名称不能为空'
                    }
                }
            },
            goods_value : {
                validators : {
                    notEmpty : {
                        message : '货物价值不能为空'
                    }
                }
            }
        }
    })
}

// 编辑货物信息
function editGoodsAction() {
    $('#edit_modal_submit').click(
        function() {
            $('#goods_form_edit').data('bootstrapValidator')
                .validate();
            if (!$('#goods_form_edit').data('bootstrapValidator')
                    .isValid()) {
                return;
            }

            var data = {
                id : selectID,
                name : $('#goods_name_edit').val(),
                type : $('#goods_type_edit').val(),
                size : $('#goods_size_edit').val(),
                value : $('#goods_value_edit').val(),
            }

            // ajax
            $.ajax({
                type : "POST",
                url : 'goodsManage/updateGoods',
                dataType : "json",
                contentType : "application/json",
                data : JSON.stringify(data),
                success : function(response) {
                    $('#edit_modal').modal("hide");
                    var type;
                    var msg;
                    var append = '';
                    if (response.result == "success") {
                        type = "success";
                        msg = "货物信息更新成功";
                    } else if (resposne == "error") {
                        type = "error";
                        msg = "货物信息更新失败"
                    }
                    showMsg(type, msg, append);
                    tableRefresh();
                },
                error : function(xhr, textStatus, errorThrow) {
                    $('#edit_modal').modal("hide");
                    // handler error
                    handleAjaxError(xhr.status);
                }
            });
        });
}

// 刪除货物信息
function deleteGoodsAction(){
    $('#delete_confirm').click(function(){
        var data = {
            "goodsID" : selectID
        }

        // ajax
        $.ajax({
            type : "GET",
            url : "goodsManage/deleteGoods",
            dataType : "json",
            contentType : "application/json",
            data : data,
            success : function(response){
                $('#deleteWarning_modal').modal("hide");
                var type;
                var msg;
                var append = '';
                if(response.result == "success"){
                    type = "success";
                    msg = "货物信息删除成功";
                }else{
                    type = "error";
                    msg = "货物信息删除失败";
                }
                showMsg(type, msg, append);
                tableRefresh();
            },error : function(xhr, textStatus, errorThrow){
                $('#deleteWarning_modal').modal("hide");
                // handler error
                handleAjaxError(xhr.status);
            }
        })

        $('#deleteWarning_modal').modal('hide');
    })
}

// 添加货物信息
function addGoodsAction() {
    $('#add_goods').click(function() {
        $('#add_modal').modal("show");
    });

    $('#add_modal_submit').click(function() {
        var data = {
            name : $('#goods_name').val(),
            type : $('#goods_type').val(),
            size : $('#goods_size').val(),
            value : $('#goods_value').val(),
        }
        // ajax
        $.ajax({
            type : "POST",
            url : "goodsManage/addGoods",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(data),
            success : function(response) {
                $('#add_modal').modal("hide");
                var msg;
                var type;
                var append = '';
                if (response.result == "success") {
                    type = "success";
                    msg = "货物添加成功";
                } else if (response.result == "error") {
                    type = "error";
                    msg = "货物添加失败";
                }
                showMsg(type, msg, append);
                tableRefresh();

                // reset
                $('#goods_name').val("");
                $('#goods_type').val("");
                $('#goods_size').val("");
                $('#goods_value').val("");
                $('#goods_form').bootstrapValidator("resetForm", true);
            },
            error : function(xhr, textStatus, errorThrow) {
                $('#add_modal').modal("hide");
                // handler error
                handleAjaxError(xhr.status);
            }
        })
    })
}

var import_step = 1;
var import_start = 1;
var import_end = 3;
// 导入货物信息
function importGoodsAction() {
    $('#import_goods').click(function() {
        $('#import_modal').modal("show");
    });

    $('#previous').click(function() {
        if (import_step > import_start) {
            var preID = "step" + (import_step - 1)
            var nowID = "step" + import_step;

            $('#' + nowID).addClass("hide");
            $('#' + preID).removeClass("hide");
            import_step--;
        }
    })

    $('#next').click(function() {
        if (import_step < import_end) {
            var nowID = "step" + import_step;
            var nextID = "step" + (import_step + 1);

            $('#' + nowID).addClass("hide");
            $('#' + nextID).removeClass("hide");
            import_step++;
        }
    })

    $('#file').on("change", function() {
        $('#previous').addClass("hide");
        $('#next').addClass("hide");
        $('#submit').removeClass("hide");
    })

    $('#submit').click(function() {
        var nowID = "step" + import_end;
        $('#' + nowID).addClass("hide");
        $('#uploading').removeClass("hide");

        // next
        $('#confirm').removeClass("hide");
        $('#submit').addClass("hide");

        // ajax
        $.ajaxFileUpload({
            url : "goodsManage/importGoods",
            secureuri: false,
            dataType: 'json',
            fileElementId:"file",
            success : function(data, status){
                var total = 0;
                var available = 0;
                var msg1 = "货物信息导入成功";
                var msg2 = "货物信息导入失败";
                var info;

                $('#import_progress_bar').addClass("hide");
                if(data.result == "success"){
                    total = data.total;
                    available = data.available;
                    info = msg1;
                    $('#import_success').removeClass('hide');
                }else{
                    info = msg2
                    $('#import_error').removeClass('hide');
                }
                info = info + ",总条数：" + total + ",有效条数:" + available;
                $('#import_result').removeClass('hide');
                $('#import_info').text(info);
                $('#confirm').removeClass('disabled');
            },error : function(data, status){
                // handler error
                handleAjaxError(status);
            }
        })
    })

    $('#confirm').click(function() {
        // modal dissmiss
        importModalReset();
    })
}

// 导出货物信息
function exportGoodsAction() {
    $('#export_goods').click(function() {
        $('#export_modal').modal("show");
    })

    $('#export_goods_download').click(function(){
        var data = {
            searchType : search_type_goods,
            keyWord : search_keyWord
        }
        var url = "goodsManage/exportGoods?" + $.param(data)
        window.open(url, '_blank');
        $('#export_modal').modal("hide");
    })
}

// 导入货物模态框重置
function importModalReset(){
    var i;
    for(i = import_start; i <= import_end; i++){
        var step = "step" + i;
        $('#' + step).removeClass("hide")
    }
    for(i = import_start; i <= import_end; i++){
        var step = "step" + i;
        $('#' + step).addClass("hide")
    }
    $('#step' + import_start).removeClass("hide");

    $('#import_progress_bar').removeClass("hide");
    $('#import_result').removeClass("hide");
    $('#import_success').removeClass('hide');
    $('#import_error').removeClass('hide');
    $('#import_progress_bar').addClass("hide");
    $('#import_result').addClass("hide");
    $('#import_success').addClass('hide');
    $('#import_error').addClass('hide');
    $('#import_info').text("");
    $('#file').val("");

    $('#previous').removeClass("hide");
    $('#next').removeClass("hide");
    $('#submit').removeClass("hide");
    $('#confirm').removeClass("hide");
    $('#submit').addClass("hide");
    $('#confirm').addClass("hide");


    $('#file').on("change", function() {
        $('#previous').addClass("hide");
        $('#next').addClass("hide");
        $('#submit').removeClass("hide");
    })

    import_step = 1;
}
