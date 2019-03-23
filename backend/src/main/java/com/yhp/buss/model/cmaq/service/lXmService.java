package com.yhp.buss.model.cmaq.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhp.buss.model.cmaq.domain.ModelXm;

import java.util.List;

public interface lXmService extends IService<ModelXm>{

	/**
	 * 获取表中所有的数据
	 * @return
	 */
	List<ModelXm> getAll();
}
