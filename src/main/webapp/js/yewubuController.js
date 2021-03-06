/**
 * Created by DELL on 2019/4/25.
 */

var search_type_customer = "none";
var search_keyWord = "";
var selectID;

$(function() {
    optionAction();
    searchAction();
    customerListInit();
    bootstrapValidatorInit();

    addCustomerAction();
    editCustomerAction();
    deleteCustomerAction();
    importCustomerAction();
    exportCustomerAction()
})

// 下拉框選擇動作
function optionAction() {
    $(".dropOption").click(function() {
        var type = $(this).text();
        $("#search_input").val("");
        if (type == "所有") {
            $("#search_input").attr("readOnly", "true");
            search_type_customer = "searchAll";
        } else if (type == "客户ID") {
            $("#search_input").removeAttr("readOnly");
            search_type_customer = "searchByID";
        } else if (type == "客户名称") {
            $("#search_input").removeAttr("readOnly");
            search_type_customer = "searchByName";
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
        searchType : search_type_customer,
        keyWord : search_keyWord
    }
    return temp;
}

// 表格初始化
function customerListInit() {
    $('#customerList')
        .bootstrapTable(
            {
                columns : [
                    {
                        field : 'id',
                        title : '客户ID'
                        //sortable: true
                    },
                    {
                        field : 'name',
                        title : '客户名称'
                    },
                    {
                        field : 'personInCharge',
                        title : '负责人'
                    },
                    {
                        field : 'tel',
                        title : '联系电话'
                    },
                    {
                        field : 'address',
                        title : '地址',
                        visible : false
                    },
                    {
                        field : 'email',
                        title : '电子邮件',
                        visible : false
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
                url : 'customerManage/getCustomerList',
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
    $('#customerList').bootstrapTable('refresh', {
        query : {}
    });
}

// 行编辑操作
function rowEditOperation(row) {
    $('#edit_modal').modal("show");

    // load info
    $('#customer_form_edit').bootstrapValidator("resetForm", true);
    $('#customer_name_edit').val(row.name);
    $('#customer_person_edit').val(row.personInCharge);
    $('#customer_tel_edit').val(row.tel);
    $('#customer_email_edit').val(row.email);
    $('#customer_address_edit').val(row.address);
}

// 添加供应商模态框数据校验
function bootstrapValidatorInit() {
    $("#customer_form,#customer_form_edit").bootstrapValidator({
        message : 'This is not valid',
        feedbackIcons : {
            valid : 'glyphicon glyphicon-ok',
            invalid : 'glyphicon glyphicon-remove',
            validating : 'glyphicon glyphicon-refresh'
        },
        excluded : [ ':disabled' ],
        fields : {
            customer_name : {
                validators : {
                    notEmpty : {
                        message : '客户名称不能为空'
                    }
                }
            },
            customer_tel : {
                validators : {
                    notEmpty : {
                        message : '客户电话不能为空'
                    }
                }
            },
            customer_email : {
                validators : {
                    notEmpty : {
                        message : '客户E-mail不能为空'
                    },
                    regexp : {
                        regexp : '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message : 'E-mail的格式不正确'
                    }
                }
            },
            customer_address : {
                validators : {
                    notEmpty : {
                        message : '客户地址不能为空'
                    }
                }
            },
            customer_person : {
                validators : {
                    notEmpty : {
                        message : '客户负责人不能为空'
                    }
                }
            }
        }
    })
}

// 编辑客户信息
function editCustomerAction() {
    $('#edit_modal_submit').click(
        function() {
            $('#customer_form_edit').data('bootstrapValidator')
                .validate();
            if (!$('#customer_form_edit').data('bootstrapValidator')
                    .isValid()) {
                return;
            }

            var data = {
                id : selectID,
                name : $('#customer_name_edit').val(),
                personInCharge : $('#customer_person_edit').val(),
                tel : $('#customer_tel_edit').val(),
                email : $('#customer_email_edit').val(),
                address : $('#customer_address_edit').val()
            }

            // ajax
            $.ajax({
                type : "POST",
                url : 'customerManage/updateCustomer',
                dataType : "json",
                contentType : "application/json",
                data : JSON.stringify(data),
                success : function(response) {
                    $('#edit_modal').modal("hide");
                    var type;
                    var msg;
                    var append = ''
                    if (response.result == "success") {
                        type = "success";
                        msg = "客户信息更新成功";
                    } else if (response.result == "error") {
                        type = "error";
                        msg = "客户信息更新失败"
                    }
                    showMsg(type, msg, append);
                    tableRefresh();
                },
                error : function(xhr, textStatus, errorThrown) {
                    $('#edit_modal').modal("hide");
                    // 处理错误
                    handleAjaxError(xhr.status)
                }
            });
        });
}

// 刪除客户信息
function deleteCustomerAction(){
    $('#delete_confirm').click(function(){
        var data = {
            "customerID" : selectID
        }

        // ajax
        $.ajax({
            type : "GET",
            url : "customerManage/deleteCustomer",
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
                    msg = "客户信息删除成功";
                }else{
                    type = "error";
                    msg = "客户信息删除失败";
                }
                showMsg(type, msg, append);
                tableRefresh();
            },error : function(xhr, textStatus, errorThrown){
                $('#deleteWarning_modal').modal("hide");
                // handler error
                handleAjaxError(xhr.status)
            }
        })

        $('#deleteWarning_modal').modal('hide');
    })
}

// 添加客户信息
function addCustomerAction() {
    $('#add_customer').click(function() {
        $('#add_modal').modal("show");
    });

    $('#add_modal_submit').click(function() {
        var data = {
            name : $('#customer_name').val(),
            personInCharge : $('#customer_person').val(),
            tel : $('#customer_tel').val(),
            email : $('#customer_email').val(),
            address : $('#customer_address').val()
        }
        // ajax
        $.ajax({
            type : "POST",
            url : "customerManage/addCustomer",
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
                    msg = "客户添加成功";
                } else if (response.result == "error") {
                    type = "error";
                    msg = "客户添加失败";
                }
                showMsg(type, msg, append);
                tableRefresh();

                // reset
                $('#customer_name').val("");
                $('#customer_person').val("");
                $('#customer_tel').val("");
                $('#customer_email').val("");
                $('#customer_address').val("");
                $('#customer_form').bootstrapValidator("resetForm", true);
            },
            error : function(xhr, textStatus, errorThrown) {
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
// 导入客户信息
function importCustomerAction() {
    $('#import_customer').click(function() {
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
            url : "customerManage/importCustomer",
            secureuri: false,
            dataType: 'json',
            fileElementId:"file",
            success : function(data, status){
                var total = 0;
                var available = 0;
                var msg1 = "客户信息导入成功";
                var msg2 = "客户信息导入失败";
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
                // handle error
                handlerAjaxError(status);
            }
        })
    })

    $('#confirm').click(function() {
        // modal dissmiss
        importModalReset();
    })
}

// 导出客户信息
function exportCustomerAction() {
    $('#export_customer').click(function() {
        $('#export_modal').modal("show");
    })

    $('#export_customer_download').click(function(){
        var data = {
            searchType : search_type_customer,
            keyWord : search_keyWord
        }
        var url = "customerManage/exportCustomer?" + $.param(data)
        window.open(url, '_blank');
        $('#export_modal').modal("hide");
    })
}

// 导入客户模态框重置
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
