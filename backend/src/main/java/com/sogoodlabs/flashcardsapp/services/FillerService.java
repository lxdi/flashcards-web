package com.sogoodlabs.flashcardsapp.services;

import com.sogoodlabs.flashcardsapp.model.dao.IWordDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDefDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDefHintDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordLinkDao;
import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.model.entities.Word;
import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
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

    @Autowired
    private IWordDefHintDao wordDefHintDao;

    public void fill(Deck deck){
        deck.setWords(wordDao.findByDeck(deck).stream().peek(this::fill).collect(Collectors.toList()));
    }

    private void fill(Word word){
        word.setWordDefs(wordDefDao.findByWord(word).stream().peek(this::fill).collect(Collectors.toList()));
        word.setWordLinks(wordLinkDao.findByWord(word));
    }

    private void fill(WordDef wordDef){
        wordDef.setHints(wordDefHintDao.findByWordDef(wordDef));
    }


}
