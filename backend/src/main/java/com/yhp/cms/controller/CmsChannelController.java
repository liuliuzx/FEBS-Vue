package com.yhp.cms.controller;

import cc.mrbird.febs.common.controller.BaseController;
import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.utils.FebsUtil;
import cc.mrbird.febs.common.utils.R;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yhp.cms.domain.CmsChannel;
import com.yhp.cms.service.CmsChannelService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequestMapping("/cms/channel")
public class CmsChannelController extends BaseController {

    @Autowired
    private CmsChannelService cmsChannelService;

    @GetMapping
    @RequiresPermissions("cms:channel:view")
    public R queryPageList(QueryRequest request, CmsChannel cmsChannel) {
        return new R<>(cmsChannelService.findCmsChannelList(request, cmsChannel));
    }


}
