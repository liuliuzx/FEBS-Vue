package com.yhp.buss.model.xm.controller;

import cc.mrbird.febs.common.controller.BaseController;
import com.yhp.buss.model.xm.service.ModelXmService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequestMapping("/model/xm")
public class ModelXmController extends BaseController {

    @Autowired
    private ModelXmService modelXmService;


}
