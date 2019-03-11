package com.yhp.cms.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("cms_channel")
public class CmsChannel implements Serializable {
    private static final long serialVersionUID = 1L;

	@TableId(type = IdType.AUTO)
	private Integer channelId;
	/**channelPid*/
	private Integer channelPid;
	/**channelStatus*/
	private String channelStatus;
	/**channelName*/
	private String channelName;
	/**channelUrl*/
	private String channelUrl;
	/**channelTitle*/
	private String channelTitle;
	/**channelKeywords*/
	private String channelKeywords;
	/**channelDescription*/
	private String channelDescription;
	/**channelOid*/
	private Integer channelOid;
	/**createTime*/
	private Date createTime;
	/**updateTime*/
	private Date updateTime;
	/**delFlag*/
	private String delFlag;
}
