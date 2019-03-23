package com.yhp.buss.model.cmaq.service;

import cc.mrbird.febs.common.domain.QueryRequest;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yhp.buss.model.cmaq.domain.Wry;

import java.util.List;

/**
 * @author CodeBro
 */
public interface IWryService extends IService<Wry> {

    List<Wry> findWrysByCmaqId(String cmaqId);

    IPage<Wry> findWrys(QueryRequest request,Wry wry);

    void createWry(Wry wry);

    void updateWry(Wry wry);

    void deleteWrys(String[] wryIds);
    
	/**
	 * 获取表中所有的数据
	 * @return
	 */
	List<Wry> getAll();
}
