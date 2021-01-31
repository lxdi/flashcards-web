package com.sogoodlabs.flashcardsapp.services;

import com.sogoodlabs.flashcardsapp.model.dao.IDeckDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordDefDao;
import com.sogoodlabs.flashcardsapp.model.dao.IWordLinkDao;
import com.sogoodlabs.flashcardsapp.model.entities.Deck;
import com.sogoodlabs.flashcardsapp.model.entities.Word;
import com.sogoodlabs.flashcardsapp.model.entities.WordDef;
import com.sogoodlabs.flashcardsapp.model.entities.WordLink;
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
        wordDefDao.delete(wordDef);
    }

    public void delete(WordLink wordLink){
        wordLinkDao.delete(wordLink);
    }

}
