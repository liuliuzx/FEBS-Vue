package cc.mrbird.febs.system.dao;

import cc.mrbird.febs.system.domain.SysDict;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface SysDictMapper extends BaseMapper<SysDict> {
	
	public List<Map<String,String>> queryDictItemsByCode(@Param("code") String code);
	
	public String queryDictTextByKey(@Param("code") String code, @Param("key") String key);

}
