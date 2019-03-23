var aerScreen = {
    Accept : null
};
$(function() {
    $('#txtX').numberbox({
        "onChange" : function(newValue, oldValue) {
            if (newValue == "") {
                return;
            }
            var X = parseFloat(newValue);
            if (X > 180) {
                X = 180;
            }
            if (X < -180) {
                X = -180
            }
            var Y = $('#txtY').numberbox('getValue');
            if (Y == "") {
                return;
            }
            var tiffz = getTiffZ(X, Y);
            $("#txtZ").numberbox('setValue', tiffz);

        }
    });
    $('#txtY').numberbox({
        "onChange" : function(newValue, oldValue) {
            if (newValue == "") {
                return;
            }
            var Y = parseFloat(newValue);
            if (Y > 90) {
                Y = 90;
            }
            if (Y < -90) {
                Y = -90;
            }
            var X = $('#txtX').numberbox('getValue');
            if (X == "") {
                return;
            }
            var tiffz = getTiffZ(X, Y);
            $("#txtZ").numberbox('setValue', tiffz);

        }
    });
})
function loadAcceptData() {Accept
    var feature = parent.CurrentFeature;
    $('#txtName').textbox("setValue", "敏感点");
    var id = "";
    // 如果parent.projectSourceManager == undefined ，则说明是Gis窗体在调用
    if (parent.projectSourceManager == undefined
        || parent.projectSourceManager == null) {
        // Gis窗体调用
        if (feature.Actioned == "add") {
            var longitude = feature.feature.getGeometry().getCoordinates()[0];
            var latitude = feature.feature.getGeometry().getCoordinates()[1];
            var currentProj = parent.Map.getView().getProjection();
            var center = parent.ol.proj.transform([ longitude, latitude ],
                currentProj, parent.CoordinateSystem);
            $('#txtX').numberbox('setValue', center[0]);
            $('#txtY').numberbox('setValue', center[1]);

            var tiffz = getTiffZ(center[0], center[1]);
            $("#txtZ").numberbox('setValue', tiffz);
            aerScreen.Accept = new Object();
            return;
        }
        var id = feature.getId();
    } else {
        // 管理源窗体在调用
        id = parent.projectSourceManager.id;
        if (parent.projectSourceManager.action == "add") {
            aerScreen.Accept = new Object();
            return;
        }
    }
    $.ajax({
        type : "post",
        asnyc : false,
        url : "/AER/getAccept?id=" + id,
        dataType : "json",
        data : "x",
        success : function(result, state) {
            aerScreen.Accept = result;
            $('#txtName').textbox("setValue", result.name);
            $('#txtX').numberbox('setValue', result.coordinate.x);
            $('#txtY').numberbox('setValue', result.coordinate.y);
            $('#txtZ').numberbox('setValue', result.coordinate.z);
        },
        error : function(httpRequest, state, errorThrown) {

        }
    });

}

$.fn.extend({
    alertWhileClick : function() {
        /*
         * $(this).click(function() { alert($(this).val()); });
         */
        return "xxxxxxx";
    }
});

$.extend({

    addxxx : function(a, b) {
        return a + b;
    }
});

function save() {
    var projId = null;
    var strUrl = "";
    if (parent.projectSourceManager == undefined
        || parent.projectSourceManager == null) {
        feature = parent.CurrentFeature;
        projId = feature.ProjectId;

        if (feature.Actioned == "edit") {
            aerScreen.Accept.id = feature.getId();
            strUrl = "/AER/updateAccept"

        } else {
            var guid = new GUID();
            var strId = guid.newGUID();
            aerScreen.Accept.id = strId;
            strUrl = "/AER/addAccept";
        }
    } else {
        if (parent.projectSourceManager.action == "add") {
            var guid = new GUID();
            var strId = guid.newGUID();
            aerScreen.Accept.id = strId;
            projId = parent.projectSourceManager.projId;
            strUrl = "/AER/addAccept";
        } else {
            projId = parent.projectSourceManager.projId;
            aerScreen.Accept.id = parent.projectSourceManager.id;
            strUrl = "/AER/updateAccept"
        }
    }


    aerScreen.Accept.name = $('#txtName').textbox('getValue');
    aerScreen.Accept.projId = projId;
    var coordinate={
        id : aerScreen.Accept.id,
        x : $('#txtX').numberbox('getValue'),
        y : $('#txtY').numberbox('getValue'),
        z : $('#txtZ').numberbox('getValue')
    };
    aerScreen.Accept.coordinate=coordinate;


    if (aerScreen.Accept.coordinate.x == "") {
        parent.$.messager.show({
            title : '提示',
            msg : "请填写经度",
            showType : 'show'
        });
        return null;
    }
    if (aerScreen.Accept.coordinate.y == "") {
        parent.$.messager.show({
            title : '提示',
            msg : "请填写纬度",
            showType : 'show'
        });
        return null;
    }

    var b = false;
    var jsonStr = JSON.stringify(aerScreen.Accept);
    $.ajax({
        type : "post",
        async : false,
        dataType : "json",
        contentType : "application/json;charset=utf-8",
        data : jsonStr,
        url : strUrl,
        success : function(result, state) {
            if (result[0] == 1) {
                b = true;
                parent.$.messager.show({
                    title : '提示',
                    msg : '提交成功',
                    showType : 'show'
                });
            } else {
                parent.$.messager.show({
                    title : '提示',
                    msg : '提交失败:' + result[0],
                    showType : 'show'
                });
                b = false;
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            parent.$.messager.show({
                title : '提示',
                msg : '提交失败:' + errorThrown,
                showType : 'show'
            });
            b = false;
        }
    });
    if (b) {
        return aerScreen.Accept;
    } else {
        return null;
    }
}
