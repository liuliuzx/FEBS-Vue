package com.yhp.buss.model.xm.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**CMAQ项目Vo
 *
 */
@Data
public class ModelCmaqXmVo implements Serializable {


    private String xmId;

    private String cmaqId;

    private String cmaqXmjd;

    private String cmaqXmwd;

    private String cmaqPjnf;

    private String cmaqPjyf;

    private String xmMc;

    private String xmZt;

    private String xmlx;

    private Date createTime;

    private Date updateTime;

}
