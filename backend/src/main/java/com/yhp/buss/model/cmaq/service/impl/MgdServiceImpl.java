package com.yhp.buss.model.cmaq.service.impl;

import cc.mrbird.febs.common.domain.FebsConstant;
import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.utils.SortUtil;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhp.buss.model.cmaq.dao.MgdMapper;
import com.yhp.buss.model.cmaq.domain.Mgd;
import com.yhp.buss.model.cmaq.domain.Wry;
import com.yhp.buss.model.cmaq.service.IMgdService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @author CodeBro
 */
@Slf4j
@Service("mgdService")
@DS("master")
@Transactional
public class MgdServiceImpl extends ServiceImpl<MgdMapper, Mgd> implements IMgdService {

    @Override
    public IPage<Mgd> findMgds(QueryRequest request, Mgd mgd) {
        try{
            LambdaQueryWrapper<Mgd> wrapper = new LambdaQueryWrapper<>();

            if(StringUtils.isNotBlank(mgd.getMgdBh())){
                wrapper.eq(Mgd::getMgdBh,mgd.getMgdBh());
            }
            if(StringUtils.isNotBlank(mgd.getMgdMc())){
                wrapper.like(Mgd::getMgdMc,mgd.getMgdMc());
            }
            if(StringUtils.isNotBlank(mgd.getMgdJd())){
                wrapper.eq(Mgd::getMgdJd,mgd.getMgdJd());
            }
            if(StringUtils.isNotBlank(mgd.getMgdWd())){
                wrapper.eq(Mgd::getMgdWd,mgd.getMgdWd());
            }

            Page<Mgd> page = new Page<>(request.getPageNum(),request.getPageSize());
            SortUtil.handlePageSort(request,page,"createTime",FebsConstant.ORDER_DESC,true);
            return this.page(page,wrapper);
        }catch (Exception e){
            log.error("获取敏感点信息失败");
            return null;
        }
    }

    @Override
    public void createMgd(Mgd mgd) {
        mgd.setCreateTime(new Date());
        this.save(mgd);
    }

    @Override
    public void updateMgd(Mgd mgd) {
        mgd.setUpdateTime(new Date());
        this.updateMgd(mgd);
    }

    @Override
    public void deleteMgds(String[] mgdIds) {
        Arrays.stream(mgdIds).forEach(id -> this.baseMapper.deleteById(id));
    }


    @Override
    public List<Mgd> findMgdsByCmaqId(String cmaqId) {
        return this.baseMapper.findMgdsByCmaqId(cmaqId);
    }
    
	@Override
	public List<Mgd> getAll() {
		return baseMapper.selectList(new QueryWrapper<Mgd>());
	}
}
