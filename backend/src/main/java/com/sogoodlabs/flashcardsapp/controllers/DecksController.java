package com.sogoodlabs.flashcardsapp.controllers;

import com.sogoodlabs.common_mapper.CommonMapper;
import com.sogoodlabs.flashcardsapp.model.dao.IDeckDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/deck")
public class DecksController {

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private IDeckDao deckDao;

    @GetMapping("/get/all")
    public List<Map<String,Object>> getAll(){
        return deckDao.findAll().stream()
                .map(commonMapper::mapToDto)
                .collect(Collectors.toList());
    }

}
