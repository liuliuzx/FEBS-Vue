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
@TableName("model_cmaq_mgd")
@Excel("敏感点信息表")
public class Mgd implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@TableId(type=IdType.UUID)
	@ExcelField(value = "主键")
	private String mgdId;
	
	/** 主表ID **/
	@TableField("cmaq_id")
	@ExcelField(value = "主表ID")
	private String cmaqId;
	
	/** 敏感点编号 **/
	@TableField("mgd_bh")
	@ExcelField(value = "敏感点编号")
	private String mgdBh;
	
	/** 敏感点名称 **/
	@TableField("mgd_mc")
	@ExcelField(value = "敏感点名称")
	private String mgdMc;
	
	/** 敏感点经度 **/
	@TableField("mgd_jd")
	@ExcelField(value = "敏感点经度")
	private String mgdJd;
	
	/** 敏感点纬度 **/
	@TableField("mgd_wd")
	@ExcelField(value = "敏感点纬度")
	private String mgdWd;
	
	/** 创建时间 **/
	@TableField("create_time")
	private Date createTime;
	
	/** 更新时间 **/
	@TableField("update_time")
	private Date updateTime;

}
