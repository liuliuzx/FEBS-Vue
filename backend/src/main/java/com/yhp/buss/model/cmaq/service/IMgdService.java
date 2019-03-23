package com.yhp.buss.model.cmaq.service;

import cc.mrbird.febs.common.domain.QueryRequest;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yhp.buss.model.cmaq.domain.Mgd;

import java.util.List;

/**
 * @author CodeBro
 */
public interface IMgdService extends IService<Mgd> {

    List<Mgd> findMgdsByCmaqId(String cmaqId);

    IPage<Mgd> findMgds(QueryRequest request, Mgd mgd);

    void createMgd(Mgd mgd);

    void updateMgd(Mgd mgd);

    void deleteMgds(String[] mgdIds);
    
	/**
	 * 获取表中所有的数据
	 * @return
	 */
	List<Mgd> getAll();
}
