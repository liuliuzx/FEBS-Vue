package com.yhp.buss.model.cmaq.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ModelCmaqMain implements Serializable {

    private static final long serialVersionUID = 1L;


    @TableId(value = "CMAQ_ID", type = IdType.UUID)
    private String cmaqId;

    private String xmId;

    private String cmaqXmjd;

    private String cmaqXmwd;

    private String cmaqPjnf;

    private String cmaqPjyf;

    private Date createTime;

    private Date updateTime;

    private transient String createTimeFrom;
    private transient String createTimeTo;

}