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
@TableName("model_xm")
@Excel("项目表")
public class ModelXm implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	@TableId(type=IdType.UUID)
	@ExcelField(value = "主键")
	private String xmId;
	/** 用户ID **/
	@TableField("user_id")
	@ExcelField(value = "用户ID")
	private String userId;
	
	/** 项目名称 **/
	@TableField("xm_mc")
	@ExcelField(value = "项目名称")
	private String xmMc;
	
	/** 项目状态 **/
	@TableField("xm_zt")
	@ExcelField(value = "项目状态")
	private String xmZt;
	
	/** 项目类型1CMAQ **/
	@TableField("xm_lx")
	@ExcelField(value = "项目类型1CMAQ")
	private String xmLx;
	
	/** 创建时间 **/
	@TableField("create_time")
	private Date createTime;
	
	/** 更新时间 **/
	@TableField("update_time")
	private Date updateTime;
	

}
