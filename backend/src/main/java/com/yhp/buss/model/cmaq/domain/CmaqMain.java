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
@TableName("model_cmaq_main")
@Excel("Cmaq主表")
public class CmaqMain implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8269447712991140042L;

	@TableId(type=IdType.UUID)
	@ExcelField(value = "主键")
	private String cmaqId;
	
	/** 项目ID **/
	@TableField("xm_id")
	@ExcelField(value = "项目ID")
	private String xmId;
	
	/** 项目经度 **/
	@TableField("cmaq_xmjd")
	@ExcelField(value = "项目经度")
	private String cmaqXmjd;
	
	/** 项目纬度 **/
	@TableField("cmaq_xmwd")
	@ExcelField(value = "项目纬度")
	private String cmaqXmwd;
	
	/** 评价年份 **/
	@TableField("cmaq_pjnf")
	@ExcelField(value = "评价年份")
	private String cmaqPjnf;
	
	/** 评价月份 **/
	@TableField("cmaq_pjyf")
	@ExcelField(value = "评价月份")
	private String cmaqPjyf;
	
	/** 评价范围 **/
	@TableField("cmaq_pjfw")
	@ExcelField(value = "评价范围")
	private String cmaqPjfw;
	
	/** 排放清单 **/
	@TableField("cmaq_pfqd")
	@ExcelField(value = "排放清单")
	private String cmaqPfqd;
	
	/** 评价指标 **/
	@TableField("cmaq_pjzb")
	@ExcelField(value = "评价指标")
	private String cmaqPjzb;
	
	/** 创建时间 **/
	@TableField("create_time")
	private Date createTime;
	
	/** 更新时间 **/
	@TableField("update_time")
	private Date updateTime;

}
