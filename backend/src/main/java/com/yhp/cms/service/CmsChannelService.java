package com.yhp.cms.service;

import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.utils.R;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yhp.cms.domain.CmsChannel;


public interface CmsChannelService extends IService<CmsChannel> {

    R findCmsChannelList(QueryRequest request, CmsChannel cmsChannel);

}
