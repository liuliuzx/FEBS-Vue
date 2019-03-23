package com.yhp.buss.model.cmaq.controller;


import cc.mrbird.febs.common.authentication.JWTUtil;
import cc.mrbird.febs.common.controller.BaseController;
import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.utils.FebsUtil;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.system.manager.UserManager;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yhp.buss.model.cmaq.domain.ModelCmaqMain;
import com.yhp.buss.model.cmaq.service.ModelCmaqMainService;
import com.yhp.buss.model.xm.domain.ModelXm;
import com.yhp.buss.model.xm.service.ModelXmService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Slf4j
@Validated
@RestController
@RequestMapping("/model/cmaq")
public class ModelCmaqController extends BaseController {

    @Autowired
    private ModelXmService modelXmService;
    @Autowired
    private ModelCmaqMainService modelCmaqMainService;
    @Autowired
    private UserManager userManager;

    /** 查询项目列表
     *
     * @return
     */
    @GetMapping
    public R queryProject() {
        String token = (String) SecurityUtils.getSubject().getPrincipal();
        Long userId = userManager.getUser(JWTUtil.getUsername(token)).getUserId();

        QueryWrapper<ModelXm> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ModelXm::getUserId, userId)
                .eq(ModelXm::getXmZt, "1")
                .eq(ModelXm::getXmLx, "1");
        return new R<>(modelXmService.list(queryWrapper));
    }


    @PostMapping
    public R addXm(@Valid ModelCmaqMain modelCmaqMain) {
        modelCmaqMain.setCreateTime(new Date());
        modelCmaqMainService.save(modelCmaqMain);
        return new R<>(modelCmaqMain.getCmaqId());
    }

    @PutMapping
    public R updateXm(@Valid ModelXm modelXm) {
        UpdateWrapper<ModelXm> uw = new UpdateWrapper<>();
        uw.set("xm_mc", modelXm.getXmMc());
        uw.eq("xm_id",modelXm.getXmId());
        return new R<>(modelXmService.update(new ModelXm(), uw));
    }



}
