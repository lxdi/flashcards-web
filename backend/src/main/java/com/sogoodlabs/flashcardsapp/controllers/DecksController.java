package com.sogoodlabs.flashcardsapp.controllers;

import com.sogoodlabs.common_mapper.CommonMapper;
import com.sogoodlabs.flashcardsapp.model.dao.IDeckDao;
import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.services.DeckFillerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/deck")
public class DecksController {

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private IDeckDao deckDao;

    @Autowired
    private DeckFillerService deckFillerService;

    @GetMapping("/get/all")
    public List<Map<String,Object>> getAll(){
        return deckDao.findAll().stream()
                .map(commonMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/get/full/{deckid}")
    public Map<String, Object> getFull(@PathVariable("deckid") String meanid){
        Deck deck =  deckDao.findById(meanid).orElseThrow(() -> new RuntimeException("Deck not found by " + meanid));
        deckFillerService.fill(deck);
        return commonMapper.mapToDto(deck);
    }

    @PutMapping("/create")
    public Map<String, Object> create(@RequestBody Map<String, Object> deckDto) {
        Deck deck = commonMapper.mapToEntity(deckDto, new Deck());
        deck.setId(UUID.randomUUID().toString());
        deckDao.save(deck);
        return commonMapper.mapToDto(deck);
    }

    @PostMapping("/update")
    public Map<String, Object> update(@RequestBody Map<String, Object> deckDto) {
        Deck deck = commonMapper.mapToEntity(deckDto, new Deck());
        deckDao.save(deck);
        return commonMapper.mapToDto(deck);
    }

}
