package com.yhp.buss.model.xm.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.yhp.buss.model.xm.domain.ModelXm;
import com.yhp.buss.model.xm.vo.ModelCmaqXmVo;

import java.util.List;


public interface ModelXmService extends IService<ModelXm> {

    String createModelXm(ModelXm modelXm);

    /**查询CMAQ项目列表
     *
     * @return
     */
    List<ModelCmaqXmVo> findCmaqXmList();

}
