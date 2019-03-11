package cc.mrbird.febs.system.controller;


import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.utils.FebsUtil;
import cc.mrbird.febs.common.utils.R;
import cc.mrbird.febs.system.domain.SysDictItem;
import cc.mrbird.febs.system.service.SysDictItemService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin/dictItem")
@Slf4j
public class SysDictItemController {

	@Autowired
	private SysDictItemService sysDictItemService;
	
	/**
	 * @功能：查询字典数据
	 * @param sysDictItem
	 * @param request
	 * @return
	 */
	@GetMapping
	public R queryPageList(SysDictItem sysDictItem, QueryRequest request) {
		QueryWrapper<SysDictItem> queryWrapper = new QueryWrapper<>(sysDictItem);
		Page<SysDictItem> page = new Page<>(request.getPageNum(), request.getPageSize());
		//排序逻辑 处理
		FebsUtil.handleSort(request, page, null);

		return new R<>(sysDictItemService.page(page, queryWrapper));
	}
	
	/**
	 * @功能：新增
	 * @param sysDictItem
	 * @return
	 */
	@PostMapping
	public R add(@RequestBody SysDictItem sysDictItem) {
		sysDictItem.setCreateTime(new Date());
		return new R<>(sysDictItemService.save(sysDictItem));
	}
	
	/**
	 * @功能：编辑
	 * @param sysDictItem
	 * @return
	 */
	@PutMapping
	public R edit(@RequestBody SysDictItem sysDictItem) {
		SysDictItem sysdict = sysDictItemService.getById(sysDictItem.getId());
		if(sysdict==null) {
			return new R<>(Boolean.FALSE,"找不到对应实体");
		}else {
			sysDictItem.setUpdateTime(new Date());
			return new R<>(sysDictItemService.updateById(sysDictItem));
		}
	}
	
	/**
	 * @功能：删除字典数据
	 * @param ids
	 * @return
	 */
	@DeleteMapping("/{ids}")
	public R delete(@NotBlank(message = "{required}") @PathVariable String ids) {
		List<String> list = Arrays.asList(ids.split(","));
		return new R<>(sysDictItemService.removeByIds(list));
	}
	

}
