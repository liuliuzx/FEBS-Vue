package com.yhp.buss.model.cmaq.service.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhp.buss.model.cmaq.dao.ModelCmaqMainMapper;
import com.yhp.buss.model.cmaq.domain.ModelCmaqMain;
import com.yhp.buss.model.cmaq.service.ModelCmaqMainService;
import com.yhp.buss.model.xm.dao.ModelXmMapper;
import com.yhp.buss.model.xm.domain.ModelXm;
import com.yhp.buss.model.xm.service.ModelXmService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@DS("buss-datasource")
@Service("modelCmaqMainService")
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class ModelCmaqMainServiceImpl extends ServiceImpl<ModelCmaqMainMapper, ModelCmaqMain> implements ModelCmaqMainService {


}
