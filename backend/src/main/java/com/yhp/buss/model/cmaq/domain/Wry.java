package com.yhp.buss.model.cmaq.domain;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.wuwenze.poi.annotation.Excel;
import com.wuwenze.poi.annotation.ExcelField;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
@TableName("model_cmaq_wry")
@Excel("主表")
public class Wry implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@TableId(type=IdType.UUID)
	@ExcelField(value = "主键")
	private String wry_id;
	
	/** 主表ID **/
	@TableField("cmaq_id")
	@ExcelField(value = "主表ID")
	private String cmaqId;
	
	/** 污染源编号 **/
	@TableField("wry_bh")
	@ExcelField(value = "污染源编号")
	private String wryBh;
	
	/** 污染源名称 **/
	@TableField("wry_mc")
	@ExcelField(value = "污染源名称")
	private String wryMc;
	
	/** 污染源经度 **/
	@TableField("wry_jd")
	@ExcelField(value = "污染源经度")
	private String wryJd;
	
	/** 污染源纬度 **/
	@TableField("wry_wd")
	@ExcelField(value = "污染源纬度")
	private String wryWd;
	
	/** 烟囱高度 **/
	@TableField("wry_ycgd")
	@ExcelField(value = "烟囱高度")
	private String wryYcgd;
	
	/** 烟囱出口内径 **/
	@TableField("wry_yccknj")
	@ExcelField(value = "烟囱出口内径")
	private String wryYccknj;
	
	/** 烟气速度 **/
	@TableField("wry_yqsd")
	@ExcelField(value = "烟气速度")
	private String wryYqsd;
	
	/** 温度 **/
	@TableField("wry_wendu")
	@ExcelField(value = "温度")
	private String wryWendu;
	
	/** SO2 **/
	@TableField("wry_SO2")
	@ExcelField(value = "SO2")
	private String wrySO2;
	
	/** NOx **/
	@TableField("wry_NOx")
	@ExcelField(value = "NOx")
	private String wryNOx;
	
	/** VOCs **/
	@TableField("wry_VOCs")
	@ExcelField(value = "VOCs")
	private String wryVOCs;
	
	/** PM10 **/
	@TableField("wry_PM10")
	@ExcelField(value = "PM10")
	private String wryPM10;
	
	/** PM2.5 **/
	@TableField("`wry_PM2.5`")//必须加上反引号，否则在sql中无法识别
	@ExcelField(value = "PM2.5")
	private String wryPM25;
	
	/** NH3 **/
	@TableField("wry_NH3")
	@ExcelField(value = "NH3")
	private String wryNH3;
	
	/** CO **/
	@TableField("wry_CO")
	@ExcelField(value = "CO")
	private String wryCO;
	
	/** 类型 1污染源2削减源 **/
	@TableField("wry_type")
	@ExcelField(value = "污染源类型",writeConverterExp="1=污染源,2=消减源")
	private String wryType;
	
	/** 创建时间 **/
	@TableField("create_time")
	private Date createTime;
	
	/** 更新时间 **/
	@TableField("update_time")
	private Date updateTime;
}
