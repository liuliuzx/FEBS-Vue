package com.yhp.buss.model.cmaq.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhp.buss.model.cmaq.dao.XmMapper;
import com.yhp.buss.model.cmaq.domain.ModelXm;
import com.yhp.buss.model.cmaq.service.lXmService;

@Service("xmService")
@DS("master")
@Transactional
public class XmServiceImpl extends ServiceImpl<XmMapper,ModelXm> implements lXmService{

	@Override
	public List<ModelXm> getAll() {
		return baseMapper.selectList(new QueryWrapper<ModelXm>());
	}

}
