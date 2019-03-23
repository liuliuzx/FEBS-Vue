package com.yhp.buss.model.xm.service.impl;

import cc.mrbird.febs.common.authentication.JWTUtil;
import cc.mrbird.febs.common.service.CacheService;
import cc.mrbird.febs.common.service.RedisService;
import cc.mrbird.febs.system.domain.User;
import cc.mrbird.febs.system.manager.UserManager;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhp.buss.model.xm.dao.ModelXmMapper;
import com.yhp.buss.model.xm.domain.ModelXm;
import com.yhp.buss.model.xm.service.ModelXmService;
import com.yhp.buss.model.xm.vo.ModelCmaqXmVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;


@Slf4j
@DS("buss-datasource")
@Service("modelXmService")
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class ModelXmServiceImpl extends ServiceImpl<ModelXmMapper, ModelXm> implements ModelXmService {

    @Autowired
    private UserManager userManager;

    @Override
    public List<ModelCmaqXmVo> findCmaqXmList() {
        String token = (String) SecurityUtils.getSubject().getPrincipal();
        Long userId = userManager.getUser(JWTUtil.getUsername(token)).getUserId();

        QueryWrapper<ModelCmaqXmVo> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("xm.*", "cmaq.*")
                .eq("xm.xm_zt", "1")
                .eq("xm.xm_lx", "1")
                .eq("xm.user_id", userId);
        return baseMapper.SelectCmaqXmList(queryWrapper);
    }

    @Override
    public String createModelXm(ModelXm modelXm) {
        String token = (String) SecurityUtils.getSubject().getPrincipal();
        String username = JWTUtil.getUsername(token);
        try {
            modelXm.setUserId(userManager.getUser(username).getUserId());
            modelXm.setCreateTime(new Date());
            modelXm.setXmZt("1");
            modelXm.setXmLx("1");
            save(modelXm);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return modelXm.getXmId();
    }
}
