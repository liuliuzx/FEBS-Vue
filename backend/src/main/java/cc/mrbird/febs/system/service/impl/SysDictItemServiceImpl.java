package cc.mrbird.febs.system.service.impl;

import cc.mrbird.febs.system.dao.SysDictItemMapper;
import cc.mrbird.febs.system.domain.SysDictItem;
import cc.mrbird.febs.system.service.SysDictItemService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class SysDictItemServiceImpl extends ServiceImpl<SysDictItemMapper, SysDictItem> implements SysDictItemService {

}
