package com.sogoodlabs.flashcardsapp.services;

import com.sogoodlabs.flashcardsapp.model.dao.IWordDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDefDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordLinkDao;
import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.model.entities.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class FillerService {

    @Autowired
    private IWordDao wordDao;

    @Autowired
    private IWordDefDao wordDefDao;

    @Autowired
    private IWordLinkDao wordLinkDao;

    public void fill(Deck deck){
        deck.setWords(wordDao.findByDeck(deck).stream().peek(this::fill).collect(Collectors.toList()));
    }

    private void fill(Word word){
        word.setWordDefs(wordDefDao.findByWord(word));
        word.setWordLinks(wordLinkDao.findByWord(word));
    }


}
