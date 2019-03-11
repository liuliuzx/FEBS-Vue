package cc.mrbird.febs.common.domain;

import cc.mrbird.febs.system.domain.SysDict;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class SysDictTree implements Serializable {

    private static final long serialVersionUID = 1L;

    private String key;
	
	private String title;
	
    /**
     * id
     */
    private String id;
    
    /**
     * 字典名称
     */
    private String dictName;

    /**
     * 字典编码
     */
    private String dictCode;

    /**
     * 描述
     */
    private String description;

    /**
     * 删除状态
     */
    private Integer delFlag;

    /**
     * 创建人
     */
    private String createBy;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新人
     */
    private String updateBy;

    /**
     * 更新时间
     */
    private Date updateTime;
    
    public SysDictTree(SysDict node) {
    	this.id = node.getId();
		this.key = node.getId();
		this.title = node.getDictName();
		this.dictCode = node.getDictCode();
		this.description = node.getDescription();
		this.delFlag = node.getDelFlag();
	}
    
}
