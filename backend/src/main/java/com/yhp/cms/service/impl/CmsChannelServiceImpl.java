package com.yhp.cms.service.impl;

import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.domain.Tree;
import cc.mrbird.febs.common.utils.FebsUtil;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.common.utils.TreeUtil;
import cc.mrbird.febs.common.utils.oConvertUtils;
import cc.mrbird.febs.system.domain.Dept;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yhp.cms.dao.CmsChannelMapper;
import com.yhp.cms.domain.CmsChannel;
import com.yhp.cms.service.CmsChannelService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@DS("cms-datasource")
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class CmsChannelServiceImpl extends ServiceImpl<CmsChannelMapper, CmsChannel> implements CmsChannelService {

    @Override
    public R findCmsChannelList(QueryRequest request, CmsChannel cmsChannel) {
        QueryWrapper queryWrapper = new QueryWrapper(cmsChannel);

        FebsUtil.handleSort(request,queryWrapper);

        List<CmsChannel> list = this.list(queryWrapper);
        List<Tree<CmsChannel>> trees = new ArrayList<>();
        buildTrees(trees, list);
        Tree<CmsChannel> channlTree = TreeUtil.build(trees);

        return new R<>(channlTree);
    }

    private void buildTrees(List<Tree<CmsChannel>> trees, List<CmsChannel> cmsChannels) {
        cmsChannels.forEach(c -> {
            Tree<CmsChannel> tree = new Tree<>();
            tree.setId(c.getChannelId().toString());
            tree.setKey(tree.getId());
            tree.setParentId(c.getChannelPid().toString());
            tree.setText(c.getChannelName());
            tree.setCreateTime(c.getCreateTime());
            tree.setUpdateTime(c.getUpdateTime());
            tree.setOrder(Double.valueOf(c.getChannelOid()));
            tree.setTitle(tree.getText());
            tree.setValue(tree.getId());
            trees.add(tree);
        });
    }
}
