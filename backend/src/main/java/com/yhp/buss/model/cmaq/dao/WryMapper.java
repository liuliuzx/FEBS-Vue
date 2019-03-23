package com.yhp.buss.model.cmaq.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yhp.buss.model.cmaq.domain.Wry;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author CodeBro
 */
@Mapper
public interface WryMapper extends BaseMapper<Wry> {

    List<Wry> findWrysByCmaqId(String cmaqId);
}
