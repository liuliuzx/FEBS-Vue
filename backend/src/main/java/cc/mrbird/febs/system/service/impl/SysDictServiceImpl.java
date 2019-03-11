package cc.mrbird.febs.system.service.impl;

import cc.mrbird.febs.system.dao.SysDictMapper;
import cc.mrbird.febs.system.domain.SysDict;
import cc.mrbird.febs.system.service.SysDictService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
@Service
public class SysDictServiceImpl extends ServiceImpl<SysDictMapper, SysDict> implements SysDictService {

    @Override
    public List<Map<String, String>> queryDictItemsByCode(String code) {
        return baseMapper.queryDictItemsByCode(code);
    }

    @Override
    public String queryDictTextByKey(String code, String key) {
        return baseMapper.queryDictTextByKey(code, key);
    }

}
