package com.yhp.buss.model.cmaq.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhp.buss.model.cmaq.domain.Mgd;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author CodeBro
 */
@Mapper
public interface MgdMapper extends BaseMapper<Mgd> {

   List<Mgd> findMgdsByCmaqId(String cmaqId);
}
