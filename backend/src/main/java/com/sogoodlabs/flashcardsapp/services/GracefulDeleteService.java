package com.sogoodlabs.flashcardsapp.services;

import com.sogoodlabs.flashcardsapp.model.dao.*;
import com.sogoodlabs.flashcardsapp.model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GracefulDeleteService {

    @Autowired
    private IDeckDao deckDao;

    @Autowired
    private IWordDao wordDao;

    @Autowired
    private IWordDefDao wordDefDao;

    @Autowired
    private IWordLinkDao wordLinkDao;

    @Autowired
    private IWordDefHintDao wordDefHintDao;

    public void delete(Deck deck){
        wordDao.findByDeck(deck).forEach(this::delete);
        deckDao.delete(deck);
    }

    public void delete(Word word){
        wordDefDao.findByWord(word).forEach(this::delete);
        wordLinkDao.findByWord(word).forEach(this::delete);
        wordDao.delete(word);
    }

    public void delete(WordDef wordDef){
        wordDefHintDao.findByWordDef(wordDef).forEach(this::delete);
        wordDefDao.delete(wordDef);
    }

    public void delete(WordDefHint wordDefHint){
        wordDefHintDao.delete(wordDefHint);
    }

    public void delete(WordLink wordLink){
        wordLinkDao.delete(wordLink);
    }

}
