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
import com.yhp.buss.model.cmaq.dao.WryMapper;
import com.yhp.buss.model.cmaq.domain.Wry;
import com.yhp.buss.model.cmaq.service.IWryService;
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
@Service("wryService")
@DS("master")
@Transactional
public class WryServiceImpl extends ServiceImpl<WryMapper, Wry> implements IWryService {

    @Override
    public IPage<Wry> findWrys(QueryRequest request, Wry wry) {
        try{
            LambdaQueryWrapper<Wry> wrapper = new LambdaQueryWrapper<>();

            if(StringUtils.isNotBlank(wry.getWryBh())){
                wrapper.eq(Wry::getWryBh,wry.getWryBh());
            }
            if(StringUtils.isNotBlank(wry.getWryMc())){
                wrapper.like(Wry::getWryMc,wry.getWryMc());
            }
            if(StringUtils.isNotBlank(wry.getWryJd())){
                wrapper.like(Wry::getWryJd,wry.getWryJd());
            }
            if(StringUtils.isNotBlank(wry.getWryWd())){
                wrapper.like(Wry::getWryWd,wry.getWryWd());
            }
            if(StringUtils.isNotBlank(wry.getWryYcgd())){
                wrapper.like(Wry::getWryYcgd,wry.getWryYcgd());
            }
            if(StringUtils.isNotBlank(wry.getWryYccknj())){
                wrapper.like(Wry::getWryYccknj,wry.getWryYccknj());
            }
            if(StringUtils.isNotBlank(wry.getWryYqsd())){
                wrapper.like(Wry::getWryYqsd,wry.getWryYqsd());
            }
            if(StringUtils.isNotBlank(wry.getWryWendu())){
                wrapper.like(Wry::getWryWendu,wry.getWryWendu());
            }

            Page<Wry> page = new Page<>(request.getPageNum(),request.getPageSize());
            SortUtil.handlePageSort(request,page,"createTime",FebsConstant.ORDER_DESC,true);
            return this.page(page,wrapper);
        }catch (Exception e){
            log.error("获取污染源信息失败");
            return null;
        }
    }

    @Override
    public void createWry(Wry wry) {
        wry.setCreateTime(new Date());
        this.save(wry);
    }

    @Override
    public void updateWry(Wry wry) {
        wry.setUpdateTime(new Date());
        this.baseMapper.updateById(wry);
    }

    @Override
    public void deleteWrys(String[] wryIds) {
        Arrays.stream(wryIds).forEach(id -> this.baseMapper.deleteById(id));
    }

    @Override
    public List<Wry> findWrysByCmaqId(String cmaqId) {
        return this.baseMapper.findWrysByCmaqId(cmaqId);
    }
    
	@Override
	public List<Wry> getAll() {
		return baseMapper.selectList(new QueryWrapper<Wry>());
	}
}
