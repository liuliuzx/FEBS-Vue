var lstProject = null;
// 临时污染物
var lstTempPollutant = null;
// 临时的当前项目,用于打开或新建项目
var tempCurrentProject = null;

/**
 * 加载项目
 *
 * @returns
 */
function onLoadLstProject() {
    var temp = {
        id : "22"
    };
    $.ajax({
        type : "post",
        async : false,
        url : '/AER/getLstProject',
        dataType : "json",
        success : function(result, textStatus) {
            $('#dgProject').datagrid('loadData', result);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {

        }

    });
}

/**
 * 格式化项目运行状态
 *
 * @param value
 * @param row
 * @param index
 * @returns
 */
function formatterRunState(value, row, index) {
    var str = "";
    if (row.runState) {
        str = "正在计算";
    } else {
        str = "就绪";
    }
    return str;
}

function mDateTime(value, row, index) {
    var date = new Date();
    date.setTime(row.projDateTime);
    return formatDate(date, "yyyy-MM-dd hh:mm:ss");
}

/**
 * 项目管理
 *
 * @returns
 */
function dlgProjectManagement() {
    $('#dlgCom').dialog({
        title : '项目管理',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '700px',
        height : '510px',
        closed : false,
        cache : false,
        onClose : ondlgClose,
        content : "<iframe frameborder=0 scrolling='no' id='ProjectManagement' style='width: 100%; height: 100%' src='/AER/loadLstProject'></iframe>",
        modal : true,
        buttons : [{
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加项目对话框
 *
 * @returns
 */
function dlgAddProject() {
    $('#dlgAddProject').window('open');
    $('#txtProjectName').textbox('reset');
    if (tempCurrentProject == null) {
        tempCurrentProject = new Object();
        tempCurrentProject.OperateType = 'add';
    } else {
        tempCurrentProject.OperateType = 'add';
    }
}

/**
 * 保存一个项目
 *
 * @returns
 */
function savePorject() {
    // 验证
    if (!$("#ff").form('enableValidation').form('validate')) {
        return;
    }
    /*
     * if(!$('#txtProjectName').textbox("isValid")){ $.messager.show({
     * title:'警告', msg:'项目名不满足要求', timeout:2000, showType:'slide' }); return; }
     */

    var projId = null;
    var url = null;
    if (tempCurrentProject.OperateType == "add") {
        var guid = new GUID();
        projId = guid.newGUID();
        url = "/AER/addProj";
    } else {
        projId = tempCurrentProject.projectId;
        url = "/AER/updataProj";
    }
    var project = {
        userId : "temp",
        projectId : projId,
        projName : $('#txtProjectName').textbox('getValue'),
        projDateTime : new Date(),
        runState : false,
        lstPointSource : null,
        lstRectangleSource : null,
        lstCircleSource : null,
        lstFlareSource : null,
        lstVolumeSource : null
    };
    var jsonStr = JSON.stringify(project);

    $.ajax({
        type : "post",
        async : false,
        // dataType : "json",
        contentType : "application/json",
        data : jsonStr,
        url : url,
        success : function(result, state) {
            if (result[0] == 1) {
                if (tempCurrentProject.OperateType == "add") {
                    $('#dgProject').datagrid('appendRow', project);
                    if (parent.projectId == null) {
                        openProject(project.projectId);
                    } else {
                        $.messager.confirm('确认对话框', '是否打开新建项目',
                            function(r) {
                                if (r) {
                                    openProject(project.projectId);
                                }
                            });
                    }

                } else {
                    var index = $('#dgProject').datagrid('getRowIndex',
                        tempCurrentProject);
                    $('#dgProject').datagrid('updateRow', {
                        index : index,
                        row : project
                    });
                }
                onLoadSuccessOperate();

                parent.$.messager.show({
                    title : '提示',
                    msg : '项目操作成功',
                    showType : 'show'
                });
                $('#dlgAddProject').window('close');
            } else {
                parent.$.messager.show({
                    title : '提示',
                    msg : '项目操作失败:' + result[0],
                    showType : 'show'
                });
            }

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            parent.$.messager.show({
                title : '提示',
                msg : '项目操作失败:' + errorThrown,
                showType : 'show'
            });
        }
    });
}

/**
 * 获取一个项目
 *
 * @returns
 */
function getProject() {
    var proj = null;
    $.ajax({
        type : "post",
        async : false,
        /* dataType : "json", */
        contentType : "application/json",
        data : "s",
        url : "/AER/getProject?projId=" + projectId,
        success : function(result, state) {
            proj = result;
        },
        error : function(httpRequest, state, errorThrwon) {

        }
    });
    return proj;
}

/**
 * 单元格操作
 *
 * @param value
 * @param row
 * @param index
 * @returns
 */
function projectOperate(value, row, index) {
    var str = '<a href="#" name="Open" id="btnOpen" class="easyui-linkbutton"   onclick="openProject('
        + "'" + row.projectId + "'" + ')"></a>';
    var strEdit = '<a href="#" name="Edit" id="btnEdit" class="easyui-linkbutton"   onclick="editProject('
        + "'" + row.projectId + "'" + ')"></a>';
    var strDel = '<a href="#" name="Del" id="btnDel" class="easyui-linkbutton"   onclick="delProject('
        + "'" + row.projectId + "'" + ')"></a>';
    return str + strEdit + strDel;
}
function onDblClickRow(index, row) {
    openProject(row.projectId);
}
/**
 * 刷新按键状态
 *
 * @returns
 */
function onLoadSuccessOperate() {
    $("a[name='Open']").linkbutton({
        text : '打开项目',
        plain : true,
        height : "20px",
        iconCls : 'icon-add'
    });
    $("a[name='Edit']").linkbutton({
        text : '编辑',
        plain : true,
        height : "20px",
        iconCls : 'icon-edit'
    });
    $("a[name='Del']").linkbutton({
        text : '删除',
        height : "20px",
        plain : true,
        iconCls : 'icon-remove'
    });
}

/**
 * 编辑项目
 *
 * @param projData
 * @returns
 */
function editProject(projId) {
    var datas = $('#dgProject').datagrid('getData');
    var project = null;
    for (var i = 0; i < datas.rows.length; i++) {
        if (datas.rows[i].projectId == projId) {
            project = datas.rows[i];
            break;
        }
    }
    if (project != null) {
        $('#dlgAddProject').window('open');
        $('#txtProjectName').textbox('setValue', project.projName);
        tempCurrentProject = project;
        tempCurrentProject.OperateType = "edit";
    }
}

function delProject(projId) {
    var datas = $('#dgProject').datagrid('getData');
    var project = null;
    for (var i = 0; i < datas.rows.length; i++) {
        if (datas.rows[i].projectId == projId) {
            project = datas.rows[i];
            break;
        }
    }
    if (project == null) {
        return;
    }

    $.messager.confirm('确认对话框', '确定要删除此项目吗？', function(r) {
        if (r) {

            if (project.runState) {
                $.messager.alert('提示', '请停止此项目的计算，再进行删除操作');
                return;
            }

            $.ajax({
                type : "post",
                asnyc : false,
                url : "/AER/delProject?projId=" + projId,
                data : "s",
                contentType : "application/json",
                success : function(result, state) {
                    if (result == "1") {
                        parent.$.messager.show({
                            title : '提示',
                            msg : '项目删除成功',
                            showType : 'show'
                        });
                        var index = $('#dgProject').datagrid(
                            'getRowIndex', project);
                        $('#dgProject').datagrid('deleteRow',
                            index);
                        if (project.projectId == parent.projectId) {
                            parent.InitializeProject(
                                parent.proj, "aer");
                        }

                    } else {
                        parent.$.messager.show({
                            title : '提示',
                            msg : '项目删除失败' + result,
                            showType : 'show'
                        });
                    }
                },
                error : function(httpRequest, state,
                                 errorThrown) {
                    parent.$.messager.show({
                        title : '提示',
                        msg : '项目删除失败' + errorThrown,
                        showType : 'show'
                    });
                }
            });
        }
    });
}

/**
 * 当窗体关闭时，执行Gis刷新
 *
 * @returns
 */
function ondlgClose() {
    /*
     * $(layero).find("iframe")[0].contentWindow.getAllProject(); var lstProj =
     * $(layero).find("iframe")[0].contentWindow.lstProject; var project =
     * $(layero).find("iframe")[0].contentWindow.project; if (lstProj != null &&
     * projectId != null && lstProj.length > 0) { var b = false;
     *
     * for (var i = 0; i < lstProj.length; i++) { if (projectId ==
     * lstProj[i].projectId) { b = true; break; } } if (!b) { ClearFeature(); } }
     * else { ClearFeature(); }
     */

}

/**
 * 打开选中的项目
 *
 * @returns
 */
function openProject(projId) {
    var datas = $('#dgProject').datagrid('getData');
    var project = null;
    for (var i = 0; i < datas.rows.length; i++) {
        if (datas.rows[i].projectId == projId) {
            project = datas.rows[i];
            break;
        }
    }
    if (project != null) {
        tempCurrentProject = project;
        parent.InitializeProject(project, "aer");
        parent.$('#dlgCom').dialog("close");
    }
}

// 暂时不用
function LoadProjectToMenu() {
    var temp = {
        id : "22"
    };
    $.ajax({
        type : "post",
        async : false,
        url : '/AER/getLstProject',
        dataType : "json",
        success : function(result, textStatus) {
            var menu = document.getElementById("projectMenu");
            for (var i = 0; i < result.length; i++) {
                var projectName = result[i].projName;
                var li = document.createElement("dd"); // 创建一个li标签

                /*
                 * var a = document.createElement("a"); var link =
                 * document.createTextNode(projectName); a.appendChild(link);
                 * a.setAttribute("href","#"); a.onclick= function(){
                 * alert(result[i].projName) };
                 *
                 * li.appendChild(a);
                 */

                /*
                 * li.innerHTML = "<a href='' onclick='OpenProject(this)' id='" +
                 * result[i].projectId + "' >" + projectName + "</a>";
                 */

                li.innerHTML = "<a href='/AER/loadGis?projId="
                    + result[i].projectId + "&projName=" + projectName
                    + "'>" + projectName + "</a>";

                li.project = result[i];
                menu.appendChild(li); // 将创建好的li标签追加到box标签中
            }
            layui.use(['element', 'form'], function() {
                var element = layui.element; // 导航的hover效果、二级菜单等功能，需要依赖element模块
                var form = layui.form;
                // 监听导航点击
                element.on('nav(democc)', function(elem) {

                    var type = elem.context.children[0].id;

                    switch (type) {
                        case "creatProj" :
                            AddPorject();
                            break;
                        case "" :

                            break;
                        default :
                            ToggleInteraction(elem.context.children[0]);
                            break;
                    }
                });
                form.render();
            });

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {

        }

    });

}

/**
 * 项目源
 *
 * @returns
 */
function dlgProjectSource() {
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }

    $('#dlgCom').dialog({
        title : '排放源',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '80%',
        height : '75%',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='ProjectSource'  style='width: 100%; height: 100%' src='/AER/loadProjectSource'></iframe>",
        modal : true,
        buttons : null,
        onClose : function() {
            var fn = document.getElementById("ProjectSource");
            if (fn != null) {
                var project = getProject();
                InitializeProject(project, "aer");
            }
        }
    });
    $('#dlgCom').window('center');
}

/**
 * 项目参数
 *
 * @returns
 */
function dlgSourceParameter() {
    var project = getProject();
    if (project != null) {
        if (project.runState) {
            parent.$.messager.show({
                title : '提示',
                msg : '当前项目正在计算，请停止计算后，再进行相关操作',
                showType : 'show'
            });
            return null;
        }
    }

    if (projectId == null) {
        return;
    }
    $('#dlgCom').dialog({
        title : '项目参数',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '650px',
        height : '510px',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='sourceParameter' style='width: 100%; height: 100%' src='/AER/loadSourceParameter'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {

                var fn = document.getElementById("sourceParameter").contentWindow;
                fn.save();
                $('#dlgCom').dialog("close");
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 图层控制弹出框
 */
function openSourceLayerdlg(){
    $("#dlgSourceLayerShow").dialog("open");
}


/**
 * 添加或编辑点源
 *
 * @param e
 * @returns
 */
function dlgAddOrEditPoint(e) {
    if (e != null) {
        CurrentFeature = e;
        CurrentFeature.Actioned = "add";
    }
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    CurrentFeature.ProjectId = projectId;
    $('#dlgCom').dialog({
        title : '点源',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '650px',
        height : '600px',
        closed : false,
        onClose : CancelSavePoint,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='PointSource' style='width: 100%; height: 100%' src='/AER/loadPointSource'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("PointSource").contentWindow;
                var point = fn.save();
                if (point != null) {
                    removeCurrentSelectedFeature("Point");
                    AddFeature(point, "Point");
                    lstTempPollutant = point.lstPollutantRate;

                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                CancelSavePoint();
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加或编辑敏感点
 *
 * @param e
 * @returns
 */
function dlgAddOrEditAccept(e) {
    if (e != null) {
        CurrentFeature = e;
        CurrentFeature.Actioned = "add";
    }
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    CurrentFeature.ProjectId = projectId;
    $('#dlgCom').dialog({
        title : '敏感点',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '265px',
        height : '210px',
        closed : false,
        onClose : CancelSaveAccept,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='Acceptx' style='width: 100%; height: 100%' src='/AER/loadAccept'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("Acceptx").contentWindow;
                var accept = fn.save();
                if (accept != null) {
                    removeCurrentSelectedFeature("Accept");
                    AddFeature(accept, "Accept");

                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                CancelSaveAccept();
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加或编辑火炬源
 *
 * @param e
 * @returns
 */
function dlgAddOrEditFlare(e) {
    if (e != null) {
        CurrentFeature = e;
        CurrentFeature.Actioned = "add";
    }
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    CurrentFeature.ProjectId = projectId;
    $('#dlgCom').dialog({
        title : '火炬源',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '650px',
        height : '600px',
        closed : false,
        onClose : CancelSaveFlare,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='FlareSource' style='width: 100%; height: 100%' src='/AER/loadFlareSource'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("FlareSource").contentWindow;
                var flare = fn.save();
                if (flare != null) {
                    removeCurrentSelectedFeature("Flare");
                    AddFeature(flare, "Flare");
                    lstTempPollutant = flare.lstPollutantRate;

                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                CancelSaveFlare();
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加或编辑圆形面源
 *
 * @param e
 * @returns
 */
function dlgAddOrEditCircle(e) {
    if (e != null) {
        CurrentFeature = e;
        CurrentFeature.Actioned = "add";
    }
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    CurrentFeature.ProjectId = projectId;
    $('#dlgCom').dialog({
        title : '圆形面源',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '650px',
        height : '600px',
        closed : false,
        onClose : CancelSaveCircle,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='CircleSource' style='width: 100%; height: 100%' src='/AER/loadCircleSource'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("CircleSource").contentWindow;
                var circle = fn.save();
                if (circle != null) {
                    removeCurrentSelectedFeature("Circle");
                    AddFeature(circle, "Circle");
                    lstTempPollutant = circle.lstPollutantRate;

                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                CancelSaveCircle();
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加或编辑矩形面源
 *
 * @param e
 * @returns
 */
function dlgAddOrEditRectangle(e) {
    if (e != null) {
        CurrentFeature = e;
        CurrentFeature.Actioned = "add";
    }
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    CurrentFeature.ProjectId = projectId;
    $('#dlgCom').dialog({
        title : '矩形面源',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '660px',
        height : '610px',
        closed : false,
        onClose : CancelSaveRectangle,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='RectangleSource' style='width: 100%; height: 100%' src='/AER/loadRectangle'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("RectangleSource").contentWindow;
                var rectangle = fn.save();
                if (rectangle != null) {
                    removeCurrentSelectedFeature("Rectangle");
                    AddFeature(rectangle, "Rectangle");
                    lstTempPollutant = rectangle.lstPollutantRate;

                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                CancelSaveRectangle();
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加或编辑体源
 *
 * @param e
 * @returns
 */
function dlgAddOrEditVolume(e) {
    if (e != null) {
        CurrentFeature = e;
        CurrentFeature.Actioned = "add";
    }
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    CurrentFeature.ProjectId = projectId;
    $('#dlgCom').dialog({
        title : '体源',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '650px',
        height : '620px',
        closed : false,
        cache : false,
        onClose : CancelSaveVolume,
        content : "<iframe frameborder=0 scrolling='no' id='VolumeSource' style='width: 100%; height: 100%' src='/AER/loadVolumeSource'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("VolumeSource").contentWindow;
                var volume = fn.save();
                if (volume != null) {
                    removeCurrentSelectedFeature("Volume");
                    AddFeature(volume, "Volume");
                    lstTempPollutant = volume.lstPollutantRate;

                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                CancelSaveVolume();
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 添加或编辑火炬源
 *
 * @param e
 * @returns
 */
function onShowSourceResult(id, name) {
    $('#dlgCom').dialog({
        title : name,
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '80%',
        height : '90%',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='sourceResult' style='width: 100%; height: 100%' src='/AER/loadMaxConc?Id="
            + id + "'></iframe>",
        modal : true,
        buttons : [{
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 显示排放源的信息
 *
 * @param id
 *            源ID
 * @param type
 *            源类型
 * @returns
 */
function dlgPerSourceInformation(id, type) {
    var strTitle = "";
    var url = "/AER/viewPoint?Id=";
    switch (type) {
        case "Point" :
            strTitle = "点源信息";
            break;
        case "Circle" :
            strTitle = "圆形面源信息";
            break;
        case "Rectangle" :
            strTitle = "矩形面源信息";
            break;
        case "Volume" :
            strTitle = "体源信息";
            break;
        case "Flare" :
            strTitle = "火炬源信息";
            break;
        case "Accept" :
            url = "/AER/loadAcceptInfo?Id=";
            strTitle = "敏感点"
            break;
        default :
            break;
    }

    $('#dlgCom').dialog({
        title : strTitle,
        left : '25px', // 在指定位置打开窗体
        top : '90px',
        width : '20%',
        height : '70%',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='SourceInfo' style='width: 100%; height: 100%' src='"
            + url + id + "&type=" + type + "'></iframe>",
        modal : false,
        buttons : null
    });
    // $('#dlgCom').window('center');
}

/**
 * 计算项目
 *
 * @param e
 * @returns
 */
function dlgRunProject() {
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    var projId = projectId;

    var b = false;
    $.ajax({
        type : "post",
        url : "/AER/getProjectRunState",
        async : false,
        data : "s",
        dataType : "json",
        success : function(result, state) {
            b = result[0];
            if (b) {
                if (result[1] != projectId) {
                    $.messager.alert('提示', result[2], 'info');
                } else {
                    b = false;
                }
            }
        },
        error : function(httpRequest, state, errorThrown) {
            // $.messager.alert('提示', errorThrown, 'info');
            // b = true;
            b = false;
        }
    })
    if (b) {
        return;
    }

    $('#dlgCom').dialog({
        title : '计算',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '650px',
        height : '600px',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='RunProject' style='width: 100%; height: 100%' src='/AER/loadRun?projId="
            + projId + "'></iframe>",
        modal : true,
        buttons : [{
            text : '重新连接',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("RunProject").contentWindow;
                fn.webSocketOpen();
            }
        }, {
            text : '计算',
            id : "btnRun",
            width : '80px',
            handler : function() {
                // $('#btnRun').linkbutton('disable');
                var fn = document.getElementById("RunProject").contentWindow;
                fn.aerCalBeforeChecked();// aerCalBeforeChecked
            }
        }, {
            text : '停止计算',
            id : "btnStop",
            width : '80px',
            handler : function() {
                // $('#btnRun').linkbutton('enable');
                var fn = document.getElementById("RunProject").contentWindow;
                fn.runStop();

            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#btnRun').linkbutton('enable');
                $('#btnStop').linkbutton('enable');
                $('#dlgCom').dialog("close");
                var fn = document.getElementById("RunProject").contentWindow;
                fn.shutDownConection();

            }
        }]
    });
    $('#dlgCom').window('center');
}
/**
 * 项目参数信息
 *
 * @returns
 */
function dlgViewProjectParameter() {
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    $('#dlgCom').dialog({
        title : '项目参数信息',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '80%',
        height : '80%',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='FlareSource' style='width: 100%; height: 100%' src='/AER/loadProjectParameterInfo'></iframe>",
        modal : true,
        buttons : [{
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

/**
 * 右键新建项目
 */
function dlgaddProject() {
    $('#dlgCom').dialog({
        title : '新建项目',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '300px',
        height : '150px',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='addproject' style='width: 100%; height: 100%' src='/AER/addproject'></iframe>",
        modal : true,
        buttons : [{
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("addproject").contentWindow;
                var newproject = fn.save();
                if (newproject != null) {
                    if (projectId == null) {
                        InitializeProject(newproject, "aer");
                    } else {
                        $.messager.confirm('确认对话框', '是否打开新建项目',
                            function(r) {
                                if (r) {
                                    InitializeProject(newproject,
                                        "aer");
                                }
                            });
                    }
                    $('#dlgCom').dialog("close");
                }
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}
/**
 * 下载word报告
 */
/*
 * function downWordReport() { $.ajax({ url : '/AER/docxExport', data : {
 * projectID : projectId }, type : 'get', success : function(result) {
 * if(result=="1") { DownLoadFile(projectId); } } }); } // 下载文件 function
 * DownLoadFile(filename) { var PARAMS = { html : "fsdf", downLoadFilePath :
 * filename }; var temp = document.createElement("form"); temp.action =
 * '/AER/downDocx?taskname=' + filename; temp.method = "post";
 * temp.style.display = "none"; for (var x in PARAMS) { var opt =
 * document.createElement("textarea"); opt.name = x; opt.value = PARAMS[x];
 * temp.appendChild(opt); } document.body.appendChild(temp); temp.submit();
 * document.body.removeChild(temp); }
 */

// 点击生成word时，先判断是否已经计算成功（具体计算成功的判断条件，需要进一步确定）
// 这里仅仅是用了一个项目计算状态的标志：计算中不允许生成word。计算完成或者没有计算都可以生成word
// 所以这里是有问题的，不能用data.runState来判断
function getAERProjectRunState() {
    if (projectId == null) {
        $.messager.alert('提示', '请打开或新建一个项目再进行相关操作', 'info');
        return;
    }
    $.ajax({
        type : "post",
        async : false,
        url : "/AER/getProjectMessage",
        data : {
            projId : projectId
        },
        success : function(data) {
            // if(!data.runState){//这里需要修改(小七设计的这个字段初衷为，0表示未计算，1表示计算中)
            // beforeCreatWordAER();
            // }else{
            // $.messager.alert('提示', '请项目计算完成后再生成报告', 'info');
            // }
            if (data.runState == -1) {
                $.messager.alert('提示', '项目不存在或者存在其他问题，请检查', 'info');
                return;
            } else if (data.runState == 1) {
                $.messager.alert('提示', '请项目计算完成后再生成报告', 'info');
                return;
            } else if (data.runState == 0) {
                if (data.totalSourceCnt <= 0) {
                    $.messager.alert('提示', '项目中至少需要存在一个污染源', 'info');
                    return;
                } else {
                    if (data.completeSourceCnt <= 0) {
                        // $.messager.alert('提示', '项目中不存在计算成功的污染源!',
                        // 'info');
                        $.messager.confirm('确认',
                            '项目中不存在计算成功的污染源，确认继续生成报告？',
                            function(r) {
                                if (r) {
                                    // beforeCreatWordAER();

                                    // 去掉生成报告付费 20181106
                                    CreatAerWorld("1");

                                } else {
                                    return;
                                }
                            });
                        return;
                    } else {

                    }
                }
            } else {
                $.messager.alert('提示', '项目不存在或者存在其他问题，请检查', 'info');
                return;
                // map.put("totalSourceCnt", totalSourceCnt);
                // map.put("completeSourceCnt", completeSourceCnt);
                // map.put("failSourceCnt", failSourceCnt);
                // map.put("nonSourceCnt", nonSourceCnt);
            }

            // beforeCreatWordAER();
            // 去掉生成报告付费 20181106
            CreatAerWorld("1");

        }
    })
}
/*
 * 生成报告前 检查（付费）
 */
function beforeCreatWordAER() {
    if (projectId == null) {
        $.messager.alert('提示', '请打开或新建一个项目再进行相关操作', 'info');
        return;
    }

    $('#consumeAER').window('open');
    $('#consumeAER').window('center');
    var data = {
        module : "AERSCREEN",
        method : "CREATEWORD",
        projectId : projectId
    };
    $.ajax({
        type : "post",
        async : false,
        url : "/module/beforeConsume",
        // contentType : 'application/json;charset=UTF-8',
        dataType : "json",
        data : data,
        success : function(result, state) {
            document.getElementById('txtInformationAER').innerHTML = result.txtInfo;
            if (result.isCanCal) {
                $("#btnCalAER").linkbutton('enable');

            } else {
                $("#btnCalAER").linkbutton('disable');

                // // 无权限或者余额不足，弹出充值界面
                // openUserCenter('recharge');

                // $('#panelRecharge').window('open');
                // $('#panelRecharge')
                // .dialog(
                // {
                // title : '余额不足以支付本次操作，请先充值',
                // // left:0, 在指定位置打开窗体
                // // top:0,
                // width : '800px',
                // height : '700px',
                // closed : false,
                // cache : false,
                // content : "<iframe frameborder=0 scrolling='no'
                // id='recharge' style='width: 100%; height: 100%'
                // src='/personal/recharge'></iframe>",
                // modal : true,
                // buttons : [ {
                // text : '关闭',
                // width : '80px',
                // handler : function() {
                // $('#panelRecharge').dialog(
                // "close");
                // // beforeCreatWord();
                // }
                // } ]
                // });
                //
                // $('#panelRecharge').window('center');

            }
            tempResult = result;
        },
        error : function() {

        }

    });

}

// 点击付费且生成报告
function sumAER() {
    tempResult;// 稍候测试本字段是否有必要存在。。。
    if (tempResult.isCanCal) {

        // var data = {goldCost:tempResult.goldCost};
        var data = {
            module : "AERSCREEN",
            method : "CREATEWORD",
            projectId : projectId
        };
        $.ajax({
            type : "post",
            async : false,
            url : "/module/consumeOk",
            // contentType : 'application/json;charset=UTF-8',
            dataType : "json",
            data : data,
            success : function(result, state) {
                var costUUID = result.costUUID;
                if (costUUID == 0) {
                    $.messager.alert('提示', result.txtInfo, 'info');
                    return;
                }
                var userId = result.userId;
                CreatAerWorld(costUUID);
            },
            error : function() {

            }

        });
    } else {

    }
    $('#consumeAER').dialog('close')

}
/**
 * 生成World文档
 */
function CreatAerWorld(costUUID) {
    if (projectId == null) {
        $.messager.alert('提示', '请打开或新建一个项目再进行相关操作', 'info');
        return;
    }
    $.ajax({
        type : "post",
        url : "/Report/docxExport",
        data : {
            projectID : projectId,
            costUUID : costUUID
        },
        beforeSend : function() {
            // // 开始生成word文档
            // // 添加一个遮罩
            // load();
            $.messager.progress({
                title : '提示',
                msg : 'word文档生成中，请稍候……',
                text : ''
            });
        },
        complete : function() {
            // 生成结束，成功或失败，
            // 取消遮罩
            // disLoad();
            $.messager.progress('close');
        },
        success : function(data) {
            if (data.flagResult == "1") {
                $.messager.alert('提示', 'word文档生成成功！', 'info');
            } else {
                $.messager.alert('错误', 'word文档生成失败！' + data.msg,
                    'error');
            }
        }
    });
}

function opendownAerWord() {
    if (projectId == null) {
        $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
        return;
    }
    $('#dlgCom').dialog({
        title : 'word下载',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '80%',
        height : '80%',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='AerWorld' style='width: 100%; height: 100%' src='/AER/showAerWorld'></iframe>",
        modal : true,
        buttons : [{
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

function setWordReportParam() {
    var project = getProject();
    if (project != null) {
        if (project.runState) {
            parent.$.messager.show({
                title : '提示',
                msg : '当前项目正在计算，请停止计算后，再进行相关操作',
                showType : 'show'
            });
            return null;
        }
    }
    $('#dlgCom').dialog({
        title : 'word参数设置',
        // left:0, 在指定位置打开窗体
        // top:0,
        width : '350px',
        height : '280px',
        closed : false,
        cache : false,
        content : "<iframe frameborder=0 scrolling='no' id='AerWorldParam' style='width: 100%; height: 100%' src='/AER/showReportParameterPage'></iframe>",
        modal : true,
        buttons : [{
            text : '设置为默认值',
            width : '120px',
            handler : function() {
                var fn = document.getElementById("AerWorldParam").contentWindow;
                fn.setDefaultValue();
            }
        }, {
            text : '提交',
            width : '80px',
            handler : function() {
                var fn = document.getElementById("AerWorldParam").contentWindow;
                fn.save();
                $('#dlgCom').dialog("close");
            }
        }, {
            text : '关闭',
            width : '80px',
            handler : function() {
                $('#dlgCom').dialog("close");
            }
        }]
    });
    $('#dlgCom').window('center');
}

// /------------------------------压缩、下载INP文件------------------------------------
// packetInpFile openInpFileList
// function packetInpFile() {
// if (projectId == null) {
// $.messager.alert('提示', '请打开或新建一个项目再进行相关操作', 'info');
// return;
// }
// $.ajax({
// type : "post",
// async : false,
// url : "/AER/getProjectMessage",
// data : {
// projId : projectId
// },
// success : function(data) {
// if (data.runState == -1) {
// $.messager.alert('提示', '项目不存在或者存在其他问题，请检查', 'info');
// return;
// } else if (data.runState == 1) {
// $.messager.alert('提示', '请项目计算完成后再压缩inp文件', 'info');
// return;
// } else if (data.runState == 0) {
// if (data.totalSourceCnt <= 0) {
// $.messager.alert('提示', '项目中至少需要存在一个污染源', 'info');
// return;
// } else {
// if (data.completeSourceCnt <= 0) {
// $.messager.confirm('确认', '项目中不存在计算成功的污染源，确认继续压缩inp文件？',
// function(r) {
// if (r) {
// CreateInpFile("1");
// } else {
// return;
// }
// });
// return;
// } else {
//
// }
// }
// } else {
// $.messager.alert('提示', '项目不存在或者存在其他问题，请检查', 'info');
// return;
// }
// CreateInpFile("1");
// }
// })
// }

/**
 * INP文件压缩
 */
function CreateInpFile(sourceId, sourceName) {// costUUID
    if (projectId == null) {
        $.messager.alert('提示', '请打开或新建一个项目再进行相关操作', 'info');
        return;
    }
    var inpFlag = true;
    // 检查污染源是否存在结果文件并生成临时文件及压缩包
    $.ajax({
        type : "post",
        url : "/AER/InpFilePacket",
        async : false,
        data : {
            projectId : projectId,
            sourceId : sourceId,
            sourceName : sourceName
            // costUUID : costUUID
        },
        beforeSend : function() {
            $.messager.progress({
                title : '提示',
                msg : 'INP文件压缩中，请稍候……',
                text : ''
            });
        },
        complete : function() {
            // 生成结束，成功或失败，
            // 取消遮罩
            // disLoad();
            $.messager.progress('close');
        },
        success : function(data) {
            if (data == "1") {
                // $.messager.alert('提示', 'INP文件压缩成功！', 'info');
            } else if (data == 0) {
                $.messager.alert('错误', '此污染源还没有生成结果文件！', 'error');
                inpFlag = false;
                return;
            } else {
                $.messager.alert('错误', 'INP文件压缩失败！', 'error');
                inpFlag = false;
                return;
            }
        }
    });
    if (!inpFlag) {
        return;
    }
    // 下载到用户本地并删除服务器临时文件夹及压缩包
    // var temp = parent.document.createElement("form");
    // temp.action = '/AER/DownInpFilePacket?projectId=' + projectId +
    // '&sourceId='
    // + sourceId+"&sourceName="+sourceName;
    // temp.method = "post";
    // temp.style.display = "none";
    // parent.document.body.appendChild(temp);
    // temp.submit();
    // parent.document.body.removeChild(temp);
    tool.dlFile({
        url : '/AER/DownInpFilePacket?projectId=' + projectId
            + '&sourceId=' + sourceId + "&sourceName=" + sourceName,
        contentType : "application/json;chartset=utf-8"
    });
}

/**
 * 结果Excel文件压缩
 */
function CreateExcelFile(sourceId, sourceName) {// costUUID
    if (projectId == null) {
        $.messager.alert('提示', '请打开或新建一个项目再进行相关操作', 'info');
        return;
    }
    var inpFlag = true;
    // 检查污染源是否存在结果文件并生成临时文件及压缩包
    $.ajax({
        type : "post",
        url : "/AER/ExcelFilePacket",
        async : false,
        data : {
            projectId : projectId,
            sourceId : sourceId,
            sourceName : sourceName
            // costUUID : costUUID
        },
        beforeSend : function() {
            $.messager.progress({
                title : '提示',
                msg : 'Excel文件生成中，请稍候……',
                text : ''
            });
        },
        complete : function() {
            // 生成结束，成功或失败，
            // 取消遮罩
            // disLoad();
            $.messager.progress('close');
        },
        success : function(data) {
            if (data == "1") {
                // $.messager.alert('提示', 'INP文件压缩成功！', 'info');
            } else if (data == 0) {
                $.messager.alert('错误', '此污染源还没有生成结果文件！', 'error');
                inpFlag = false;
                return;
            } else {
                $.messager.alert('错误', 'Excel文件生成失败！', 'error');
                inpFlag = false;
                return;
            }
        }
    });
    if (!inpFlag) {
        return;
    }

    tool.dlFile({
        url : '/AER/DownExcelFilePacket?projectId=' + projectId
            + '&sourceId=' + sourceId + "&sourceName=" + sourceName,
        contentType : "application/json;chartset=utf-8"
    });
}
