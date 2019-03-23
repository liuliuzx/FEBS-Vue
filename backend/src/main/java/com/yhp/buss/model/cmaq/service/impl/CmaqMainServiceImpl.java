package com.yhp.buss.model.cmaq.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhp.buss.model.cmaq.dao.CmaqMainMapper;
import com.yhp.buss.model.cmaq.domain.CmaqMain;
import com.yhp.buss.model.cmaq.service.ICmaqMainService;

@Service("cmaqMainService")
@DS("master")
@Transactional
public class CmaqMainServiceImpl extends ServiceImpl<CmaqMainMapper, CmaqMain> implements ICmaqMainService{


	
	@Override
	public List<CmaqMain> getAll() {
		return baseMapper.selectList(new QueryWrapper<CmaqMain>());
	}

}
