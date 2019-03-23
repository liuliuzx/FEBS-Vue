var Map;
var Layers=null;
var Interactions;
var CurrentFeature;
var CurrentInteraction;
var Projection;
var grid;
var projectId = null;
var Action = "";
var Rectanglecenter;
var Coordinate=null;
var CoordinateSystem="EPSG:4326";
var newProj=null;
var DrawPointInteraction1;
var vectorSource;
var areaSource;
var newFeature;
var ReceptPoint;
var Receptarea;
var DrawRectangle;
var view;
var projectCur;
var modelCur;
var curFeatures=[];

// 创建一个WGS84球体对象
var wgs84Sphere = new ol.Sphere(6371008.8);
// 创建一个当前要绘制的对象
var sketch = new ol.Feature();
// 创建一个帮助提示框对象
var helpTooltipElement;
// 创建一个帮助提示信息对象
var helpTooltip;
// 创建一个节点测量提示框对象
var NodeTooltipElement;
// 创建一个节点测量提示信息对象
var NodeTooltip;
// 创建一个测量提示框对象
var measureTooltipElement;
// 创建一个测量提示信息对象
var measureTooltip;
// 创建关闭提示框对象
var closeTooltipElement;
// 创建关闭提示信息对象
var closeTooltip;
// 继续绘制线段的提示信息
var continueLineMsg = '单击以继续绘制直线';
// 定义一个事件监听
var listener;
// 定义一个控制鼠标点击次数的变量
var count = 0;
// 定义测距方法的状态是否启用 0未启用 1启用
var RangingStatic=0;
// 测距起始点
var Startpoint=null;
// 测距起始点提示框
var StartTooltip=null;
// 测距线条数
var LineFeatrueNumber=0;
// 初始化
function Initialize() {
    //document.getElementById("riskProjectTools").style.display="none";

    /**
     * 判断是否显示积分兑换模型权限,2.1号后可以删除
     */
// $.ajax({
// type:"get",
// url:"/user/isDisplayP",
// async: false,
// success:function(result){
// if(result==1){
// document.getElementById("myPermission").style.display = "block";
// choosePermission();
// }else{
// document.getElementById("myPermission").style.display = "none";
// }
// }
// });

    /**
     * 获取平台公告栏状态 是否显示公告栏
     */
    $.ajax({
        type:"get",
        url:"/user/notice",
        success:function(result){
            if(result.noticestate){
                var a=document.getElementById("NoticeTime");
                a.innerHTML=result.noticeTime
                var b=document.getElementById("NoticeContent").innerHTML=result.noticecontent;

                $("#SystemNotice").dialog({closed: false});
                $('#SystemNotice').window('center');
            }
        }
    });


    // 显示相关条件数据
    $('#dg').datagrid({
        title:'地面站逐时气象数据(红色)',
        border:false,
        rownumbers:true,
        fitColumns:false,
        striped:"true",
        columns:[[{field:'ck',checkbox:true},
            {field:'id',title:'编号',hidden:'true'},
            {field:'longitudes',title:'经度',width:60},
            {field:'latitudes',title:'纬度',width:60},
            {field:'altitude',title:'海拔',width:60},
            {field:'distance',title:'距离(km)',width:60},
            {field:'thisyear',title:'年份',width:50}
        ]],
        onSelect:function(){
            summ();
        },
        onUnselect:function(){
            summ();
        },
        onSelectAll:function(){
            summ();
        },
        onUnselectAll:function(){
            summ();
        },
    });
    $('#dg1').datagrid({
        title:'高空模拟气象数据(蓝色)',
        border:false,
        rownumbers:true,
        fitColumns:false,
        striped: "true",
        columns:[[{field:'ck',checkbox:true},
            {field:'id',title:'编号',hidden:'true'},
            {field:'longitudes',title:'经度',width:60},
            {field:'latitudes',title:'纬度',width:60},
            {field:'altitude',title:'海拔',width:60},
            {field:'distance',title:'距离(km)',width:60},
            {field:'thisyear',title:'年份',width:50}
        ]],
        onSelect:function(){
            summ();
        },
        onUnselect:function(){
            summ();
        },
        onSelectAll:function(){
            summ();
        },
        onUnselectAll:function(){
            summ();
        },
    });
    $('#dg2').datagrid({
        title:'总云量数据(蓝色)',
        border:false,
        rownumbers:true,
        fitColumns:false,
        striped: "true",
        columns:[[ {field:'ck',checkbox:true},
            {field:'id',title:'编号',hidden:'true'},
            {field:'longitudes',title:'经度',width:60},
            {field:'latitudes',title:'纬度',width:60},
            {field:'altitude',title:'海拔',width:60},
            {field:'distance',title:'距离(km)',width:60},
            {field:'thisyear',title:'年份',width:50}
        ]],
        onSelect:function(){
            summ();
        },
        onUnselect:function(){
            summ();
        },
        onSelectAll:function(){
            summ();
        },
        onUnselectAll:function(){
            summ();
        },
    });
    $('#dg3').datagrid({
        title:'已下载-地面站逐时气象数据(红色)',
        border:false,
        rownumbers:true,
        fitColumns:false,
        striped:"true",
        columns:[[{field:'ck',checkbox:true},
            {field:'id',title:'编号',hidden:'true'},
            {field:'longitudes',title:'经度',width:60},
            {field:'latitudes',title:'纬度',width:60},
            {field:'altitude',title:'海拔',width:60},
// {field:'distance',title:'距离(km)',width:60},
            {field:'thisyear',title:'年份',width:50}
        ]],
        onSelect:function(){
            summ();
        },
        onUnselect:function(){
            summ();
        },
        onSelectAll:function(){
            summ();
        },
        onUnselectAll:function(){
            summ();
        },
    });
    $('#dg4').datagrid({
        title:'已下载-高空模拟气象数据(黄色)',
        border:false,
        rownumbers:true,
        fitColumns:false,
        striped: "true",
        columns:[[{field:'ck',checkbox:true},
            {field:'id',title:'编号',hidden:'true'},
            {field:'longitudes',title:'经度',width:60},
            {field:'latitudes',title:'纬度',width:60},
            {field:'altitude',title:'海拔',width:60},
// {field:'distance',title:'距离(km)',width:60},
            {field:'thisyear',title:'年份',width:50}
        ]],
        onSelect:function(){
            summ();
        },
        onUnselect:function(){
            summ();
        },
        onSelectAll:function(){
            summ();
        },
        onUnselectAll:function(){
            summ();
        },
    });
    $('#dg5').datagrid({
        title:'已下载-总云量数据(紫色)',
        border:false,
        rownumbers:true,
        fitColumns:false,
        striped: "true",
        columns:[[ {field:'ck',checkbox:true},
            {field:'id',title:'编号',hidden:'true'},
            {field:'longitudes',title:'经度',width:60},
            {field:'latitudes',title:'纬度',width:60},
            {field:'altitude',title:'海拔',width:60},
// {field:'distance',title:'距离(km)',width:60},
            {field:'thisyear',title:'年份',width:50}
        ]],
        onSelect:function(){
            summ();
        },
        onUnselect:function(){
            summ();
        },
        onSelectAll:function(){
            summ();
        },
        onUnselectAll:function(){
            summ();
        },
    });

    // 加载时获取数据库中有的数据年份
    $.ajax({
        type:"post",
        url:"/datachoice/selectyears",
        success:function(data){
            var data1=eval("("+data+")");

            $(data1).each(function(i){
                if(i==0){
                    $('#selectyears').append("<input type='checkbox' onclick='selectyearschkclk(this)' checked value="+this+" name='thisyear'>"+this);
                }else{
                    $('#selectyears').append("<input type='checkbox' onclick='selectyearschkclk(this)' value="+this+" name='thisyear'>"+this);
                }
            })
        }
    });
    $("#pointpop").dialog({
        onClose:function(){
            deleteicon();
        }
    });

    view = new ol.View({
        projection : 'EPSG:900913',
        // center : [ 117, 37 ],
        zoom : 8,
        zoomFactor : 1.6
    });

    Map = new ol.Map({
        target : 'map',
        interactions : [],
        view : view
    });
    var center=[117,37];
    center=ol.proj.transform(center,'EPSG:4326', 'EPSG:900913');
    Map.getView().setCenter(center);
    AddLayers();
    AddControls();
    AddInteractions();
    InitializationMenu();
    InitializationOnClicked();
}




// 年份选择框，单击事件
function selectyearschkclk(chk){
    var boxes = document.getElementById('selectyears').getElementsByTagName("input");
    for(var i=0; i<boxes.length; i++){
        boxes[i].checked = false;
    }

    chk.checked = true;
}


// 数据类型选择框，单击事件
function selecttypechkclk(chk){
    var boxes = document.getElementById('selecttype').getElementsByTagName("input");
    for(var i=0; i<boxes.length; i++){
        boxes[i].checked = false;
    }

    chk.checked = true;
}

var gridsetName = 'EPSG:900913';
var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
var baseUrl = null;
var style = '';
var format = 'image/png';
var infoFormat = 'text/html';
var layerName = 'WRF:ChinaLayers';
var projection = new ol.proj.Projection({
    code: 'EPSG:900913',
    units: 'm',
    axisOrientation: 'neu'
});
var resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];
baseParams = ['VERSION','LAYER','STYLE','TILEMATRIX','TILEMATRIXSET','SERVICE','FORMAT'];

params = {
    'VERSION': '1.0.0',
    'LAYER': layerName,
    'STYLE': style,
    'TILEMATRIX': gridNames,
    'TILEMATRIXSET': gridsetName,
    'SERVICE': 'WMTS',
    'FORMAT': format
};

function constructSource() {
    var url = baseUrl+'?'
    for (var param in params) {
        if (baseParams.indexOf(param.toUpperCase()) < 0) {
            url = url + param + '=' + params[param] + '&';
        }
    }
    url = url.slice(0, -1);

    var source = new ol.source.WMTS({
        url: url,
        layer: params['LAYER'],
        matrixSet: params['TILEMATRIXSET'],
        format: params['FORMAT'],
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
            tileSize: [256,256],
            extent: [-2.003750834E7,-2.003750834E7,2.003750834E7,2.003750834E7],
            origins: [[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7],[-2.003750834E7, 2.003750834E7]],
            resolutions: resolutions,
            matrixIds: params['TILEMATRIX']
        }),
        style: params['STYLE'],
        wrapX: true
    });
    return source;
}
/**
 * 添加图层
 *
 * @returns
 */
var baseLayer,baseLayer1;
function AddLayers() {
    // 添加底图
    $.ajax({
        url:"/Gis/GetUrl",
        async:false,
        type: "post",
        success:function(data){
            ip=data[0];
            port=data[1];
        }
    });
    baseUrl='http://'+ip+':'+port+'/geoserver/gwc/service/wmts';
    /*
	 * baseLayer = new ol.layer.Tile({ visible: true, source:constructSource()
	 * }); Map.addLayer(baseLayer);
	 */




    // 天地图注记
    baseLayer = new ol.layer.Tile({
        title: "天地图文字标注",
        source: new ol.source.XYZ({
            url: 'http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=9fc98a318807dd40ed288e385fd6e180'
        })
    });
    Map.addLayer(baseLayer);
    // 天地图路网
    baseLayer1 = new ol.layer.Tile({
        title: "天地图路网",
        source: new ol.source.XYZ({
            url: "http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=9fc98a318807dd40ed288e385fd6e180"
        })
    });
    // Map.addLayer(baseLayer1);
    Map.getLayers().insertAt(1,baseLayer1);


    var PointLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(255,165,0, 1)'// 点填充颜色
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',// 点边界颜色
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(PointLayer);

    var AcceptLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(65,105,225,1)'
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(AcceptLayer);

    var SRAPointLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image :new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/image/point.png',
                })),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    font : "10px Normal Arial",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(SRAPointLayer);

    var RectangleLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.1)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'red',
                    width : 1
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(RectangleLayer);

    var FlareLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(220,20,60,1)'
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(FlareLayer);

    var CircleLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.1)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'red',
                    width : 1
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(CircleLayer);

    var VolumeleLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.1)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'red',
                    width : 1
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(VolumeleLayer);
    // 接收点层
    vectorSource=new ol.source.Vector();
    ReceptPoint = new ol.layer.Vector({
        source:vectorSource,
        style:function () {
            // 返回一个样式
            return new ol.style.Style({
                // 把点的样式换成ICON图标
                image: new ol.style.Icon({
                    // 控制标注图片和文字之间的距离
                    anchor: [0.5, 40],
                    // 标注样式的起点位置
                    anchorOrigin: 'center',
                    // X方向单位：分数
                    anchorXUnits: 'fraction',
                    // Y方向单位：像素
                    anchorYUnits: 'pixels',
                    // 偏移起点位置的方向
                    offsetOrigin: 'top-right',
                    // 透明度
                    opacity: 1,
                    // 图片路径
                    src: '/image/point.png'
                }),
                // 文本样式
                text: new ol.style.Text({
                    // 对齐方式
                    textAlign: 'center',
                    // 文本基线
                    textBaseline: 'middle',
                    // 字体样式
                    font: 'normal 12px 微软雅黑',
                    // 文本内容 text
                    text:'',
                    // 填充样式
                    fill: new ol.style.Fill({
                        color: '#aa3300'
                    }),
                    // 笔触
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    })
                })
            });
        }
    });
    Map.addLayer(ReceptPoint);
    // 接受区域层
    areaSource=new ol.source.Vector();
    Receptarea = new ol.layer.Vector({
        source:areaSource
    });
    Map.addLayer(Receptarea);


    // 定义测距图层
    var RangingVector = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#e21e0a',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    // 将测距图层添加到地图中
    Map.addLayer(RangingVector);

    // Risk设备相关
    // 低温液化气容器
    var LowLiquefactionGasContainerLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(255,165,0, 1)'// 点填充颜色
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',// 点边界颜色
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(LowLiquefactionGasContainerLayer);


    // 常温常压液体容器
    var NormalLiquidContainerLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(255,165,0, 1)'// 点填充颜色
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',// 点边界颜色
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(NormalLiquidContainerLayer);

    // 压力气体容器
    var PressureGasContainerLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(255,165,0, 1)'// 点填充颜色
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',// 点边界颜色
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(PressureGasContainerLayer);

    // 压力液化气
    var PressureLiquefiedGasLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(255,165,0, 1)'// 点填充颜色
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',// 点边界颜色
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(PressureLiquefiedGasLayer);

    var RiskAcceptLayer = new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                image : new ol.style.Circle({
                    radius : 5,
                    fill : new ol.style.Fill({
                        color : 'rgba(65,105,225,1)'
                    }),
                    stroke : new ol.style.Stroke({
                        color : 'rgba(255,69,0, 1)',
                        width : 1
                    })
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(RiskAcceptLayer);

    // 等值线图层
    var IsolineLayer=new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.1)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'red',
                    width : 1
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(IsolineLayer);
    // 等值面图层
    var IsosurfaceLayer=new ol.layer.Vector({
        source : new ol.source.Vector(),
        style : function(feature, resolution) {
            return new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.1)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'red',
                    width : 1
                }),
                text : new ol.style.Text({
                    textAlign : "Center",
                    textBaseline : "Middle",
                    fill: new ol.style.Fill({
                        color : 'rgba(199,21,133, 1)'// 字体颜色
                    }),
                    font : "17px Normal Microsoft Yahei",
                    text : feature.get('Name')
                })
            });
        }
    });
    Map.addLayer(IsosurfaceLayer);


    Layers = new Array();
    Layers["Base"] = baseLayer;
    Layers["Point"] = PointLayer;
    Layers["Accept"] = AcceptLayer;
    Layers["Rectangle"] = RectangleLayer;
    Layers["Flare"] = FlareLayer;
    Layers["Circle"] = CircleLayer;
    Layers["Volume"] = VolumeleLayer;
    Layers["SRAPoint"] = SRAPointLayer;
    Layers["ReceptPoint"] = ReceptPoint;
    Layers["ReceptArea"] = Receptarea;
    Layers["Ranging"]=RangingVector;
    // Risk设备相关
    // 低温液化气容器
    Layers["LowLiquefactionGasContainer"]=LowLiquefactionGasContainerLayer;
    // 常温常压液体容器
    Layers["NormalLiquidContainer"]=NormalLiquidContainerLayer;
    // 压力气体容器
    Layers["PressureGasContainer"]=PressureGasContainerLayer;
    // 压力液化气
    Layers["PressureLiquefiedGas"]=PressureLiquefiedGasLayer;
    // 风险敏感点
    Layers["RiskAccept"]=RiskAcceptLayer;

    // 等值线图层
    Layers["Isoline"]=IsolineLayer;
    // 等值面图层
    Layers["Isosurface"]=IsosurfaceLayer;
}

/**
 * 添加交互功能
 *
 * @returns
 */
function AddInteractions() {
    var PanInteraction = new ol.interaction.DragPan();
    Map.addInteraction(PanInteraction);
    PanInteraction.setActive(true);

    var ZoomInteraction = new ol.interaction.MouseWheelZoom();
    Map.addInteraction(ZoomInteraction);
    ZoomInteraction.setActive(true);

    var SelectInteraction = new ol.interaction.Select({
        layers : [ Layers["Point"], Layers["Rectangle"], Layers["Flare"],
            Layers["Circle"], Layers["Volume"], Layers["Accept"] ,
            Layers["LowLiquefactionGasContainer"] ,
            Layers["NormalLiquidContainer"] ,
            Layers["PressureGasContainer"] ,
            Layers["PressureLiquefiedGas"],
            Layers["RiskAccept"] ]
    });
    Map.addInteraction(SelectInteraction);
    SelectInteraction.setActive(true);


    var DrawPointInteraction = new ol.interaction.Draw({
        source : Layers["Point"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawPointInteraction);
    DrawPointInteraction.setActive(false);
    DrawPointInteraction.on('drawend', dlgAddOrEditPoint);

    var DrawAcceptInteraction = new ol.interaction.Draw({
        source : Layers["Accept"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawAcceptInteraction);
    DrawAcceptInteraction.setActive(false);
    DrawAcceptInteraction.on('drawend', dlgAddOrEditAccept);

    var DrawSRAPointInteraction = new ol.interaction.Draw({
        source : Layers["SRAPoint"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawSRAPointInteraction);
    DrawSRAPointInteraction.setActive(false);
    DrawSRAPointInteraction.on('drawend', dlgAddSRAPoint);

    var DrawPolygonInteraction = new ol.interaction.Draw({
        source : Layers["Rectangle"].getSource(),
        type : ('Polygon'),
        minPoints : 3,
        maxPoints : 3,
        geometryFunction : function(coordinates, geometry) {
            if (!geometry) {
                geometry = new ol.geom.Polygon(null);
            }
            var firstpoint=coordinates[0][0];
            var secondpoint=coordinates[0][1];
            var thirdpoint=coordinates[0][2];
            if(thirdpoint==undefined){
                thirdpoint=secondpoint;
            }
            var dx=firstpoint[0]-secondpoint[0];
            var dy=firstpoint[1]-secondpoint[1];
            var rotation = Math.atan2(dy, dx);
            var angle=Math.PI/2+rotation;
            dx=thirdpoint[0]-secondpoint[0];
            dy=thirdpoint[1]-secondpoint[1];
            var radius = Math.sqrt(dx * dx + dy * dy);
            var rotation1=Math.atan2(dy, dx);
            var angle1=angle-rotation1;
            var tempborder=radius*Math.cos(angle1);
            var offsetX =tempborder*Math.cos(angle);
            var offsetY =tempborder*Math.sin(angle);
            var newCoordinates = [];
            newCoordinates.push([firstpoint[0],firstpoint[1]]);
            newCoordinates.push([secondpoint[0],secondpoint[1]]);
            newCoordinates.push([secondpoint[0]+offsetX,secondpoint[1]+offsetY]);
            newCoordinates.push([firstpoint[0]+offsetX,firstpoint[1]+offsetY]);
            newCoordinates.push([firstpoint[0],firstpoint[1]]);
            geometry.setCoordinates([ newCoordinates ]);



            /*
			 * Rectanglecenter=coordinates[0][0]; var center =
			 * coordinates[0][0]; var last = coordinates[0][1]; var dx =
			 * center[0] - last[0]; var dy = center[1] - last[1]; var radius =
			 * Math.sqrt(dx * dx + dy * dy); var rotation = Math.atan2(dy, dx);
			 * var newCoordinates = []; var numPoints = 12; for (var i = 0; i <
			 * numPoints; ++i) { var angle = rotation + i *2 * Math.PI /
			 * numPoints; var fraction = i % 2 === 0 ? 1 : 0.5; var offsetX =
			 * radius * fraction * Math.cos(angle); var offsetY = radius *
			 * fraction * Math.sin(angle); if(i==0||i==2||i==6||i==8){
			 * newCoordinates .push([ center[0] + offsetX, center[1] + offsetY
			 * ]); } } newCoordinates.push(newCoordinates[0].slice());
			 * geometry.setCoordinates([ newCoordinates ]);
			 */

            return geometry;
        }
    });
    Map.addInteraction(DrawPolygonInteraction);
    DrawPolygonInteraction.setActive(false);
    DrawPolygonInteraction.on('drawend', dlgAddOrEditRectangle);

    var DrawFlareInteraction = new ol.interaction.Draw({
        source : Layers["Flare"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawFlareInteraction);
    DrawFlareInteraction.setActive(false);
    DrawFlareInteraction.on('drawend', dlgAddOrEditFlare);


    var DrawCircleInteraction = new ol.interaction.Draw({
        source : Layers["Circle"].getSource(),
        type : ('Circle')
    });
    Map.addInteraction(DrawCircleInteraction);
    DrawCircleInteraction.setActive(false);
    DrawCircleInteraction.on('drawend', dlgAddOrEditCircle);

    var DrawVolumeInteraction = new ol.interaction.Draw({
        source : Layers["Volume"].getSource(),
        type : ('Circle'),
        // geometryFunction : ol.interaction.Draw.createRegularPolygon(4)
        geometryFunction:function(coordinates, geometry) {
            if (!geometry) {
                geometry = new ol.geom.Polygon(null);
            }
            var center = coordinates[0];
            var last = coordinates[1];
            var dx = center[0] - last[0];
            var dy = center[1] - last[1];
            var radius = Math.sqrt(dx * dx + dy * dy);
            var newCoordinates = [];
            var numPoints = 4;
            var bianchang=Math.sin(Math.PI / numPoints)*radius*2;
            newCoordinates.push([ center[0] - bianchang/2, center[1] + bianchang/2 ]);// 左上角
            newCoordinates.push([ center[0] + bianchang/2, center[1] + bianchang/2 ]);// 右上角
            newCoordinates.push([ center[0] + bianchang/2, center[1] - bianchang/2 ]);// 右下角
            newCoordinates.push([ center[0] - bianchang/2, center[1] - bianchang/2 ]);// 左下角
            newCoordinates.push([ center[0] - bianchang/2, center[1] + bianchang/2 ]);// 左上角
            geometry.setCoordinates([ newCoordinates ]);
            return geometry;
        }
    });
    Map.addInteraction(DrawVolumeInteraction);
    DrawVolumeInteraction.setActive(false);
    DrawVolumeInteraction.on('drawend', dlgAddOrEditVolume);

    DrawPointInteraction1 = new ol.interaction.Draw({
        source: Layers["ReceptPoint"].getSource(),
        type: ('Point')
    });
    Map.addInteraction(DrawPointInteraction1);
    // 开启点标记
    DrawPointInteraction1.setActive(false);
    DrawPointInteraction1.on('drawend', drowpoint);
    // 矩形
    DrawRectangle = new ol.interaction.Draw({
        source: Layers["ReceptArea"].getSource(),
        type: ('Circle'),
        /* type: ('LineString'), */
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        }),
        geometryFunction:ol.interaction.Draw.createBox()
    });
// Map.addInteraction(DrawRectangle);
// DrawRectangle.setActive(false);
// DrawRectangle.on('drawend',drowrectangle);

    // 创建一个交互式测距绘图对象
    var DrawRanging = new ol.interaction.Draw({
        // 绘制的数据源
        source: Layers["Ranging"].getSource(),
        // 绘制类型
        type: "LineString",
        // 样式
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0,0,0,0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0,0,0,0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255,255,255,0.2)'
                })
            })
        })
    });
    // 将交互测距绘图对象添加到地图中
    Map.addInteraction(DrawRanging);
    DrawRanging.setActive(false);
    DrawRanging.on('drawstart', StartDrawRanging);
    DrawRanging.on('drawend', EndDrawRanging);

    // Risk设备相关
    // 低温液化气容器
    var DrawLowLiquefactionGasContainerInteraction = new ol.interaction.Draw({
        source : Layers["LowLiquefactionGasContainer"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawLowLiquefactionGasContainerInteraction);
    DrawLowLiquefactionGasContainerInteraction.setActive(false);
    DrawLowLiquefactionGasContainerInteraction.on('drawend', dlgAddOrEditLowLiquefactionGasContainer);
    // 压力气体容器
    var DrawPressureGasContainerInteraction = new ol.interaction.Draw({
        source : Layers["PressureGasContainer"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawPressureGasContainerInteraction);
    DrawPressureGasContainerInteraction.setActive(false);
    DrawPressureGasContainerInteraction.on('drawend', dlgAddOrEditPressureGasContainer);

    // 常温常压液体容器
    var DrawNormalLiquidContainerInteraction = new ol.interaction.Draw({
        source : Layers["NormalLiquidContainer"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawNormalLiquidContainerInteraction);
    DrawNormalLiquidContainerInteraction.setActive(false);
    DrawNormalLiquidContainerInteraction.on('drawend', dlgAddOrEditNormalLiquidContainer);
    // 压力液化气
    var DrawPressureLiquefiedGasInteraction = new ol.interaction.Draw({
        source : Layers["PressureLiquefiedGas"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawPressureLiquefiedGasInteraction);
    DrawPressureLiquefiedGasInteraction.setActive(false);
    DrawPressureLiquefiedGasInteraction.on('drawend', dlgAddOrEditPressureLiquefiedGas);

    var DrawRiskAcceptInteraction = new ol.interaction.Draw({
        source : Layers["RiskAccept"].getSource(),
        type : ('Point')
    });
    Map.addInteraction(DrawRiskAcceptInteraction);
    DrawRiskAcceptInteraction.setActive(false);
    DrawRiskAcceptInteraction.on('drawend', dlgAddOrEditRiskAccept);

    Interactions = new Array();
    Interactions["Pan"] = PanInteraction;
    Interactions["Zoom"] = ZoomInteraction;
    Interactions["Select"] = SelectInteraction;
    Interactions["Point"] = DrawPointInteraction;
    Interactions["Accept"] = DrawAcceptInteraction;

    Interactions["Rectangle"] = DrawPolygonInteraction;
    Interactions["Flare"] = DrawFlareInteraction;
    Interactions["Circle"] = DrawCircleInteraction;
    Interactions["Volume"] = DrawVolumeInteraction;
    Interactions["SRAPoint"] = DrawSRAPointInteraction;
    Interactions["ReceptPoint"] = DrawPointInteraction1;
// Interactions["DrawRectangle"] = DrawRectangle;
    Interactions["Ranging"] = DrawRanging;
    // Risk设备相关
    // 低温液化气容器
    Interactions["LowLiquefactionGasContainer"] = DrawLowLiquefactionGasContainerInteraction;
    // 压力气体容器
    Interactions["PressureGasContainer"] = DrawPressureGasContainerInteraction;
    // 常温常压液体容器
    Interactions["NormalLiquidContainer"] = DrawNormalLiquidContainerInteraction;
    // 压力液化气
    Interactions["PressureLiquefiedGas"] = DrawPressureLiquefiedGasInteraction;

    Interactions["RiskAccept"] = DrawRiskAcceptInteraction;
}
// 改变地图样式
var mapType;
function mapChange(type){
    if(type==0){
        // 添加底图
        if(mapType!=0){
            Map.removeLayer(baseLayer);
            Map.removeLayer(baseLayer1);
            baseLayer = new ol.layer.Tile({
                visible: true,
                source:constructSource()
            });
            Map.getLayers().insertAt(0,baseLayer);
            /*
			 * document.getElementById("moren").style.border="1px solid
			 * #5c5e59"; document.getElementById("moren").style.boxShadow="0px
			 * 0px 10px #3e76b5";
			 */
            var div = document.getElementById('moren');
            div.className = 'tag2 active';
        }
    }else if(type==1){
        if(mapType!=1){
            Map.removeLayer(baseLayer);
            if(mapType!=2)
                Map.removeLayer(baseLayer1);
            // 天地图路网
            baseLayer1 = new ol.layer.Tile({
                title: "天地图路网",
                source: new ol.source.XYZ({
                    url: "http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=07af12471b370debbae8d06910063997"
                })
            });
            // Map.addLayer(baseLayer1);
            Map.getLayers().insertAt(0,baseLayer1);
            // 天地图注记
            baseLayer = new ol.layer.Tile({
                title: "天地图文字标注",
                source: new ol.source.XYZ({
                    url: 'http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=07af12471b370debbae8d06910063997'
                })
            });
            // Map.addLayer(baseLayer);
            Map.getLayers().insertAt(1,baseLayer);
        }
    }else if(type==2){
        if(mapType!=2){
            Map.removeLayer(baseLayer);
            Map.removeLayer(baseLayer1);
            // google地图层
            baseLayer = new ol.layer.Tile({
                title: "谷歌图",
                source: new ol.source.XYZ({
                    url:'http://ditu.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
                })
            });
            // Map.addLayer(baseLayer);
            Map.getLayers().insertAt(0,baseLayer);
        }
    }else if(type==3){
        if(mapType!=3){Map.removeLayer(baseLayer);
            Map.removeLayer(baseLayer);
            if(mapType!=2)
                Map.removeLayer(baseLayer1);
            baseLayer = new ol.layer.Tile({
                title: "天地图卫星影像",
                source: new ol.source.XYZ({
                    url: 'http://t{0-6}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=07af12471b370debbae8d06910063997'
                })
            });
            Map.getLayers().insertAt(0,baseLayer);
            // 天地图注记
            baseLayer1 = new ol.layer.Tile({
                title: "天地图文字标注",
                source: new ol.source.XYZ({
                    url: 'http://t{0-6}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=07af12471b370debbae8d06910063997'
                })
            });
            // Map.addLayer(baseLayer);
            Map.getLayers().insertAt(1,baseLayer1);
        }
    }else if(type==4){
        if(mapType!=4){
            Map.removeLayer(baseLayer);
            if(mapType!=2)
                Map.removeLayer(baseLayer1);
            baseLayer = new ol.layer.Tile({
                title: "谷歌影像图",
                source: new ol.source.XYZ({
                    url:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
                })
            });
            Map.getLayers().insertAt(0,baseLayer);
            // 标注
            baseLayer1 = new ol.layer.Tile({
                title: "谷歌影像图文字标注",
                source: new ol.source.XYZ({
                    url: 'http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}'
                })
            });
            // Map.addLayer(baseLayer);
            Map.getLayers().insertAt(1,baseLayer1);
        }
    }
    mapType = type;
}
/**
 * 添加控件
 *
 * @returns
 */
function AddControls() {
    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat : ol.coordinate.createStringXY(4),
        projection : "EPSG:4326",
        className:'custom-mouse-position',
        target : document.getElementById('mousePosition'),
        //undefinedHTML : '&nbsp;'
    });
    Map.addControl(mousePositionControl);
    //小刘加的比例尺 2019.02.26 22:00
    var scaleLineControl = new ol.control.ScaleLine();
    Map.addControl(scaleLineControl);
}

/**
 * 初始化右键菜单
 *
 * @returns
 */
function InitializationMenu() {
    $(Map.getViewport()).on("contextmenu", function(event) {
        event.preventDefault();// 取消右键默认行为
        if(RangingStatic==1){
            EndRanging();
            return;
        }

        var selectInteraction = Interactions["Select"];
        var features = selectInteraction.getFeatures().getArray();

        switch (ModelSwitch) {
            case 1:
                $('#SRAmenuRight').menu('show', {
                    left : event.pageX,
                    top : event.pageY
                });
                break;
            case 2:
                if (features.length <= 0) {
                    $('#AERmenuRight').menu('show', {
                        left : event.pageX,
                        top : event.pageY
                    });
                }
                else
                {
                    $('#menuRight').menu('show', {
                        left : event.pageX,
                        top : event.pageY
                    });
                }
                break;
            default:
                break;
        }

        if (features.length==1)
        {
            switch (features[0].S.ModelType) {
                case "Risk":
                    $('#RiskMenuRight').menu('show', {
                        left : event.pageX,
                        top : event.pageY
                    });

                    var item = $('#RiskMenuRight').menu('findItem', '敏感点曲线');
                    if (features[0].S.LayerName== "RiskAccept")
                    {
                        $('#RiskMenuRight').menu('enableItem', item.target);
                    }
                    else
                    {
                        $('#RiskMenuRight').menu('disableItem', item.target);
                    }
                    break;

                default:
                    break;
            }
        }

    });
}

function onRiskRightClick(item)
{
    var selectInteraction = Interactions["Select"];
    var features = selectInteraction.getFeatures().getArray();

    if (features.length!=1)
    {
        return;
    }
    var id = features[0].getId();
    switch (item.name) {
        case "edit":
            switch (features[0].S.LayerName) {
                case "LowLiquefactionGasContainer":
                    dlgAddOrEditLowLiquefactionGasContainer(id,"edit");
                    break;
                case "NormalLiquidContainer":
                    dlgAddOrEditNormalLiquidContainer(id,"edit");
                    break;
                case "PressureGasContainer":
                    dlgAddOrEditPressureGasContainer(id,"edit");
                    break;
                case "PressureLiquefiedGas":
                    dlgAddOrEditPressureLiquefiedGas(id,"edit");
                    break;
                case "RiskAccept":
                    dlgAddOrEditRiskAccept(id,"edit");
                    break;
                default:
                    break;
            }
            break;
        case "del":

            if ( features[0].S.LayerName=="RiskAccept")
            {
                delRiskAccept(id);
            }
            else
            {
                var node = $('#treeViewSollution').tree('find', id);
                delEquipment(node);
            }
            break;
        case "acceptLine":

            var eqId=  selectEquipment .id;
            var sourceId= selectSource.id;
            var metId= selectMet.id;
            dlgShowAcceptLine(id);
            break;
        default:
            break;
    }
}

/**
 * 右键菜单
 *
 * @param item
 * @returns
 */
function menuHandler(item) {
    switch (item.name) {
        case "edit":
            EditSelectedFeature();
            break;
        case "del":
            RemoveSelectedFeature();

            break;
        case "showResult":
            var selectInteraction = Interactions["Select"];
            var features = selectInteraction.getFeatures().getArray();
            if (features.length != 1)
                return;
            featu = features[0];
            var layerName = featu.get("LayerName");
            var name=featu.get("Name");
            var id = featu.getId();
            onShowSourceResult(id,name);
            break;
        case "downInpFiles":
            var selectInteraction = Interactions["Select"];
            var features = selectInteraction.getFeatures().getArray();
            if (features.length != 1)
                return;
            featu = features[0];
            var layerName = featu.get("LayerName");
            var name=featu.get("Name");
            var id = featu.getId();
            CreateInpFile(id,name);
            break;
        case "downExcelFiles":
            var selectInteraction = Interactions["Select"];
            var features = selectInteraction.getFeatures().getArray();
            if (features.length != 1)
                return;
            featu = features[0];
            var layerName = featu.get("LayerName");
            var name=featu.get("Name");
            var id = featu.getId();
            CreateExcelFile(id,name);
            break;
        default:

            break;
    }

}
/**
 * ARE项目右键菜单
 */
function AERmenuHandler(item){
    switch (item.name) {
        case "newProj":
            dlgaddProject();
            break;
        case "projectManage":
            dlgProjectManagement();
            break;

        default:

            break;
    }
}
/**
 * AER左键菜单
 */
function AERmenuLeft(item){
    switch(item.name){
        case "projectMessage":
            dlgViewProjectParameter();
            break;
        case "projectSource":
            dlgProjectSource();
            break;
        case "point":
            item.id="Point";
            item.innHTML="点源";
            ToggleInteraction(item);
            break;
        case "Volume":
            item.innHTML="体源";
            item.id="Volume";
            ToggleInteraction(item);
            break;
        case "Flare":
            item.innHTML="火炬源";
            item.id="Flare";
            ToggleInteraction(item);
            break;
        case "Rectangle":
            item.id="Rectangle";
            item.innHTML="矩形面源";
            ToggleInteraction(item);
            break;
        case "Circle":
            item.id="Circle";
            item.innHTML="圆形面源";
            ToggleInteraction(item);
            break;
        case "SourceLayerShow":
            openSourceLayerdlg();
            break;
        case "SourceParameter":
            dlgSourceParameter();
            break;
        case "aerRun":
            dlgRunProject();
            break;
        default:

            break;
    }
}
/**
 * 风险评估项目右键菜单
 */
function SRAmenuHandler(item){
    switch (item.name) {
        case "newProj":
            var item={id:"SRAPoint",innerHTML:"点源"};
            ToggleInteraction(item);
            break;
        case "projectManage":
            SRAProjectShow();
            break;

        default:

            break;
    }
}
/**
 * 风险评估项目左键菜单
 */
function SRAleftmenuHandler(item){
    switch (item.name) {
        case "projectMessage":
            SRAProjectMessageShow();
            break;
        case "excelImport":
            ImportPollutans();
            break;
        case "choosePollutans":
            ChoosePollutants();
            break;
        case "exposurePath":
            exposurePath();
            break;
        case "sraParam":
            setSRAParam();
            break;
        case "sraRun":
            dlgSraRun();
            break;
        default:

            break;
    }
}
/**
 * 初始化鼠标单击功能
 *
 * @returns
 */
function InitializationOnClicked() {

    // 123456789
    Map.on('singleclick', function(e) {
        if(RangingStatic==1){
            // 设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
            NodeTooltip.setPosition(e.coordinate);

            // 如果是第一次点击，则设置测量提示框的文本内容为起点
            if (count == 0) {
                NodeTooltipElement.innerHTML = "起点";
                StartTooltip=NodeTooltip;
            }else{
                // 获取绘制的几何对象
                var geom = sketch.getGeometry();
                // 定义一个输出对象，用于记录长度
                var output;
                // 输出多线段的长度
                output = formatNodeLength(geom);
                NodeTooltipElement.innerHTML=output;
                StartTooltip=null;
                Startpoint=null;
            }

            // 更改测量提示框的样式，使测量提示框可见
            // measureTooltipElement.className = 'tooltip tooltip-static';
            // 根据鼠标点击位置生成一个点
            var point = new ol.geom.Point(e.coordinate);
            Startpoint=new ol.Feature(point);
            Startpoint.tempId=LineFeatrueNumber;
            // 将该点要素添加到矢量数据源中
            Layers["Ranging"].getSource().addFeature(Startpoint);

            curFeatures.push(Startpoint);
            // 创建测量提示框
            createNodeTooltip(LineFeatrueNumber);
            // 点击次数增加
            count++;
            return;
        }
        var pixel = Map.getEventPixel(e.originalEvent);
        var feature = Map.forEachFeatureAtPixel(pixel, function(feature) {
            return feature;
        });
        if (feature == undefined || feature.S.LayerName == undefined) {

            return;
        }
        if (!Interactions["Select"].getActive()) {
            return;
        }


        switch (ModelSwitch) {
            case 1:
                if(feature.S.LayerName=="SRAPoint"){
                    $('#SRAmenuLeft').menu('show', {
                        left : pixel[0],
                        top : pixel[1]
                    });
                }
                break;
            case 2:
                var layerName = feature.S.LayerName;
                if (layerName=="Accept")
                {
                    document.getElementById("showResult").style.display="none";// 隐藏
                    document.getElementById("downExcelFiles").style.display="none";// 隐藏
                    document.getElementById("downInpFiles").style.display="none";// 隐藏
                }
                else
                {
                    document.getElementById("showResult").style.display="";//
                    document.getElementById("downExcelFiles").style.display="";//
                    document.getElementById("downInpFiles").style.display="";//
                }
                dlgPerSourceInformation(feature.a, layerName);
                break;
            default:
                break;
        }

        switch (feature.S.ModelType) {
            case "Risk":

                break;
            default:
                break;
        }


    });

}

/**
 * 初始化项目
 *
 * @param proj
 * @returns
 */
function InitializeProject(proj,model) {
    projectCur = proj;
    modelCur = model;
    ClearFeature();
    closePointerState();

    if(proj!=null){
        projectId = proj.projectId;
        var currentProj = document.getElementById("currentProj");
        currentProj.innerHTML ="当前项目:"+ proj.projName;
    }else{
        projectId=null;
    }
    if(model=="aer"){
        curFeatures=[];
        UpdateProjectLayer();

    }
    if(model=="sra"){
        curFeatures=[];
        UpdateSRAProjectLayer(proj);
        // ZoomToMax();
    }
    if(model=="dld"){
        curFeatures=[];
        return;
    }
    // 环境风险评价模型
    if (model=="risk")
    {
        curFeatures=[];
        projectId = proj.projId;
        UpdateRiskProjectLayers(proj);
    }

    ZoomToMax();
}

/**
 * 更新环境风险评价模型图层和相关信息
 *
 * @param proj
 * @returns
 */
function UpdateRiskProjectLayers(proj)
{
    if (proj.projId==null)
    {
        return;
    }

    var model = parent.document.getElementById("divmodelname");
    model.style.display="none";
    $('#riskModel').window('open');
    data="/Risk/loadRiskSollution?projId=" + projectId;
    ModelSwitch = 4;
    $.ajax({
        type : "post",
        async : false,
        url : '/Risk/getProjectDataByProjId?projId=' + proj.projId,
        dataType : "json",
        success : function(result, textStatus) {
            document.getElementById("riskProjectTools").style.display="";
            IntializationTreeView(result);
            for (var i=0;i<result.lstEquipent.length;i ++				)
            {
                var mCurrentFeature = new Object();
                mCurrentFeature.coordinates = new Array();
                var coor = new Object();
                coor.x = result.lstEquipent[i].equipment.x;
                coor.y = result.lstEquipent[i].equipment.y;
                mCurrentFeature.coordinates
                    .push(coor);
                mCurrentFeature.id = result.lstEquipent[i].equipment.id;
                mCurrentFeature.name = result.lstEquipent[i].equipment.name;
                mCurrentFeature.layerId =result.lstEquipent[i].equipment.equipmentType;

                AddRiskFeature(mCurrentFeature);
            }

            for (var i =0;i<result.lstAccept.length;i ++)
            {
                var mCurrentFeature = new Object();
                mCurrentFeature.coordinates = new Array();
                var coor = new Object();
                coor.x = result.lstAccept[i].x;
                coor.y = result.lstAccept[i].y;
                mCurrentFeature.coordinates
                    .push(coor);
                mCurrentFeature.id = result.lstAccept[i].id;
                mCurrentFeature.name = result.lstAccept[i].name;
                mCurrentFeature.layerId = "RiskAccept";

                AddRiskFeature(mCurrentFeature);
            }

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        }

    });
}

function UpdateSRAProjectLayer(proj){
    if(proj.coordinate.x!=undefined){
        Coordinate=[proj.coordinate.x,proj.coordinate.y];
        AddFeature(proj, "SRAPoint");
    }else{
        Coordinate=null;
    }
}
/**
 * 更新项目
 *
 * @returns
 */
function UpdateProjectLayer() {
    if(projectId==null)
        return;
    var data = {
        projectId : projectId
    };
    $.ajax({
        type : 'post',
        url : "/AER/getProjectOfAllCoordinate?projId=" + projectId,
        dataType : 'json',
        data : data,
        success : function(result, state) {
            if (result.lstPointSource.length > 0) {
                var pointSource = Layers["Point"].getSource();
                pointSource.clear();
                for (var i = 0; i < result.lstPointSource.length; i++) {
                    AddFeature(result.lstPointSource[i], "Point");
                }
            }

            if (result.lstAccept.length > 0) {
                var accept = Layers["Accept"].getSource();
                accept.clear();
                for (var i = 0; i < result.lstAccept.length; i++) {
                    AddFeature(result.lstAccept[i], "Accept");
                }
            }

            if (result.lstFlareSource.length > 0) {
                var flareSource = Layers["Flare"].getSource();
                flareSource.clear();
                for (var i = 0; i < result.lstFlareSource.length; i++) {
                    AddFeature(result.lstFlareSource[i], "Flare");
                }
            }

            if (result.lstCircleSource.length > 0) {
                var circleSource = Layers["Circle"].getSource();
                circleSource.clear();
                for (var i = 0; i < result.lstCircleSource.length; i++) {
                    AddFeature(result.lstCircleSource[i], "Circle");
                }
            }

            if (result.lstRectangleSource.length > 0) {
                var rectangleSource = Layers["Rectangle"].getSource();
                rectangleSource.clear();
                for (var i = 0; i < result.lstRectangleSource.length; i++) {
                    AddFeature(result.lstRectangleSource[i],"Rectangle");
                }
            }
            if (result.lstVolumeSource.length > 0) {
                var volumeSource = Layers["Volume"].getSource();
                volumeSource.clear();
                for (var i = 0; i < result.lstVolumeSource.length; i++) {
                    AddFeature(result.lstVolumeSource[i],"Volume");
                }
            }
        },
        error : function(httpRequest, state, errorThrown) {
            window.location.reload();

        }
    });
}

/**
 * 触发交互控件
 *
 * @param item
 * @returns
 */
function ToggleInteraction(item) {
    if (projectId==null)
    {
        if ( item.id=="Point" || item.id=="Volume" || item.id=="Flare" || item.id=="Rectangle"|| item.id=="Circle"|| item.id=="Accept"|| item.id=="LowLiquefactionGasContainer"|| item.id=="NormalLiquidContainer"|| item.id=="PressureGasContainer"|| item.id=="PressureLiquefiedGas" || item.id=="RiskAccept")
        {
            $.messager.alert('提示', '请打开项目再进行相关操作', 'info');
            return;
        }
    }

    Interactions["Select"].getFeatures().clear();
    var PointerTool=document.getElementById("PointerTool");
    var PointerToolTitle=document.getElementById("PointerToolTitle");
    if(PointerTool.style.display=='none'){
        PointerTool.style.display='';
    }
    PointerToolTitle.innerHTML="指针状态:"+item.innerHTML;
    for ( var key in Interactions) {
        Interactions[key].setActive(false);
    }
    Interactions[item.id].setActive(true);
    Interactions["Zoom"].setActive(true);
    Interactions["Pan"].setActive(true);
    CurrentInteraction = item.id;
}
// 取消保存SRA点源
function CancelSaveSRAPoint(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers["SRAPoint"].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}
// 取消保存点源
function CancelSavePoint(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers["Point"].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}

// 取消保存敏感点
function CancelSaveAccept(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var accept = Layers["Accept"].getSource();
        accept.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}

// 取消保存火炬源
function CancelSaveFlare(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers["Flare"].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}
// 取消保存体源
function CancelSaveVolume(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers["Volume"].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}
// 取消保存圆
function CancelSaveCircle(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers["Circle"].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}
// 取消保存矩形源
function CancelSaveRectangle(){
    if(CurrentFeature==""){
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers["Rectangle"].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}

// Risk设备相关
function CancelSaveRiskContainer(){
    if(CurrentFeature==""){
        return;
    }
    if (CurrentFeature.feature==null)
    {
        return;
    }
    if(CurrentFeature.Actioned=="add"){
        var receptPointSource = Layers[CurrentFeature.EquipmentType].getSource();
        receptPointSource.removeFeature(CurrentFeature.feature);
        CurrentFeature="";
    }
}


/**
 * 移除当前选中的图形
 *
 * @returns
 */
function removeCurrentSelectedFeature(sourceType) {
    var sourceFeature = Layers[sourceType].getSource();
    var selectInteraction = Interactions["Select"];
    if (CurrentFeature.Actioned == "edit") {
        var features = selectInteraction.getFeatures().getArray();
        if (features.length != 1)
            return;
        sourceFeature.removeFeature(features[0]);
    } else {
        if (CurrentFeature.feature!=null)
        {
            sourceFeature.removeFeature(CurrentFeature.feature);
        }
        CurrentFeature="";
    }
    selectInteraction.getFeatures().clear();
}

/**
 * 移除某个图层中的图形
 *
 * @returns
 */
function removeCurrentLayerSelectedFeature(layerName,featureId) {
    var sourceFeature = Layers[layerName].getSource();
    var feat=sourceFeature.getFeatureById(featureId);
    if (feat!=null)
    {
        sourceFeature.removeFeature(feat);

    }
    var selectInteraction = Interactions["Select"];
    if (selectInteraction!=null)
    {
        selectInteraction.getFeatures().clear();
    }

}


/**
 * 添加图形
 *
 * @param source
 * @param sourceType
 *            "字符串，例如，Point"
 * @returns
 */
function AddFeature(source, sourceType) {
    var geometry = null;
    var currentProj = parent.Map.getView().getProjection();// 获取当前投影
    if (sourceType == "Circle") {
        var center = [ parseFloat(source.coordinate.x),
            parseFloat(source.coordinate.y) ];
        var zone = getZone(center[0]);
        var centerUtm = LatlonToUTM(center, zone);
        var lastUtm = [ centerUtm[0] + source.radius, centerUtm[1] ];
        var lastCoordinate = UTMToLatlon(lastUtm, zone);
        center = ol.proj.fromLonLat(center,currentProj);
        lastCoordinate = ol.proj.fromLonLat(lastCoordinate,currentProj);

        var radius = Math.abs(center[0] - lastCoordinate[0]);

        var geometry = new ol.geom.Circle(center, radius);
        var feature = new ol.Feature(geometry);
        feature.setId(source.id);
        feature.set("Name", source.name);
        feature.set("LayerName", sourceType);
        var sourceFeature = Layers[sourceType].getSource();
        sourceFeature.addFeature(feature);

        curFeatures.push(feature);
    }else if(sourceType== "Volume"){
        var  leftTop= [parseFloat(source.coordinate.x),parseFloat(source.coordinate.y) ];
        var zone = getZone(leftTop[0]);
        var borderLength=parseFloat(source.borderLength);
        var leftTopUtm = LatlonToUTM(leftTop, zone);
        var rightTopUtm=[leftTopUtm[0]+borderLength,leftTopUtm[1]];
        var rightTop=UTMToLatlon(rightTopUtm,zone);
        leftTop=ol.proj.fromLonLat(leftTop,currentProj);
        rightTop=ol.proj.fromLonLat(rightTop,currentProj);
        var border=rightTop[0]-leftTop[0];
        var newCoordinates = [];
        newCoordinates.push([leftTop[0],leftTop[1]]);// 左上角
        newCoordinates.push([rightTop[0],leftTop[1]]);// 右上角
        newCoordinates.push([rightTop[0],leftTop[1]-border]);// 右下角
        newCoordinates.push([leftTop[0],leftTop[1]-border]);// 左下角
        newCoordinates.push([leftTop[0],leftTop[1]]);// 左上角
        var geometry = new ol.geom.Polygon([newCoordinates]);
        // geometry.setCoordinates([newCoordinates]);
        var feature = new ol.Feature(geometry);
        feature.setId(source.id);
        feature.set("Name", source.name);
        feature.set("LayerName", sourceType);
        var sourceFeature = Layers[sourceType].getSource();
        sourceFeature.addFeature(feature);

        curFeatures.push(feature);
    }else if(sourceType=="Rectangle"){
        var firstpoint=[parseFloat(source.coordinate.x),parseFloat(source.coordinate.y)];
        var zone = getZone(firstpoint[0]);
        var firstpointUtm=LatlonToUTM(firstpoint,zone);
        var xangle=parseFloat(source.xangle);
        angle=xangle*Math.PI/180;
        var firstborder=parseFloat(source.length);
        var secondborder=parseFloat(source.width);
        var offsetX=firstborder*Math.cos(angle);
        var offsetY=firstborder*Math.sin(angle);
        var secondpointUtm=[firstpointUtm[0]-offsetX,firstpointUtm[1]-offsetY];
        var secondpoint=UTMToLatlon(secondpointUtm,zone);

        var direction=source.direction;
        direction=parseInt(source.direction);


        // 矩形面源修改
        var q;
        if(xangle>=0&&xangle<=90){
            q=1;
        }
        if(xangle>90&&xangle<=180){
            q=2;
        }
        if(xangle<0&&xangle>=-90){
            q=4;
        }
        if(xangle<-90&&xangle>=-180){
            q=3;
        }
        if(direction==0){
            if(q==2){
                angle=parseFloat(source.xangle)-270;
            }else{
                angle=parseFloat(source.xangle)+90;
            }
        }else if(direction==1){
            if(q==3){
                angle=parseFloat(source.xangle)+270;
            }else{
                angle=parseFloat(source.xangle)-90;
            }
        }

        angle=angle*Math.PI/180;
        // angle=direction*Math.PI/180;
        offsetX=secondborder*Math.cos(angle);
        offsetY=secondborder*Math.sin(angle);
        var thirdpointUtm=[secondpointUtm[0]+offsetX,secondpointUtm[1]+offsetY];
        var thirdpoint=UTMToLatlon(thirdpointUtm,zone);

        firstpoint=ol.proj.fromLonLat(firstpoint,currentProj);
        secondpoint=ol.proj.fromLonLat(secondpoint,currentProj);
        thirdpoint=ol.proj.fromLonLat(thirdpoint,currentProj);

        var dx=firstpoint[0]-secondpoint[0];
        var dy=firstpoint[1]-secondpoint[1];
        var rotation = Math.atan2(dy, dx);
        var angle=Math.PI/2+rotation;
        dx=thirdpoint[0]-secondpoint[0];
        dy=thirdpoint[1]-secondpoint[1];
        var radius = Math.sqrt(dx * dx + dy * dy);
        var rotation1=Math.atan2(dy, dx);
        var angle1=angle-rotation1;
        var tempborder=radius*Math.cos(angle1);
        offsetX =tempborder*Math.cos(angle);
        offsetY =tempborder*Math.sin(angle);
        var newCoordinates = [];
        newCoordinates.push([firstpoint[0],firstpoint[1]]);
        newCoordinates.push([secondpoint[0],secondpoint[1]]);
        newCoordinates.push([secondpoint[0]+offsetX,secondpoint[1]+offsetY]);
        newCoordinates.push([firstpoint[0]+offsetX,firstpoint[1]+offsetY]);
        newCoordinates.push([firstpoint[0],firstpoint[1]]);
        var geometry = new ol.geom.Polygon([newCoordinates]);
        var feature = new ol.Feature(geometry);
        feature.setId(source.id);
        feature.set("Name", source.name);
        feature.set("LayerName", sourceType);
        var sourceFeature = Layers[sourceType].getSource();
        sourceFeature.addFeature(feature);

        curFeatures.push(feature);

    }
    else {
        var lambert = [ parseFloat(source.coordinate.x),
            parseFloat(source.coordinate.y) ];// 经纬度转变成兰伯特投影
        lambert=ol.proj.fromLonLat(lambert,currentProj);
        geometry = new ol.geom.Point(lambert);

        var feature = new ol.Feature(geometry);
        feature.setId(source.id);
        feature.set("Name", source.name);
        feature.set("LayerName", sourceType);
        var sourceFeature = Layers[sourceType].getSource();
        sourceFeature.addFeature(feature);

        curFeatures.push(feature);
    }

}


/**
 * 添加Risk模型图形
 *
 * @param mCurrentFeature
 *            ,图形相关参数对象
 * @returns
 */
function AddRiskFeature(mCurrentFeature)
{
    removeCurrentLayerSelectedFeature(mCurrentFeature.layerId,mCurrentFeature.id);

    var currentProj = parent.Map.getView().getProjection();// 获取当前投影
    var lambert = [ parseFloat(mCurrentFeature.coordinates[0].x),
        parseFloat(mCurrentFeature.coordinates[0].y) ];// 经纬度转变成兰伯特投影
    lambert=ol.proj.fromLonLat(lambert,currentProj);
    var  geometry = new ol.geom.Point(lambert);

    var feature = new ol.Feature(geometry);
    feature.setId(mCurrentFeature.id);
    feature.set("Name", mCurrentFeature.name);
    feature.set("LayerName", mCurrentFeature.layerId);
    feature.set("ModelType","Risk");
    var sourceFeature = Layers[mCurrentFeature.layerId].getSource();
    sourceFeature.addFeature(feature);

    curFeatures.push(feature);
}

/**
 * 编辑选中的图形事件
 *
 * @returns
 */
function EditSelectedFeature() {
    Action = "edit";
    var project =  getProject();
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
    var selectInteraction = Interactions["Select"];
    var features = selectInteraction.getFeatures().getArray();
    if (features.length != 1)
        return;
    CurrentFeature = features[0];
    CurrentFeature.Actioned = "edit";
    var layerName = CurrentFeature.get("LayerName");

    switch (layerName) {
        case "Point":
            dlgAddOrEditPoint(null);
            break;
        case "Accept":
            dlgAddOrEditAccept(null);
            break;
        case "Rectangle":
            dlgAddOrEditRectangle(null);
            break;
        case "Flare":
            dlgAddOrEditFlare(null);
            break;
        case "Circle":
            dlgAddOrEditCircle(null);
            break;
        case "Volume":
            dlgAddOrEditVolume(null);
            break;
    }
}

/**
 * 删除选中图形事件
 *
 * @returns
 */
function RemoveSelectedFeature() {
    var selectInteraction = Interactions["Select"];
    var features = selectInteraction.getFeatures().getArray();
    if (features.length != 1)
        return;
    var idArray = new Array();
    for (var i = 0; i < features.length; i++) {
        idArray.push(features[i].getId());
    }
    var layerName = features[0].get("LayerName");
    var sourceFeature = null;
    var urlStr = "";
    switch (layerName) {
        case "Point":
            /* window.parent.removePoint(idArray); */
            urlStr = "/AER/delPointSource?projId="+ projectId ;
            break;
        case "Accept":
            urlStr = "/AER/delAcceptByLstId?projId="+ projectId ;
            break;
        case "Rectangle":
            urlStr = "/AER/delRectangleSource?projId="+ projectId ;
            break;
        case "Flare":
            urlStr = "/AER/delFlareSource?projId="+ projectId ;
            break;
        case "Circle":
            urlStr = "/AER/delCircleSource?projId="+ projectId ;
            break;
        case "Volume":
            urlStr = "/AER/delVolumeSource?projId="+ projectId ;
            break;
    }

    var jsonStr = JSON.stringify(idArray);
    $.ajax({
        type : "post",
        asnyc : false,
        url : urlStr,
        contentType : "application/json",
        data : jsonStr,
        success : function(result, state) {
            sourceFeature = Layers[layerName].getSource();
            sourceFeature.removeFeature(features[0]);
            selectInteraction.getFeatures().clear();
            $('#dlgCom').window('close');
        },
        error : function(httpRequest, state, errorThrown) {
            window.location.reload();

        }
    });

}

/**
 * 清空图图
 *
 * @returns
 */
function ClearFeature() {
    if(Layers==null||Layers==undefined){
        return;
    }

    var feature = Layers["Point"].getSource();
    feature.clear();

    feature = Layers["Accept"].getSource();
    feature.clear();

    feature = Layers["Flare"].getSource();
    feature.clear();
    feature = Layers["Circle"].getSource();
    feature.clear();
    feature = Layers["Rectangle"].getSource();
    feature.clear();
    feature = Layers["Volume"].getSource();
    feature.clear();
    feature = Layers["SRAPoint"].getSource();
    feature.clear();
    feature = Layers["ReceptPoint"].getSource();
    feature.clear();
    feature = Layers["ReceptArea"].getSource();
    feature.clear();


    Layers["LowLiquefactionGasContainer"].getSource().clear();
    // 常温常压液体容器
    Layers["NormalLiquidContainer"].getSource().clear();
    // 压力气体容器
    Layers["PressureGasContainer"].getSource().clear();
    // 压力液化气
    Layers["PressureLiquefiedGas"].getSource().clear();
    // 风险敏感点
    Layers["RiskAccept"].getSource().clear();

    // 等值线图层
    Layers["Isoline"].getSource().clear();
    // 等值面图层
    Layers["Isosurface"].getSource().clear();

    Interactions["Select"].getFeatures().clear();
    var currentProj = document.getElementById("currentProj");
    currentProj.innerHTML = "";

}
function SetLayerVisible(node, checked) {
    Layers[node.id].setVisible(checked);
}

// 关闭指针状态
function closePointerState(){
    var PointerTool=document.getElementById("PointerTool");
    PointerTool.style.display='none';
    Interactions["Select"].getFeatures().clear();
    for ( var key in Interactions) {
        Interactions[key].setActive(false);
    }
    Interactions["Select"].setActive(true);
    Interactions["Zoom"].setActive(true);
    Interactions["Pan"].setActive(true);
    /*
	 * var selectInteraction = Interactions["Select"];
	 * //selectInteraction.setFeatures(''); selectInteraction.changed(); var
	 * features = selectInteraction.getFeatures().getArray();
	 */

}

// 缩放到项目点的位置
function ZoomToMax()
{
    if(ModelSwitch == 1){
        if(!Coordinate) return;
        var currentProj = parent.Map.getView().getProjection();// 获取当前投影
        Coordinate[0]=parseFloat(Coordinate[0]);
        Coordinate[1]=parseFloat(Coordinate[1]);
        var lambert = [ parseFloat(Coordinate[0]),parseFloat(Coordinate[1]) ];// 经纬度转变成兰伯特投影
        lambert=ol.proj.fromLonLat(lambert,currentProj);
        // Coordinate=ol.proj.transform(Coordinate,'EPSG:4326', currentProj);
        var view = Map.getView();
        var zoom = view.getZoom();
        view.animate({
            center: lambert,
            duration: 2000
        });
        if(zoom<12){
            view.animate({
                zoom: 12,
                duration: 2000
            });
        }
    }

    if(ModelSwitch == 2){
        if(projectId==null) return;
        $.ajax({
            type:"post",
            url:"/AllSourceCoordinate/getZoomMax",
            data:{projectId:projectId},
            success:function(result){
                if(result!=""){
                    result[0]=result[0]-0.01;
                    result[1]=result[1]-0.01;
                    result[2]=result[2]+0.01;
                    result[3]=result[3]+0.01;
                    var currentProj = parent.Map.getView().getProjection();// 获取当前投影
                    var lefttop = ol.proj.fromLonLat([result[0],result[1]],currentProj);
                    var rightbotoom=ol.proj.fromLonLat([result[2],result[3]],currentProj);
                    // var extent = [ result[0]-0.01,
                    // result[1]-0.01,result[2]+0.01, result[3]+0.01];
                    var extent=[lefttop[0],lefttop[1],rightbotoom[0],rightbotoom[1]];
                    var view = Map.getView();
                    var size = Map.getSize();
                    view.fit(extent, {
                        size : size,
                        constrainResolution : false,
                        padding : [ 100, 100, 100, 100 ]
                    });
                }
            }
        });
    }

}










/**
 * 图层控制
 */
function SourceLayerShow(name,checked){
    Layers[name].setVisible(checked);
}

/**
 * 经纬度 转UTM
 *
 * @param coordinate
 * @param zone
 * @returns
 */
function LatlonToUTM(coordinate, zone) {
    // var currentProj = Map.getView().getProjection();
    var proj4Str1 = "+proj=utm +zone="
        + zone
        + " +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +datum=NAD83";
    proj4.defs(proj4Str1, proj4Str1);
    var newProj1 = ol.proj.get(proj4Str1);
    var UTM = ol.proj.transform(coordinate, "EPSG:4326", newProj1);
    return UTM;

}

/**
 * UTM转经纬度
 *
 * @param coordinate
 * @param zone
 * @returns
 */
function UTMToLatlon(coordinate, zone) {
    // var currentProj = Map.getView().getProjection();
    var proj4Str1 = "+proj=utm +zone="
        + zone
        + " +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +datum=NAD83";
    proj4.defs(proj4Str1, proj4Str1);
    var newProj1 = ol.proj.get(proj4Str1);
    var latlon = ol.proj.transform(coordinate, newProj1, "EPSG:4326");
    return latlon;
}

/**
 * 得到某一区
 *
 * @param longitude
 * @returns
 */
function getZone(longitude) {
    var x = Math.ceil(longitude);
    var CentralMeridian = 0;
    if (x % 6 == 0) {
        CentralMeridian = parseInt(x / 6) + 30;
    } else {
        CentralMeridian = parseInt(x / 6) + 31;
    }
    return CentralMeridian;
}

// map.js
function point(){
    DrawPointInteraction1.setActive(true);
    DrawRectangle.setActive(false);
    /*
		 * if($('input[type=radio][name=select]:checked').val()=="2"){
		 * $("#point1").trigger("change"); }
		 * $('#point1').prop("checked","checked"); var
		 * PointerTool=document.getElementById("PointerTool"); var
		 * PointerToolTitle=document.getElementById("PointerToolTitle");
		 * if(PointerTool.style.display=='none'){ PointerTool.style.display=''; }
		 * PointerToolTitle.innerHTML="指针状态:标记点";
		 */
}


function rectangle(){
    DrawRectangle.setActive(true);
    DrawPointInteraction1.setActive(false);
    /* $('#area').attr("checked","checked"); */
    /*
	 * if($('input[type=radio][name=select]:checked').val()=="1"){
	 * $("#area").trigger("change"); } $('#area').prop("checked","checked"); var
	 * PointerTool=document.getElementById("PointerTool"); var
	 * PointerToolTitle=document.getElementById("PointerToolTitle");
	 * if(PointerTool.style.display=='none'){ PointerTool.style.display=''; }
	 * PointerToolTitle.innerHTML="指针状态:区域";
	 */
}
function mouse(){
    DrawRectangle.setActive(false);
    DrawPointInteraction1.setActive(false);
}
function search1(){

    deleteicon();
    deletearea();

    curFeatures = [];
    // 度分秒同步
    if($("#pointdiv")[0].style.display=="none"){// 当前为度分秒
        degree2num();
    }else{
        num2degree();
    }

    var x=$('#east').textbox('getValue');
    var y=$('#north').textbox('getValue');
    if(x!='' && y!=''&&(x<180 && x>-180) && (y<90 && y>-90)){
        var geometrypt = new ol.geom.Point([x,y]);
        // var view1 = Map.getView();
        // var viewResolution = view1.getResolution();
        // var source = Layers["Base"].getSource();
        // var coordinate1=new Array();
        // coordinate1.push(Number(x));
        // coordinate1.push(Number(y));
        var coordinate=[Number(x),Number(y)];
        coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
        $('#pointpop').dialog('close');
        view.animate({
            center: coordinate,
            duration: 1200
        });
        addVectorLabel(coordinate);
        return true;
    }else{
// $.messager.alert('提示', '经纬度不符合要求', 'info');
        $.messager.show({
            title:'警告',
            msg:'请输入合法的经纬度！',
            timeout:2000,
            showType:'slide'
        });

        return false;
    }




}
function zoomDld2Max(result){

    result[0]=result[0]-0.3;
    result[1]=result[1]-0.3;
    result[2]=result[2]+0.3;
    result[3]=result[3]+0.3;
    var currentProj = parent.Map.getView().getProjection();// 获取当前投影
    var lefttop = ol.proj.fromLonLat([result[0],result[1]],currentProj);
    var rightbotoom=ol.proj.fromLonLat([result[2],result[3]],currentProj);
    // var extent = [ result[0]-0.01,
    // result[1]-0.01,result[2]+0.01, result[3]+0.01];
    var extent=[lefttop[0],lefttop[1],rightbotoom[0],rightbotoom[1]];
    var view = Map.getView();
    var size = Map.getSize();
    view.fit(extent, {
        size : size,
        constrainResolution : false,
        padding : [ 100, 100, 100, 100 ]
    });
}
// function search2(){
// deleteicon();
// deletearea();
// var x0=Number($('#lte').textbox('getValue'));
// var y0=Number($('#ltn').textbox('getValue'));
// var x1=Number($('#rbe').textbox('getValue'));
// var y1=Number($('#rbn').textbox('getValue'));
// var temp =[x0,y0];
// var temp1=[x1,y1];
// temp=ol.proj.transform(temp,'EPSG:4326', 'EPSG:900913');
// temp1=ol.proj.transform(temp1,'EPSG:4326', 'EPSG:900913');
// var x=x1-x0;
// var y=y0-y1;
// if(Math.pow((x*x+y*y),0.5)*111.195<100){
// $('#areapop').dialog('close');
// view.animate({
// center:[Number((temp[0]+temp1[0])/2),Number((temp[1]+temp1[1])/2)],
// duration: 2000
// });
// addarea(temp[0],temp[1],temp1[0],temp1[1]);
// }else{
// $('#areapop').dialog('close');
// $.messager.alert('提示',"请选择区域不要大于100km",'warning');
// }
// }
function addVectorLabel(coordinate){
    // 初始化一个新的点要素
    newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
    });
    newFeature.setStyle(createLabelStyle("/image/point.png","标记点"));
    // 将当前要素添加到矢量数据源中
    vectorSource.addFeature(newFeature);

    curFeatures.push(newFeature);
}
function addVectorLabel1(coordinate,id){
    // 初始化一个新的点要素
    newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
    });
    // 设置点的样式
    // $('#province').textbox('getValue')+","+$('#city').textbox('getValue')+","+$('#area').textbox('getValue')
    newFeature.setStyle(createLabelStyle("/image/point1.png","地面-"+id));
    // 将当前要素添加到矢量数据源中
    vectorSource.addFeature(newFeature);

    curFeatures.push(newFeature);
}
function addVectorLabel2(coordinate,id){
    // 初始化一个新的点要素
    newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
    });
    // 设置点的样式
    // $('#province').textbox('getValue')+","+$('#city').textbox('getValue')+","+$('#area').textbox('getValue')
    newFeature.setStyle(createLabelStyle("/image/point2.png","高空-"+id));
    // 将当前要素添加到矢量数据源中
    vectorSource.addFeature(newFeature);

    curFeatures.push(newFeature);
}
function addVectorLabel3(coordinate,id){
    // 初始化一个新的点要素
    newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
    });
    // 设置点的样式
    // $('#province').textbox('getValue')+","+$('#city').textbox('getValue')+","+$('#area').textbox('getValue')
    newFeature.setStyle(createLabelStyle("/image/point2.png","总云量-"+id));
    // 将当前要素添加到矢量数据源中
    vectorSource.addFeature(newFeature);

    curFeatures.push(newFeature);
}

// 已下载的高空数据
function addVectorLabel5(coordinate,id){
    // 初始化一个新的点要素
    newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
    });
    // 设置点的样式
    // $('#province').textbox('getValue')+","+$('#city').textbox('getValue')+","+$('#area').textbox('getValue')
    newFeature.setStyle(createLabelStyle("/image/point5.png","高空(已下载)-"+id));
    // 将当前要素添加到矢量数据源中
    vectorSource.addFeature(newFeature);

    curFeatures.push(newFeature);
}
// 已下载的云量数据
function addVectorLabel6(coordinate,id){
    // 初始化一个新的点要素
    newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate),
    });
    // 设置点的样式
    // $('#province').textbox('getValue')+","+$('#city').textbox('getValue')+","+$('#area').textbox('getValue')
    newFeature.setStyle(createLabelStyle("/image/point6.png","云量(已下载)-"+id));
    // 将当前要素添加到矢量数据源中
    vectorSource.addFeature(newFeature);

    curFeatures.push(newFeature);
}

function addarea(x0,y0,x1,y1){
    // 初始化一个矩形
    var newarea = new ol.Feature({
        geometry: new ol.geom.Polygon([
            [
                [x0,y0],[x0,y1],[x1,y1],[x1,y0],[x0,y0]
            ]
        ]),
    });
    // 将当前要素添加到矢量数据源中
    areaSource.addFeature(newarea);

    curFeatures.push(newarea);
}
function market(){
    var rows =$("#dg").datagrid("getRows");
    for(var i=0;i<rows.length;i++)
    {
        var coordinate=new Array();
        coordinate.push(rows[i].longitudes);
        coordinate.push(rows[i].latitudes);
        addVectorLabel1(coordinate,rows[i].id);
    }
}
var createLabelStyle = function(url,font){
    // 返回一个样式
    return new ol.style.Style({
        // 把点的样式换成ICON图标
        image: new ol.style.Icon({
            // 控制标注图片和文字之间的距离
            anchor: [0.5,40],
            // 标注样式的起点位置
            anchorOrigin: 'center',
            // X方向单位：分数
            anchorXUnits: 'fraction',
            // Y方向单位：像素
            anchorYUnits: 'pixels',
            // 偏移起点位置的方向
            offsetOrigin: 'top-right',
            // 透明度
            opacity: 1,
            // 图片路径
            src: url
        }),
        // 文本样式
        text: new ol.style.Text({
            // 对齐方式
            textAlign: 'center',
            // 文本基线
            textBaseline: 'middle',
            // 字体样式
            font: 'normal 12px 微软雅黑',
            // 文本内容
            text:font,
            // 填充样式
            fill: new ol.style.Fill({
                color: '#aa3300'
            }),
            // 笔触
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            })
        })
    });
};
function closePoint(){

    $('#pointpop').dialog('close');
}

// function closeArea(){
//
// $('#areapop').dialog('close');
// }

function deleteicon(){
    // var PointSource = Layers["ReceptPoint"].getSource();
    // PointSource.removeFeature(CurrentFeature);
    var source =ReceptPoint.getSource();
    var feature =source.getFeatures();
    for (var i = 0; i < feature.length; i++) {
        source.removeFeature(feature[i]);
    }
}
function deletearea(){
    // var AreaSource = Layers["ReceptArea"].getSource();
    // AreaSource.removeFeature(CurrentFeature);
    var source =Receptarea.getSource();
    var feature =source.getFeatures();
    for (var i = 0; i < feature.length; i++){
        source.removeFeature(feature[i]);
    }

}
function drowpoint(e){
    var newf = e.feature;
    CurrentFeature=e.feature;
    var geometry = newf.getGeometry();
    var coordinate = geometry.getCoordinates();
    addVectorLabel(coordinate);
    coordinate=ol.proj.transform(coordinate,'EPSG:900913', 'EPSG:4326');
    var x=ol.coordinate.format(coordinate,'{x}',4);
    var y=ol.coordinate.format(coordinate,'{y}',4);
    $('#east').textbox('setValue',x);
    $('#north').textbox('setValue',y);
    num2degree();// 同步度分秒框
    $('#pointpop').dialog('open');
}

// // 画矩形后触发事件
// function drowrectangle(e){
// var newf = e.feature;
// CurrentFeature=e.feature;
// var geometry = newf.getGeometry();
// //var newfeature= new ol.Feature(geometry);
// var coordinate = geometry.getCoordinates();
// var x0=coordinate[0][1][0];
// var y0=coordinate[0][3][1];
// var x1=coordinate[0][3][0];
// var y1=coordinate[0][1][1];
// var temp=[coordinate[0][1][0],coordinate[0][3][1]];
// temp=ol.proj.transform(temp,'EPSG:900913', 'EPSG:4326');
// x0=temp[0];
// y0=temp[1];
// temp=[coordinate[0][3][0],coordinate[0][1][1]];
// temp=ol.proj.transform(temp,'EPSG:900913', 'EPSG:4326');
// x1=temp[0];
// y1=temp[1];
// var xmax;
// var xmin;
// var ymax;
// var ymin;
// if(x0>x1){
// xmax=x0;
// xmin=x1;
// }else{
// xmax=x1;
// xmin=x0;
// }
// if(y0>y1){
// ymax=y0;
// ymin=y1;
// }else{
// ymax=y1;
// ymin=y0;
// }
// var x=xmax-xmin;
// var y=ymax-ymin;
// $('#lte').textbox('setValue',xmin);
// $('#ltn').textbox('setValue',ymax);
// $('#rbe').textbox('setValue',xmax);
// $('#rbn').textbox('setValue',ymin);
// $('#areapop').dialog('open');
//
// }

// 下载气象数据
function downloadDataBeforeChecked() {
    if(document.getElementById("dgNormal").style.display=="none"){
        var row4 = $('#dg3').datagrid('getSelections');
        var row5 = $('#dg4').datagrid('getSelections');
        var row6 = $('#dg5').datagrid('getSelections');
        var temp = parent.document.createElement("form");
        var id=null;
        var dataChoice = [];
        if(row4!=null&&row4.length>0){
            dataChoice = dataChoice.concat(row4);
        }
        if(row5!=null&&row5.length>0){
            dataChoice = dataChoice.concat(row5);
        }
        if(row6!=null&&row6.length>0){
            dataChoice = dataChoice.concat(row6);
        }

        if(dataChoice.length<=0){
            $.messager.alert('提示', '请至少勾选一条数据', 'info');
            return;
        }

        $.ajax({
            url:'/datachoice/beforeConsume2',// 先准备数据
            data:{dataChoice:JSON.stringify(dataChoice)},
            dataType:'json',
            async : false,
            beforeSend : function() {
                $.messager.progress({
                    title : '提示',
                    msg : '准备数据中，请稍候……',
                    text : ''
                });
            },
            complete : function() {
                $.messager.progress('close');
            },
            success:function(data){
                if(data.status==-1){
                    $.messager.alert('提示', '操作失败，请确认是否已经登录', 'error');
                }else if(data.status==0){
                    $.messager.alert('提示', '操作失败，服务器没有需要下载的文件', 'error');
                }else{
                    // 下载
                    tool.dlFile({
                        url:'/datachoice/download1',
                        contentType : "application/json;chartset=utf-8"
                    });
                    if(data.status==2){
                        $.messager.alert('提示', '操作成功！但是你要下载的部分文件服务器中可能已经不存在', 'info');
                    }else{
                        $.messager.alert('提示', '操作成功！如果使用的是IE浏览器，还须点击浏览器下方保存按钮', 'info');
                    }
                }
            },
            error:function(){
                window.location.reload();
            }
        })

    }else{
        var row1 = $('#dg').datagrid('getSelections');
        var row2 = $('#dg1').datagrid('getSelections');
        var row3 = $('#dg2').datagrid('getSelections');

        var temp = parent.document.createElement("form");
        var id=null;
        // var type=null;
// if(row.length>1){
        var dataChoice = [];
        if(row1!=null&&row1.length>0){
            dataChoice = dataChoice.concat(row1);
        }
        if(row2!=null&&row2.length>0){
            dataChoice = dataChoice.concat(row2);
        }
        if(row3!=null&&row3.length>0){
            dataChoice = dataChoice.concat(row3);
        }
        if(row4!=null&&row4.length>0){
            dataChoice = dataChoice.concat(row4);
        }
        if(row5!=null&&row5.length>0){
            dataChoice = dataChoice.concat(row5);
        }
        if(row6!=null&&row6.length>0){
            dataChoice = dataChoice.concat(row6);
        }

        if(dataChoice.length<=0){
            $.messager.alert('提示', '请至少勾选一条数据', 'info');
            return;
        }

        $.ajax({
            url:'/datachoice/beforeConsume',// 先准备数据
            data:{dataChoice:JSON.stringify(dataChoice)},
            dataType:'json',
            async : false,
            success:function(data){
                $('#consumeData').window('open');
                $('#consumeData').window('center');
                if(data.status==-1){
                    $.messager.alert('提示', '操作失败，请确认是否已经登录', 'error');
                }else if(data.status==0){
                    $.messager.alert('提示', '操作失败，服务器没有需要下载的文件', 'error');
                }else{
                    document.getElementById('txtInformationData').innerHTML=data.txtInfo;
                    if(data.isCanCal){
                        $("#btnDownloadData").linkbutton('enable');
                    }else{
                        $("#btnDownloadData").linkbutton('disable');
                    }
                }
            },
            error:function(){
                window.location.reload();
            }
        })

    }

}

var btnDownloadDataTime = false;
function btnDownloadData(){
    if(btnDownloadDataTime){
        return;
    }
    btnDownloadDataTime = true;
    var row1 = $('#dg').datagrid('getSelections');
    var row2 = $('#dg1').datagrid('getSelections');
    var row3 = $('#dg2').datagrid('getSelections');
    var temp = parent.document.createElement("form");
    var id=null;
    var dataChoice = [];
    if(row1!=null&&row1.length>0){
        dataChoice = dataChoice.concat(row1);
    }
    if(row2!=null&&row2.length>0){
        dataChoice = dataChoice.concat(row2);
    }
    if(row3!=null&&row3.length>0){
        dataChoice = dataChoice.concat(row3);
    }

    if(dataChoice.length<=0){
        $.messager.alert('提示', '请至少勾选一条数据', 'info');
        return;
    }

    $.ajax({
        url:'/datachoice/readyMetData',// 先准备数据
        data:{dataChoice:JSON.stringify(dataChoice)},
        dataType:'json',
        async : false,
        beforeSend : function() {
            $.messager.progress({
                title : '提示',
                msg : '准备数据中，请稍候……',
                text : ''
            });
        },
        complete : function() {
            $.messager.progress('close');
        },
        success:function(data){
            if(data.costUUID!=0){
                tool.dlFile({
                    url:'/datachoice/download1',
                    contentType : "application/json;chartset=utf-8"
                });
                $.messager.alert('提示', "操作成功！如果使用的是IE浏览器，还须点击浏览器下方保存按钮", 'info');
            }else{
                $.messager.alert('提示', result.txtInfo, 'info');
                return;
            }
        },
        error:function(){
            window.location.reload();
        }
    })
    $('#consumeData').dialog('close');
    btnDownloadDataTime = false;
}


// //数据下载
// function dload(){
// var row1 = $('#dg').datagrid('getSelections');
// var row2 = $('#dg1').datagrid('getSelections');
// var row3 = $('#dg2').datagrid('getSelections');
// var temp = parent.document.createElement("form");
// var id=null;
// //var type=null;
// // if(row.length>1){
// var dataChoice = [];
// if(row1!=null&&row1.length>0){
// dataChoice = dataChoice.concat(row1);
// }
// if(row2!=null&&row2.length>0){
// dataChoice = dataChoice.concat(row2);
// }
// if(row3!=null&&row3.length>0){
// dataChoice = dataChoice.concat(row3);
// }
//
// if(dataChoice.length<=0){
// $.messager.alert('提示', '请至少勾选一条数据', 'info');
// return;
// }
//
// $.ajax({
// url:'datachoice/readyMetData',// 先准备数据
// data:{dataChoice:JSON.stringify(dataChoice)},
// dataType:'json',
// async : false,
// success:function(data){
// tool.dlFile({
// url:'datachoice/download1',
// contentType : "application/json;chartset=utf-8"
// });
// },
// error:function(){
// window.location.reload();
// }
// })
//
// }


function Query(){
    // 需要清空各个dg
    $('#dg').datagrid('clearSelections');
    $('#dg1').datagrid('clearSelections');
    $('#dg2').datagrid('clearSelections');
    $('#dg3').datagrid('clearSelections');
    $('#dg4').datagrid('clearSelections');
    $('#dg5').datagrid('clearSelections');

    if(!search1()){
        return;
    }

    document.getElementById("dgNormal").style.display="block";
    document.getElementById("dgDownList").style.display="none";
    document.getElementById("lable_downloadList").innerHTML = "已下载列表";

    document.getElementById("dgtable").style.display="none";
    document.getElementById("dg1table").style.display="none";
    document.getElementById("dg2table").style.display="none";
    // $('#choicepoint').dialog('close');
    $("#panel").panel('expand');
    var pointsource =ReceptPoint.getSource();
    var areasource =Receptarea.getSource();
    var pointfeature =pointsource.getFeatures();
    var areafeature =areasource.getFeatures();
    var a=null;
    var b=null;
    var east=null;
    var north=null;
    if(areafeature.length>0){
        if(pointfeature.length>0){
            for (var i = 0; i < pointfeature.length; i++) {
                pointsource.removeFeature(pointfeature[i]);
            }
        };
        east=$('#lte').textbox('getValue')+","+$('#rbe').textbox('getValue');
        north=$('#rbn').textbox('getValue')+","+$('#ltn').textbox('getValue');
        $("#selectyears :checkbox:checked").each(function(){
            a=a+","+$(this).val();
        });
        $("#selecttype :checkbox:checked").each(function(){
            b=b+","+$(this).val();
        });
        if(a==null||a==""){
            $.messager.alert('提示', '请勾选至少一个年份信息', 'error');
            return;
        }
        if(b==null||b==""){
            $.messager.alert('提示', '请至少勾选一种数据类型', 'error');
            return;
        }
        var type=b.substring(2).split(",");
        for(var i=0;i<type.length;i++){
            if(type[i]=="one"){
                document.getElementById("dgtable").style.display="";
                $('#dg').datagrid('options').url="/datachoice/queryarea";
                $('#dg').datagrid('load', {
                    longitudes: east,
                    latitudes: north,
                    thisyear: a,
                    typedata: type[i],
                });
                $.ajax({
                    url:'/datachoice/queryarea',
                    data:{"longitudes":east,"latitudes":north,"thisyear":a,"typedata":type[i]},
                    dataType:'json',
                    success:function(data){
                        var rowsIndex =0;
                        $(data.rows).each(function(){
                            rowsIndex++;
                            var coordinate=[this.longitudes,this.latitudes];
                            coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                            addVectorLabel1(coordinate,rowsIndex);// this.id)
                        })
                    },
                    error:function(){
                        window.location.reload();
                    }
                })
            }
            if(type[i]=="two"){
                document.getElementById("dg1table").style.display="";
                $('#dg1').datagrid('options').url="/datachoice/queryarea";
                $('#dg1').datagrid('load', {
                    longitudes: east,
                    latitudes: north,
                    thisyear: a,
                    typedata: type[i],
                });
                $.ajax({
                    url:'/datachoice/queryarea',
                    data:{"longitudes":east,"latitudes":north,"thisyear":a,"typedata":type[i]},
                    dataType:'json',
                    success:function(data){
                        var rowsIndex =0;
                        $(data.rows).each(function(){
                            rowsIndex++;
                            var coordinate=[this.longitudes,this.latitudes];
                            coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                            addVectorLabel2(coordinate,rowsIndex);// this.id)
                        })
                    },
                    error:function(){
                        window.location.reload();
                    }
                })
            }
            if(type[i]=="three"){
                document.getElementById("dg2table").style.display="";
                $('#dg2').datagrid('options').url="/datachoice/queryarea";
                $('#dg2').datagrid('load', {
                    longitudes: east,
                    latitudes: north,
                    thisyear: a,
                    typedata: type[i],
                });
                $.ajax({
                    url:'/datachoice/queryarea',
                    data:{"longitudes":east,"latitudes":north,"thisyear":a,"typedata":type[i]},
                    dataType:'json',
                    success:function(data){
                        var rowsIndex =0;
                        $(data.rows).each(function(){
                            rowsIndex++;
                            var coordinate=[this.longitudes,this.latitudes];
                            coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                            addVectorLabel3(coordinate,rowsIndex);// this.id)
                        })
                    },
                    error:function(){
                        window.location.reload();
                    }
                })
            }
        };
    }else if(pointfeature.length>0){
        if(pointfeature.length>1){
            for (var i = 0; i < pointfeature.length; i++) {
                pointsource.removeFeature(pointfeature[i]);
            }
            var x=$('#east').textbox('getValue');
            var y=$('#north').textbox('getValue');
            var coordinate=new Array();
            coordinate.push(Number(x));
            coordinate.push(Number(y));
            addVectorLabel(coordinate);
        };
        east=$("#east").val();
        north=$("#north").val();
        $("#selectyears :checkbox:checked").each(function(){
            a=a+","+$(this).val();
        });
        $("#selecttype :checkbox:checked").each(function(){
            b=b+","+$(this).val();
        });
        if(a==null||a==""){
            $.messager.alert('提示', '请勾选至少一个年份信息', 'error');
            return;
        }
        if(b==null||b==""){
            $.messager.alert('提示', '请至少勾选一种数据类型', 'error');
            return;
        }
        var type=b.substring(2).split(",");
        for(var i=0;i<type.length;i++){
            if(type[i]=="one"){
                document.getElementById("dgtable").style.display="";
                $('#dg').datagrid('options').url="/datachoice/querypoint";
                $('#dg').datagrid('load', {
                    longitudes: east,
                    latitudes: north,
                    thisyear: a,
                    typedata: type[i],
                });
                $.ajax({
                    url:'/datachoice/querypoint',
                    data:{"longitudes":east,"latitudes":north,"thisyear":a,"typedata":type[i]},
                    dataType:'json',
                    success:function(data){
                        var resultCor=[180,180,0,0];
                        var rowsIndex =0;
                        $(data.rows).each(function(){
                            rowsIndex++;
                            var coordinate=[this.longitudes,this.latitudes];
                            coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                            addVectorLabel1(coordinate,rowsIndex);// this.name)
                            resultCor[0]=Math.min(resultCor[0],this.longitudes);
                            resultCor[1]=Math.min(resultCor[1],this.latitudes);
                            resultCor[2]=Math.max(resultCor[2],this.longitudes);
                            resultCor[3]=Math.max(resultCor[3],this.latitudes);
                        })

                        if(data.rows.length>0){
                            zoomDld2Max(resultCor);// 放大地图
                        }
                    },
                    error:function(){
                        window.location.reload();
                    }
                })
            }
            if(type[i]=="two"){
                document.getElementById("dg1table").style.display="";
                $('#dg1').datagrid('options').url="/datachoice/querypoint";
                $('#dg1').datagrid('load', {
                    longitudes: east,
                    latitudes: north,
                    thisyear: a,
                    typedata: type[i],
                });
                $.ajax({
                    url:'/datachoice/querypoint',
                    data:{"longitudes":east,"latitudes":north,"thisyear":a,"typedata":type[i]},
                    dataType:'json',
                    success:function(data){
                        var resultCor=[180,180,0,0];
                        var rowsIndex =0;
                        $(data.rows).each(function(){
                            rowsIndex++;
                            var coordinate=[this.longitudes,this.latitudes];
                            coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                            addVectorLabel2(coordinate,rowsIndex);// this.id)
                            resultCor[0]=Math.min(resultCor[0],this.longitudes);
                            resultCor[1]=Math.min(resultCor[1],this.latitudes);
                            resultCor[2]=Math.max(resultCor[2],this.longitudes);
                            resultCor[3]=Math.max(resultCor[3],this.latitudes);
                        })

                        if(data.rows.length>0){
                            zoomDld2Max(resultCor);// 放大地图
                        }
                    },
                    error:function(){
                        window.location.reload();
                    }
                })
            }
            if(type[i]=="three"){
                document.getElementById("dg2table").style.display="";
                $('#dg2').datagrid('options').url="/datachoice/querypoint";
                $('#dg2').datagrid('load', {
                    longitudes: east,
                    latitudes: north,
                    thisyear: a,
                    typedata: type[i],
                });
                $.ajax({
                    url:'/datachoice/querypoint',
                    data:{"longitudes":east,"latitudes":north,"thisyear":a,"typedata":type[i]},
                    dataType:'json',
                    success:function(data){
                        var resultCor=[180,180,0,0];
                        var rowsIndex =0;
                        $(data.rows).each(function(){
                            rowsIndex++;
                            var coordinate=[this.longitudes,this.latitudes];
                            coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                            addVectorLabel3(coordinate,rowsIndex);// this.id)+
                            resultCor[0]=Math.min(resultCor[0],this.longitudes);
                            resultCor[1]=Math.min(resultCor[1],this.latitudes);
                            resultCor[2]=Math.max(resultCor[2],this.longitudes);
                            resultCor[3]=Math.max(resultCor[3],this.latitudes);
                        })
                        if(data.rows.length>0){
                            zoomDld2Max(resultCor);// 放大地图
                        }

                    },
                    error:function(){
                        window.location.reload();
                    }
                })
            }
        };

    }else {
        // $.messager.alert('提示', '查询前，请先添加一个点标记', 'error');
        return;
    }
}
// 计算费用
function summ(){
    var all=parseInt(0);
    var row = $('#dg').datagrid('getSelections');
    var row1 = $('#dg1').datagrid('getSelections');
    var row2 = $('#dg2').datagrid('getSelections');
    $.each(row,function(){
        all=all+parseInt(1000);
    });
    $.each(row1,function(){
        all=all+parseInt(1000);
    });
    $.each(row2,function(){
        all=all+parseInt(500);
    });
    $('#money').html(all);
}

// function doEdit(){
// var money=$('#money').html();
// window.location.href="https://www.baidu.com?money="+money
// }

// 切换已下载列表
function downloadedList(){
// $('#dg').datagrid('clearSelections');
// $('#dg1').datagrid('clearSelections');
// $('#dg2').datagrid('clearSelections');
// $('#dg3').datagrid('clearSelections');
// $('#dg4').datagrid('clearSelections');
// $('#dg5').datagrid('clearSelections');

    if(document.getElementById("dgNormal").style.display=="none"){// 已下载列表为显示状态
        document.getElementById("lable_downloadList").innerHTML = "已下载列表";
        document.getElementById("dgNormal").style.display="block";
        document.getElementById("dgDownList").style.display="none";

        Query();
    }else{
// clearSelections
        $('#dg').datagrid('clearSelections');
        $('#dg1').datagrid('clearSelections');
        $('#dg2').datagrid('clearSelections');
        $('#money').html(0);

        $("#panel").panel('expand');
        document.getElementById("lable_downloadList").innerHTML = "返回数据列表";
        document.getElementById("dgNormal").style.display="none";
        document.getElementById("dgDownList").style.display="block";

        queryDownloadedList();
    }

}

// 查询用户已下载的列表
function queryDownloadedList(){
    var resultCorTemp =0;
// document.getElementById("dg3table").style.display="block";
// $('#dg3').datagrid('options').url="datachoice/queryDownloadedList";
// $('#dg3').datagrid('load', {
// typedata: "one",
// });
// $.ajax({
// url:'datachoice/queryDownloadedList',
// data:{"typedata":"one"},
// dataType:'json',
// success:function(data){
// var rowsIndex =0;
// $(data.rows).each(function(){
// rowsIndex++;
// var coordinate=[this.longitudes,this.latitudes];
// coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
// addVectorLabel1(coordinate,rowsIndex);//this.id)
// })
// },
// error:function(){
// }
// })
    document.getElementById("dg4table").style.display="block";
    $('#dg4').datagrid('options').url="/datachoice/queryDownloadedList";
    $('#dg4').datagrid('load', {
        typedata: "two",
    });
    $.ajax({
        url:'/datachoice/queryDownloadedList',
        data:{"typedata":"two"},
        dataType:'json',
        async:false,
        success:function(data){
            var resultCor=[180,180,0,0];
            var rowsIndex =0;
            $(data.rows).each(function(){
                rowsIndex++;
                var coordinate=[this.longitudes,this.latitudes];
                coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                addVectorLabel5(coordinate,rowsIndex);// this.id)
                resultCor[0]=Math.min(resultCor[0],this.longitudes);
                resultCor[1]=Math.min(resultCor[1],this.latitudes);
                resultCor[2]=Math.max(resultCor[2],this.longitudes);
                resultCor[3]=Math.max(resultCor[3],this.latitudes);
            })
            resultCorTemp = resultCor;
// zoomDld2Max(resultCor);// 放大地图
        },
        error:function(){

            window.location.reload();
        }
    })

    document.getElementById("dg5table").style.display="block";
    $('#dg5').datagrid('options').url="/datachoice/queryDownloadedList";
    $('#dg5').datagrid('load', {
        typedata: "three",
    });
    $.ajax({
        url:'/datachoice/queryDownloadedList',
        data:{"typedata":"three"},
        dataType:'json',
        async:false,
        success:function(data){
            var resultCor=[180,180,0,0];
            var rowsIndex =0;
            $(data.rows).each(function(){
                rowsIndex++;
                var coordinate=[this.longitudes,this.latitudes];
                coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
                addVectorLabel6(coordinate,rowsIndex);// this.id)
                resultCor[0]=Math.min(resultCor[0],this.longitudes);
                resultCor[1]=Math.min(resultCor[1],this.latitudes);
                resultCor[2]=Math.max(resultCor[2],this.longitudes);
                resultCor[3]=Math.max(resultCor[3],this.latitudes);
            })
            if(resultCorTemp!=0){
                resultCor[0]=Math.min(resultCor[0],resultCorTemp[0]);
                resultCor[1]=Math.min(resultCor[1],resultCorTemp[1]);
                resultCor[2]=Math.max(resultCor[2],resultCorTemp[2]);
                resultCor[3]=Math.max(resultCor[3],resultCorTemp[3]);
            }
            if(data.rows.length>0){
                zoomDld2Max(resultCor);// 放大地图
            }
        },
        error:function(){

            window.location.reload();
        }
    })

// document.getElementById("dg5table").style.display="";
// $('#dg5').datagrid('options').url="datachoice/queryDownloadedList";
// $('#dg5').datagrid('load', {
// typedata: "three",
// });
// $.ajax({
// url:'datachoice/queryDownloadedList',
// data:{"typedata":"three"},
// dataType:'json',
// success:function(data){
// var rowsIndex =0;
// $(data.rows).each(function(){
// rowsIndex++;
// var coordinate=[this.longitudes,this.latitudes];
// coordinate=ol.proj.transform(coordinate,'EPSG:4326', 'EPSG:900913');
// addVectorLabel3(coordinate,rowsIndex);//this.id)
// })
// },
// error:function(){
// }
// })
}
// 切换度分秒
function convertNumOrDegree(checked){
    if($("#pointdiv")[0].style.display=="none"){// 当前为度分秒
        $("#pointdiv")[0].style.display="block";
        $("#pointdiv2")[0].style.display="none";
        degree2num();
    }else{
        $("#pointdiv")[0].style.display="none";
        $("#pointdiv2")[0].style.display="block";
        num2degree();
    }
}

function degree2num(){
    degree2num1();
    degree2num2();
}
function num2degree(){
    num2degree1();
    num2degree2();
}
function degree2num1(){
    var num1=parseInt($("#east1").textbox('getValue').toString());
    var num2=(parseInt($("#east2").textbox('getValue').toString())*60+parseInt($("#east3").textbox('getValue').toString()))/3600;
    $("#east").textbox("setValue",num1+num2);
}

function degree2num2(){
    var num1=parseInt($("#north1").textbox('getValue').toString());
    var num2=(parseInt($("#north2").textbox('getValue').toString())*60+parseInt($("#north3").textbox('getValue').toString()))/3600;
    $("#north").textbox("setValue",num1+num2);
}

function num2degree1(){
    var a = $("#east").textbox('getValue');
    var b = a.split(".");
    var x=b[0];
    var y=parseFloat(a)-x;
    var y2=(y*60).toString();
    var b2 = y2.split(".");
    var x2=b2[0];
    var y3=parseFloat(y2)-x2;
    var y4=(y3*60).toString();
    var b3 = y4.split(".");
    var x3=b3[0];
    $("#east1").textbox("setValue",x);
    $("#east2").textbox("setValue",x2);
    $("#east3").textbox("setValue",x3);
}
function num2degree2(){
    var a = $("#north").textbox('getValue');
    var b = a.split(".");
    var x=b[0];
    var y=parseFloat(a)-x;
    var y2=(y*60).toString();
    var b2 = y2.split(".");
    var x2=b2[0];
    var y3=parseFloat(y2)-x2;
    var y4=(y3*60).toString();
    var b3 = y4.split(".");
    var x3=b3[0];
    $("#north1").textbox("setValue",x);
    $("#north2").textbox("setValue",x2);
    $("#north3").textbox("setValue",x3);
}

function totalfeeInfo(){
    $.messager.show({
        title:'费用介绍',
        msg:'高空气象数据每条1000积分;云量气象数据每条500积分',
        timeout:3000,
        showType:'slide'
    });
}

function onlyNum(obj,flag) {
    if(flag!=1&&flag!=2){//
        obj.value = obj.value.replace(/[^\d]/g, ""); // 清除“数字”以外的字符
    }else{
        obj.value = obj.value.replace(/[^\d.]/g, ""); // 清除“数字”和“.”以外的字符
    }
// obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/^\./g, ""); // 验证第一个字符是数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "")
        .replace("$#$", ".");
}
var messageTemp = "";
$.extend($.fn.validatebox.defaults.rules, {

    degreeCheck:{
        validator:function(value,param){
            flag=param[0];
            if(flag==1||flag==3){// 经度范围【73°40′,135°2′30″】
                if(value<73||value>136){
                    messageTemp="请输入中国的经度范围：73°40′~135°2′30″";
                    return false;
                }
            }else if(flag==2||flag==6){// 纬度范围【3°52′,53°33′】
                if(value<3||value>54){
                    messageTemp="请输入中国的纬度范围：3°52′~53°33′";
                    return false;
                }
            }else {
                if(value<0||value>=60){
                    messageTemp="请输入0~60";
                    return false;
                }
            }
            return true;
        },
        message:messageTemp
    }
});


function cleardialog(){
    $("#east").textbox('setValue',"");
    $("#north").textbox('setValue',"");
    $("#lte").textbox('setValue',"");
    $("#ltn").textbox('setValue',"");
    $("#rbe").textbox('setValue',"");
    $("#rbn").textbox('setValue',"");
//	$("#selectyears :checkbox").each(function(){
//		$(this).attr('checked',false);
//	});
//	$("#selecttype :checkbox").each(function(){
//		$(this).attr('checked',false);
//	});
    $('#dg').datagrid('loadData',{rows:[]});
    $('#dg1').datagrid('loadData',{rows:[]});
    $('#dg2').datagrid('loadData',{rows:[]});
    document.getElementById("dgNormal").style.display="block";
    document.getElementById("dgDownList").style.display="none";
    document.getElementById("lable_downloadList").innerHTML = "已下载列表";
    document.getElementById("dgtable").style.display="none";
    document.getElementById("dg1table").style.display="none";
    document.getElementById("dg2table").style.display="none";
// $('#panel').panel('collapse');
}


/**
 * 测距功能测试方法
 *
 * @returns
 */
function Ranging(){
    RangingStatic=1;
    LineFeatrueNumber++;
    // 创建帮助提示框
    createHelpTooltip();
    // 创建测量提示框
    createMeasureTooltip(LineFeatrueNumber);
    // 创建节点测量提示框
    createNodeTooltip(LineFeatrueNumber);
    // 创建关闭提示框
    createCloseTool(LineFeatrueNumber);
    Map.on('pointermove', function (evt) {
        // Indicates if the map is currently being dragged.
        // Only set for POINTERDRAG and POINTERMOVE events. Default is false.
        // 如果是平移地图则直接结束
        if (evt.dragging) {
            return;
        }
        // 帮助提示信息
        var helpMsg = '单击开始';

        if (sketch) {
            // 获取绘图对象的几何要素
            var geom = sketch.getGeometry();
            // 如果当前绘制的几何要素是多线段，则将绘制提示信息设置为多线段绘制提示信息
            if (geom instanceof ol.geom.LineString){
                helpMsg = continueLineMsg;
            }
        }
        // 设置帮助提示要素的内标签为帮助提示信息
        helpTooltipElement.innerHTML = helpMsg;
        // 设置帮助提示信息的位置
        helpTooltip.setPosition(evt.coordinate);
    });
    // 地图双击事件
    Map.on('dblclick', function (evt) {
        var point = new ol.geom.Point(evt.coordinate);
        var tempFeature=new ol.Feature(point);
        tempFeature.tempId=Startpoint.tempId;
        Layers["Ranging"].getSource().addFeature(tempFeature);

        curFeatures.push(tempFeature);
        Startpoint=null;
        StartTooltip=null;
    });
    Interactions["Ranging"].setActive(true);
}
/**
 * 结束测距功能方法
 *
 * @returns
 */
function EndRanging(){
    if(count==1&&StartTooltip!=null){
        Layers["Ranging"].getSource().removeFeature(Startpoint);
        Map.removeOverlay(StartTooltip);
        Map.removeOverlay(closeTooltip);
    }
    count = 0;
    Startpoint=null;
    StartTooltip=null;
    Interactions["Ranging"].setActive(false);
    var geometry=sketch.getGeometry();
    var newCoordinates=geometry.getCoordinates();
    var tempCoordinates=[];
    for(var i=0;i<newCoordinates.length-2;i++){
        tempCoordinates.push([newCoordinates[i][0],newCoordinates[i][1]]);
        if(i==newCoordinates.length-3){
            closeTooltip.setPosition(newCoordinates[i]);
            closeTooltipElement.style.display="block";
        }
    }
    if(tempCoordinates.length!=0){
        var tempgeometry = new ol.geom.LineString(tempCoordinates,geometry.getLayout());
        var feature = new ol.Feature(tempgeometry);
        feature.tempId=sketch.tempId;
        Layers["Ranging"].getSource().addFeature(feature);

        curFeatures.push(feature);
    }

    sketch = null;
    RangingStatic=0;

    // 移除地图单击事件
    Map.removeEventListener('pointermove');
    // 移除地图单击事件
    Map.removeEventListener('dblclick');
    // 移除事件监听
    ol.Observable.unByKey(listener);

    Map.removeOverlay(helpTooltip);
    // var tempoverlay=Map.getOverlayById("measureTooltip");
    Map.removeOverlay(measureTooltip);

}
function StartDrawRanging(evt){
    // The feature being drawn.
    sketch = evt.feature;
    sketch.tempId=LineFeatrueNumber;
    // 提示框的坐标
    var tooltipCoord = evt.coordinate;
    // 监听几何要素的change事件
    // Increases the revision counter and dispatches a 'change' event.

    listener = sketch.getGeometry().on('change', function (evt) {
        // The event target.
        // 获取绘制的几何对象
        var geom = evt.target;
        // 定义一个输出对象，用于记录长度
        var output;
        // 输出多线段的长度
        output = formatLength(geom);
        // 获取多线段的最后一个点的坐标
        tooltipCoord = geom.getLastCoordinate();


        // 设置测量提示框的内标签为最终输出结果
        measureTooltipElement.innerHTML = output;
        // 设置测量提示信息的位置坐标
        measureTooltip.setPosition(tooltipCoord);
        closeTooltip.setPosition(tooltipCoord);
    });
}
function EndDrawRanging(evt){
    closeTooltipElement.style.display="block";
    LineFeatrueNumber++;
    count = 0;
    // 设置偏移量
    measureTooltip.setOffset([0, -7]);
    // 清空绘制要素
    sketch = null;
    // 清空测量提示要素
    measureTooltipElement = null;
    // 清空节点测量提示要素
    NodeTooltipElement = null;
    // 清空关闭测量要素
    closeTooltipElement = null;
    // 创建测量提示框
    createMeasureTooltip(LineFeatrueNumber);
    // 创建测量提示框
    createNodeTooltip(LineFeatrueNumber);
    // 创建测量提示框
    createCloseTool(LineFeatrueNumber);
    // 移除事件监听
    ol.Observable.unByKey(listener);

}
// 创建帮助提示框
function createHelpTooltip() {
    // 如果已经存在帮助提示框则移除
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    // 创建帮助提示要素的div
    helpTooltipElement = document.createElement('div');
    // 设置帮助提示要素的样式
    helpTooltipElement.className = 'NoSelect';
    // 创建一个帮助提示的覆盖标注
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        id:"helpTooltip",
        offset: [15, 0],
        stopEvent:false,
        positioning: 'center-left'
    });
    // 将帮助提示的覆盖标注添加到地图中
    Map.addOverlay(helpTooltip);
}
// 创建测量提示框
function createMeasureTooltip(id) {
    // 创建测量提示框的div
    measureTooltipElement = document.createElement('div');
    // 设置测量提示要素的样式
    measureTooltipElement.className = 'NoSelect';
    // measureTooltipElement.style.color="white";
    // measureTooltipElement.style.cursor="default";
    // 创建一个测量提示的覆盖标注
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        id:"measureTooltip",
        offset: [0, -15],
        stopEvent:false,
        positioning: 'bottom-center'
    });
    measureTooltip.tempId=id;
    // 将测量提示的覆盖标注添加到地图中
    Map.addOverlay(measureTooltip);
}

function createCloseTool(id){
    // 创建测量提示框的div
    closeTooltipElement = document.createElement('div');
    // 设置测量提示要素的样式
    closeTooltipElement.className="closeToolTip";


    closeTooltipElement.onclick = overlayClick;
    closeTooltipElement.style.display="none";
    closeTooltipElement.tempId=id;
    // closeTooltipElement.innerHTML = "测试关闭";
    // measureTooltipElement.style.color="white";
    // measureTooltipElement.style.cursor="default";
    // 创建一个测量提示的覆盖标注
    closeTooltip = new ol.Overlay({
        element: closeTooltipElement,
        id:id,
        offset: [40, -18],
        positioning: 'bottom-center'
    });
    closeTooltip.tempId=id;
    // 将测量提示的覆盖标注添加到地图中
    Map.addOverlay(closeTooltip);
}
// 删除测距线条方法
function overlayClick(){
    var features=Layers["Ranging"].getSource().getFeatures();
    for(var i=0;i<features.length;i++){
        if(features[i].tempId==this.tempId){
            Layers["Ranging"].getSource().removeFeature(features[i]);
        }

    }
    var overlays=Map.getOverlays();
    for(var i=0;i<overlays.a.length;){
        if(overlays.a[i].tempId==this.tempId){
            Map.removeOverlay(overlays.a[i]);
        }else{
            i++;
        }

    }
    // alert(this.tempId);
}

// 创建测量提示框
function createNodeTooltip(id) {
    // 创建测量提示框的div
    NodeTooltipElement = document.createElement('div');
    // 设置测量提示要素的样式
    NodeTooltipElement.className = 'NoSelect';
    // NodeTooltipElement.style.color="white";
    // NodeTooltipElement.style.cursor="default";
    // 创建一个测量提示的覆盖标注
    NodeTooltip = new ol.Overlay({
        element: NodeTooltipElement,
        id:"NodeTooltip",
        offset: [0, -15],
        stopEvent:false,
        positioning: 'bottom-center'
    });
    NodeTooltip.tempId=id;
    // 将测量提示的覆盖标注添加到地图中
    Map.addOverlay(NodeTooltip);
}
// 格式化测量长度
var formatLength = function (line) {
    // 定义长度变量
    var length;
    // 获取坐标串
    var coordinates = line.getCoordinates();
    // 初始长度为0
    length = 0;
    // 获取源数据的坐标系
    var sourceProj = Map.getView().getProjection();
    // 进行点的坐标转换
    for (var i = 0; i < coordinates.length - 1; i++) {
        // 第一个点
        var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
        // 第二个点
        var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
        // 获取转换后的球面距离
        // Returns the distance from c1 to c2 using the haversine formula.
        length += wgs84Sphere.haversineDistance(c1, c2);
    }

    // 定义输出变量
    var output;
    // 如果长度大于1000，则使用km单位，否则使用m单位
    if (length > 1000) {
        output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; // 换算成KM单位
    } else {
        output = (Math.round(length * 100) / 100) + ' ' + 'm'; // m为单位
    }
    return output;
};
// 格式化测量长度
var formatNodeLength = function (line) {
    // 定义长度变量
    var length;
    // 获取坐标串
    var coordinates = line.getCoordinates();
    // 初始长度为0
    length = 0;
    // 获取源数据的坐标系
    var sourceProj = Map.getView().getProjection();
    // 进行点的坐标转换
    for (var i = 0; i < coordinates.length - 2; i++) {
        // 第一个点
        var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
        // 第二个点
        var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
        // 获取转换后的球面距离
        // Returns the distance from c1 to c2 using the haversine formula.
        length += wgs84Sphere.haversineDistance(c1, c2);
    }

    // 定义输出变量
    var output;
    // 如果长度大于1000，则使用km单位，否则使用m单位
    if (length > 1000) {
        output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; // 换算成KM单位
    } else {
        output = (Math.round(length * 100) / 100) + ' ' + 'm'; // m为单位
    }
    return output;
};
// 生成等值线图形
function DrawLine(line,layerType,pointId){
    /*
	 * var selectInteraction = Interactions["Select"]; var features =
	 * selectInteraction.getFeatures().getArray(); var
	 * coordinate=features[0].S.geometry.A;
	 */
    var color=[];
    for(var i=0;i<line.length;i++){
        if(i==0){
            color.push(line[i].mark);

        }else{
            if(color[0]!=line[i].mark){
                color.push(line[i].mark);
                break;
            }
        }
    }
    if(color[0]>color[1]){
        var temp=color[0];
        color[0]=color[1];
        color[1]=temp;
    }


    var PointFeature=Layers[layerType].getSource().getFeatureById(pointId);
    // var point=PointFeature.getGeometry().getCoordinates();
    // var point=[112.48,42.59];
    // var coordinate=ol.proj.transform(point,'EPSG:4326', 'EPSG:900913');

    var coordinate=PointFeature.S.geometry.A;

    var tempArryCoordinates=[];
    for(var j=0;j<line.length;j++){
        var tempCoordinates=[];
        for(var i=0;i<line[j].lstCon.length;i++){
            tempCoordinates.push([coordinate[0]+line[j].lstCon[i].x,coordinate[1]+line[j].lstCon[i].y]);
            tempArryCoordinates.push(tempCoordinates[i]);
        }
        var tempgeometry = new ol.geom.LineString(tempCoordinates,"XY");
        var feature = new ol.Feature(tempgeometry);

        var strColor="#ff0000";
        if (line[j].mark==color[1])
        {
            //红色
            strColor="#ff0000";
        }
        else
        {
            //黄色
            strColor="#ffff00";
        }

        var style=new ol.style.Style({
            fill : new ol.style.Fill({
                color : strColor
            }),
            stroke: new ol.style.Stroke({
                color: strColor,
                width: 2
            })
        });
        feature.setStyle(style);
        Layers["Isoline"].getSource().addFeature(feature);

        curFeatures.push(feature);
    }

    ZoomToExtent(tempArryCoordinates);
}
function testdarw(){
    var line=[[[-9.24321116397524,10],[-9.31884073660487,9.90991617716046],
        [-9.31884073660487,9],
        [-9.36078800100875,8.93199368474145],
        [-9.36078800100875,8],
        [-9.38486768998681,7.94466720525621],
        [-9.38486768998681,7],
        [-9.39886992019842,6.95203680010443],
        [-9.39886992019842,6],
        [-9.40691859821806,5.95627294643056],
        [-9.40691859821806,5],
        [-9.41137450765718,4.95861816192483],
        [-9.41137450765718,4],
        [-9.41369031962026,3.95983701032645],
        [-9.41369031962026,3],
        [-9.41479199377379,2.96041683882831],
        [-9.41479199377379,2],
        [-9.41525045961536,1.96065813663966],
        [-9.41525045961536,1],
        [-9.41525045961536,0.921316273279326],
        [-9.41525045961536,-1],
        [-9.41479199377379,-1.03958316117169],
        [-9.41479199377379,-2],
        [-9.41369031962026,-2.04016298967355],
        [-9.41369031962026,-3],
        [-9.41137450765718,-3.04138183807517],
        [-9.41137450765718,-4],
        [-9.40691859821806,-4.04372705356944],
        [-9.40691859821806,-5],
        [-9.39886992019842,-5.04796319989557],
        [-9.39886992019842,-6],
        [-9.38486768998681,-6.05533279474379],
        [-9.38486768998681,-7],
        [-9.36078800100875,-7.06800631525855],
        [-9.36078800100875,-8],
        [-9.31884073660487,-8.09008382283954],
        [-9.31884073660487,-9],
        [-9.24321116397524,-9.12988886106567],
        [-9.24321116397524,-10]],[[101.991240158366,-10],
        [103.60523077068,-9.14426320658551],
        [104.020096965243,-9],
        [105.598660458098,-8.02417708083745],
        [105.65927727812,-8],
        [106,-7.75231763128636],
        [107.382754266444,-7.0691377133222],
        [107.461809393905,-7],
        [108.92999175924,-6.14649958796199],
        [109.072474765978,-6],
        [110.202983559039,-5.21014917795194],
        [110.373276010549,-5],
        [111.226119873837,-4.26130599369185],
        [111.39725442461,-4],
        [112.01770234853,-3.3008851174265],
        [112.169565681947,-3],
        [112.590614575145,-2.32953072875724],
        [112.708683288815,-2],
        [112.952754248582,-1.3476377124291],
        [113.027247413541,-1],
        [113.027247413541,0.297275258645885],
        [113.027247413541,1],
        [112.781920711774,1.66090396441132],
        [112.708683288815,2],
        [112.283626063251,2.68581869683744],
        [112.169565681947,3],
        [111.539663510073,3.72301682449636],
        [111.39725442461,4],
        [110.525037059267,4.77374814703664],
        [110.373276010549,5],
        [109.206259184698,5.83968704076508],
        [109.072474765978,6],
        [107.539334310642,6.92303328446788],
        [107.461809393905,7],
        [106,7.75231763128636],
        [105.700466809608,7.98195583190411],
        [105.65927727812,8],
        [104.294024665516,8.89723040153711],
        [104.020096965243,9],
        [102.619165794408,9.79633528881974],
        [101.991240158366,10]]];
    DrawLine(line);
    var polygoncoordinate=[[7.82448692472708,10],
        [8,9.67664490317044],
        [8.36441600177178,9],
        [8.57752443496338,8.42247556503662],
        [8.78100576388627,8],
        [9,7.30981365238614],
        [9.11483128182453,7],
        [9.14608307940608,6.85391692059392],
        [9.42032841554611,6],
        [9.5106023686374,5.4893976313626],
        [9.64364682681438,5],
        [9.74973555164576,4.25026444835424],
        [9.80547268595442,4],
        [9.9028528875225,3.0971471124775],
        [9.91972413815301,3],
        [9.99500947592798,2.00499052407202],
        [9.99563114955718,2],
        [10,1.90223925864235],
        [10,1],
        [9,1],
        [8,1],
        [7,1],
        [6,1],
        [5,1],
        [4,1],
        [3,1],
        [2,1],
        [1,1],
        [1,2],
        [1,3],
        [1,4],
        [1,5],
        [1,6],
        [1,7],
        [1,8],
        [1,9],
        [1,10],
        [2,10],
        [3,10],
        [4,10],
        [5,10],
        [6,10],
        [7,10],
        [7.82448692472708,10]];
    var hole=[[[5.788613522425294,7.648223580792546],
        [3.4509042147547007,5.19501915294677],
        [6.67916944809258,5.050713027827442],
        [5.788613522425294,7.648223580792546]],[[2.4490287993103266,3.4633458023890853],
        [1.5584728717803955,1.7316727517172694],
        [5.788613522425294,1.443060607649386],
        [2.4490287993103266,3.4633458023890853]]];


}
// 生成等值面图形Layers["Isosurface"]
function DrawPolygon(Polygon,pointId){
    var Polygon=[[[7.82448692472708,10],
        [8,9.67664490317044],
        [8.36441600177178,9],
        [8.57752443496338,8.42247556503662],
        [8.78100576388627,8],
        [9,7.30981365238614],
        [9.11483128182453,7],
        [9.14608307940608,6.85391692059392],
        [9.42032841554611,6],
        [9.5106023686374,5.4893976313626],
        [9.64364682681438,5],
        [9.74973555164576,4.25026444835424],
        [9.80547268595442,4],
        [9.9028528875225,3.0971471124775],
        [9.91972413815301,3],
        [9.99500947592798,2.00499052407202],
        [9.99563114955718,2],
        [10,1.90223925864235],
        [10,1],
        [9,1],
        [8,1],
        [7,1],
        [6,1],
        [5,1],
        [4,1],
        [3,1],
        [2,1],
        [1,1],
        [1,2],
        [1,3],
        [1,4],
        [1,5],
        [1,6],
        [1,7],
        [1,8],
        [1,9],
        [1,10],
        [2,10],
        [3,10],
        [4,10],
        [5,10],
        [6,10],
        [7,10],
        [7.82448692472708,10]],[]];
    var point=[114.0532,39.5191];
    var coordinate=ol.proj.transform(point,'EPSG:4326', 'EPSG:900913');
    var geometrys=[];
    var tempmultipolygon=[];
    for(var j=0;j<Polygon.length;j++){
        var tempCoordinates=[];

        for(var i=0;i<Polygon[j].length;i++){
            tempCoordinates.push([coordinate[0]+Polygon[j][i][0],coordinate[1]+Polygon[j][i][1]]);

        }
        if(tempCoordinates.length>0){
            tempmultipolygon.push(tempCoordinates);
            var geometry = new ol.geom.Polygon(null);
            geometry.setCoordinates([ tempCoordinates ]);
            geometrys.push(geometry);
        }


    }
    var test=[[114.053252,39.519153],[114.053231,39.519136],[114.053260,39.519135],[114.053252,39.519153]];
    // var
    // test=[[114.053252,39.519153],[114.053260,39.519135],[114.053231,39.519136],[114.053252,39.519153]];
    var tempCoordinates1=[];
    var ceshizuobiao=[];
    for(var i=0;i<test.length;i++){
        var coordinate1=ol.proj.transform(test[i],'EPSG:4326', 'EPSG:900913');
        tempCoordinates1.push([coordinate1[0],coordinate1[1]]);
        ceshizuobiao.push([coordinate1[0]-coordinate[0],coordinate1[1]-coordinate[1]]);

    }
    var geometry = new ol.geom.Polygon(null);
    geometry.setCoordinates([ tempCoordinates1 ]);
    geometrys.push(geometry);
    tempmultipolygon.push(tempCoordinates1);

    test=[[114.053222,39.519124],[114.053214,39.519112],[114.053252,39.519110]];
    tempCoordinates1=[];
    ceshizuobiao=[];
    for(var i=0;i<test.length;i++){
        var coordinate1=ol.proj.transform(test[i],'EPSG:4326', 'EPSG:900913');
        tempCoordinates1.push([coordinate1[0],coordinate1[1]]);
        ceshizuobiao.push([coordinate1[0]-coordinate[0],coordinate1[1]-coordinate[1]]);
    }
    geometry = new ol.geom.Polygon(null);
    geometry.setCoordinates([ tempCoordinates1 ]);
    // geometrys.push(geometry);
    tempmultipolygon.push(tempCoordinates1);

    // var temp=new ol.geom.GeometryCollection(geometrys);
    var temp=new ol.geom.MultiPolygon([tempmultipolygon]);
    var feature = new ol.Feature(temp);
    var style=new ol.style.Style({
        fill : new ol.style.Fill({
            color : 'rgba(0,191,255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0,191,255,0.5)',
            width: 1
        })
    });
    feature.setStyle(style);
    Layers["Isosurface"].getSource().addFeature(feature);

    curFeatures.push(feature);
}
// 生成等值面图形Layers["Isosurface"]
function DrawPolygon1(Polygon,layerType,pointId){
    /*
	 * var selectInteraction = Interactions["Select"]; var features =
	 * selectInteraction.getFeatures().getArray(); var
	 * coordinate=features[0].S.geometry.A;
	 */

    Layers["Isosurface"].getSource() .clear();

    var PointFeature=Layers[layerType].getSource().getFeatureById(pointId);
    // var point=PointFeature.getGeometry().getCoordinates();
    // var point=[114.0532,39.5191];
    // var coordinate=ol.proj.transform(point,'EPSG:4326', 'EPSG:900913');
    var coordinate=PointFeature.S.geometry.A;
    for(var j=0;j<Polygon.length;j++){
        var geometrys=[];
        var tempShellCoordinates=[];
        for(var i=0;i<Polygon[j].lstShell.length;i++){
            tempShellCoordinates.push([coordinate[0]+Polygon[j].lstShell[i].x,coordinate[1]+Polygon[j].lstShell[i].y]);

        }
        if(tempShellCoordinates.length>0){
            geometrys.push(tempShellCoordinates);
        }
        for(var k=0;k<Polygon[j].lstHole.length;k++){
            var tempHoleCoordinates=[];
            for(var m=0;m<Polygon[j].lstHole[k].length;m++){
                tempHoleCoordinates.push([coordinate[0]+Polygon[j].lstHole[k][m].x,coordinate[1]+Polygon[j].lstHole[k][m].y]);
            }
            if(tempHoleCoordinates.length>0){
                geometrys.push(tempHoleCoordinates);
            }

        }
        var color="rgba("+j*4+","+5*j+","+5*j+")";
        var temp=new ol.geom.MultiPolygon([geometrys]);
        var feature = new ol.Feature(temp);
        var style=new ol.style.Style({
            fill : new ol.style.Fill({
                color : color
            }),
            stroke: new ol.style.Stroke({
                color: color,
                width: 1
            })
        });
        feature.setStyle(style);
        Layers["Isosurface"].getSource().addFeature(feature);

        curFeatures.push(feature);
    }

}