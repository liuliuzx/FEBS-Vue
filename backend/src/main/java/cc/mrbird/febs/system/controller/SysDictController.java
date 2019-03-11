package cc.mrbird.febs.system.controller;


import cc.mrbird.febs.common.controller.BaseController;
import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.domain.SysDictTree;
import cc.mrbird.febs.common.utils.FebsUtil;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.system.domain.SysDict;
import cc.mrbird.febs.system.service.SysDictService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.*;

@RestController
@RequestMapping("/admin/dict")
@Slf4j
public class SysDictController extends BaseController {

	private String message;
	@Autowired
	private SysDictService sysDictService;
	
	@GetMapping
	public R queryPageList(SysDict sysDict, QueryRequest request) {
		QueryWrapper<SysDict> queryWrapper = new QueryWrapper<>(sysDict);
		Page<SysDict> page = new Page<>(request.getPageNum(), request.getPageSize());
		//排序逻辑 处理
		FebsUtil.handleSort(request, page, null);

		return new R<>(getDataTable(sysDictService.page(page, queryWrapper)));
	}
	
	/**
	 * @功能：获取树形字典数据
	 * @param sysDict
	 * @param request
	 * @return
	 */
	@GetMapping(value = "/treeList")
	public R treeList(SysDict sysDict, QueryRequest request) {
		LambdaQueryWrapper<SysDict> query = new LambdaQueryWrapper<>();
		// 构造查询条件
		String dictName = sysDict.getDictName();
		if(StringUtils.isNotEmpty(dictName)) {
			query.like(true, SysDict::getDictName, dictName);
		}
		query.eq(true, SysDict::getDelFlag, "1");
		query.orderByDesc(true, SysDict::getCreateTime);
		List<SysDict> list = sysDictService.list(query);
		List<SysDictTree> treeList = new ArrayList<>();
		for (SysDict node : list) {
			treeList.add(new SysDictTree(node));
		}
		return new R<>(treeList);
	}
	
	/**
	 * 获取字典数据
	 * @param dictCode
	 * @return
	 */
	@GetMapping(value = "/getDictItems/{dictCode}")
	public R getDictItems(@PathVariable String dictCode) {
		log.info(" dictCode : "+ dictCode);
		try {
			return new R<>(sysDictService.queryDictItemsByCode(dictCode));
		} catch (Exception e) {
			message = "新增菜单/按钮失败";
			return new R(Boolean.FALSE, message);
		}
		

	}
	
	/**
	 * 获取字典数据
	 * @param dictCode
	 * @return
	 */
	@GetMapping(value = "/getDictText/{dictCode}/{key}")
	public R getDictItems(@PathVariable("dictCode") String dictCode, @PathVariable("key") String key) {
		log.info(" dictCode : "+ dictCode);
		try {
			return new R<>(sysDictService.queryDictTextByKey(dictCode, key));
		} catch (Exception e) {
			log.info(e.getMessage());
			return new R<>(Boolean.FALSE, "获取失败");
		}

	}
	
	/**
	 * @功能：新增
	 * @param sysDict
	 * @return
	 */
	@PostMapping
	public R add(@RequestBody SysDict sysDict) {
		sysDict.setCreateTime(new Date());
		return new R<>(sysDictService.save(sysDict));
	}
	
	/**
	 * @功能：编辑
	 * @param sysDict
	 * @return
	 */
	@PutMapping
	public R edit(@RequestBody SysDict sysDict) {
		SysDict sysdict = sysDictService.getById(sysDict.getId());
		if(sysdict==null) {
			return new R<>(Boolean.FALSE,"找不到对应实体");
		}else {
			sysDict.setUpdateTime(new Date());
			return new R<>(sysDictService.updateById(sysDict));
		}
	}
	
	/**
	 * @功能：删除
	 * @param id
	 * @return
	 */
	@DeleteMapping("/{id}")
	public R delete(@NotBlank(message = "{required}") @PathVariable String id) {
			SysDict sysDict = sysDictService.getById(id);
			if(sysDict==null) {
				return new R<>(Boolean.FALSE,"找不到对应实体");
			}else {
				sysDict.setDelFlag(2);
				return new R<>(sysDictService.updateById(sysDict));
			}
	}

}
