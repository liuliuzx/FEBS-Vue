package com.yhp.buss.model.xm.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("model_xm")
public class ModelXm implements Serializable {

    private static final long serialVersionUID = 1L;


    @TableId(value = "XM_ID", type = IdType.UUID)
    private String xmId;

    private Long userId;

    private String xmMc;

    private String xmZt;

    private String xmLx;

    private Date createTime;

    private Date updateTime;

    private transient String createTimeFrom;
    private transient String createTimeTo;

}