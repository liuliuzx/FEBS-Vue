package com.yhp.buss.model.cmaq.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yhp.buss.model.cmaq.domain.CmaqMain;
import java.util.List;

public interface ICmaqMainService extends IService<CmaqMain>{

	/**
	 * 获取表中所有的数据
	 * @return
	 */
	List<CmaqMain> getAll();
}
