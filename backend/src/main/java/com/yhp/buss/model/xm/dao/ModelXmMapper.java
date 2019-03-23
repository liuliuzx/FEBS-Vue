package com.yhp.buss.model.xm.dao;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.devloper.joker.mybatis.plus.query.core.QuerySupport;
import com.yhp.buss.model.xm.domain.ModelXm;
import com.yhp.buss.model.xm.vo.ModelCmaqXmVo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@QuerySupport
public interface ModelXmMapper extends BaseMapper<ModelXm> {

    @QuerySupport
    @Select("SELECT %s FROM model_xm as xm INNER JOIN model_cmaq_main as cmaq ON xm.xm_id = cmaq.xm_id")
    List<ModelCmaqXmVo> SelectCmaqXmList(@Param(Constants.WRAPPER) Wrapper<ModelCmaqXmVo> wrapper);

}