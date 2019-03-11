package cc.mrbird.febs.system.service;

import cc.mrbird.febs.system.domain.SysDict;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

public interface SysDictService extends IService<SysDict> {

    public List<Map<String,String>> queryDictItemsByCode(String code);

    public String queryDictTextByKey(String code, String key);
}
